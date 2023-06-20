import { CountryCategories } from '@/@types/countryCategories';

import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '../../utils/motion';

import LineChart from './LineChart';
import BarChart from './BarChart';

interface BarChartProps {
  category: CountryCategories[];
}

function LineBarChart({ category }: BarChartProps) {
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
      className="card w-full p-6 bg-base-100 shadow-xl mt-6">
        <div className="text-3xl font-semibold">
          Population growth between 2002 - 2022
        </div>
        <div className="divider mt-2"></div>
        <div className="h-full w-full pb-6 bg-base-100 m-auto">
          <LineChart category={category} />
        </div>
      </motion.div>

      <motion.div
      variants={fadeIn('up', 'spring', 1 * 0.5, 1)} // index = 0 for first card
      className="card w-full p-6 bg-base-100 shadow-xl mt-6">
        <div className="text-3xl font-semibold">
          Life expectancy at birth between 2002 - 2022
        </div>
        <div className="divider mt-2"></div>
          <div className="h-full w-full pb-6 bg-base-100">
            <BarChart category={category} />
          </div>
      </motion.div>

    </motion.div>
  );
}

export default LineBarChart;
