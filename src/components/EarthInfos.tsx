const EarthInfos = ({earthData}: {earthData: any} ) => {
  
    const dataPlanet = earthData[0].data.dataPlanet;
    const dataCategory = earthData[0].data.dataCategory;
  
    return (
      <div className="earth-infos">
        <h2>{dataPlanet.name}</h2>
        <p>Mass: {dataPlanet.mass}</p>
        <p>Diameter: {dataPlanet.diameter}</p>
        <p>Habitants: {dataPlanet.habitants}</p>
        <p>Continents: {dataPlanet.continents.join(', ')}</p>
        <p>Population: {dataPlanet.population}</p>
        <p>Orbital Period: {dataPlanet.orbitalPeriod}</p>
        <p>Rotation Period: {dataPlanet.rotationPeriod}</p>
        <p>Average Temperature: {dataPlanet.averageTemperature}</p>
  
        <h3>Atmosphere Composition:</h3>
        <ul>
          {Object.entries(dataPlanet.atmosphereComposition).map(([key, value]) => (
            <li key={key}>{key}: {value}</li>
          ))}
        </ul>
  
        <h3>Niveau de développement:</h3>
        <ul>
          {Object.entries(dataPlanet['niveau de développement']).map(([key, value]) => (
            <li key={key}>{key}: {value}</li>
          ))}
        </ul>
  
        {dataPlanet.moons && dataPlanet.moons.length > 0 && (
          <div>
            <h3>Moons:</h3>
            {dataPlanet.moons.map((moon, index) => (
              <div key={index}>
                <p>Name: {moon.name}</p>
                <p>Mass: {moon.mass}</p>
                <p>Diameter: {moon.diameter}</p>
                <p>Orbital Period: {moon.orbitalPeriod}</p>
              </div>
            ))}
          </div>
        )}
  
        <h3>Population Data:</h3>
        <ul>
          {Object.entries(dataCategory.population).map(([year, population]) => (
            <li key={year}>{year}: {population.toLocaleString()}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default EarthInfos;
  