import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Colors,
} from "chart.js";
import { ChartProps } from "../../interfaces/MqttInterface";

ChartJS.defaults.elements = ChartJS.defaults.elements || {};
ChartJS.defaults.elements.point = ChartJS.defaults.elements.point || {};
ChartJS.defaults.elements.point.radius = 0;


ChartJS.defaults.datasets.line = {
  ...ChartJS.defaults.datasets.line,
  borderWidth: 2,
  fill: "start",
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Colors,
);

export function LineGraph({ data, options }: ChartProps) {
  return <Line data={data} options={options} />;
}
