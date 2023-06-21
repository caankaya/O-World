import { motion } from 'framer-motion';
import { CountryCategories } from '../@types/countryCategories';
// @ts-ignore
import { staggerContainer, fadeIn } from '../utils/motion';
import PieChart from './PieChart';

interface EconomyProps {
  category: CountryCategories;
}

function Economy({ category }: EconomyProps) {
  if (category && category.economy) {
    const inflationData = category.economy[2];
    const debtData = category.economy[3];

    const years = Object.keys(inflationData.values);
    const inflationValues = Object.values(inflationData.values);
    const debtValues = Object.values(debtData.values);

    const tableRows = years.map((year, index) => (
      <tr key={year}>
        <td>{year}</td>
        <td>
          {inflationValues[index] !== null
            ? inflationValues[index].toFixed(2)
            : 'N/A'}
        </td>
        <td>
          {debtValues[index] !== null ? debtValues[index].toFixed(2) : 'N/A'}
        </td>
      </tr>
    ));

    return (
      <motion.div
        variants={staggerContainer(0.1, 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6"
      >
        <motion.div
          variants={fadeIn('up', 'spring', 0 * 0.5, 1)} // index = 0 for first card
          className="card w-full p-6 bg-base-100 shadow-xl mt-6"
        >
          <div className="text-3xl font-semibold text-center">
            Economy between 2002 - 2022
          </div>
          <div className="divider mt-2" />
          <div className="h-full w-full pb-6 bg-base-100">
            <div className="overflow-auto max-h-[400px]">
              <table className="table w-full text-center">
                <thead>
                  <tr>
                    <th>Years</th>
                    <th>{inflationData.indicator.value}</th>
                    <th>{debtData.indicator.value}</th>
                  </tr>
                </thead>
                <tbody>{tableRows}</tbody>
              </table>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn('up', 'spring', 1 * 0.5, 1)} // index = 1 for second card
          className="card w-full p-6 bg-base-100 shadow-xl mt-6"
        >
          <div className="text-3xl font-semibold text-center">
            Environnement between 2002 - 2022
          </div>
          <div className="divider mt-2" />
          <div className="h-full w-full pb-6 bg-base-100">
            <PieChart category={category} />
          </div>
        </motion.div>
      </motion.div>
    );
  }
}

export default Economy;
