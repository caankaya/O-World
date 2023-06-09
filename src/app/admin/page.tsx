import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import Admin from '@/components/Admin';
import SideBar from '@/components/SideBar';
import StarsCanvas from '@/components/Stars';

export default function Page() {
  return (
    <>
      <NavBar />
      <SideBar category={undefined} data={undefined} />
      <Admin />
      <StarsCanvas />
      <Footer />
    </>
  );
}
