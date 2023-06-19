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
// Components
import RestCountriesInfos from '@/components/RestCountriesInfos';
import GraphCountry from '@/components/Country/GraphCountry';
import SimpleLoader from '@/components/SimpleLoader';
import Infos from '@/components/Infos';
import AnimatedText from '@/utils/motion';

function Country({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch();

  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const prkWidth = useAppSelector((state) => state.home.currentWidth);
  const countryId = params.id;

  const category = useAppSelector((state) => state.graph.category);
  const data = useAppSelector((state) => state.country.data);
  const radio = useAppSelector((state) => state.infos.radio);
  const insolite = useAppSelector((state) => state.infos.insolite);
  const celebrity = useAppSelector((state) => state.infos.celebrity);

  const loadingCountry = useAppSelector((state) => state.country.loading);
  const loadingGraph = useAppSelector((state) => state.graph.loading);
  const loadingInfos = useAppSelector((state) => state.infos.loading);
  
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchRestCountries({ id: params.id }));
      await dispatch(fetchGraph({ id: params.id }));
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
      {loadingCountry ? (
        <SimpleLoader />
      ) : (
        <>
          <div className="xl:max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl text-white font-bold tracking-tighter leading-tight">
              Basic information
            </h1>
            <AnimatedText text="TEAM" />
            <p className="text-lg md:text-xl text-white font-medium">
              Some information about this alien country
            </p>
          </div>
          <RestCountriesInfos countryData={data} />
        </>
      )}
      {loadingInfos ? (
        <SimpleLoader />
      ) : (
        <>
          <div className="xl:max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl text-white font-bold tracking-tighter leading-tight">
              Original information
            </h1>
            <AnimatedText text="TEAM" />
            <p className="text-lg md:text-xl text-white font-medium">
              Some complex information about this alien country
            </p>
          </div>
          <Infos radio={radio} insolite={insolite} celebrity={celebrity} />
        </>
      )}
      {loadingGraph ? (
        <SimpleLoader />
      ) : (
        <>
          <div className="xl:max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl text-white font-bold tracking-tighter leading-tight">
              Detailed analysis
            </h1>
            <AnimatedText text="TEAM" />
            <p className="text-lg md:text-xl text-white font-medium">
              A few figures on this alien country
            </p>
          </div>
          <GraphCountry category={category} data={data} />
        </>
      )}
    </>
  );
}

export default Country;
