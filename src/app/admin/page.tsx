'use client';

// React Hooks
import { useEffect } from 'react';
// Redux Hooks
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
// Reducer Action
import { setLoading } from '@/GlobalRedux/store/reducers/home';
import { fetchAdminStatsData } from '@/GlobalRedux/store/reducers/stats';
import { fetchFlagsData } from '@/GlobalRedux/store/reducers/flags';
// Component
import FullPageLoader from '@/components/Loader';
import Alert from '@/components/Alert';
import { AdminTable } from '@/components/AdminComponents/AdminTable';

export default function Page() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.home.spinner);
  const alert = useAppSelector((state) => state.stats.alert);
  const AdminWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const stats = useAppSelector((state) => state.stats.stats);
  const flags = useAppSelector((state) => state.flags.flags);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAdminStatsData());
      await dispatch(fetchFlagsData());
    };

    fetchData();
  }, [dispatch]);

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
          {alert && (
            <div className="px-4 mx-auto w-full">
              <Alert type={alert.type} message={alert.message} />
            </div>
          )}
          <div
            className={`p-4 flex flex-col items-center justify-start min-h-screen 
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
