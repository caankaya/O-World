import { CountryCategories } from '@/@types/countryCategories';
import { CountriesDataProps } from '@/@types/countryData';
import LineChart from './LineChart';

interface BarChartProps {
  category: CountryCategories[];
  data: CountriesDataProps | null;
}

function BarChart({ category, data }: BarChartProps) {
  return (
    <div className="BarChart">
      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <div className="card w-full p-6 bg-base-100 shadow-xl mt-6">
          <div className="text-xl font-semibold">
            Monthly Active Users (in K)
          </div>
          <div className="divider mt-2"></div>
          <div className="h-full w-full pb-6 bg-base-100">
            <LineChart category={category} />
          </div>
        </div>
        <div className="card w-full p-6 bg-base-100 shadow-xl mt-6">
          <div className="text-xl font-semibold">Revenue</div>
          <div className="divider mt-2"></div>
          <div className="h-full w-full pb-6 bg-base-100">
            {/* Il faut insérer le canvas juste ici */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BarChart;
