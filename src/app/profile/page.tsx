import Footer from '@/components/Footer';
import LoginModal from '@/components/LoginModal';
import NavBar from '@/components/NavBar';
import ProfilCard from '@/components/ProfilCard';
import SideBar from '@/components/SideBar';
import StarsCanvas from '@/components/Stars';
import { Stars } from '@react-three/drei';

export default function Page() {
  return (
    <>
      <NavBar />
      <SideBar />
      <LoginModal />
      <ProfilCard />
      {/* <StarsCanvas /> */}
      <Footer />
    </>
  );
}
