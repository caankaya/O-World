import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import store from './GlobalRedux/store';

/**
 * Creates a root container for the React application.
 * This root container is created using ReactDOM's createRoot method,
 * which initializes a concurrent React root on a DOM element (in this case, an element with the ID 'root').
 * This concurrent root allows for concurrent rendering features in React.
 *
 * The React application is wrapped with a Redux Provider, which allows child components
 * to have access to the global Redux store.
 */
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

/**
 * Renders the React application into the DOM.
 * The application is wrapped inside a Redux Provider, which passes the Redux store
 * down to child components.
 */
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
