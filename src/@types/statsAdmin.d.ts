export interface DataRow {
    country_origin: string;
    user_count: string;
    average_age: string;
    favorite_count: string;
    iso3: string;
  };

 export interface FlagRow {
  // Propriétés spécifiques aux données de 'flags'
  cca3: string;
  flags: { png: string };
  // ...
}