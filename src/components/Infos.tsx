import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '../utils/motion';
import { useAppSelector } from '@/GlobalRedux/hooks';
import CardCelebrity from './CardCelebrity';
import { Celebrity, Radio } from '@/@types/infos';
import axios from 'axios';

import SimpleLoader from './SimpleLoader';

interface InfosProps {
  radio: Radio;
  insolite: string;
  celebrity: Celebrity[];
}

function Infos({ radio, insolite, celebrity }: InfosProps) {
  const [active, setActive] = useState('1');
  const [shuffledCelebrities, setShuffledCelebrities] = useState<Celebrity[]>([]);
  const infiniteLoadingInfos = useAppSelector((state) => state.infos.infiniteLoading);
  const [insoliteTranslated, setInsoliteTranslated] = useState('');
  const [isTranslating, setIsTranslating] = useState(true);

  if (infiniteLoadingInfos) {
    return <SimpleLoader />;
  }

  const determineAudioType = (url: any) => {
    if (!url) return 'audio/*';

    if (url.endsWith('.mp3')) {
      return 'audio/mpeg';
    } else if (url.endsWith('.ogg')) {
      return 'audio/ogg';
    } else if (url.endsWith('.wav')) {
      return 'audio/wav';
    } else if (url.endsWith('.aac')) {
      return 'audio/aac';
    } else if (url.endsWith('.flac')) {
      return 'audio/flac';
    } else if (url.endsWith('.webm')) {
      return 'audio/webm';
    } else if (url.endsWith('.opus')) {
      return 'audio/opus';
    } else if (url.endsWith('.mp4')) {
      return 'audio/mp4';
    } else if (url.endsWith('.audio')) {
      return 'audio/mpeg';
    } else if (url.endsWith('.m3u8')) {
      return 'application/x-mpegURL';
    }
    return 'audio/*';
  };

  useEffect(() => {
    if (celebrity) {
      const shuffled = shuffleArray(celebrity);
      setShuffledCelebrities(shuffled.slice(0, 4));
    }
  }, [celebrity]);

  const shuffleArray = (array: Celebrity[]): Celebrity[] => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  useEffect(() => {
    const translateAnecdote = async () => {
      if (insolite) {
        setIsTranslating(true); // Définir que la traduction est en cours
        try {
          const response = await axios.post('https://rapid-translate-multi-traduction.p.rapidapi.com/t', {
            from: 'fr',
            to: 'en',
            q: insolite,
          }, {
            headers: {
              'Content-Type': 'application/json',
              'X-RapidAPI-Key': 'ab0f032a10msh2d1ac46575f4090p132325jsn5cd7d500e1e8',
              'X-RapidAPI-Host': 'rapid-translate-multi-traduction.p.rapidapi.com'
            },
          });

          setInsoliteTranslated(response.data); // Assurez-vous que l'API renvoie directement le texte traduit sans avoir besoin de récupérer une propriété spécifique
          setIsTranslating(false); // Définir que la traduction est terminée
        } catch (error) {
          console.error('Failed to translate anecdote:', error);
          setIsTranslating(false); // Définir que la traduction est terminée même en cas d'erreur
        }
      }
    };

    translateAnecdote();
  }, [insolite]);

  return (
    <section
      className={`p-8 flex flex-col items-center justify-center w-full gap-5 orbitron-font`}
    >
      <motion.div
        variants={staggerContainer(0.1, 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="flex flex-col items-center justify-center w-full gap-5"
      >

        <motion.div
          variants={fadeIn('up', 'spring', 0 * 1, 1)}
          className="stats stats-vertical lg:stats-horizontal shadow w-full bg-secondary-focus mb-4 overflow-auto"
        >
          <div className="stat">
            <div className="stat-title">Radio</div>
            <div className="stat-value mb-4 whitespace-normal break-words">
              {radio?.name}
            </div>
            {radio?.url_resolved ? (
              <audio controls>
                <source
                  src={radio?.url_resolved}
                  type={determineAudioType(radio?.url_resolved)}
                />
                Your browser doesn't support audio.
              </audio>
            ) : (
              <div className="text-white font-bold">No radio URL available for this Country.</div>
            )}
            <div className="stat-actions">
              <a href={radio?.homepage} target="_blank" className="btn btn-sm">
                Website
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn('up', 'spring', 1 * 0.5, 1)}
          className="stats stats-vertical lg:stats-horizontal shadow w-full bg-accent-focus overflow-auto"
        >
          <div className="stat">
            <div className="stat-title">Anecdote</div>
            <div className="stat-value text-3xl whitespace-normal break-words">
              {isTranslating ? (
                <div className="text-white font-bold">Translating...</div> // Texte ou loader pendant que la traduction est en cours
                ) : insoliteTranslated ? (
                  insoliteTranslated
                ) : (
                  <div className="text-white font-bold">No anecdote available for this Country.</div>
                )}
            </div>
          </div>
        </motion.div>

        <div id="celebrities" className="container px-4 mx-auto w-full text-center">
          <h2 className="text-3xl md:text-7xl gradient-text font-bold tracking-widest leading-tight">
            Celebrities
          </h2>
          <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
            {shuffledCelebrities.map((celebrity, index) => (
              <CardCelebrity
                key={celebrity.name}
                {...celebrity}
                index={index}
                active={active}
                handleClick={setActive}
              />
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  );
}

export default Infos;
