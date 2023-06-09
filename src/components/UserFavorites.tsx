'use client';
import axios from '@/utils/axios';

import { useAppSelector } from '@/GlobalRedux/hooks';
import { useEffect, useState } from 'react';

function UserFavorites() {
  const userId = useAppSelector((state) => state.user.id);

  const [favoritesCountries, setFavoritesCountries] = useState<[]>([]);
  const [flags, setFlags] = useState<[]>([]);
  const [displayedCountries, setDisplayedCountries] = useState<number>(8);
  const [isViewAll, setIsViewAll] = useState<boolean>(false);

  useEffect(() => {
    const fetchFavoritesCountries = async () => {
      try {
        const response = await axios.get(
          //TODO Dynamisation with userId when log persist
          `http://localhost:3000/api/user/10`,
          {
            headers: {
              accept: 'application/json',
            },
          }
        );
        // console.log(response.data[0].favorite_countries);
        setFavoritesCountries(response.data[0].favorite_countries);
        // console.log(response.data);
      } catch (error) {
        console.log('Data recovery error', error);
      }
    };
    const fetchFlags = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/oworld/flags`,
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

  console.log(favoritesCountries);
  console.log(flags);

  const handleViewCountries = () => {
    setIsViewAll(!isViewAll);
    if (!isViewAll) {
      setDisplayedCountries(favoritesCountries.length);
      return;
    }
    setDisplayedCountries(8);
  };

  return (
    <div className="space-y-4 md:space-y-6 p-8 bg-primary-content/50 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4 gap-6">
        <h5 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-primary">
          Latest favorites countries
        </h5>
        {!isViewAll && (
          <a
            href="#"
            className="text-sm font-medium text-white hover:underline"
            onClick={handleViewCountries}
          >
            View all
          </a>
        )}
        {isViewAll && (
          <a
            href="#"
            className="text-sm font-medium text-white hover:underline"
            onClick={handleViewCountries}
          >
            View less
          </a>
        )}
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-primary">
          {favoritesCountries.slice(0, displayedCountries).map((country) => {
            return (
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="w-8 h-8 rounded-full"
                      src=""
                      alt="Country flag"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white">{country}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white">mm/jj/yyyy</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default UserFavorites;
