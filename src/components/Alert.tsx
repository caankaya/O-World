/* eslint-disable no-nested-ternary */
import { AlertType } from '../@types/alert';
import { useAppDispatch } from '../GlobalRedux/hooks';
import { clearCountryAlert } from '../GlobalRedux/store/reducers/country';
import { clearFlagsAlert } from '../GlobalRedux/store/reducers/flags';
import { clearGraphAlert } from '../GlobalRedux/store/reducers/graph';
import { clearPlanetAlert } from '../GlobalRedux/store/reducers/planet';
import { clearStatsAlert } from '../GlobalRedux/store/reducers/stats';
import { clearUserAlert } from '../GlobalRedux/store/reducers/user';

function Alert({ type, message }: AlertType) {
  const dispatch = useAppDispatch();

  const handleClickCloseAlert = () => {
    dispatch(clearUserAlert());
    dispatch(clearStatsAlert());
    dispatch(clearPlanetAlert());
    dispatch(clearGraphAlert());
    dispatch(clearFlagsAlert());
    dispatch(clearCountryAlert());
    dispatch(clearCountryAlert());
  };

  return (
    <div className="toast toast-end z-[2] hover:scale-105 transition-transform duration-200">
      <div
        className={`alert ${
          type === 'success'
            ? 'alert-success'
            : type === 'error'
            ? 'alert-error'
            : 'alert-warning'
        }`}
      >
        {' '}
        {type === 'success' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        {type === 'warning' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        )}
        {type === 'error' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        <span className="text-white">{message}</span>
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5  text-white rounded-lg  hover:scale-110 p-1.5  inline-flex h-8 w-8"
          aria-label="Close"
          onClick={handleClickCloseAlert}
        >
          <span className="sr-only">Close</span>
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Alert;
