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

    return (
      <div
        className="LineChart"
        style={{
          height: '330px',
          width: '660px',
          display: 'block',
          margin: 'auto',
          cursor: 'pointer',
        }}
      >
        <Line data={data} />
      </div>
    );
  }

  return null;
}

export default LineChart;
