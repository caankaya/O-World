export interface Root {
  flags: Flags;
  coatOfArms: CoatOfArms;
  name: Name;
  currencies: Currencies;
  capital: string[];
  region: string;
  subregion: string;
  languages: Languages;
  area: number;
  maps: Maps;
  population: number;
  car: Car;
}

export interface Flags {
  png: string;
  svg: string;
  alt: string;
}

export interface CoatOfArms {
  png: string;
  svg: string;
}

export interface Name {
  common: string;
  official: string;
  nativeName: NativeName;
}

export interface NativeName {
  fra: Fra;
}

export interface Fra {
  official: string;
  common: string;
}

export interface Currencies {
  EUR: Eur;
}

export interface Eur {
  name: string;
  symbol: string;
}

export interface Languages {
  fra: string;
}

export interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Car {
  signs: string[];
  side: string;
}
