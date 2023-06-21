/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../GlobalRedux/hooks';
import {
  accountDeletion,
  accountUpdate,
  handleError,
} from '../GlobalRedux/store/reducers/user';

function UpdateProfile() {
  const dispatch = useAppDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const username = useAppSelector((state) => state.user.username);

  // Set up a useRef to target and reset the form
  const newformRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newFormData = new FormData(event.currentTarget);

    // Check that the password entered by the user and the password confirmation are identical
    const newPassword = newFormData.get('password') as string;
    const confirmNewPassword = newFormData.get('confirm-password') as string;
    if (newPassword !== confirmNewPassword) {
      dispatch(
        handleError(
          'The new password confirmation does not match the new password entered.'
        )
      );
      return;
    }

    // Check that the password entered by the user is secure
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      dispatch(
        handleError(
          'The password does not meet the required criteria: at least 8 characters, one upper case, one lower case and one special character.'
        )
      );
      return;
    }

    // Delete confirmpassword value before saving user info in DB
    newFormData.delete('confirm-password');

    dispatch(accountUpdate(newFormData));

    // Reset form after submission
    if (newformRef.current) {
      newformRef.current.reset();
    }
  };

  const handleClickDeleteAccount = async () => {
    dispatch(accountDeletion());
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  return (
    <form
      ref={newformRef}
      method=""
      className="w-full p-8 bg-base-100 rounded-lg shadow flex flex-col gap-5"
      action="#"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center">
        <div className="avatar pb-5">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="/alien-svgrepo-com.svg" alt="profil" />
          </div>
        </div>
        <h5 className="mb-1 text-xl font-medium text-white ">Hi {username}</h5>
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
              placeholder={username!}
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
              <span className="px-1 mb-2 text-xs text-white">
                (+8 characters: upper case, number and special character)
              </span>
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
        className="w-full text-white border hover:text-xl hover-shadow-neon rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Update account
      </button>
      <p className="text-sm font-light text-white">
        You want to leave the starship?{' '}
        <a
          href="#"
          className="font-medium text-white hover:underline"
          onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
        >
          Delete account
        </a>
      </p>
      {isDeleteModalOpen && (
        <dialog open={isDeleteModalOpen} id="my_modal_2" className="modal">
          <form method="dialog" className="modal-box">
            <div className="p-6 text-center">
              <svg
                aria-hidden="true"
                className="mx-auto mb-4 text-gray-400 w-14 h-14"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500">
                Are you sure you want to delete your account?
              </h3>
              <button
                // TODO Gérer le retour sur la Home Page avec un a et href
                data-modal-hide="popup-modal"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                onClick={handleClickDeleteAccount}
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
              >
                No, cancel
              </button>
            </div>
          </form>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}>
              close
            </button>
          </form>
        </dialog>
      )}
    </form>
  );
}

export default UpdateProfile;
