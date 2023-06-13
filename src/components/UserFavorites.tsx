'use client';

import { useEffect, useState } from 'react';

import { countryFavorites } from '@/@types/countryFavorites';
import { useAppSelector } from '@/GlobalRedux/hooks';
import axiosInstance from '@/utils/axios';


function UserFavorites() {
  const userId = useAppSelector((state) => state.user.sessionId);

  const [favoritesCountries, setFavoritesCountries] = useState<[]>([]);
  const [flags, setFlags] = useState<[]>([]);
  const [displayedCountries, setDisplayedCountries] = useState<number>(8);
  const [isViewAll, setIsViewAll] = useState<boolean>(false);

  useEffect(() => {
    const fetchFavoritesCountries = async () => {
      try {
        const response = await axiosInstance.get(
          //TODO Dynamisation with userId when log persist
          `/api/user/${userId}`,
          {
            headers: {
              accept: 'application/json',
            },
          }
        );

        // console.log(response.data);

        if (
          response.data[0].favorite_countries.length > 0 &&
          response.data[0].favorite_countries.some(
            (country: (string | null)[]) =>
              country.some((value) => value !== null)
          )
        ) {
          //Transforming the format of data received from the API
          const transformedData = response.data[0].favorite_countries.map(
            (country: [string, string, string]) => {
              const [name, cca3, dateTime] = country;
              const [date, time] = dateTime?.split(' ') ?? ['', ''];

              return {
                name,
                cca3,
                date,
                time,
              };
            }
          );
          setFavoritesCountries(transformedData);
          return;
        }
        setFavoritesCountries([]);
      } catch (error) {
        console.log('Data recovery error', error);
      }
    };
    const fetchFlags = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/oworld/flags`,
          {
            headers: {
              accept: 'application/json',
            },
          }
        );
        // console.log(response.data);
        setFlags(response.data);
      } catch (error) {
        console.log('Data recovery error', error);
      }
    };
    fetchFavoritesCountries();
    fetchFlags();
  }, []);

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
          {favoritesCountries
            .slice(0, displayedCountries)
            .map((country: countryFavorites) => {
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
