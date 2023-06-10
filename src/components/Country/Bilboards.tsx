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
              <div className="stat-title">Flag</div>
              <div className="stat-value">
                <img
                  src={data.flags.png}
                  className="h-6 mr-3 sm:h-7"
                  alt={data.flags.alt}
                />
              </div>
              <div className="stat-actions">
                Language is {Object.values(data.languages)[0]}{' '}
              </div>
            </div>
            <div className="stat">
              <div className="stat-title">Currency</div>
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
              <div className="stat-figure invisible md:visible">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Region</div>
              <div className="stat-value">{data.region}</div>
              <div className="stat-desc">{data.subregion}</div>
            </div>
            <div className="stat">
              <div className="stat-figure invisible md:visible">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Army</div>
              <div className="stat-value">
                <img
                  src={data.coatOfArms.png}
                  className="h-6 mr-3 sm:h-7 block"
                  alt={data.flags.alt}
                  width={50}
                  height={50}
                />
              </div>
              <div className="stat-desc">
                {Object.values(data.name.nativeName)[0]?.official}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Bilboards;
