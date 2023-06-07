'use client';

import { useAppSelector } from '@/GlobalRedux/hooks';

function ProfilCard() {
  const profilWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  return (
    <section
      className={`p-4 flex flex-col items-center justify-center ${
        isSideBarOpen ? 'float-right' : ''
      }`}
      style={isSideBarOpen ? { width: profilWidth } : {}}
    >
      <form
        method=""
        className="space-y-4 md:space-y-6 p-8 bg-primary-content/50 rounded-lg shadow flex flex-col gap-5"
        action="#"
      >
        <div className="flex flex-col items-center">
          <div className="avatar pb-5">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="/alien-svgrepo-com.svg" alt="profil-picture" />
            </div>
          </div>
          <h5 className="mb-1 text-xl font-medium text-white ">Username</h5>
        </div>
        <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-primary">
          Update your information
        </h1>

        <div className="flex gap-16">
          <div className="flex flex-col gap-8">
            <div>
              <label
                htmlFor="text"
                className="block mb-2 text-sm font-medium text-white"
              >
                New username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="shadow-sm bg-white border border-white text-neutral sm:text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-focus block w-full p-2.5"
                placeholder="username"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                New email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="shadow-sm bg-white border border-white text-neutral sm:text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-focus block w-full p-2.5"
                placeholder="name@company.com"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white"
              >
                New password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="shadow-sm bg-white border border-white text-neutral sm:text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-focus block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-white"
              >
                Confirm new password
              </label>
              <input
                type="confirm-password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                className="shadow-sm bg-white border border-white text-neutral sm:text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-focus block w-full p-2.5"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full text-white bg-primary hover:bg-primary-focus focus:ring-4 focus:outline-none focus:ring-primary-focus font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Update account
        </button>
        <p className="text-sm font-light text-white">
          You want to leave the starship?{' '}
          <a href="#" className="font-medium text-white hover:underline">
            Delete account
          </a>
        </p>
      </form>
    </section>
  );
}

export default ProfilCard;
