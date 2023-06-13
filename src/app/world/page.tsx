'use client';

import React, { useEffect, useState } from 'react'
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
import FullPageLoader from '@/components/Loader';


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

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000); // 3 secondes de délai

    return () => clearTimeout(timer); // Efface le timer si le composant est démonté
  }, []);

  return (
    <React.Fragment>
      {showLoader ? (
        <>
          <FullPageLoader />
          <StarsCanvas />
        </>
      ) : (
        <>
          <NavBar />
          <SideBar category={undefined} data={undefined} />
          <EarthInfos earthData={data}/>
          <StarsCanvas />
          <Footer />
        </>
      )}
    </React.Fragment>
  );
}

export default World