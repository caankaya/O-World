import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';
import CardCelebrityProps from '@/@types/cardsTypes';

const CardCelebrity: React.FC<CardCelebrityProps> = ({ name, net_worth, gender, nationality, occupation, birthday, age, is_alive, index, active, handleClick }) => (

  <motion.div
    variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
    className={`relative ${
        active === name ? 'lg:flex-[3.5] flex-[10]' : 'lg:flex-[0.5] flex-[2]'
    } flex items-center justify-center min-w-[200px] h-[700px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer`}
    onClick={() => handleClick(name)}
  >
    <img
      src="https://assets.teenvogue.com/photos/61bcfb146d5605d8a79a8dd4/3:2/w_3804,h_2536,c_limit/1193644057"
      alt={name}
      className="absolute w-full h-full object-cover rounded-[24px]"
    />
    {active !== name ? (
      <h3 className="orbitron-font font-semibold sm:text-[26px] text-[22px] text-black absolute z-0 lg:bottom-20 lg:rotate-[-90deg] lg:origin-[0,0]">
        {name}
      </h3>
    ) : (
      <div className="absolute bottom-0 p-8 flex justify-start w-full flex-col bg-[rgba(0,0,0,0.5)] rounded-b-[24px] orbitron-font">
        <div className={`flex justify-center items-center w-[60px] h-[60px] rounded-[24px] glassmorphism mb-[16px]`}>
        </div>
        <h2 className="first-letter:mt-[24px] font-semibold sm:text-[32px] text-[24px]">
          {name}
        </h2>
        <p className="font-normal text-[16px] leading-[20.16px] text-white uppercase">
         net_worth: <span className="shadow-neon">{net_worth} $</span>
        </p>
        <p className="font-normal text-[16px] leading-[20.16px] text-white uppercase">
          gender: <span className="shadow-neon">{gender}</span>
        </p>
        <p className="font-normal text-[16px] leading-[20.16px] text-white uppercase">
          nationality: <span className="shadow-neon">{nationality}</span>
        </p>
        <p className="font-normal text-[16px] leading-[20.16px] text-white uppercase">
          occupation:{" "}
          <span className="shadow-neon">
            {occupation.map((occ, index) => (
              <span key={index}>
                {occ}
                {index < occupation.length - 1 ? ", " : ""}
              </span>
            ))}
          </span>
        </p>
        <p className="font-normal text-[16px] leading-[20.16px] text-white uppercase">
          birthday: <span className="shadow-neon">{birthday}</span>
        </p>
        <p className="font-normal text-[16px] leading-[20.16px] text-white uppercase">
          age: <span className="shadow-neon">{age}</span>
        </p>
        <p className="font-normal text-[16px] leading-[20.16px] text-white uppercase">
          {is_alive}
        </p>
      </div>
    )}
  </motion.div>
);


export default CardCelebrity;
