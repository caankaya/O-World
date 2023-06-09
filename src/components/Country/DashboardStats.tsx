import { CountryCategories } from '@/@types/countryCategories';
import { CountriesDataProps } from '@/@types/countryData';
import React from 'react';

interface DashboardStatsProps {
  category: CountryCategories[];
  data: CountriesDataProps | null;
}

function DashboardStats({ category, data }: DashboardStatsProps) {
  console.log('category :', category);
  console.log('data :', data);
  return (
    data &&
    category && (
      <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure dark:text-slate-300 text-primary">
              <img
                src={data.flags.png}
                className="h-6 mr-3 sm:h-7"
                alt={data.flags.alt}
                width={50}
                height={50}
              />
            </div>
            <div className="stat-title dark:text-slate-300">Name</div>
            <div className="stat-value dark:text-slate-300 text-primary">
              {data.name.common}
            </div>
            <div className="stat-desc  font-bold text-green-700 dark:text-green-300">
              {data.name.official}
            </div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure dark:text-slate-300 text-primary"></div>
            <div className="stat-title dark:text-slate-300">Area</div>
            <div className="stat-value dark:text-slate-300 text-primary">
              {data.area.toLocaleString()} km²
            </div>
            <div className="stat-desc  ">
              {/*Potentionnellement dynamisable */}
            </div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure dark:text-slate-300 text-primary">
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
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                ></path>
              </svg>
            </div>
            <div className="stat-title dark:text-slate-300">Capital</div>
            <div className="stat-value dark:text-slate-300 text-primary">
              {data.capital}
            </div>
            <div className="stat-desc  ">50 in hot leads</div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure dark:text-slate-300 text-primary">
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
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title dark:text-slate-300">Populations</div>
            <div className="stat-value dark:text-slate-300 text-primary">
              {data.population.toLocaleString()}
            </div>
            <div className="stat-desc  font-bold text-rose-500 dark:text-red-400"></div>
          </div>
        </div>
      </div>
    )
  );
}

export default DashboardStats;
