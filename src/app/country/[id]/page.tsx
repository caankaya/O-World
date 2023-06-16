'use client';

// React Hooks
import { useEffect } from 'react';
// Redux Hooks
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
// Reducer Actions
import { fetchRestCountries } from '@/GlobalRedux/store/reducers/country';
import { fetchGraph } from '@/GlobalRedux/store/reducers/graph';

import { fetchRadio } from '@/GlobalRedux/store/reducers/infos';

// Reducer Actions
import { setLoading } from '@/GlobalRedux/store/reducers/home';
import { fetchCountryData } from '@/GlobalRedux/store/reducers/country';
import {
  setCountryCategory,
  setCountryData,
} from '@/GlobalRedux/store/reducers/country';

// Components
import RestCountriesInfos from '@/components/RestCountriesInfos';
import GraphCountry from '@/components/Country/GraphCountry';
import SimpleLoader from '@/components/SimpleLoader';
import Infos from '@/components/Infos';


//TODO Typer les interface dans le dossier types
interface CountryProps {
  params: {
    id: string;
  };
}

function Country({ params }: CountryProps) {
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.graph.category);
  const data = useAppSelector((state) => state.country.data);

  const infos = useAppSelector((state) => state.infos);

  const loading = useAppSelector((state) => state.country.loading);

  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const prkWidth = useAppSelector((state) => state.home.currentWidth);
  const countryId = params.id;
  const loadingCountry = useAppSelector((state) => state.country.loading);
  const loadingGraph = useAppSelector((state) => state.graph.loading);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchRestCountries({ id: params.id }));
      await dispatch(fetchGraph({ id: params.id }));
      // Troisième requête
      await dispatch(fetchRadio({ id: params.id }));
    };

    fetchData();
  }, [dispatch, params.id]);

  return countryId === 'PRK' ? (
    <div
      className={`p-8 flex flex-col items-center justify-center w-full gap-5`}
      style={isSideBarOpen ? { width: prkWidth } : {}}
    >
      <img
        src="https://media2.giphy.com/media/xT9IgmYU3ZVaCjGafm/giphy.gif?cid=ecf05e47sk0rk5clzyz4rveyndjqflz9i3xl8ef25nwna67g&ep=v1_gifs_search&rid=giphy.gif"
        alt="kim jung un"
      />
    </div>
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
          <Infos infos={infos} />
          <GraphCountry category={category} data={data} />
          
        </>
      )}
    </>
  );
}

export default Country;
