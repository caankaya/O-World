import { CountryCategories } from '@/@types/countryCategories';
import { CountriesDataProps } from '@/@types/countryData';

interface BilboardsProps {
  category: CountryCategories[];
  data: CountriesDataProps | null;
}

function Bilboards({ category, data }: BilboardsProps) {
  return (
    data &&
    category && (
      <div className="Bilboards">
        <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
          <div className="stats bg-base-100 shadow">
            <div className="stat">
              <div className="stat-title language mb-1">
                What are they talking about ?
              </div>
              <div className="stat-value">
                Language is {Object.values(data.languages)[0]}{' '}
              </div>
              <div className="stat-actions">
                They don't understand the extraterrestrial language
              </div>
            </div>
            <div className="stat">
              <div className="stat-title currency mb-2">
                What is their currency symbol ?
              </div>
              <div className="stat-value">
                {Object.values(data.currencies)[0]?.symbol}
              </div>
              <div className="stat-actions">
                <div className="">
                  {Object.values(data.currencies)[0]?.name}
                </div>
              </div>
            </div>
          </div>
          <div className="stats bg-base-100 shadow">
            <div className="stat">
              <div className="stat-figure invisible md:visible"></div>
              <div className="stat-title">What continent are they in ?</div>
              <div className="stat-value">{data.region}</div>
              <div className="stat-desc subregion mt-1">{data.subregion}</div>
            </div>
            <div className="stat">
              <div className="stat-figure invisible md:visible"></div>
              <div className="stat-title">The army flag</div>
              <div className="stat-value">
                <img
                  src={data.coatOfArms.png}
                  className="h-6 mr-3 sm:h-7 block"
                  alt={data.flags.alt}
                  width={50}
                />
              </div>
              <div className="stat-desc">Make love ❤ No War &#128293;</div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Bilboards;
