'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
import {
  setCountryCategory,
  setCountryData,
} from '@/GlobalRedux/store/reducers/country';
import { setLoading } from '@/GlobalRedux/store/reducers/home';

import axios from 'axios';
import { Dna } from 'react-loader-spinner';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import RestCountriesInfos from '@/components/RestCountriesInfos';
import StarsCanvas from '@/components/Stars';
import DetailCountry from '@/components/Country/DetailCountry';

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

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/oworld/${params.id}/category`
        );
        dispatch(setCountryCategory(data));
        dispatch(setLoading(false));
      } catch (error) {
        console.log('Category:', error);
      }
    };

    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/oworld/${params.id}`
        );
        dispatch(setCountryData(data));
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
        <div className={`Country-${params.id}-container`}>
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
      <DetailCountry />

      <StarsCanvas />
      <Footer />
    </React.Fragment>
  );
}

export default Country;
