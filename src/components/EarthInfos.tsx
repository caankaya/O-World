import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { useAppSelector } from '../GlobalRedux/hooks';
import { Earth, Moon } from '../@types/planetDatas';
import { staggerContainer, fadeIn } from '../utils/motion';

import SimpleLoader from './SimpleLoader';
import WorldLineChart from './WorldLineChart';

function EarthInfos({ earthData }: { earthData: Earth }) {
  const infiniteLoadingInfos = useAppSelector(
    (state) => state.planet.infiniteLoading
  );

  if (infiniteLoadingInfos || Object.keys(earthData).length === 0) {
    return <SimpleLoader />;
  }

  const parseValue = (valueString: string) => {
    let match = valueString.match(/([\d.]+) years/);
    if (match && match[1]) {
      return parseFloat(match[1]);
    }

    // billions
    match = valueString.match(/([\d.]+) billion/);
    if (match && match[1]) {
      return parseFloat(match[1]) * 1e9;
    }

    // days
    match = valueString.match(/([\d.]+) days/);
    if (match && match[1]) {
      return parseFloat(match[1]);
    }

    // hours
    match = valueString.match(/([\d.]+) hours/);
    if (match && match[1]) {
      return parseFloat(match[1]);
    }

    // degrees Celsius
    match = valueString.match(/(-?[\d.]+) °C/);
    if (match && match[1]) {
      return parseFloat(match[1]);
    }

    return 0;
  };

  const populationNumber = parseValue(earthData.population);
  const orbitalPeriod = parseValue(earthData.orbitalPeriod);
  const rotationPeriod = parseValue(earthData.rotationPeriod);
  const averageTemperature = parseValue(earthData.averageTemperature);

  const infoEarth = [
    { title: 'Mass', value: earthData.mass },
    { title: 'Diameter', value: earthData.diameter },
    {
      title: 'Population',
      value: populationNumber,
    },
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
    {
      title: 'Inhabitants',
      value: earthData.inhabitants,
    },
  ];

  const infoMoon = [
    { title: 'Mass', value: earthData.moons[0].mass },
    { title: 'Diameter', value: earthData.moons[0].diameter },
    {
      title: 'Orbital Period',
      value: parseInt(earthData.moons[0].orbitalPeriod),
      unit: 'Days',
    },
  ];

  const atmosphereComposition = [
    {
      title: 'nitrogen',
      value: parseInt(earthData.atmosphereComposition.nitrogen),
      unit: '%',
    },
    {
      title: 'oxygen',
      value: parseInt(earthData.atmosphereComposition.oxygen),
      unit: '%',
    },
    {
      title: 'argon',
      value: parseInt(earthData.atmosphereComposition.argon),
      unit: '%',
    },
    {
      title: 'carbonDioxide',
      value: parseInt(earthData.atmosphereComposition.carbonDioxide),
      unit: '%',
    },
    {
      title: 'other',
      value: parseInt(earthData.atmosphereComposition.other),
      unit: '%',
    },
  ];

  return (
    <motion.div
      variants={staggerContainer(0.1, 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="orbitron-font flex flex-col items-center justify-center w-full gap-5"
    >
      {/* Earth informations */}
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
            src="/planet-earth.png"
            alt="planet earth"
          />
        </motion.div>

        <motion.div
          className="flex flex-col items-center justify-center text-center md:w-1/3"
          variants={fadeIn('up', 'spring', 1, 1)}
          initial="hidden"
          animate="show"
        >
          {infoEarth.map((item, index) => (
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

      {/* Continents */}
      <div className="stat">
        <div className="stat-title">Continents</div>
        <div className="stat-value text-secondary flex flex-col">
          {earthData.continents.join(', ')}
        </div>
      </div>

      {/* Atmosphere Composition */}
      {atmosphereComposition.map((item, index) => (
        <div key={index} className="mb-4">
          <div className="stat-title text-base-content">{item.title}</div>
          <div className="stat-value text-primary">
            {item.unit ? (
              <CountUp start={0} end={item.value} duration={10} separator="," />
            ) : (
              item.value
            )}
            {item.unit && ` ${item.unit}`}
          </div>
        </div>
      ))}

      {/* Development Level */}
      <div className="stat">
        <div className="stat-title">Development Level</div>
        <ul>
          {(
            Object.entries(earthData['level of development']) as [
              string,
              string
            ][]
          ).map(([key, value]) => (
            <li key={key}>
              {key}: {value}
            </li>
          ))}
        </ul>
      </div>

      <h1 className="text-3xl md:text-7xl gradient-text font-bold tracking-widest leading-tight">
        Moon
      </h1>

      {/* Moon */}
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
          <motion.img className="w-96 h-96" src="/moon.png" alt="moon" />
        </motion.div>

        <motion.div
          className="flex flex-col items-center justify-center text-center md:w-1/3"
          variants={fadeIn('up', 'spring', 1, 1)}
          initial="hidden"
          animate="show"
        >
          {infoMoon.map((item, index) => (
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

      <h1 className="text-3xl md:text-7xl gradient-text font-bold tracking-widest leading-tight">
        Population
      </h1>

      <motion.div
        variants={fadeIn('up', 'spring', 1 * 0.5, 1)}
        className="stats stats-vertical lg:stats-horizontal shadow w-full"
      >
        <WorldLineChart population={earthData.dataCategory.population} />
      </motion.div>
    </motion.div>
  );
}

export default EarthInfos;
