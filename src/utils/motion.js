import { motion, useAnimation } from "framer-motion"; // npm i framer-motion
import { useEffect, useState } from "react";

const text = "dolor sit amet consectetur adipisicing elit"; 
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

const AnimatedText = () => { 
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
