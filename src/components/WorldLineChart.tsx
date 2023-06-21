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

function WorldLineChart({ population }) {
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
      plugins: {
        legend: {
          display: true,
        },
        tooltip: {
          enabled: true,
        },
      },
      animations: {
        duration: 5000, // durée de l'animation en millisecondes
        easing: 'easeInOutElastic', // type d'effet d'atténuation
      },
      scales: {
        y: {
          min: 6000000000,
          max: 8500000000,
        },
      },
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
        }}
      >
        <Bar data={data} options={options} />
      </div>
    );
  }

  return null; // return null when there's no population data
}

export default WorldLineChart;
