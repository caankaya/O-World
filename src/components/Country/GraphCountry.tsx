import { CountriesDataProps } from '@/@types/countryData';
import { useAppSelector } from '@/GlobalRedux/hooks';
import { CountryCategories } from '@/@types/countryCategories';

import LineBarChart from '@/components/Country/LineBarChart';
import EconomyStats from '@/components/Country/EconomyStats';
import ErrorPage from '../Error';

interface DetailCountryProps {
  category: CountryCategories[] | any;
  data: CountriesDataProps | null;
}

function GraphCountry({ category, data }: DetailCountryProps) {
  const errorState = useAppSelector((state) => state.error);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const width = useAppSelector((state) => state.home.currentWidth);

  if (errorState.message) {
    return <ErrorPage />;
  }

  return (
    <section className="p-8"
      style={isSideBarOpen ? { width: width, float: 'right' } : {}}
    >
      <LineBarChart category={category} />
      <EconomyStats category={category} />
    </section>
  );
}

export default GraphCountry;
