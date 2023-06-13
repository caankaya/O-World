import { motion, useAnimation } from "framer-motion"; // npm i framer-motion
import { useEffect, useState } from "react";

const text = "dolor sit amet consectetur"; 
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; // Nous créons une chaîne de caractères qui contient tous les caractères que nous voulons utiliser pour animer le texte.

const TextLetter = ({ children }) => {
  const controls = useAnimation();
  const [displayLetter, setDisplayLetter] = useState(children);

  useEffect(() => {// useEffect est un Hook qui permet d'exécuter du code à chaque fois que le composant est rendu. Ici, nous utilisons useEffect pour animer chaque lettre du texte.
    const animate = async () => {
      let counter = 0;
      while (counter < 10) {
        await controls.start({
          opacity: 1,
          transition: { duration: Math.random() + 0.5}
        });
        setDisplayLetter(characters[Math.floor(Math.random() * characters.length)]); // Nous utilisons ce nombre pour sélectionner un caractère aléatoire de la chaîne characters.
        await controls.start({
          transition: { duration: Math.random() + 0.5 }
        });
        counter++;
      }
    };

    animate();
  }, [controls]); // useEffect est exécuté à chaque fois que controls change.

  return (
    <motion.span 
      initial={{ opacity: 0 }}
      animate={controls}
      className="alien-font text-center tracking-normal shadow-neon mx-2"
      style={{ letterSpacing: "0.2em" }} 
    > {/* Nous utilisons le composant motion.span pour envelopper chaque lettre. */}
      {displayLetter === ' ' ? '\u00A0' : displayLetter}
    </motion.span>
  );
};

const AnimatedText = ({ text }) => { 
  return (
    <div className="">
      {Array.from(text).map((letter, i) => (
        <TextLetter key={i}>
          {letter === ' ' ? '\u00A0' : letter}
        </TextLetter>
      ))} {/* Nous utilisons la méthode map pour créer un tableau de composants TextLetter. */}
    </div>
  );
};

export default AnimatedText;



export const staggerContainer = (staggerChildren, delayChildren) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// Effet d'animation d'afffichage fondu :
export const fadeIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

// Effet d'animation d'apparition :
export const ovniappearing = {
  hidden: {
    rotate: 0,
    scale: 0.2,
    opacity: 0,
  },
  show: {
    rotate: 0,
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 2,
      delay: 0.5,
    },
  },
};