import { CountryCategories, EconomyData } from '@/@types/countryCategories';
import { CountriesDataProps } from '@/@types/countryData';
import DoughnutChart from './Dougnhout';

interface CircularyProps {
  category: CountryCategories[] | null;
  data: CountriesDataProps | null;
}

function Circulary({ category, data }: CircularyProps) {
  let categoryAverages = null;

  if (category && category.economy && category.economy.length > 0) {
    categoryAverages = category.economy.map((economyData: EconomyData) => {
      const { indicator, values } = economyData;

      const average =
        Object.values(values).reduce((sum, value) => sum + value, 0) /
        Object.keys(values).length;

      return {
        indicator: indicator.value,
        average: average.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        }),
      };
    });
  }

  return (
    data &&
    category && (
      <div className="Circulary">
        <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
          <div className="card w-full p-6 bg-base-100 shadow-xl mt-6">
            <div className="text-xl font-semibold">
              Economy between 2002 and 2022
            </div>
            <div className="divider mt-2"></div>
            <div className="h-full w-full pb-6 bg-base-100">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Average</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryAverages &&
                      categoryAverages.map((categoryAverage, index) => (
                        <tr key={index}>
                          <td>{categoryAverage.indicator}</td>
                          <td>{categoryAverage.average}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="card w-full p-6 bg-base-100 shadow-xl mt-6">
            <div className="text-xl font-semibold">Orders by Category</div>
            <div className="divider mt-2"></div>
            <div className="h-full w-full pb-6 bg-base-100">
              <canvas
                role="img"
                height="705"
                width="705"
                style={{
                  display: 'block',
                  boxSizing: 'border-box',
                  height: '705px',
                  width: '705px',
                }}
              >
                <DoughnutChart category={category} />
              </canvas>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Circulary;
