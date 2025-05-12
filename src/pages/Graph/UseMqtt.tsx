import { useState, useEffect } from "react";
import mqtt, { MqttClient, IClientOptions } from "mqtt";
import {
  ConnectionStatus,
  Subscription,
  Payload,
  PowerMessage,
} from "../../interfaces/MqttInterface";
import { useCallback } from "react";

function UseMqtt(
  brokerUrl: string,
  options: IClientOptions, //TS will warn if key/type is misspelled
  subscriptions: Subscription[] = [],
): {
  status: ConnectionStatus;
  lastPayload: Payload | null; //allowinng for no data/payload
  connect: () => void;
  disconnect: () => void;
} {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>("Idle");
  const [lastPayload, setLastPayload] = useState<Payload | null>(null);

  // Initiate connection
  const connect = useCallback(() => {
    //useCallback only changes if brokerUrl or options change and prevents re-renders
    setStatus("Connecting");
    const mqttClient = mqtt.connect(brokerUrl, options);
    setClient(mqttClient);
  }, [brokerUrl, options]);

  // Disconnect the client
  const disconnect = useCallback(() => {
    if (client) {
      client.end(true, () => {
        setStatus("Idle"); // go back to Idle once fully disconnected
        setClient(null); // clear out the client instance
      });
    }
  }, [client]);

  useEffect(() => {
    if (!client) return; // do nothing until `connect()` has run

    client.on("message", (topic: string, payload: Buffer) => {
      const message = payload.toString();
      const subscription = subscriptions.find((sub) => sub.topic === topic);

      if (subscription == null) {
        console.error("No matching subscription found for topic:", topic);
        return; // Exit if no matching subscription is found
      }

      let parsedMessage: PowerMessage;
      try {
        parsedMessage = JSON.parse(message); // Try to parse the string as JSON
        setLastPayload({
          id: subscription.id,
          displayName: subscription.displayName,
          power: parsedMessage.map(x => ({
            value: x[0],
            timeStamp: new Date(x[1]),
          }))
        });
      } catch (error) {
        console.error("Error parsing JSON payload:", error);
        return; // Exit if JSON is invalid
      }
    });

    // On connect, subscribe to ids and set up listeners
    client.on("connect", () => {
      setStatus("Connected");
      subscriptions.forEach((subscription) => {
        client.subscribe(subscription.topic, { qos: 1 }, (error) => {
          if (error) {
            console.error(`Subscribe error on ${subscription.topic}:`, error);
          }
        });
      });
    });

    // If it’s trying to reconnect
    client.on("reconnect", () => {
      setStatus("Reconnecting");
    });

    // On error
    client.on("error", (error) => {
      console.error("MQTT error:", error);
      setStatus("Error");
      client.end(); // stop the client on fatal error
    });

    client.on("close", () => {
      setStatus("Idle");
    });

    // Cleanup listeners & disconnect on unmount or new client
    return () => {
      client.removeAllListeners();
      client.end(true);
    };
  }, [client, subscriptions]);

  return { status, lastPayload, connect, disconnect };
}

export default UseMqtt;
