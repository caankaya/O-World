'use client';

import React from 'react';
import CountUp from 'react-countup';

import { CountriesDataProps } from '@/@types/countryData';
import { useAppSelector } from '@/GlobalRedux/hooks';



function RestCountriesInfos({countryData}: {countryData: CountriesDataProps | null}) {
  const DetailCountryWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);

  if (!countryData) {
    return <div>Loading...</div>;
  }

  return (
    <section className={`p-8 flex flex-col items-center justify-center w-full gap-5 
    ${isSideBarOpen ? 'float-right' : ''}`}
    style={isSideBarOpen ? { width: DetailCountryWidth } : {}}
    >
      <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
        <div className="stat">
          <div className="stat-figure text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </div>
          <div className="stat-title">Name</div>
          <div className="stat-value text-primary">{countryData.name.common}</div>
          <div className="stat-desc text-green-300">{countryData.name.official}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Flag</div>
          <div className="relative h-32">
            <img src={countryData.flags.svg} alt={countryData.flags.alt} className="absolute w-full h-full object-contain" />
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Coat Of Arms</div>
          <div className="relative h-32">
            <img src={countryData.coatOfArms.png} alt={countryData.name.common} className="absolute w-full h-full object-contain" />
          </div>
        </div>
      </div>   

      <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
        <div className="stat">
          <div className="stat-title">Area</div>
          <div className="stat-value">
            <CountUp start={0} end={countryData.area} duration={5} separator="," />{' '} km2
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Region</div>
          <div className="stat-value text-primary">{countryData.region}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Capital</div>
          <div className="stat-value text-secondary">{countryData.capital[0]}</div>
        </div>
      </div>  

      <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
        <div className="stat">
          <div className="stat-title">Population</div>
          <div className="stat-value">
            <CountUp start={0} end={countryData.population} duration={5} separator="," />
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Languages</div>
          <div className="stat-value">{Object.values(countryData.languages)[0]}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Currencies</div>
          <div className="stat-value">{Object.values(countryData.currencies)[0].symbol}</div>
          <div className="stat-desc">{Object.values(countryData.currencies)[0].name}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Side</div>
          <div className="stat-value">{countryData.car.side}</div>
          <div className="stat-desc">Car sign: {countryData.car.signs}</div>
        </div>
      </div>
    </section>
  );
}

export default RestCountriesInfos;