import React from 'react';
import CountUp from 'react-countup';
import { CountryCategories } from '@/@types/countryCategories';
import { CountriesDataProps } from '@/@types/countryData';

interface DashboardStatsProps {
  category: CountryCategories[];
  data: CountriesDataProps | null;
}

function DashboardStats({ category, data }: DashboardStatsProps) {
  return (
    data &&
    category && (
      <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure dark:text-slate-300 text-primary"></div>
            <div className="stat-title dark:text-slate-300">Name</div>
            <div className="stat-value dark:text-slate-300 text-primary">
              <img
                src={data.flags.png}
                alt={data.flags.alt}
                width={50}
                className="float-right mb-2"
              />
              {data.name.common}
            </div>
            <div className="stat-desc font-bold text-green-700 dark:text-green-300">
              {data.name.official}
            </div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure dark:text-slate-300 text-primary"></div>
            <div className="stat-title dark:text-slate-300">Area</div>
            <div className="stat-value dark:text-slate-300 text-primary">
              <CountUp start={0} end={data.area} duration={5} separator="," />{' '}
              km²
            </div>
            <div className="stat-desc  ">
              {/*Potentionnellement dynamisable */}
            </div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure dark:text-slate-300 text-primary"></div>
            <div className="stat-title dark:text-slate-300">Capital</div>
            <div className="stat-value dark:text-slate-300 text-primary">
              {data.capital}
            </div>
            <div className="stat-desc  ">
              {/* Potentiellement dynamisable */}
            </div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure dark:text-slate-300 text-primary"></div>
            <div className="stat-title dark:text-slate-300">Populations</div>
            <div className="stat-value dark:text-slate-300 text-primary">
              <CountUp
                start={0}
                end={data.population}
                duration={5}
                separator=","
              />{' '}
            </div>
            <div className="stat-desc  font-bold text-rose-500 dark:text-red-400"></div>
          </div>
        </div>
      </div>
    )
  );
}

export default DashboardStats;
