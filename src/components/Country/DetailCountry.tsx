import { CountryCategories } from '@/@types/countryCategories';
import { CountriesDataProps } from '@/@types/countryData';
import { useAppSelector } from '@/GlobalRedux/hooks';
import BarChart from '@/components/Country/BarChart';
import Bilboards from '@/components/Country/Bilboards';
import Circulary from '@/components/Country/Circulary';
import DashboardStats from '@/components/Country/DashboardStats';

interface DetailCountryProps {
  category: CountryCategories[];
  data: CountriesDataProps | null;
}

function DetailCountry({ category, data }: DetailCountryProps) {
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const width = useAppSelector((state) => state.home.currentWidth);

  return (
    <div
      className={`page`}
      style={isSideBarOpen ? { width: width, float: 'right' } : {}}
    >
      <DashboardStats category={category} data={data} />
      <BarChart />
      <Bilboards />
      <Circulary />
    </div>
  );
}

export default DetailCountry;
