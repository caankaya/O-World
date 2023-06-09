'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
import {
  setCountryCategory,
  setCountryData,
} from '@/GlobalRedux/store/reducers/country';

import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import axios from 'axios';
import { RingLoader } from 'react-spinners';
import { setLoading } from '@/GlobalRedux/store/reducers/home';

interface CountryProps {
  params: {
    id: string;
  };
}

function Country({ params }: CountryProps) {
  const dispatch = useAppDispatch();
  const currentWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const category = useAppSelector((state) => state.country.category);
  const data = useAppSelector((state) => state.country.data);
  const loading = useAppSelector((state) => state.home.spinner);
  const override = useAppSelector((state) => state.home.override);

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
        <div
          className={`Country-${params.id}-container`}
          style={isSideBarOpen ? { width: currentWidth, float: 'right' } : {}}
        >
          {loading && (
            <RingLoader
              color={'#3abff8'}
              loading={loading}
              cssOverride={override}
              size={150}
              aria-label="Ring Loader"
              data-testid="Loader"
            />
          )}
          {data && (
            <React.Fragment key={data.name.common}>
              <h1
                className={`Country-${params.id}-title text-4xl font-bold mb-1 text-primary`}
              >
                {data.name.common}
              </h1>
              <div className="card w-96 bg-base-100 shadow-xl">
                <figure>
                  <img src={data.flags.svg} alt={data.flags.alt} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{data.name.official}</h2>
                  <p>Region : {data.region}</p>
                  <p>Subregion : {data.subregion}</p>
                  <p>Area : {data.area} km²</p>
                  <p>Population : {data.population}</p>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Country;
