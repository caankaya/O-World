export interface Moon {
  name: string;
  diameter: string;
  mass: string;
  orbitalPeriod: string;
}

export interface Mercury {
  averageTemperature: string;
  diameter: string;
  mass: string;
  moons: Moon[];
  name: string;
  orbitalPeriod: string;
  rotationPeriod: string;
}

export interface Venus {
  averageTemperature: string;
  diameter: string;
  mass: string;
  moons: Moon[];
  name: string;
  orbitalPeriod: string;
  rotationPeriod: string;
}

export interface Earth {
  atmosphereComposition: { [key: string]: string };
  averageTemperature: string;
  continents: string[];
  dataCategory: any;
  diameter: string;
  inhabitants: string;
  'level of development': { [key: string]: string };
  mass: string;
  moons: Moon[];
  name: string;
  orbitalPeriod: string;
  population: string;
  rotationPeriod: string;
}

export interface Mars {
  averageTemperature: string;
  diameter: string;
  mass: string;
  moons: Moon[];
  name: string;
  orbitalPeriod: string;
  rotationPeriod: string;
}

export interface Jupiter {
  averageTemperature: string;
  diameter: string;
  mass: string;
  moons: Moon[];
  name: string;
  orbitalPeriod: string;
  rotationPeriod: string;
}

export interface Saturn {
  averageTemperature: string;
  diameter: string;
  mass: string;
  moons: Moon[];
  name: string;
  orbitalPeriod: string;
  rotationPeriod: string;
}

export interface Uranus {
  averageTemperature: string;
  diameter: string;
  mass: string;
  moons: Moon[];
  name: string;
  orbitalPeriod: string;
  rotationPeriod: string;
}

export interface Neptune {
  averageTemperature: string;
  diameter: string;
  mass: string;
  moons: Moon[];
  name: string;
  orbitalPeriod: string;
  rotationPeriod: string;
}
