import Footer from '@/components/Footer';
import LoginModal from '@/components/LoginModal';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import WorldMap from '@/components/WorldMap';

export default function Home() {
  return (
    <main className="min-h-screen m-auto">
      <NavBar />
      <SideBar />
      <LoginModal />
      <WorldMap />
      <Footer />
    </main>
  );
}
