'use client';

import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
import {
  togglerRegisterModal,
  changeAuthModals,
} from '@/GlobalRedux/store/reducers/home';

function RegisterModal() {
  const RegisterModalWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);

  const dispatch = useAppDispatch();
  const isRegisterModalOpen = useAppSelector(
    (state) => state.home.registerModal
  );

  function toggleRegisterModal() {
    dispatch(togglerRegisterModal(!isRegisterModalOpen));
  }

  function changeAuthModalsinForm() {
    dispatch(changeAuthModals(!isRegisterModalOpen));
  }

  return (
    <div
      className={`p-4 flex items-center justify-center gap-16 ${
        isSideBarOpen ? 'float-right' : ''
      }`}
      style={isSideBarOpen ? { width: RegisterModalWidth } : {}}
    >
      <dialog open={isRegisterModalOpen} className="modal z-[1]">
        <form
          method="dialog"
          className="modal-box space-y-4 md:space-y-6 bg-primary-content/50"
          action="#"
        >
          <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-primary">
            Create and account
          </h1>
          <div>
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-white"
            >
              Username
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
              Email
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
          <div>
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-white"
            >
              Country
            </label>
            <select
              id="countries"
              className="shadow-sm bg-white border border-white text-neutral sm:text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-focus block w-full p-2.5"
            >
              <option selected>Choose countries</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="date"
              className="block mb-2 text-sm font-medium text-white"
            >
              Birth date
            </label>
            <input
              type="date"
              id="date"
              className="shadow-sm bg-white border border-white text-neutral sm:text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-focus block w-full p-2.5"
              defaultValue=""
              min="1920-01-01"
              max=""
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white"
            >
              Password
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
              Confirm password
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
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                aria-describedby="terms"
                type="checkbox"
                className="w-4 h-4 border border-white rounded bg-white"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-light text-white">
                I accept the{' '}
                <a
                  className="text-sm font-medium text-white hover:underline"
                  href="#"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary hover:bg-primary-focus focus:ring-4 focus:outline-none focus:ring-primary-focus font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Create an account
          </button>
          <p className="text-sm font-light text-white">
            Already have an account?{' '}
            <a
              href="#"
              className="font-medium text-white hover:underline"
              onClick={changeAuthModalsinForm}
            >
              Login here
            </a>
          </p>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button onClick={toggleRegisterModal}>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default RegisterModal;
