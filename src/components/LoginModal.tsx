/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */

import { useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useAppDispatch, useAppSelector } from '../GlobalRedux/hooks';
import {
  togglerLoginModal,
  togglerRegisterModal,
} from '../GlobalRedux/store/reducers/home';
import { login } from '../GlobalRedux/store/reducers/user';

function LoginModal() {
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const isLoginModalOpen = useAppSelector((state) => state.home.loginModal);
  const loginModalWidth = useAppSelector((state) => state.home.modalWidth);
  const isRegisterModalOpen = useAppSelector(
    (state) => state.home.registerModal
  );
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });

  const dispatch = useAppDispatch();

  function toggleRegisterModal() {
    dispatch(togglerRegisterModal(isRegisterModalOpen));
  }
  function toggleLoginModal() {
    dispatch(togglerLoginModal(isLoginModalOpen));
  }

  // Set up a useRef to target and reset the form
  const formRef = useRef<HTMLFormElement | null>(null);

  // Soumission du formulaire de connexion
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    dispatch(login(formData));
  };

  // Reset form when closing modal before submission
  const handleCloseModal = () => {
    toggleLoginModal();
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <>
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-0" />
      )}
      <dialog
        className="modal z-[1]"
        open={isLoginModalOpen}
        style={
          isSideBarOpen
            ? isLargeScreen
              ? { width: loginModalWidth, float: 'right' }
              : { width: '100%', float: 'none' }
            : {}
        }
      >
        <form
          ref={formRef}
          method="post"
          className="orbitron-font modal-box space-y-4 md:space-y-6 bg-base-100/80"
          onSubmit={handleSubmit}
        >
          <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-primary">
            Sign in to your account
          </h1>
          <div>
            <label
              htmlFor="username"
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
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-white rounded bg-white"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-white">Remember me</span>
              </div>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-white hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full text-white font-semibold border hover:text-xl hover-shadow-neon rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Sign in
          </button>
          <p className="text-sm font-light text-white">
            Don’t have an account yet?{' '}
            <a
              href="#"
              className="font-medium text-white hover:underline"
              onClick={() => {
                dispatch(togglerLoginModal(!!isLoginModalOpen));
                dispatch(togglerRegisterModal(isRegisterModalOpen));
              }}
            >
              Sign up
            </a>
          </p>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleCloseModal}>close</button>
        </form>
      </dialog>
    </>
  );
}

export default LoginModal;
