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

    console.log('co2EmissionValue :', co2EmissionValue);

    const energyValues = Object.values(environnement[1].values).filter(
      Boolean
    ) as number[];
    const energyAverage =
      energyValues.reduce((sum, value) => sum + value) / energyValues.length;

    console.log('energyValues :', energyValues);

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
        'CO2 emissions (kt)',
        'Energy use kg',
        'PM2.5 air pollution',
        'Terrestrial and marine protected areas %',
      ],

      datasets: [
        {
          data: [
            co2EmissionAverage,
            energyAverage,
            protectedAverage,
            pm25Average,
          ],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#2bd4bd',
            '#828df8',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#2bd4bd',
            '#828df8',
          ],
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 100, // Ajuster cette valeur en fonction de vos besoins
    };

    return (
      category && (
        <div
          style={{
            display: 'block',
            boxSizing: 'border-box',
            height: '716px',
            width: '716px',
          }}
        >
          <Pie data={data} options={options} />
        </div>
      )
    );
  }
};

export default PieChart;
