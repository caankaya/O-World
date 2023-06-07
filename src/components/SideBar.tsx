'use client';
import { useAppSelector } from '@/GlobalRedux/hooks';

interface SideBarProps {
  category: any;
  data: any;
}

function SideBar({ category, data }: SideBarProps) {
  const sideBar = useAppSelector((state) => state.home.sideBar);

  return (
    <div className="SideBar z-[1]">
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full ${
          sideBar && 'sm:translate-x-0'
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          {/*Debut LOGO ET TITRE */}
          <a href="/" className="flex items-center pl-2.5 mb-5">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-6 mr-3 sm:h-7"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              O World
            </span>
          </a>
          {/*Fin LOGO ET TITRE */}

          {/* Debut de catégories pour le monde */}
          {!category && !data && (
            <ul className="space-y-2 font-medium mt-10">
              <li className="mb-10">
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                  WORLD
                </span>
                <a
                  href={`/`}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  World information
                </a>
              </li>
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Categories
              </span>
              <a
                href={`/`}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Country
              </a>
              <a
                href={`/`}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Education
              </a>
              <a
                href={`/`}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Economy
              </a>
              <a
                href={`/`}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Environnement
              </a>
              <a
                href={`/`}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Job
              </a>
              <a
                href={`/`}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Population
              </a>
            </ul>
          )}
          {/*Fin de catégories pour le monde */}

          {/* Debut catégories pour un pays */}
          {data && (
            <ul className="mb-10 mt-10">
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white block mb-5">
                Country
              </span>
              <span className="flex items-center pl-2.5 mb-5">
                <span className="ml-3 whitespace-nowrap mr-5">
                  {data.name.common}
                </span>
                <img
                  src={data.flags.png}
                  className="h-6 mr-3 sm:h-7"
                  alt={data.flags.alt}
                />
              </span>
            </ul>
          )}
          {category && (
            <ul>
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white block mb-5">
                Categories
              </span>
              {Object.entries(category).map(([key]) => (
                <li key={key}>
                  <a
                    href={`/country/${category.country.id}/category/${key}`}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
          {/* Fin de catégories pour un pays */}
        </div>
      </aside>
    </div>
  );
}

export default SideBar;
