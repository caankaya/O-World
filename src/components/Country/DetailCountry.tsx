import { useAppSelector } from '@/GlobalRedux/hooks';
import BarChart from '@/components/Country/BarChart';
import Bilboards from '@/components/Country/Bilboards';
import Circulary from '@/components/Country/Circulary';
import DashboardStats from '@/components/Country/DashboardStats';

function Country() {
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const width = useAppSelector((state) => state.home.currentWidth);
  return (
    <div
      className={`page`}
      style={isSideBarOpen ? { width: width, float: 'right' } : {}}
    >
      <DashboardStats />
      <BarChart />
      <Bilboards />
      <Circulary />
    </div>
  );
}

export default Country;
