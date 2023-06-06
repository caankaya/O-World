export default interface CardProfilProps {
    id: number,
    imgUrl: string,
    title: string,
    role: string,
    index: number,
    active: string,
    handleClick: (id: string) => void,
  }