/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../GlobalRedux/hooks';
import {
  togglerRegisterModal,
  togglerLoginModal,
} from '../GlobalRedux/store/reducers/home';
import { CountryIdentity } from '../@types/countryIdentity';
import { handleError, register } from '../GlobalRedux/store/reducers/user';
import axiosInstance from '../utils/axios';

function RegisterModal() {
  const RegisterModalWidth = useAppSelector((state) => state.home.modalWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const isLoginModalOpen = useAppSelector((state) => state.home.loginModal);
  const isRegisterModalOpen = useAppSelector(
    (state) => state.home.registerModal
  );
  const [countries, setCountries] = useState<CountryIdentity[]>([]);

  const dispatch = useAppDispatch();

  function toggleRegisterModal() {
    dispatch(togglerRegisterModal(isRegisterModalOpen));
  }

  function toggleLoginModal() {
    dispatch(togglerLoginModal(isLoginModalOpen));
  }

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axiosInstance.get('/oworld/list', {
          params: {
            useView: true,
          },
          headers: {
            accept: 'application/json',
          },
        });
        setCountries(response.data);
      } catch (error) {
        console.log('Data recovery error', error);
      }
    };
    fetchCountries();
  }, []);

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const registerFormData = new FormData(event.currentTarget);

    const email = registerFormData.get('email') as string;
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      dispatch(handleError('Invalid e-mail address format.'));
      return;
    }

    const password = registerFormData.get('password') as string;
    const confirmPassword = registerFormData.get('confirm-password') as string;
    if (password !== confirmPassword) {
      dispatch(
        handleError(
          'The password confirmation does not match the password entered.'
        )
      );
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    if (!passwordRegex.test(password)) {
      dispatch(
        handleError(
          'The password does not meet the required criteria: at least 8 characters, one uppercase, one lowercase, and one special character.'
        )
      );
      return;
    }

    registerFormData.delete('confirm-password');

    dispatch(register(registerFormData));

    if (formRef.current) {
      formRef.current.reset();
    }
    toggleRegisterModal();
  };

  const handleCloseModal = () => {
    toggleRegisterModal();
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <>
      {isRegisterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-0" />
      )}
      <dialog
        className="modal z-[1]"
        open={isRegisterModalOpen}
        style={
          isSideBarOpen ? { width: RegisterModalWidth, float: 'right' } : {}
        }
      >
        <form
          ref={formRef}
          method="dialog"
          className="orbitron-font modal-box space-y-4 md:space-y-6 bg-base-100/80"
          action="#"
          onSubmit={handleSubmit}
        >
          <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-primary">
            Create an account
          </h1>
          <div>
            <label
              htmlFor="register-username"
              className="block mb-2 text-sm font-medium text-white"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="register-username"
              className="shadow-sm bg-white border border-white text-neutral sm:text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-focus block w-full p-2.5"
              placeholder="username"
              required
            />
          </div>
          <div>
            <label
              htmlFor="register-email"
              className="block mb-2 text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="register-email"
              className="shadow-sm bg-white border border-white text-neutral sm:text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-focus block w-full p-2.5"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="country-origin"
              className="block mb-2 text-sm font-medium text-white"
            >
              Country
            </label>
            <select
              id="country-origin"
              name="country_origin"
              className="shadow-sm bg-white border border-white text-neutral sm:text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-focus block w-full p-2.5"
              required
              defaultValue=""
            >
              <option disabled value="">
                Choose countries
              </option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
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
              name="birth_date"
              className="shadow-sm bg-white border border-white text-neutral sm:text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-focus block w-full p-2.5"
              defaultValue=""
              min="1920-01-01"
              max=""
              required
            />
          </div>
          <div>
            <label
              htmlFor="register-password"
              className="block mb-2 text-sm font-medium text-white"
            >
              Password
              <span className="px-1 mb-2 text-xs text-white">
                (+8 characters: uppercase, number, and special character)
              </span>
            </label>
            <input
              type="password"
              name="password"
              id="register-password"
              placeholder="••••••••"
              className="shadow-sm bg-white border border-white text-neutral sm:text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-focus block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirm-register_password"
              className="block mb-2 text-sm font-medium text-white"
            >
              Confirm password
            </label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-register-password"
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
            className="w-full text-white border hover:text-xl hover-shadow-neon rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Create an account
          </button>
          <p className="text-sm font-light text-white">
            Already have an account?{' '}
            <a
              href="#"
              className="font-medium text-white hover:underline"
              onClick={() => {
                dispatch(togglerRegisterModal(!!isRegisterModalOpen));
                toggleLoginModal();
              }}
            >
              Login here
            </a>
          </p>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button type="button" onClick={handleCloseModal}>
            close
          </button>
        </form>
      </dialog>
    </>
  );
}

export default RegisterModal;
