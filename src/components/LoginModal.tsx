'use client';

import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
import {
  togglerLoginModal,
  changeAuthModals,
} from '@/GlobalRedux/store/reducers/home';

function LoginModal() {
  const dispatch = useAppDispatch();
  const isLoginModalOpen = useAppSelector((state) => state.home.loginModal);

  function toggleLoginModal() {
    dispatch(togglerLoginModal(!isLoginModalOpen));
  }

  function changeAuthModalsinForm() {
    dispatch(changeAuthModals(!isLoginModalOpen));
  }

  return (
    <dialog open={isLoginModalOpen} className="modal">
      <form
        method="dialog"
        className="modal-box space-y-4 md:space-y-6"
        action="#"
      >
        <h1 className="text-xl font-bold leading-tight tracking-tight primary md:text-2xl dark:text-white">
          Sign in to your account
        </h1>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium primary dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium primary  dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="remember"
                className="text-gray-500 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
          </div>
          <a
            href="#"
            className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Forgot password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
        >
          Sign in
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don’t have an account yet?{' '}
          <a
            href="#"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            onClick={changeAuthModalsinForm}
          >
            Sign up
          </a>
        </p>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button onClick={toggleLoginModal}>close</button>
      </form>
    </dialog>
  );
}

export default LoginModal;
