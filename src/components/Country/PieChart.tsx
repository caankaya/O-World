import { CountryCategories } from '@/@types/countryCategories';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  category: CountryCategories;
}

const PieChart = ({ category }: PieChartProps) => {
  if (category && category.environnement) {
    const environnement = category.environnement;

    const co2EmissionValue = Object.values(environnement[0].values).filter(
      Boolean
    ) as number[];
    const co2EmissionAverage =
      co2EmissionValue.reduce((sum, value) => sum + value) /
      co2EmissionValue.length;

    const energyValues = Object.values(environnement[1].values).filter(
      Boolean
    ) as number[];
    const energyAverage =
      energyValues.reduce((sum, value) => sum + value) / energyValues.length;

    const protectedValues = Object.values(environnement[2].values).filter(
      Boolean
    ) as number[];
    const protectedAverage =
      protectedValues.reduce((sum, value) => sum + value) /
      protectedValues.length;

    const pm25Values = Object.values(environnement[3].values).filter(
      Boolean
    ) as number[];
    const pm25Average =
      pm25Values.reduce((sum, value) => sum + value) / pm25Values.length;

    const data = {
      labels: [
        'CO2 (kt)',
        'Energy use kg',
        'Protected areas %',
        'PM2.5 air pollution',
      ],

      datasets: [
        {
          data: [
            co2EmissionAverage.toFixed(2),
            energyAverage.toFixed(2),
            protectedAverage.toFixed(2),
            pm25Average.toFixed(2),
          ],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#2bd4bd'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#2bd4bd'],
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1.5,
    };

    return (
      category && (
        <div
          style={{
            display: 'block',
            height: '50vh',
            width: '100%',
            margin: 'auto',
            cursor: 'pointer',
          }}
        >
          <Pie data={data} options={options} />
        </div>
      )
    );
  }
};

export default PieChart;
