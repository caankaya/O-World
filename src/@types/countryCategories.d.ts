export interface CountryCategories {
  country: Country;
  population: Population[];
  environnement: Environnement[];
  education: Education[];
  job: Job[];
  economy: Economy[];
  value: Values[];
}

export interface Country {
  id: string;
}

export interface Population {
  indicator: Indicator;
  values: Values;
}

export interface Indicator {
  id: string;
  value: string;
}

export interface Environnement {
  indicator: Indicator;
  values: Values;
}

export interface Education {
  indicator: Indicator;
  values: Values;
}

export interface Job {
  indicator: Indicator;
  values: Values;
}

export interface Economy {
  indicator: Indicator;
  values: Values;
}

export interface Values {
  2002: number | null;
  2003: number | null;
  2004: number | null;
  2005: number | null;
  2006: number | null;
  2007: number | null;
  2008: number | null;
  2009: number | null;
  2010: number | null;
  2011: number | null;
  2012: number | null;
  2013: number | null;
  2014: number | null;
  2015: number | null;
  2016: number | null;
  2017: number | null;
  2018: number | null;
  2019: number | null;
  2020: number | null;
  2021: number | null;
  2022: number | null;
}
