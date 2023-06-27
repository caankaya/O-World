/* eslint-disable no-await-in-loop */

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

type TextLetterProps = {
  children: string;
};

type AnimatedTextProps = {
  text: string;
};

// We create a string containing all the characters that we want to use for animating the text.
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * TextLetter Component for animating individual letters.
 * @param {TextLetterProps} props - The properties passed to this component.
 */
function TextLetter({ children }: TextLetterProps) {
  const controls = useAnimation();
  const [displayLetter, setDisplayLetter] = useState(children);

  useEffect(() => {
    // useEffect is a Hook that allows executing code every time the component is rendered.
    // Here, we use useEffect to animate each letter of the text.
    let isMounted = true;
    const animate = async () => {
      let counter = 0;
      while (counter < 10 && isMounted) {
        await controls.start({
          opacity: 1,
          transition: { duration: Math.random() + 0.5 },
        });
        // Using a random number to select a random character from the characters string.
        setDisplayLetter(
          characters[Math.floor(Math.random() * characters.length)]
        );
        await controls.start({
          transition: { duration: Math.random() + 0.5 },
        });
        counter++;
      }
    };
    animate();
    return () => {
      // When the component unmounts, change the value of isMounted.
      isMounted = false;
    };
  }, [controls]); // useEffect runs every time controls changes.

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={controls}
      className="alien-font text-center tracking-normal shadow-neon mx-2"
      style={{ letterSpacing: '0.4em' }}
    >
      {/* Using motion.span component to wrap each letter. */}
      {displayLetter === ' ' ? '\u00A0' : displayLetter}
    </motion.span>
  );
}

/**
 * AnimatedText Component for creating animated text strings.
 * @param {AnimatedTextProps} props - The properties passed to this component.
 */
function AnimatedText({ text }: AnimatedTextProps) {
  return (
    <div>
      {/* Using map method to create an array of TextLetter components. */}
      {Array.from(text).map((letter, i) => (
        <TextLetter key={i}>{letter === ' ' ? '\u00A0' : letter}</TextLetter>
      ))}
    </div>
  );
}

export default AnimatedText;

/**
 * Function to set stagger animation effect.
 * @param {number} staggerChildren - The stagger effect between children.
 * @param {number} delayChildren - The delay effect between children.
 * @return {Object} Configuration object for stagger animation.
 */
export const staggerContainer = (
  staggerChildren: number,
  delayChildren: number
) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

/**
 * Function to set fade-in animation effect.
 * @param {'left' | 'right' | 'up' | 'down'} direction - Direction of the fade-in effect.
 * @param {string} type - Type of animation.
 * @param {number} delay - Delay in animation.
 * @param {number} duration - Duration of animation.
 * @return {Object} Configuration object for fade-in animation.
 */
export const fadeIn = (
  direction: 'left' | 'right' | 'up' | 'down',
  type: string,
  delay: number,
  duration: number
) => ({
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
