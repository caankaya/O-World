'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
import {
  setCountryCategory,
  setCountryData,
} from '@/GlobalRedux/store/reducers/country';
import { setLoading } from '@/GlobalRedux/store/reducers/home';
import axiosInstance from '@/utils/axios';

import { Dna } from 'react-loader-spinner';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import RestCountriesInfos from '@/components/RestCountriesInfos';
import StarsCanvas from '@/components/Stars';
import DetailCountry from '@/components/Country/DetailCountry';
import { style } from 'd3';

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
        dispatch(setLoading(false));
      } catch (error) {
        console.log('Category:', error);
      }
    };

    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/oworld/${params.id}`);
        dispatch(setCountryData(data));
        dispatch(setLoading(false));
      } catch (error) {
        console.log('Data :', error);
      }
    };

    fetchCategory();
    fetchData();
  }, [params.id]);

  return (
    <React.Fragment>
      <NavBar />
      <SideBar category={category} data={data} />
      <div className={`Country-${params.id} ml-5`}>
        <div
          className={`Country-${params.id}-container`}
          style={isSideBarOpen ? { width: containerWidth } : {}}
        >
          {loading && (
            <Dna
              visible={loading}
              height="300"
              width="300"
              ariaLabel="dna-loading"
              wrapperStyle={{ margin: '15rem auto' }}
              wrapperClass="dna-wrapper"
            />
          )}
        </div>
      </div>
      {/* <RestCountriesInfos countryData={data} /> */}
      <DetailCountry category={category} data={data} />

      <StarsCanvas />
      <Footer />
    </React.Fragment>
  );
}

export default Country;
