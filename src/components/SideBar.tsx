'use client';

import { useAppSelector } from '@/GlobalRedux/hooks';

function SideBar() {
  const sideBar = useAppSelector((state) => state.home.sideBar);
  const user = useAppSelector((state) => state.user.isLogged);
  const username = useAppSelector((state) => state.user.username);
  const data = useAppSelector((state) => state.country.data);

  return (
    <div className="SideBar z-[1]">
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full 
      ${sideBar && 'sm:translate-x-0'}`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-base-100/50 shadow-xl">
          {/*Debut LOGO ET TITRE */}
          <a href="/" className="mb-5 flex justify-start items-center mr-5">
            <img src="/world.png" className="h-12 mr-5" alt="OWorld Logo" />
            <div className="logo flex flex-col items-start">
              <span className="self-center text-2xl font-semibold whitespace-nowrap mr-2">
                OWorld
              </span>
              <span className="alien-font shadow-neon self-center text-sm font-semibold whitespace-nowrap ml">
                OWorld
              </span>
            </div>
          </a>
          {/*Fin LOGO ET TITRE */}

          {/* Debut de catégories pour le monde */}

          <ul className="space-y-2 font-medium mt-10 mb-10">
            <li className="mb-10">
              <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
                WORLD
              </span>
              <a
                href={`/world`}
                className="flex items-center p-2 text-white font-semibold  hover:border-2 hover:border-primary-focus rounded-lg"
              >
                World information
              </a>
              <a
                href={`/`}
                className="flex items-center p-2 text-white font-semibold  hover:border-2 hover:border-primary-focus rounded-lg"
              >
                Home
              </a>
              <a
                href={`/about`}
                className="flex items-center p-2 text-white font-semibold  hover:border-2 hover:border-primary-focus rounded-lg"
              >
                About
              </a>
            </li>
          </ul>

          {/*Fin de catégories pour le monde */}

          {/* Debut catégories pour un pays */}
          {data && (
            <ul className="mb-10 mt-10">
              <span className="self-center text-xl whitespace-nowrap text-white font-semibolnded-lg block mb-3">
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
          {/* Si Utilisateur est connecté */}
          {user && username && (
            <ul className="mt-5">
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white block">
                Hi{' '}
                {username.charAt(0).toUpperCase() +
                  username.slice(1).toLowerCase()}
              </span>
              <li>
                <a
                  href={`/profile`}
                  className="flex items-center p-2 text-white font-semibold  hover:border-2 hover:border-primary-focus rounded-lg"
                >
                  Profile
                </a>
              </li>
            </ul>
          )}
          {typeof window !== 'undefined' &&
          sessionStorage.userType === 'Admin' ? (
            <ul className="mt-5">
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white block">
                Admin
              </span>
              <li>
                <a
                  href={`/admin`}
                  className="flex items-center p-2 text-white font-semibold  hover:border-2 hover:border-primary-focus rounded-lg"
                >
                  Statistics
                </a>
              </li>
            </ul>
          ) : null}
        </div>
      </aside>
    </div>
  );
}

export default SideBar;
