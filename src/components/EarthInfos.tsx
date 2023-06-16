'use client';

import { useAppSelector } from '@/GlobalRedux/hooks';
import CountUp from 'react-countup';

import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '../utils/motion';
import { Earth } from '@/@types/planetDatas';

const EarthInfos = ({ earthData }: { earthData: Earth }) => {
  const DetailEarthWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);

  const parseValue = (valueString: string) => {
    // billions
    let match = valueString.match(/([\d.]+) billion/);
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
    match = valueString.match(/([\d.]+) °C/);
    if (match && match[1]) {
      return parseFloat(match[1]);
    }

    return 0; // return 0 if not match or not parseable
  };

  const populationNumber = parseValue(earthData.population);
  const orbitalPeriod = parseValue(earthData.orbitalPeriod);
  const rotationPeriod = parseValue(earthData.rotationPeriod);
  const averageTemperature = parseValue(earthData.averageTemperature);

  return (
    <motion.div
      variants={staggerContainer(0.1, 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`p-8 flex flex-col items-center justify-center w-full gap-5`}
      style={isSideBarOpen ? { width: DetailEarthWidth, float: 'right' } : {}}
    >
      <h1 className="alien-font text-center font-extrabold text-4xl tracking-wider shadow-neon">
        {earthData.name}
      </h1>

      <div className="flex w-full">
        <motion.div
          variants={fadeIn('up', 'spring', 0 * 0.5, 1)} // index = 0 for first card
          className="stats stats-vertical lg:stats-horizontal shadow w-full bg-transparent"
        >
          <div className="stat">
            <div className="stat-title">Planet</div>
            <div className="stat-value text-primary">{earthData.name}</div>
            <div className="stat-title">Mass: {earthData.mass}</div>
            <div className="stat-title">Diameter: {earthData.diameter}</div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn('up', 'spring', 0 * 0.5, 1)} // index = 0 for first card
          className="stats stats-vertical lg:stats-horizontal shadow w-full flex justify-center bg-transparent"
        >
          <img
            className="w-48 h-48"
            src="/planet-earth.png"
            alt="planet earth"
          />
        </motion.div>
      </div>

      <motion.div
        variants={fadeIn('up', 'spring', 1 * 0.5, 1)} // index = 1 for second card
        className="stats stats-vertical lg:stats-horizontal shadow w-full"
      >
        <div className="stat">
          <div className="stat-title">Habitants</div>
          <div className="stat-value text-primary">{earthData.inhabitants}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Population</div>
          <div className="stat-value">
            <CountUp
              start={0}
              end={populationNumber}
              duration={5}
              separator=","
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={fadeIn('up', 'spring', 2 * 0.5, 1)} // index = 2 for third card
        className="stats stats-vertical lg:stats-horizontal shadow w-full"
      >
        <div className="stat">
          <div className="stat-title">Continents</div>
          <div className="stat-value text-secondary">
            {earthData.continents.join(', ')}
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={fadeIn('up', 'spring', 3 * 0.5, 1)} // index = 3 for fourth card
        className="stats stats-vertical lg:stats-horizontal shadow w-full"
      >
        <div className="stat">
          <div className="stat-title">Orbital Period</div>
          <div className="stat-value text-primary">
            <CountUp
              start={0}
              end={orbitalPeriod}
              duration={10}
              separator=","
            />{' '}
            Days
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Rotation Period</div>
          <div className="stat-value text-secondary">
            <CountUp
              start={0}
              end={rotationPeriod}
              duration={10}
              separator=","
            />{' '}
            Hours
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Average Temperature</div>
          <div className="stat-value">
            <CountUp
              start={0}
              end={averageTemperature}
              duration={10}
              separator=","
            />{' '}
            °C
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={fadeIn('up', 'spring', 4 * 0.5, 1)} // index = 4 for fifth card
        className="stats stats-vertical lg:stats-horizontal shadow w-full"
      >
        <div className="stat">
          <div className="stat-title">Atmosphere Composition</div>
          <ul>
            {(
              Object.entries(earthData.atmosphereComposition) as [
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
      </motion.div>

      <motion.div
        variants={fadeIn('up', 'spring', 5 * 0.5, 1)} // index = 5 for sixth card
        className="stats stats-vertical lg:stats-horizontal shadow w-full"
      >
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
      </motion.div>

      {earthData.moons && earthData.moons.length > 0 && (
        <motion.div
          variants={fadeIn('up', 'spring', 6 * 0.5, 1)} // index = 6 for seventh card
          className="stats stats-vertical lg:stats-horizontal shadow w-full"
        >
          <div className="stat">
            <div className="stat-title">Moons</div>
            {earthData.moons.map((moon: any, index: number) => (
              <div key={index}>
                <div className="stat">
                  <div className="stat-title">Name</div>
                  <div className="stat-value">{moon.name}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Mass</div>
                  <div className="stat-value">{moon.mass}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Diameter</div>
                  <div className="stat-value">{moon.diameter}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Orbital Period</div>
                  <div className="stat-value">{moon.orbitalPeriod}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        variants={fadeIn('up', 'spring', 7 * 0.5, 1)} // index = 7 for eigth card
        className="stats stats-vertical lg:stats-horizontal shadow w-full"
      >
        <div className="stat">
          <div className="stat-title">Population Data</div>
          <ul>
            {(
              Object.entries(earthData.dataCategory.population) as [
                string,
                number
              ][]
            ).map(([year, population]) => (
              <li key={year}>
                {year}: {population.toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EarthInfos;
