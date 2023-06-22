import { useAppSelector } from '../GlobalRedux/hooks';
import { CountryCategories } from '../@types/countryCategories';

import LineBarChart from './LineBarChart';
import EconomyStats from './EconomyStats';
import Alert from './Alert';
import SimpleLoader from './SimpleLoader';

function GraphCountry({ category }: { category: CountryCategories | null }) {
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

      <LineBarChart category={category as CountryCategories} />
      <EconomyStats category={category as CountryCategories} />
    </section>
  );
}

export default GraphCountry;
