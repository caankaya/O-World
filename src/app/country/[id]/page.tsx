'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
import {
  setCountryCategory,
  setCountryData,
} from '@/GlobalRedux/store/reducers/country';

import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import axios from 'axios';

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

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/oworld/${params.id}/category`
        );
        dispatch(setCountryCategory(data));
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
    <div className={`Country-${params.id}`}>
      <NavBar />
      <SideBar category={category} />
      <div
        className={`Country-${params.id}-container`}
        style={isSideBarOpen ? { width: currentWidth, float: 'right' } : {}}
      >
        {data && (
          <React.Fragment key={data.name.common}>
            <h1 className={`Country-${params.id}-title text-center text-5xl`}>
              {data.name.common}
            </h1>
          </React.Fragment>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Country;
