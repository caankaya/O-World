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
  if (category) {
    const data = {
      labels: ['2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40, 70],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };

    const options = {};

    return (
      <div className="LineChart">
        <Line data={data} options={options} />
      </div>
    );
  }

  return null;
}

export default LineChart;
