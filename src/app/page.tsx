import RegisterModal from '@/components/RegisterModal';
import LoginModal from '@/components/LoginModal';

export default function Home() {
  return (
    <main className="min-h-screen">
      <RegisterModal />
      <LoginModal />
    </main>
  );
}
