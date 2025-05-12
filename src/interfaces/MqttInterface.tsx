import { ChartOptions, ChartData } from "chart.js";

export type ConnectionStatus =
  | "Idle"
  | "Connecting"
  | "Connected"
  | "Reconnecting"
  | "Error";

export type PowerMessage = [number, number][];

export interface Payload {
  id: string;
  displayName: string;
  power: {
    value: number;
    timeStamp: Date;
  }[];
}

export interface Subscription {
  id: string;
  displayName: string;
  topic: string;
}

export interface ChartProps {
  options: ChartOptions<"line">;
  data: ChartData<"line", number[], string>;
}
