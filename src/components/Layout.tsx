import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import NavBar from './NavBar';
import SideBar from './SideBar';
import StarsCanvas from './Stars';

function Layout() {
  return (
    <div className="app">
      <NavBar />
      <SideBar />

      <Outlet />

      <Footer />
      <StarsCanvas />
    </div>
  );
}

export default Layout;
