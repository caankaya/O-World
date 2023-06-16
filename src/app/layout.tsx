import Head from 'next/head';
import { Inter } from 'next/font/google';
// Store
import Providers from '@/GlobalRedux/store/provider';

// Styles
import '../styles/globals.css';
import '../styles/alien-font.css';

// Components
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import Footer from '@/components/Footer';
import StarsCanvas from '@/components/Stars';
import Error404 from '@/components/404';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'OWorld - Datas of Planet Earth',
  description: 'Data of planet earth',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body className={inter.className}>
        <Providers>
          <NavBar />
          <SideBar />
          {children}
          <Footer />
          {/* <StarsCanvas /> */}
        </Providers>
      </body>
    </html>
  );
}
