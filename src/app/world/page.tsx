'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
import { setLoading } from '@/GlobalRedux/store/reducers/home';
import { setCountryData } from '@/GlobalRedux/store/reducers/country';
import axiosInstance from '@/utils/axios';

import EarthInfos from '@/components/EarthInfos';

import FullPageLoader from '@/components/Loader';
import Alert from '@/components/Alert';

const World = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.home.spinner);
  const data = useAppSelector((state) => state.country.data);
  const alert = useAppSelector((state) => state.user.alert);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get('/api/oworld', {
          params: {
            useView: false,
          },
        });
        dispatch(setCountryData(data));
      } catch (error) {
        console.error('Error fetching Earth data:', error);
      }
    };
    fetchData();
  }, []);

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
          <EarthInfos earthData={data} />
        </>
      )}
    </>
  );
};

export default World;
