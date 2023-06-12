import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { CountryCategories } from '@/@types/countryCategories';

ChartJS.register(BarElement, Tooltip, Legend);
interface BarChartProps {
  category: CountryCategories[] | any;
}

function BarChart({ category }: BarChartProps) {
  if (category && category.job) {
    const population = category.population[1].values;

    const data = {
      labels: Object.keys(population),
      datasets: [
        {
          label: 'Life expectancy at birth, total (years)',
          data: Object.values(population),
          borderColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 1,
        },
      ],
    };

    return (
      category && (
        <div
          className="BarChart"
          style={{
            height: '330px',
            width: '660px',
            display: 'block',
            margin: 'auto',
            cursor: 'pointer',
          }}
        >
          <Bar data={data} />
        </div>
      )
    );
  }
}

export default BarChart;
