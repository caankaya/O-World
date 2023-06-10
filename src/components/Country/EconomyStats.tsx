import { CountryCategories } from '@/@types/countryCategories';
import { CountriesDataProps } from '@/@types/countryData';

interface EconomyProps {
  category: CountryCategories;
}

function Economy({ category }: EconomyProps) {
  if (category && category.economy) {
    console.log('category :', category);
    const indicator = category.economy[2].indicator;
    const years = category.economy[2].values;

    return (
      category && (
        <div className="Economy">
          <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
            <div className="card w-full p-6 bg-base-100 shadow-xl mt-6">
              <div className="text-xl font-semibold">
                Inflation between 2002 - 2022
              </div>
              <div className="divider mt-2"></div>
              <div className="h-full w-full pb-6 bg-base-100">
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th>Years</th>
                        <th key={indicator.id}>{indicator.values}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(years).map(([year, value]) => (
                        <tr key={year}>
                          <td>{year}</td>
                          <td>{value as React.ReactNode}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default Economy;
