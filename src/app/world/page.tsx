'use client';

import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
import { setLoading } from '@/GlobalRedux/store/reducers/home';
import { setCountryData } from '@/GlobalRedux/store/reducers/country';
import axios from '@/utils/axios';

import EarthInfos from '@/components/EarthInfos';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import StarsCanvas from '@/components/Stars';
import OvniLoader from "@/components/OvniLoader";


const World = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.home.spinner);
  const data = useAppSelector((state) => state.country.data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/oworld', {
          params: {
            useView: false,
          },
        });
        dispatch(setCountryData(data));
        dispatch(setLoading(false));
      } catch (error) {
        console.error("Error fetching Earth data:", error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <NavBar />
      <SideBar />
      {loading && (
        <OvniLoader />
      )}
      <EarthInfos earthData={data}/>
      <StarsCanvas />
      <Footer />
    </React.Fragment>
  );
}

export default World