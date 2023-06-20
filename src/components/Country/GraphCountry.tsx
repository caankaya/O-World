import { CountriesDataProps } from '@/@types/countryData';
import { useAppSelector } from '@/GlobalRedux/hooks';
import { CountryCategories } from '@/@types/countryCategories';

import LineBarChart from '@/components/Country/LineBarChart';
import EconomyStats from '@/components/Country/EconomyStats';
import Alert from '../Alert';
import { useMediaQuery } from 'react-responsive';
import SimpleLoader from '../SimpleLoader';

interface DetailCountryProps {
  category: CountryCategories[] | any;
  data: CountriesDataProps | null;
}

function GraphCountry({ category, data }: DetailCountryProps) {
  const alert = useAppSelector((state) => state.graph.alert);
  const infiniteLoadingInfos = useAppSelector(
    (state) => state.graph.infiniteLoading
  );


  if (infiniteLoadingInfos) {
    return <SimpleLoader />;
  }

  return (
    <section className="p-8 orbitron-font">
      {alert && (
        <div className="px-4 mx-auto w-full">
          <Alert type={alert.type} message={alert.message} />
        </div>
      )}

      <LineBarChart category={category} />
      <EconomyStats category={category} />
    </section>
  );
}

export default GraphCountry;
