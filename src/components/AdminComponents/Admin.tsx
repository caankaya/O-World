'use client';

import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
import { AdminTable } from './AdminTable';
import { useEffect } from 'react';
import { fetchStatsData } from '@/GlobalRedux/store/reducers/stats';


function Admin() {
  const dispatch = useAppDispatch();
  const AdminWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const statsData = useAppSelector((state) => state.stats);

  useEffect(() => {
    const fetchData = async () => {
    await dispatch(fetchStatsData({ url: '/admin/stat', params: { useView: true } }));
    await dispatch(fetchStatsData({ url: '/oworld/flags', params: {} }));
  };
  
  fetchData();
}, [dispatch]);

  return (
    <div className={`p-4 flex flex-col items-center justify-start min-h-screen 
    ${isSideBarOpen ? 'float-right' : ''}`}
    style={isSideBarOpen ? { width: AdminWidth } : {}}
    >
    <div className="container px-4 mx-auto w-full">
      <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="pt-4 bg-neutral-content shadow rounded">
            <div className="px-6 border-b border-neutral">
                <div className="flex flex-wrap items-center mb-4">
                <div>
                    <h3 className="text-xl text-base-100 font-bold">Statistics Admin Users</h3>
                    <p className="text-sm text-base-100 font-medium">Users per country</p>
                </div>
                </div>
            </div>
            <div className="overflow-x-auto">
              <AdminTable statsData={statsData}  />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Admin;