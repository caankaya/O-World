import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import StarsCanvas from '@/components/Stars';
import WorldMap from '@/components/WorldMap';

export default function Home() {
  return (
    <main className="min-h-screen m-auto">
      <NavBar />
      <SideBar />
      <WorldMap />
      <Footer />
      {/* <StarsCanvas /> */}
    </main>
  );
}
