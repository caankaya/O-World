import Footer from '@/components/Footer';
import LoginModal from '@/components/LoginModal';
import NavBar from '@/components/NavBar';
import ProfilCard from '@/components/ProfilCard';
import SideBar from '@/components/SideBar';
import StarsCanvas from '@/components/Stars';
import UserFavorites from '@/components/UserFavorites';
import { Stars } from '@react-three/drei';

export default function Page() {
  return (
    <>
      <NavBar />
      <SideBar />
      <LoginModal />
      <div className="flex items-center justify-center">
        <ProfilCard />
        <UserFavorites />
      </div>
      {/* <StarsCanvas /> */}
      <Footer />
    </>
  );
}
