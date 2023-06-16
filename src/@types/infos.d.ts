export interface Celebrity {
  name: string;
  net_worth: number;
  gender: string;
  nationality: string;
  occupation: string[];
  birthday: string;
  age: number;
  is_alive: boolean;
}

export interface Radio {
  name: string;
  url: string;
  url_resolved: string;
  homepage: string;
}

export interface ApiResponse {
  radio: Radio;
  insolite: string;
  celebrity: Celebrity[];
}

export default interface CardCelebrityProps {
  name: string;
  net_worth: number;
  gender: string;
  nationality: string;
  occupation: string[];
  birthday: string;
  age: number;
  is_alive: boolean;
  index: number;
  active: string;
  handleClick: (name: string) => void;
}
