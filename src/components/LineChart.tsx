import {
  Chart as ChartJS,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);

interface LineChartProps {
  category: any;
}

function LineChart({ category }: LineChartProps) {
  if (category && category.population) {
    const population = category.population[0].values;

    const data = {
      labels: Object.keys(population),
      datasets: [
        {
          label: 'Population total',
          data: Object.values(population),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1.5,
    };

    return (
      <div
        className="LineChart"
        style={{
          display: 'block',
          height: '50vh',
          width: '100%',
          margin: 'auto',
          cursor: 'pointer',
        }}
      >
        <Line data={data} options={options} />
      </div>
    );
  }

  return null;
}

export default LineChart;
