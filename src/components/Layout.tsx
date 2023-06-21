import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import NavBar from './NavBar';
import SideBar from './SideBar';
import StarsCanvas from './Stars';
import Toast from './Toast';

function Layout() {
  return (
    <div className="app">
      <NavBar />
      <SideBar />
      <Toast />

      <Outlet />

      <Footer />
      <StarsCanvas />
    </div>
  );
}

export default Layout;
