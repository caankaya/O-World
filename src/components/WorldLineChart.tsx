import {
  Chart as ChartJS,
  Tooltip,
  BarElement,
  Legend,
  CategoryScale,
  LinearScale,
  BarController,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  Tooltip,
  BarElement,
  Legend,
  CategoryScale,
  LinearScale,
  BarController
);

interface PopulationsProps {
  population: {
    indicator: string;
    values: number;
  };
}

/**
 * This function component renders a bar chart with the given population data.
 *
 * @param population The population data to be plotted.
 * @returns A bar chart or null if there's no population data.
 */
function WorldLineChart({ population }: PopulationsProps) {
  if (population) {
    const years = Object.keys(population);
    const populations = Object.values(population);

    const data = {
      labels: years,
      datasets: [
        {
          label: 'Population',
          data: populations,
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderWidth: 1,
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
        className="BarChart"
        style={{
          display: 'block',
          height: '50vh',
          width: '100%',
          margin: 'auto',
          cursor: 'pointer',
          padding: '1rem',
        }}
      >
        <Bar data={data} options={options} />
      </div>
    );
  }

  return null; // return null when there's no population data
}

export default WorldLineChart;
