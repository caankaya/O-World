import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import Admin from '@/components/AdminComponents/Admin';
import SideBar from '@/components/SideBar';
import StarsCanvas from '@/components/Stars';
import React, { useEffect } from 'react';
import FullPageLoader from '@/components/Loader';
import { setLoading } from '@/GlobalRedux/store/reducers/home';
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';

export default function Page() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.home.spinner);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
    }, 3000); // 3 secondes de délai

    return () => clearTimeout(timer); // Efface le timer si le composant est démonté
  }, [dispatch]);

  return (
    <React.Fragment>
      {loading ? (
        <>
          <FullPageLoader />
          <StarsCanvas />
        </>
      ) : (
        <>
          <NavBar />
          <SideBar category={undefined} data={undefined} />
          <Admin />
          <StarsCanvas />
          <Footer />
        </>
      )}
    </React.Fragment>
  );
}