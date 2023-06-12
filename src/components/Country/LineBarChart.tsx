import { CountryCategories } from '@/@types/countryCategories';
import { CountriesDataProps } from '@/@types/countryData';
import LineChart from './LineChart';
import BarChart from './BarChart';

interface BarChartProps {
  category: CountryCategories[];
}

function LineBarChart({ category }: BarChartProps) {
  return (
    <div className="BarChart">
      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <div className="card w-full p-6 bg-base-100 shadow-xl mt-6">
          <div className="text-xl font-semibold">
            Population growth between 2002 - 2022
          </div>
          <div className="divider mt-2"></div>
          <div className="h-full w-full pb-6 bg-base-100 m-auto">
            <LineChart category={category} />
          </div>
        </div>
        <div className="card w-full p-6 bg-base-100 shadow-xl mt-6">
          <div className="text-xl font-semibold">
            Life expectancy at birth between 2002 - 2022
          </div>
          <div className="divider mt-2"></div>
          <div className="h-full w-full pb-6 bg-base-100">
            <BarChart category={category} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LineBarChart;
