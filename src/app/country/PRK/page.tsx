'use client';

import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
import { setLoading } from '@/GlobalRedux/store/reducers/home';

import FullPageLoader from '@/components/Loader';
import Alert from '@/components/Alert';

//TODO Typer les interface dans le dossier types
interface CountryProps {
  params: {
    id: string;
  };
}

function Country({ params }: CountryProps) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.home.spinner);
  const prkWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const alert = useAppSelector((state) => state.user.alert);

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
          <div
            className={`p-8 flex flex-col items-center justify-center w-full gap-5 ${
              isSideBarOpen ? 'float-right' : ''
            }`}
            style={isSideBarOpen ? { width: prkWidth } : {}}
          >
            <img
              src="https://media2.giphy.com/media/xT9IgmYU3ZVaCjGafm/giphy.gif?cid=ecf05e47sk0rk5clzyz4rveyndjqflz9i3xl8ef25nwna67g&ep=v1_gifs_search&rid=giphy.gif"
              alt="kim jung un"
            />
          </div>
        </>
      )}
    </>
  );
}
export default Country;
