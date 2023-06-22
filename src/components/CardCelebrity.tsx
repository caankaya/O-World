import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';
import CardCelebrityProps from '../@types/infos';

function CardCelebrity({
  name,
  net_worth,
  gender,
  nationality,
  occupation,
  birthday,
  age,
  is_alive,
  index,
  active,
  handleClick,
}: CardCelebrityProps) {
  const isCardActive = active === name;

  const renderCardContent = () => {
    if (isCardActive) {
      return (
        <div className="absolute bottom-0 p-4 flex justify-start w-full flex-col bg-[rgba(0,0,0,0.8)] rounded-b-[24px] orbitron-font">
          <div className="flex justify-center items-center w-[60px] h-[60px] rounded-[24px] glassmorphism mb-[16px]" />
          <h2 className="first-letter:mt-[24px] font-semibold lg:text-[32px] sm:text-[24px] uppercase">
            <a
              href={`https://www.google.com/search?q=${name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              {name}
            </a>
          </h2>
          <p className="font-normal lg:text-[16px] sm:text-[14px] leading-[20.16px] text-white uppercase">
            net_worth: <span className="shadow-neon">{net_worth} $</span>
          </p>
          <p className="font-normal lg:text-[16px] sm:text-[14px] leading-[20.16px] text-white uppercase">
            gender: <span className="shadow-neon">{gender}</span>
          </p>
          <p className="font-normal lg:text-[16px] sm:text-[14px] leading-[20.16px] text-white uppercase">
            nationality: <span className="shadow-neon">{nationality}</span>
          </p>
          <p className="font-normal lg:text-[16px] sm:text-[14px] leading-[20.16px] text-white uppercase">
            occupation:{' '}
            <span className="shadow-neon">
              {occupation?.map((occ, i) => (
                <span key={1}>
                  {occ}
                  {i < occupation.length - 1 ? ', ' : ''}
                </span>
              ))}
            </span>
          </p>
          <p className="font-normal lg:text-[16px] sm:text-[14px] leading-[20.16px] text-white uppercase">
            birthday: <span className="shadow-neon">{birthday}</span>
          </p>
          <p className="font-normal lg:text-[16px] sm:text-[14px] leading-[20.16px] text-white uppercase">
            age: <span className="shadow-neon">{age}</span>
          </p>
          <p className="font-normal lg:text-[16px] sm:text-[14px] leading-[20.16px] text-white uppercase">
            {is_alive}
          </p>
        </div>
      );
    }
    return (
      <h3 className="orbitron-font font-semibold lg:text-[26px] sm:text-[20px] uppercase text-white text-center absolute">
        {name}
      </h3>
    );
  };

  return (
    <motion.div
      variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
      className={`relative ${
        isCardActive ? 'lg:flex-[3.5] flex-[10]' : 'lg:flex-[0.5] flex-[2]'
      } flex items-center justify-center min-w-[200px] lg:h-[700px] h-[900px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer`}
      onClick={() => handleClick(name)}
    >
      <img
        src="/alien-celebrities.png"
        alt={name}
        className="absolute w-full h-full object-cover rounded-[24px]"
      />
      {renderCardContent()}
    </motion.div>
  );
}

export default CardCelebrity;
