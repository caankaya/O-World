'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
import { setCountryCategory, setCountryData } from '@/GlobalRedux/store/reducers/country';
import { setLoading } from '@/GlobalRedux/store/reducers/home';

import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import RestCountriesInfos from '@/components/RestCountriesInfos';
import StarsCanvas from '@/components/Stars';
import GraphCountry from '@/components/Country/GraphCountry';

import axiosInstance from '@/utils/axios';
import FullPageLoader from '@/components/Loader';


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
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const containerWidth = useAppSelector((state) => state.home.modalWidth);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/api/oworld/${params.id}/category`
        );
        dispatch(setCountryCategory(data));
      } catch (error) {
        console.log('Category:', error);
      }
    };

    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/oworld/${params.id}`);
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
    <React.Fragment>
      {loading ? (
        <>
          <FullPageLoader />
          <StarsCanvas />
        </>
      ) : (
        <>
          <NavBar />
          <SideBar category={category} data={data} />
          <RestCountriesInfos countryData={data} />
          <GraphCountry category={category} data={data} />
          <StarsCanvas />
          <Footer />
        </>
      )}
    </React.Fragment>
  );
}

export default Country;
