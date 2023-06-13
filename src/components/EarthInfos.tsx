'use client';

import { useAppSelector } from "@/GlobalRedux/hooks";

import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '../utils/motion';

const EarthInfos = ({earthData}: {earthData: any} ) => {
  const DetailEarthWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);

  const dataPlanet = earthData[0].data.dataPlanet;
  const dataCategory = earthData[0].data.dataCategory;
  
  return (
    <motion.div 
      variants={staggerContainer(0.1, 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`p-8 flex flex-col items-center justify-center w-full gap-5 
      ${ isSideBarOpen ? 'float-right' : ''}`}
      style={isSideBarOpen ? { width: DetailEarthWidth } : {}}
      >
        <h1 className="alien-font text-center font-extrabold text-4xl tracking-wider shadow-neon">{dataPlanet.name}</h1>
        <h2 className="text-center text-3xl font-bold mb-2">{dataPlanet.name}</h2>

        <motion.div 
        variants={fadeIn('up', 'spring', 0 * 0.5, 1)} // index = 0 for first card
        className="stats stats-vertical lg:stats-horizontal shadow w-full">
          <div className="stat">
            <div className="stat-figure text-primary bg-tr">
              <img className="w-32 h-32" src="/planet-earth.png" alt="planet earth" />
            </div>
            <div className="stat-title">Planet</div>
            <div className="stat-value text-primary">{dataPlanet.name}</div>
            <div className="stat-desc">Mass: {dataPlanet.mass}</div>
            <div className="stat-desc">Diameter: {dataPlanet.diameter}</div>
          </div>
        </motion.div>

        <motion.div 
        variants={fadeIn('up', 'spring', 1 * 0.5, 1)} // index = 1 for second card
        className="stats stats-vertical lg:stats-horizontal shadow w-full">
          <div className="stat">
            <div className="stat-title">Habitants</div>
            <div className="stat-value text-primary">{dataPlanet.habitants}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Population</div>
            <div className="stat-value">{dataPlanet.population}</div>
          </div>
        </motion.div>

        <motion.div 
        variants={fadeIn('up', 'spring', 2 * 0.5, 1)} // index = 2 for third card
        className="stats stats-vertical lg:stats-horizontal shadow w-full">
          <div className="stat">
            <div className="stat-title">Continents</div>
            <div className="stat-value text-secondary">{dataPlanet.continents.join(', ')}</div>
          </div>
        </motion.div>

        <motion.div 
        variants={fadeIn('up', 'spring', 3 * 0.5, 1)} // index = 3 for fourth card
        className="stats stats-vertical lg:stats-horizontal shadow w-full">
          <div className="stat">
            <div className="stat-title">Orbital Period</div>
            <div className="stat-value text-primary">{dataPlanet.orbitalPeriod}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Rotation Period</div>
            <div className="stat-value text-secondary">{dataPlanet.rotationPeriod}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Average Temperature</div>
            <div className="stat-value">{dataPlanet.averageTemperature}</div>
          </div>
        </motion.div>

        <motion.div 
        variants={fadeIn('up', 'spring', 4 * 0.5, 1)} // index = 4 for fifth card
        className="stats stats-vertical lg:stats-horizontal shadow w-full">
          <div className="stat">
            <div className="stat-title">Atmosphere Composition</div>
            <ul>
              {(Object.entries(dataPlanet.atmosphereComposition) as [string, string][]).map(
                ([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
                )
              )}
            </ul>
          </div>
        </motion.div>

        <motion.div 
        variants={fadeIn('up', 'spring', 5 * 0.5, 1)} // index = 5 for sixth card
        className="stats stats-vertical lg:stats-horizontal shadow w-full">
          <div className="stat">
            <div className="stat-title">Development Level</div>
            <ul>
              {(Object.entries(dataPlanet['niveau de développement']) as [string, string][]).map(
                ([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
                )
              )}
            </ul>
          </div>
        </motion.div>

        {dataPlanet.moons && dataPlanet.moons.length > 0 && (
          <motion.div 
          variants={fadeIn('up', 'spring', 6 * 0.5, 1)} // index = 6 for seventh card
          className="stats stats-vertical lg:stats-horizontal shadow w-full">
            <div className="stat">
              <div className="stat-title">Moons</div>
              {dataPlanet.moons.map((moon: any, index: number) => (
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
          className="stats stats-vertical lg:stats-horizontal shadow w-full">
          <div className="stat">
            <div className="stat-title">Population Data</div>
            <ul>
              {(Object.entries(dataCategory.population) as [string, number][]).map(([year, population]) => (
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
  