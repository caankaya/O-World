/* eslint-disable no-nested-ternary */

import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../GlobalRedux/hooks';
import { fetchAdminStatsData } from '../../GlobalRedux/store/reducers/user';
import { fetchFlagsData } from '../../GlobalRedux/store/reducers/flags';

import AdminTable from '../AdminTable';
import SimpleLoader from '../SimpleLoader';

export default function Administrator() {
  const dispatch = useAppDispatch();
  const AdminWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const stats = useAppSelector((state) => state.user.stats);
  const flags = useAppSelector((state) => state.flags.flags);
  const loadingStats = useAppSelector((state) => state.user.loading);
  const loadingFlags = useAppSelector((state) => state.flags.loading);
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const roles = useAppSelector((state) => state.user.roles);

  useEffect(() => {
    if (!isLogged || !roles.includes('Admin')) {
      window.location.href = '/';
    } else {
      const fetchData = async () => {
        await dispatch(fetchAdminStatsData());
        await dispatch(fetchFlagsData());
      };
      fetchData();
    }
  }, [isLogged, roles, dispatch]);

  if (!isLogged || !roles.includes('Admin')) {
    return null;
  }

  return loadingStats || loadingFlags ? (
    <SimpleLoader />
  ) : (
    <div
      className="p-4 flex flex-col items-center justify-start min-h-screen orbitron-font"
      style={
        isSideBarOpen
          ? isLargeScreen
            ? { width: AdminWidth, float: 'right' }
            : { width: '100%', float: 'none' }
          : {}
      }
    >
      <div className="xl:max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-7xl gradient-text font-bold tracking-widest leading-tight">
          Admin statistics
        </h1>
        <p className="mb-10 text-lg md:text-xl text-white font-medium">
          Some information about OWorld users
        </p>
      </div>
      <div className="container px-4 mx-auto w-full">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="pt-4 bg-base-100 shadow rounded">
              <div className="px-6 border-b border-neutral">
                <div className="flex flex-wrap items-center mb-4">
                  <div>
                    <h3 className="text-xl text-white font-bold">
                      Statistics Admin Users
                    </h3>
                    <p className="text-sm text-white font-medium">
                      Users per country
                    </p>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <AdminTable stats={stats} flags={flags} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
