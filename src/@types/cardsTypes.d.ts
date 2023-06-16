export default interface CardProfilProps {
    id: number,
    imgUrl: string,
    activeImgUrl: string;
    gitUrl: string;
    title: string,
    role: string,
    index: number,
    active: string,
    handleClick: (id: string) => void,
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
  active: string,
  handleClick: (name: string) => void,
}