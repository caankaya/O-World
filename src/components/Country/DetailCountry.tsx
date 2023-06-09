import { useAppSelector } from '@/GlobalRedux/hooks';
import BarChart from '@/components/Country/BarChart';
import Bilboards from '@/components/Country/Bilboards';
import Circulary from '@/components/Country/Circulary';
import DashboardStats from '@/components/Country/DashboardStats';

function Country() {
  return (
    <div className={`page`}>
      <DashboardStats />
      <BarChart />
      <Bilboards />
      <Circulary />
    </div>
  );
}

export default Country;
