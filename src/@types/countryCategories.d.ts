export interface CountryCategories {
  country: Country;
  population: Population[];
  environnement: Environnement[];
  education: Education[];
  job: Job[];
  economy: Economy[];
  Values: [];
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

export interface Values {
  '2002': number;
  '2003': number;
  '2004': number;
  '2005': number;
  '2006': number;
  '2007': number;
  '2008': number;
  '2009': number;
  '2010': number;
  '2011': number;
  '2012': number;
  '2013': number;
  '2014': number;
  '2015': number;
  '2016': number;
  '2017': number;
  '2018': number;
  '2019': number;
  '2020': number;
  '2021'?: number;
  '2022': any;
}

export interface Environnement {
  indicator: Indicator2;
  values: Values2;
}

export interface Indicator2 {
  id: string;
  value: string;
}

export interface Values2 {
  '2002'?: number;
  '2003'?: number;
  '2004'?: number;
  '2005'?: number;
  '2006'?: number;
  '2007'?: number;
  '2008'?: number;
  '2009'?: number;
  '2010'?: number;
  '2011'?: number;
  '2012'?: number;
  '2013'?: number;
  '2014'?: number;
  '2015'?: number;
  '2016'?: number;
  '2017'?: number;
  '2018'?: number;
  '2019'?: number;
  '2020'?: number;
  '2021'?: number;
  '2022'?: number;
}

export interface Education {
  indicator: Indicator3;
  values: Values3;
}

export interface Indicator3 {
  id: string;
  value: string;
}

export interface Values3 {
  '2002'?: number;
  '2003'?: number;
  '2004'?: number;
  '2005'?: number;
  '2006'?: number;
  '2007'?: number;
  '2008'?: number;
  '2009'?: number;
  '2010'?: number;
  '2011'?: number;
  '2012'?: number;
  '2013'?: number;
  '2014'?: number;
  '2015'?: number;
  '2016'?: number;
  '2017'?: number;
  '2018'?: number;
  '2019'?: number;
  '2020'?: number;
  '2021': any;
  '2022': any;
}

export interface Job {
  indicator: Indicator4;
  values: Values4;
}

export interface Indicator4 {
  id: string;
  value: string;
}

export interface Values4 {
  '2002': number;
  '2003': number;
  '2004': number;
  '2005': number;
  '2006': number;
  '2007': number;
  '2008': number;
  '2009': number;
  '2010': number;
  '2011': number;
  '2012': number;
  '2013': number;
  '2014': number;
  '2015': number;
  '2016': number;
  '2017': number;
  '2018': number;
  '2019': number;
  '2020': number;
  '2021'?: number;
  '2022'?: number;
}

export interface Economy {
  indicator: Indicator5;
  values: Values5;
}

export interface Indicator5 {
  id: string;
  value: string;
}

export interface Values5 {
  '2002': number;
  '2003': number;
  '2004': number;
  '2005': number;
  '2006': number;
  '2007': number;
  '2008': number;
  '2009': number;
  '2010': number;
  '2011': number;
  '2012': number;
  '2013': number;
  '2014': number;
  '2015': number;
  '2016': number;
  '2017': number;
  '2018': number;
  '2019': number;
  '2020': number;
  '2021': number;
  '2022'?: number;
}
