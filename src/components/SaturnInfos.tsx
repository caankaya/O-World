import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { useAppSelector } from '../GlobalRedux/hooks';
import { Saturn } from '../@types/planetDatas';
import { fadeIn } from '../utils/motion';

import SimpleLoader from './SimpleLoader';

function SaturnInfos({ saturnData }: { saturnData: Saturn }) {
  const infiniteLoadingInfos = useAppSelector(
    (state) => state.planet.infiniteLoading
  );

  if (infiniteLoadingInfos || Object.keys(saturnData).length === 0) {
    return <SimpleLoader />;
  }

  const parseValue = (valueString: string) => {
    let match = valueString.match(/([\d.]+) years/);
    if (match && match[1]) {
      return parseFloat(match[1]);
    }

    match = valueString.match(/([\d.]+) days/);
    if (match && match[1]) {
      return parseFloat(match[1]);
    }

    match = valueString.match(/([\d.]+) hours/);
    if (match && match[1]) {
      return parseFloat(match[1]);
    }

    match = valueString.match(/(-?[\d.]+) °C/);
    if (match && match[1]) {
      return parseFloat(match[1]);
    }

    return 0;
  };

  const orbitalPeriod = parseValue(saturnData.orbitalPeriod);
  const rotationPeriod = parseValue(saturnData.rotationPeriod);
  const averageTemperature = parseValue(saturnData.averageTemperature);

  const infoItems = [
    { title: 'Mass', value: saturnData.mass },
    { title: 'Diameter', value: saturnData.diameter },
    {
      title: 'Orbital Period',
      value: orbitalPeriod,
      unit: 'Years',
    },
    {
      title: 'Rotation Period',
      value: rotationPeriod,
      unit: 'Hours',
    },
    {
      title: 'Average Temperature',
      value: averageTemperature,
      unit: '°C',
    },
  ];

  return (
    <motion.div
      className="orbitron-font flex flex-col md:flex-row items-center justify-center w-full h-full"
      style={{ height: 'auto', position: 'relative' }}
    >
      <motion.div
        className="flex flex-col items-center justify-center md:w-1/3"
        variants={fadeIn('up', 'spring', 0.5, 1)}
        initial="hidden"
        animate="show"
      >
        <motion.img
          className="w-96 h-96"
          src="/planet-saturn.png"
          alt="planet saturn"
        />
      </motion.div>

      <motion.div
        className="flex flex-col items-center justify-center text-center md:w-1/3"
        variants={fadeIn('up', 'spring', 1, 1)}
        initial="hidden"
        animate="show"
      >
        {infoItems.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="stat-title text-base-content">{item.title}</div>
            <div className="stat-value text-secondary-focus">
              {item.unit ? (
                <CountUp
                  start={0}
                  end={item.value}
                  duration={10}
                  separator=","
                />
              ) : (
                item.value
              )}
              {item.unit && ` ${item.unit}`}
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default SaturnInfos;
