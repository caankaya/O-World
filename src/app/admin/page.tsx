'use client';

// React Hooks
import { useEffect } from 'react';
// Redux Hooks
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
// Reducer Action
import { fetchAdminStatsData } from '@/GlobalRedux/store/reducers/stats';
import { fetchFlagsData } from '@/GlobalRedux/store/reducers/flags';
// Component
import { AdminTable } from '@/components/AdminComponents/AdminTable';
import SimpleLoader from '@/components/SimpleLoader';
import { useMediaQuery } from 'react-responsive';

export default function Page() {
  const dispatch = useAppDispatch();
  const AdminWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const stats = useAppSelector((state) => state.stats.stats);
  const flags = useAppSelector((state) => state.flags.flags);
  const loadingStats = useAppSelector((state) => state.stats.loading);
  const loadingFlags = useAppSelector((state) => state.flags.loading);
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAdminStatsData());
      await dispatch(fetchFlagsData());
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      {loadingStats || loadingFlags ? (
        <SimpleLoader />
      ) : (
        <>
          <div
            className="p-4 flex flex-col items-center justify-start min-h-screen"
            style={
              isSideBarOpen
                ? isLargeScreen
                  ? { width: AdminWidth, float: 'right' }
                  : { width: '100%', float: 'none' }
              : {}
            }
          >
            <div className="container px-4 mx-auto w-full">
              <div className="flex flex-wrap -mx-4">
                <div className="w-full px-4">
                  <div className="pt-4 bg-neutral-content shadow rounded">
                    <div className="px-6 border-b border-neutral">
                      <div className="flex flex-wrap items-center mb-4">
                        <div>
                          <h3 className="text-xl text-base-100 font-bold">
                            Statistics Admin Users
                          </h3>
                          <p className="text-sm text-base-100 font-medium">
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
        </>
      )}
    </>
  );
}
