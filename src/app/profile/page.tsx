import Footer from '@/components/Footer';
import LoginModal from '@/components/LoginModal';
import NavBar from '@/components/NavBar';
import Profile from '@/components/Profile';
import SideBar from '@/components/SideBar';
import StarsCanvas from '@/components/Stars';
import { Stars } from '@react-three/drei';
import { data } from 'autoprefixer';

export default function Page() {
  return (
    <>
      <NavBar />
      <SideBar category={undefined} data={undefined} />
      <LoginModal />
      <Profile />
      {/* <StarsCanvas /> */}
      <Footer />
    </>
  );
}
