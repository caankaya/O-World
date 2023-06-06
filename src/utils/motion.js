import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const text = "dolor sit amet consectetur adipisicing elit";
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const TextLetter = ({ children }) => {
  const controls = useAnimation();
  const [displayLetter, setDisplayLetter] = useState(children);

  useEffect(() => {
    const animate = async () => {
      let counter = 0;
      while (counter < 10) {
        await controls.start({
          opacity: 1,
          transition: { duration: Math.random() + 0.5}
        });
        setDisplayLetter(characters[Math.floor(Math.random() * characters.length)]);
        await controls.start({
          transition: { duration: Math.random() + 0.5 }
        });
        counter++;
      }
    };

    animate();
  }, [controls]);

  return (
    <motion.span 
      initial={{ opacity: 0 }}
      animate={controls}
      className="alien-font text-center tracking-normal shadow-neon mx-2"
      style={{ letterSpacing: "0.5em" }} 
    >
      {displayLetter === ' ' ? '\u00A0' : displayLetter}
    </motion.span>
  );
};

const AnimatedText = () => {
  return (
    <div className="">
      {Array.from(text).map((letter, i) => (
        <TextLetter key={i}>
          {letter === ' ' ? '\u00A0' : letter}
        </TextLetter>
      ))}
    </div>
  );
};

export default AnimatedText;
