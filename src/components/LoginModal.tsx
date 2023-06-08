'use client';

import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
import {
  togglerLoginModal,
  changeAuthModals,
} from '@/GlobalRedux/store/reducers/home';
import { login } from '@/GlobalRedux/store/reducers/user';

function LoginModal() {
  const dispatch = useAppDispatch();
  const isLoginModalOpen = useAppSelector((state) => state.home.loginModal);
  const pseudo = useAppSelector((state) => state.user.pseudo);

  function toggleLoginModal() {
    dispatch(togglerLoginModal(!isLoginModalOpen));
  }

  function changeAuthModalsinForm() {
    dispatch(changeAuthModals(!isLoginModalOpen));
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formInput = new FormData(form);
    console.log('formInput :', formInput);
    dispatch(login(formInput));
  };

  return (
    <dialog open={isLoginModalOpen} className="modal z-[1]">
      <form
        method="post"
        className="modal-box space-y-4 md:space-y-6 bg-primary-content/50"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-primary">
          Sign in to your account
        </h1>
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
              <label htmlFor="remember" className="text-white">
                Remember me
              </label>
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
          className="w-full text-white bg-primary hover:bg-primary-focus focus:ring-4 focus:outline-none focus:ring-primary-focus font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Sign in
        </button>
        <p className="text-sm font-light text-white">
          Don’t have an account yet?{' '}
          <a
            href="#"
            className="font-medium text-white hover:underline"
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
