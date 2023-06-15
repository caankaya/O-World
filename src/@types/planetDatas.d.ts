interface Moon {
    name: string;
    diameter: string;
    mass: string;
    orbitalPeriod: string;
  }
  
  interface Earth {
    atmosphereComposition: { [key: string]: string };
    averageTemperature: string;
    continents: string[];
    dataCategory: any;
    diameter: string;
    inhabitants: string;
    "level of development": { [key: string]: string };
    mass: string;
    moons: Moon[];
    name: string;
    orbitalPeriod: string;
    population: string;
    rotationPeriod: string;
  }
  
  interface PlanetsData {
    Earth: Earth;
    [planet: string]: any; 
  }