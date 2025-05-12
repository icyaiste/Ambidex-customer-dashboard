import UseMqtt from "./UseMqtt";
import "../../interfaces/MqttInterface";
import { useEffect, useState } from "react";
import { Installation } from "../../interfaces/DashboardInterface";
import { LineGraph } from "../../components/graphUI/Line";
import { ChartProps, Subscription } from "../../interfaces/MqttInterface";
import "./GraphStyle.scss";

const backend_url = "http://localhost:8004";
const broker_url = "wss://stage.ambidex.se:443/mqtt";
const MQTT_OPTIONS = {
  username: "hhhhh",
  password: "aaaaaaaa",
  reconnectPeriod: 10000,
};

function Graph() {
  const [sliderValues, setSliderValues] = useState<Record<string, number>>({});
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [charts, setCharts] = useState<Record<string, ChartProps>>({});
  const { status, lastPayload, connect, disconnect } = UseMqtt(
    broker_url,
    MQTT_OPTIONS,
    subscriptions,
  );

  useEffect(() => {
    async function getSchedule() {
      try {
        const response = await fetch(
          `${backend_url}/installation_registrations`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (!response.ok) {
          throw new Error(`Fetch failed: ${response.status}`);
        }

        const data: Installation[] = await response.json();
        const extractedTopics = data
          .filter((inst) => inst.id)
          .map((inst) => ({
            id: inst.id,
            displayName: inst.displayName,
            topic: `ambidex/v1/${inst.id}/status/power`,
          }));
        setSubscriptions(extractedTopics);
      } catch (err) {
        console.error("Error loading installations:", err);
      }
    }
    getSchedule();
  }, []);

  //Connect wheneversubscriptions first become non-empty
  useEffect(() => {
    if (subscriptions.length > 0) {
      connect();
    }
  }, [subscriptions, connect]); //only reruns if subscriptions* change

  //Disconnect on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []); // Only runs cleanup on unmount

  // Build or append to each topic’s ChartProps when a new payload arrives
  useEffect(() => {
    if (!lastPayload) return;
    const { id, displayName, power } = lastPayload;

    setCharts((prev) => {
      const existing = prev[id] ?? {
        //if ChartProps for this topic exists, use it otherwise create new one
        data: {
          labels: [],
          datasets: [
            {
              label: displayName,
              data: [],
            },
          ],
        },
        options: {
          responsive: true, // make it resize with its container
          plugins: {
            title: {
              display: true,
              text: displayName,
              font: { size: 16 },
              color: "#262626",
            },
          }, // show the topic as the chart title
          scales: {
            x: {
              title: {
                display: true,
                text: "Time",
                font: { size: 16 },
                color: "#262626",
              },
            }, //x-asis title
            y: {
              title: {
                display: true,
                text: "Power",
                font: { size: 16 },
                color: "#262626",
              },
            }, //y-axis title
          },
        },
      };

      const newLabels = [
        ...(existing.data.labels ?? []),
        ...power.map((x) => x.timeStamp.toLocaleTimeString()),
      ];
      const newDataset = {
        ...existing.data.datasets[0],
        data: [...existing.data.datasets[0].data, ...power.map((x) => x.value)],
      };

      return {
        ...prev,
        [id]: {
          data: { labels: newLabels, datasets: [newDataset] },
          options: existing.options,
        },
      };
    });
  }, [lastPayload]);

  return (
    <section className="graphContainer">
      <header className="header">
        <h2>MQTT Status: {status}</h2>

        {status === "Idle" && (
          <button onClick={connect}>Connect to Broker</button>
        )}
        {status !== "Idle" && <button onClick={disconnect}>Disconnect</button>}
      </header>
      <div className="chartGrid">
        {Object.entries(charts).map(([topic, chartProps]) => {
          const allLabels = chartProps.data.labels;
          const allData = chartProps.data.datasets[0].data;

          const maxDataPoints = allLabels?.length;
          const showCount = sliderValues[topic] ?? maxDataPoints;

          const filteredLabels = allLabels?.slice(-showCount);
          const filteredData = allData?.slice(-showCount);

          const filteredChart: ChartProps = {
            data: {
              labels: filteredLabels,
              datasets: [
                {
                  ...chartProps.data.datasets[0],
                  data: filteredData,
                },
              ],
            },
            options: {
              ...chartProps.options,
              maintainAspectRatio: false,
            },
          };

          return (
            <div key={topic} className="chartWithSlider">
              {/*  Chart */}
              <div className="chartWrapper">
                <LineGraph
                  data={filteredChart.data}
                  options={filteredChart.options}
                />
              </div>

              {/* Slider */}
              <div className="slideContainer">
                <label htmlFor={`slider-${topic}`}>
                  Show last {showCount} points
                </label>
                <input
                  id={`slider-${topic}`}
                  className="slider"
                  type="range"
                  min={1}
                  max={chartProps.data.labels?.length}
                  value={showCount}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setSliderValues((prev) => ({ ...prev, [topic]: v }));
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Graph;
