'use client';

import axios from 'axios';

import { useEffect, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
import {
  togglerRegisterModal,
  changeAuthModals,
} from '@/GlobalRedux/store/reducers/home';
import { CountryIdentity } from '@/@types/countryIdentity';

function RegisterModal() {
  const RegisterModalWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const isRegisterModalOpen = useAppSelector(
    (state) => state.home.registerModal
  );

  const dispatch = useAppDispatch();

  function toggleRegisterModal() {
    dispatch(togglerRegisterModal(!isRegisterModalOpen));
  }

  function changeAuthModalsinForm() {
    dispatch(changeAuthModals(!isRegisterModalOpen));
  }

  // Retrieve the list of countries via API to dynamize the register form select
  const [countries, setCountries] = useState<CountryIdentity[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/oworld', {
          params: {
            useView: true,
          },
          headers: {
            accept: 'application/json',
          },
        });
        setCountries(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log('Data recovery error', error);
      }
    };
    fetchCountries();
  }, []);

  // Set up a useRef to target and reset the form
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const registerFormData = new FormData(event.currentTarget);

    // Check that the password entered by the user and the password confirmation are identical
    const password = registerFormData.get('password') as string;
    const confirmPassword = registerFormData.get('confirm-password') as string;
    if (password !== confirmPassword) {
      //TODO Display a message on the front to warn the user
      console.log(
        'The password confirmation does not match the password entered.'
      );
      return;
    }

    // Check that the password entered by the user is secure
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{12,}$/;
    if (!passwordRegex.test(password)) {
      //TODO Display a message on the front to warn the user
      console.log(
        'The password does not meet the required criteria: at least 12 characters, one upper case, one lower case and one special character.'
      );
      return;
    }

    // Delete confirmpassword value before saving user info in DB
    registerFormData.delete('confirm-password');

    try {
      const response = await axios.post(
        'http://localhost:3000/api/user',
        Object.fromEntries(registerFormData)
      );
      console.log(response.data);

      // Reset form after submission
      if (formRef.current) {
        formRef.current.reset();
      }

      //Close the modal
      toggleRegisterModal();
    } catch (error) {
      console.log(
        'The information provided does not allow you to create an account',
        error
      );
    }
  };

  // Reset form when closing modal before submission
  const handleCloseModal = () => {
    toggleRegisterModal();
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <dialog
      open={isRegisterModalOpen}
      className={`modal z-[1] ${isSideBarOpen ? 'float-right' : ''}`}
      style={isSideBarOpen ? { width: RegisterModalWidth } : {}}
    >
      <form
        ref={formRef}
        method="dialog"
        className="modal-box space-y-4 md:space-y-6 bg-primary-content/50"
        action="#"
        onSubmit={handleSubmit}
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
            htmlFor="country_"
            className="block mb-2 text-sm font-medium text-white"
          >
            Country
          </label>
          <select
            id="countries"
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
              (+12 characters: upper case, number and special character)
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
            htmlFor="confirm-password"
            className="block mb-2 text-sm font-medium text-white"
          >
            Confirm password
          </label>
          <input
            type="password"
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
        <button onClick={handleCloseModal}>close</button>
      </form>
    </dialog>
  );
}

export default RegisterModal;
