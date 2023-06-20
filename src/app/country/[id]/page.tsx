'use client';

// React Hooks
import { useEffect } from 'react';
// Redux Hooks
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
// Reducer Actions
import { fetchRestCountries } from '@/GlobalRedux/store/reducers/country';
import { fetchGraph } from '@/GlobalRedux/store/reducers/graph';
import { fetchRadio } from '@/GlobalRedux/store/reducers/infos';

// Components
import RestCountriesInfos from '@/components/RestCountriesInfos';
import GraphCountry from '@/components/Country/GraphCountry';
import SimpleLoader from '@/components/SimpleLoader';
import Infos from '@/components/Infos';
import { useMediaQuery } from 'react-responsive';

import AnimatedText from '@/utils/motion';
import { fetchFavoritesCountries } from '@/GlobalRedux/store/reducers/user';


function Country({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.graph.category);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const Width = useAppSelector((state) => state.home.currentWidth);
  const countryId = params.id;
  const data = useAppSelector((state) => state.country.data);
  const radio = useAppSelector((state) => state.infos.radio);
  const insolite = useAppSelector((state) => state.infos.insolite);
  const celebrity = useAppSelector((state) => state.infos.celebrity);
  const loadingCountry = useAppSelector((state) => state.country.loading);
  const loadingGraph = useAppSelector((state) => state.graph.loading);
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const loadingInfos = useAppSelector((state) => state.infos.loading);
  const favoritesCountries = useAppSelector(
    (state) => state.user.favoritesCountries
  );
  const isLogged = useAppSelector((state) => state.user.isLogged);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchRestCountries({ id: params.id }));
      await dispatch(fetchGraph({ id: params.id }));
      await dispatch(fetchRadio({ id: params.id }));
    };

    fetchData();
    if (isLogged) {
      dispatch(fetchFavoritesCountries());
    }
  }, [dispatch, isLogged, params.id]);

  return (
    <>
      {countryId === 'PRK' ? (
        <div
          className={`p-8 flex flex-col items-center justify-center w-full gap-5`}
          style={
            isSideBarOpen
              ? isLargeScreen
                ? { width: Width, float: 'right' }
                : { width: '100%', float: 'none' }
              : {}
          }
        >
          <img
            src="https://media2.giphy.com/media/xT9IgmYU3ZVaCjGafm/giphy.gif?cid=ecf05e47sk0rk5clzyz4rveyndjqflz9i3xl8ef25nwna67g&ep=v1_gifs_search&rid=giphy.gif"
            alt="kim jung un"
          />
        </div>
      ) : (
        <div
        className={`orbitron-font p-4 flex flex-col items-center justify-center w-full gap-5`}
        style={
          isSideBarOpen
            ? isLargeScreen
              ? { width: Width, float: 'right' }
              : { width: '100%', float: 'none' }
            : {}
        }
        >
          {loadingCountry ? (
            <SimpleLoader />
          ) : (
            <>
              <div id="informations" className="xl:max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-7xl gradient-text font-bold tracking-widest leading-tight">
                  Basic informations
                </h2>
              </div>
              <RestCountriesInfos
                countryData={data}
                countryId={countryId}
                favoritesCountries={favoritesCountries}
              />
            </>
          )}
          {loadingInfos ? (
            <SimpleLoader />
          ) : (
            <>
              <div id="original" className="xl:max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-7xl gradient-text font-bold tracking-widest leading-tight">
                  Original informations
                </h2>
              </div>
              <Infos radio={radio} insolite={insolite} celebrity={celebrity} />
            </>
          )}
          {loadingGraph ? (
            <SimpleLoader />
          ) : (
            <>
              <div id="detailed" className="xl:max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-7xl gradient-text font-bold tracking-widest leading-tight">
                  Detailed analysis
                </h2>
              </div>
              <GraphCountry category={category} data={data} />
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Country;
