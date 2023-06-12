'use client';

import React, { useEffect } from "react";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import StarsCanvas from "@/components/Stars";
import OvniLoader from "@/components/OvniLoader";
import { useAppDispatch, useAppSelector } from "@/GlobalRedux/hooks";
import { setCountryCategory, setCountryData } from "@/GlobalRedux/store/reducers/country";
import { setLoading } from "@/GlobalRedux/store/reducers/home";
import axios from "@/utils/axios";

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
    const prkWidth = useAppSelector((state) => state.home.currentWidth);
    const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  
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
              <OvniLoader />
            )}
          </div>
        </div>
        
        <div className={`p-8 flex flex-col items-center justify-center w-full gap-5 ${isSideBarOpen ? 'float-right' : ''}`} 
        style={isSideBarOpen ? { width: prkWidth } : {}}>
            <img src="https://media2.giphy.com/media/xT9IgmYU3ZVaCjGafm/giphy.gif?cid=ecf05e47sk0rk5clzyz4rveyndjqflz9i3xl8ef25nwna67g&ep=v1_gifs_search&rid=giphy.gif" alt="kim jung un" />
        </div>
  
        <StarsCanvas />
        <Footer />
      </React.Fragment>
    );
  }
  
  export default Country;
  