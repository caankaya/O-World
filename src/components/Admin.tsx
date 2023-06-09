'use client';

import { useAppSelector } from '@/GlobalRedux/hooks';
import { AdminTable } from './AdminComponents/AdminTable';


function Admin() {
  const AdminWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);

  return (
    <div
      className={`p-4 flex flex-col items-center justify-start min-h-screen ${isSideBarOpen ? 'float-right' : ''}`}
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
              <AdminTable  />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Admin;