'use client';

import { useEffect } from 'react';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import axios from 'axios';
import { useAppSelector } from '@/GlobalRedux/hooks';

interface CountryProps {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

function Country({ params }: CountryProps) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/oworld/${params.id}/category`
        );
        return data;
      } catch (error) {
        console.log('Axios :', error);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <div className={`Country-${params.id}`}>
      <NavBar />
      <SideBar />
      <Footer />
    </div>
  );
}

export default Country;
