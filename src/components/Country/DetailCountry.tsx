import { CountriesDataProps } from '@/@types/countryData';
import { useAppSelector } from '@/GlobalRedux/hooks';
import LineBarChart from '@/components/Country/LineBarChart';
import Bilboards from '@/components/Country/Bilboards';
import EconomyStats from '@/components/Country/EconomyStats';
import DashboardStats from '@/components/Country/DashboardStats';
import { CountryCategories } from '@/@types/countryCategories';

interface DetailCountryProps {
  category: CountryCategories[] | any;
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
      <LineBarChart category={category} />
      <Bilboards category={category} data={data} />
      <EconomyStats category={category} />
    </div>
  );
}

export default DetailCountry;
