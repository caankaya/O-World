import { CountryCategories } from '@/@types/countryCategories';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  category: CountryCategories;
}

const data = {
  labels: ['Section 1', 'Section 2', 'Section 3'],
  datasets: [
    {
      data: [30, 50, 20],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 1.5,
};

const PieChart = ({ category }: PieChartProps) => {
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
};

export default PieChart;
