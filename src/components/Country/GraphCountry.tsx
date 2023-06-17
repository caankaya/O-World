import { CountriesDataProps } from '@/@types/countryData';
import { useAppSelector } from '@/GlobalRedux/hooks';
import { CountryCategories } from '@/@types/countryCategories';

import LineBarChart from '@/components/Country/LineBarChart';
import EconomyStats from '@/components/Country/EconomyStats';
import Alert from '../Alert';
import { useMediaQuery } from 'react-responsive';

interface DetailCountryProps {
  category: CountryCategories[] | any;
  data: CountriesDataProps | null;
}

function GraphCountry({ category, data }: DetailCountryProps) {
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const graphwidth = useAppSelector((state) => state.home.currentWidth);
  const alert = useAppSelector((state) => state.graph.alert);
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });

  return (
    <section className="p-8"
    style={
      isSideBarOpen
          ? isLargeScreen
              ? { width: graphwidth, float: 'right' }
              : { width: '100%', float: 'none' }
          : {}
    }
    >
      {alert && 
      <div className="px-4 mx-auto w-full">
      <Alert type={alert.type} message={alert.message} />
      </div>}

      <LineBarChart category={category} />
      <EconomyStats category={category} />
    </section>
  );
}

export default GraphCountry;
