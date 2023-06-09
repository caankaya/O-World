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
      <BarChart category={category} data={data} />
      <Bilboards category={category} data={data} />
      <Circulary category={category} data={data} />
    </div>
  );
}

export default DetailCountry;
