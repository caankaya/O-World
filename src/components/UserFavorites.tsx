'use client';

import { useState } from 'react';

import { CountryFavorites } from '@/@types/countryFavorites';
import { Flags } from '@/@types/flags';
import { useAppSelector } from '@/GlobalRedux/hooks';
import SimpleLoader from './SimpleLoader';

type UserFavoritesProps = {
  favoritesCountries: CountryFavorites[];
  flags: Flags[];
};

function UserFavorites({ favoritesCountries, flags }: UserFavoritesProps) {
  const [displayedCountries, setDisplayedCountries] = useState<number>(8);
  const [isViewAll, setIsViewAll] = useState<boolean>(false);
  const infiniteLoadingInfos = useAppSelector(
    (state) => state.user.infiniteLoading
  );

  if (infiniteLoadingInfos) {
    return <SimpleLoader />;
  }

  const handleViewCountries = () => {
    setIsViewAll(!isViewAll);
    if (!isViewAll) {
      setDisplayedCountries(favoritesCountries.length);
      return;
    }
    setDisplayedCountries(8);
  };

  const findFlagUrl = (flags: any[], cca3: string) => {
    const flagData = flags.find((flag) => flag.cca3 === cca3);
    return flagData ? flagData.flags.png : '';
  };

  return (
    <div className="space-y-4 md:space-y-6 p-8 bg-primary-content/50 rounded-lg shadow w-2/5">
      <div className="flex items-center justify-between mb-4 gap-6">
        <h5 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-primary">
          Latest favorites countries
        </h5>
        {favoritesCountries.length > 0 &&
          (!isViewAll ? (
            <a
              href="#"
              className="text-sm font-medium text-white hover:underline"
              onClick={handleViewCountries}
            >
              View all
            </a>
          ) : (
            <a
              href="#"
              className="text-sm font-medium text-white hover:underline"
              onClick={handleViewCountries}
            >
              View less
            </a>
          ))}
      </div>
      <div className="flow-root">
        {!favoritesCountries.length && (
          <div className="flex-1 min-w-0">
            <p className="font-medium text-white">No favorite countries yet</p>
          </div>
        )}
        <ul role="list" className="divide-y divide-primary">
          {favoritesCountries.slice(0, displayedCountries).map((country) => {
            const flagUrl = findFlagUrl(flags, country.cca3);
            return (
              <li className="py-3 sm:py-4" key={country.cca3}>
                <a href={`/country/${country.cca3}`}>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={flagUrl}
                        alt="Country flag"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white">{country.name}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white">{country.date}</p>
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default UserFavorites;
