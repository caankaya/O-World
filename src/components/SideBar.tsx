'use client';
import { useAppSelector } from '@/GlobalRedux/hooks';

interface SideBarProps {
  category: any;
  data: any;
}

function SideBar({ category, data }: SideBarProps) {
  const sideBar = useAppSelector((state) => state.home.sideBar);
  const user = useAppSelector((state) => state.user.isLogged);
  const pseudo = useAppSelector((state) => state.user.pseudo);

  return (
    <div className="SideBar z-[1]">
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full ${
          sideBar && 'sm:translate-x-0'
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-primary-content/50 shadow-xl">
          {/*Debut LOGO ET TITRE */}
          <a href="/" className="mb-5 flex flex-col justify-start items-center">
            <img
              src="/ooo.png"
              className="h-20 mr-3"
              alt="OWorld Logo"
            />
            <span className="self-center text-4xl font-semibold whitespace-nowrap">
              OWorld
            </span>
            <span className="alien-font shadow-neon self-center text-xl font-semibold whitespace-nowrap">
              OWorld
            </span>
          </a>
          {/*Fin LOGO ET TITRE */}

          {/* Debut de catégories pour le monde */}
          {!category && !data && (
            <ul className="space-y-2 font-medium mt-10 mb-10">
              <li className="mb-10">
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                  WORLD
                </span>
                <a
                  href={`/`}
                  className="flex items-center p-2 text-white font-semibold  hover:border-2 hover:border-primary-focus rounded-lg"
                >
                  World information
                </a>
              </li>
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Categories
              </span>
              <a
                href={`/`}
                className="flex items-center p-2 text-white font-semibold  hover:border-2 hover:border-primary-focus rounded-lg"
              >
                Home
              </a>
              <a
                href={`/`}
                className="flex items-center p-2 text-white font-semibold  hover:border-2 hover:border-primary-focus rounded-lg"
              >
                Country
              </a>
              <a
                href={`/`}
                className="flex items-center p-2 text-white font-semibold  hover:border-2 hover:border-primary-focus rounded-lg"
              >
                Education
              </a>
              <a
                href={`/`}
                className="flex items-center p-2 text-white font-semibold  hover:border-2 hover:border-primary-focus rounded-lg"
              >
                Economy
              </a>
              <a
                href={`/`}
                className="flex items-center p-2 text-white font-semibold  hover:border-2 hover:border-primary-focus rounded-lg"
              >
                Environnement
              </a>
              <a
                href={`/`}
                className="flex items-center p-2 text-white font-semibold  hover:border-2 hover:border-primary-focus rounded-lg"
              >
                Job
              </a>
              <a
                href={`/`}
                className="flex items-center p-2 text-white font-semibold  hover:border-2 hover:border-primary-focus rounded-lg"
              >
                Population
              </a>
            </ul>
          )}
          {/*Fin de catégories pour le monde */}

          {/* Debut catégories pour un pays */}
          {data && (
            <ul className="mb-10 mt-10">
              <span className="self-center text-xl whitespace-nowrap text-white font-semibold  hover:border-2 hover:border-primary-focus rounded-lg block mb-5">
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
              <span className="self-center text-xl whitespace-nowrap text-white font-semibold  hover:border-2 hover:border-primary-focus rounded-lg block mb-5">
                Categories
              </span>
              <li>
                <a
                  href={`/`}
                  className="flex items-center ml-3 p-2 text-white font-semibold  hover:border-2 hover:border-primary-focus rounded-lg"
                >
                  Home
                </a>
              </li>
              {Object.entries(category).map(([key]) => (
                <li key={key}>
                  <a
                    href={`/country/${category.country.id}/category/${key}`}
                    className="flex items-center p-2 text-white font-semibold  hover:border-2 hover:border-primary-focus rounded-lg"
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
          {/* Si Utilisateur est connecté */}
          {user && (
            <ul className="mt-5">
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white block">
                User
              </span>
              <li>
                <a
                  href={`/`}
                  className="flex items-center ml-3 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Profil
                </a>
              </li>
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
}

export default SideBar;
