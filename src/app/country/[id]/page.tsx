'use client';

import axiosInstance from '@/utils/axios';

import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
import {
  setCountryCategory,
  setCountryData,
} from '@/GlobalRedux/store/reducers/country';
import { setLoading } from '@/GlobalRedux/store/reducers/home';

import FullPageLoader from '@/components/Loader';
import Alert from '@/components/Alert';
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
  const loading = useAppSelector((state) => state.home.spinner);
  const alert = useAppSelector((state) => state.user.alert);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/oworld/${params.id}/category`
        );
        dispatch(setCountryCategory(data));
      } catch (error) {
        console.log('Category:', error);
      }
    };

    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get(`/oworld/${params.id}`);
        dispatch(setCountryData(data));
      } catch (error) {
        console.log('Data :', error);
      }
    };

    fetchCategory();
    fetchData();
  }, [params.id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
    }, 3000); // 3 secondes de délai

    return () => clearTimeout(timer); // Efface le timer si le composant est démonté
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <FullPageLoader />
      ) : (
        <>
          {alert && <Alert type={alert.type} message={alert.message} />}
          <RestCountriesInfos countryData={data} />
          <GraphCountry category={category} data={data} />
        </>
      )}
    </>
  );
}

export default Country;
