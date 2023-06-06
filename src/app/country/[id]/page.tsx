'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
import { setCountryData } from '@/GlobalRedux/store/reducers/country';

import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import axios from 'axios';

interface CountryProps {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

function Country({ params }: CountryProps) {
  const dispatch = useAppDispatch();
  const countryData = useAppSelector((state) => state.country.data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/oworld/${params.id}/category`
        );
        dispatch(setCountryData(data));
      } catch (error) {
        console.log('Axios:', error);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <div className={`Country-${params.id}`}>
      <NavBar />
      <SideBar countryData={countryData} />
      <Footer />
    </div>
  );
}

export default Country;
