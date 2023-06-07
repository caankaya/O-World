'use client';

import { useAppSelector } from '@/GlobalRedux/hooks';

function UserFavorites() {
  const UserFavoritesWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  return (
    <section
      className={`p-4 flex flex-col items-center justify-center ${
        isSideBarOpen ? 'float-right' : ''
      }`}
      style={isSideBarOpen ? { width: UserFavoritesWidth } : {}}
    >
      <div className="space-y-4 md:space-y-6 p-8 bg-primary-content/50 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4 gap-6">
          <h5 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-primary">
            Latest favorites countries
          </h5>
          <a
            href="#"
            className="text-sm font-medium text-white hover:underline"
          >
            View all
          </a>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-primary">
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src=""
                    alt="Country flag"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white">Country name</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white">mm/jj/yyyy</p>
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src=""
                    alt="Country flag"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white">Country name</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white">mm/jj/yyyy</p>
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src=""
                    alt="Country flag"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white">Country name</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white">mm/jj/yyyy</p>
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src=""
                    alt="Country flag"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white">Country name</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white">mm/jj/yyyy</p>
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src=""
                    alt="Country flag"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white">Country name</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white">mm/jj/yyyy</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default UserFavorites;
