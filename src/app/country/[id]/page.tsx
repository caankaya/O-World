'use client';

import axiosInstance from '@/utils/axios';

import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
import { fetchCountryData } from '@/GlobalRedux/store/reducers/country';
import { setLoading } from '@/GlobalRedux/store/reducers/home';

import FullPageLoader from '@/components/Loader';
import RestCountriesInfos from '@/components/RestCountriesInfos';
import GraphCountry from '@/components/Country/GraphCountry';

//TODO Typer les interface dans le dossier types
interface CountryProps {
  params: {
    id: string;
  };
}

function Country({ params }: CountryProps) {
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.country.category);
  const data = useAppSelector((state) => state.country.data);
  const loading = useAppSelector((state) => state.country.loading);
  const alert = useAppSelector((state) => state.user.alert);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const prkWidth = useAppSelector((state) => state.home.currentWidth);
  const countryId = params.id;

  useEffect(() => {
    dispatch(fetchCountryData({ id: params.id }));

    const timer = setTimeout(() => {
      dispatch(setLoading(false));
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch, params.id]);



  return (
    <>
      {loading ? (
        <FullPageLoader />
      ) : (
        <>
          {countryId === 'PRK' ? (
            <>
              <div
                className={`p-8 flex flex-col items-center justify-center w-full gap-5`}
                style={isSideBarOpen ? { width: prkWidth } : {}}
              >
                <img
                  src="https://media2.giphy.com/media/xT9IgmYU3ZVaCjGafm/giphy.gif?cid=ecf05e47sk0rk5clzyz4rveyndjqflz9i3xl8ef25nwna67g&ep=v1_gifs_search&rid=giphy.gif"
                  alt="kim jung un"
                />
              </div>
            </>
          ) : (
            <>
              <RestCountriesInfos countryData={data} />
              <GraphCountry category={category} data={data} />
            </>
          )}
        </>
      )}
    </>
  );
}

export default Country;
