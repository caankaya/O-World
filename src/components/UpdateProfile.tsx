'use client';

import { useAppSelector } from '@/GlobalRedux/hooks';
import axios from '@/utils/axios';

import { useRef } from 'react';

function UpdateProfile() {
  const userId = useAppSelector((state) => state.user.sessionId);

  // Set up a useRef to target and reset the form
  const newformRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newFormData = new FormData(event.currentTarget);

    // Check that the password entered by the user and the password confirmation are identical
    const newPassword = newFormData.get('password') as string;
    const confirmNewPassword = newFormData.get('confirm-password') as string;
    if (newPassword !== confirmNewPassword) {
      //TODO Display a message on the front to warn the user
      console.log(
        'The password confirmation does not match the password entered.'
      );
      return;
    }

    // Check that the password entered by the user is secure
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      //TODO Display a message on the front to warn the user
      console.log(
        'The password does not meet the required criteria: at least 8 characters, one upper case, one lower case and one special character.'
      );
      return;
    }

    // Delete confirmpassword value before saving user info in DB
    newFormData.delete('confirm-password');

    try {
      const response = await axios.put(
        `http://localhost:3000/api/user/${userId}`,
        Object.fromEntries(newFormData)
      );
      console.log(response.data);

      // Reset form after submission
      if (newformRef.current) {
        newformRef.current.reset();
      }
    } catch (error) {
      console.log(
        'The information provided does not allow you to update your account',
        error
      );
    }
  };

  return (
    <form
      ref={newformRef}
      method=""
      className="space-y-4 md:space-y-6 p-8 bg-primary-content/50 rounded-lg shadow flex flex-col gap-5 w-3/5"
      action="#"
      onSubmit={handleSubmit}
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

      <div className="flex justify-between gap-16">
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
              id="updated-username"
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
              id="new-email"
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
              id="new-password"
              placeholder="••••••••"
              className="shadow-sm bg-white border border-white text-neutral sm:text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-focus block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white"
            >
              Confirm new password
            </label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-new-password"
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
  );
}

export default UpdateProfile;
