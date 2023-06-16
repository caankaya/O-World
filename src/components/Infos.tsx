'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedText, { staggerContainer, fadeIn } from '../utils/motion';
import { useAppSelector } from '@/GlobalRedux/hooks';
import Alert from './Alert';
import CardCelebrity from './CardCelebrity';

interface Celebrity {
  name: string;
  net_worth: number;
  gender: string;
  nationality: string;
  occupation: string[];
  birthday: string;
  age: number;
  is_alive: boolean;
}

interface InfosProps {
  infos: {
      radio: {
          name: string;
          url: string;
          url_resolved: string;
          homepage: string;
      } | null;
      insolite: string | null;
      celebrity: Celebrity[] | null;
  }
}

function Infos({ infos }: InfosProps) {
  const DetailRadioWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const alert = useAppSelector((state) => state.country.alert);
  const [active, setActive] = useState('1');
  const [shuffledCelebrities, setShuffledCelebrities] = useState<Celebrity[]>([]);

  if (!infos) {
    return (
      <div className="px-4 mx-auto w-full">
        {alert && <Alert type={alert.type} message={alert.message} />}
      </div>
    );
  }


  // Gestion des formats audio
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
    if (infos && infos.celebrity) {
      const shuffled = shuffleArray(infos.celebrity);
      setShuffledCelebrities(shuffled.slice(0, 4));
    }
  }, [infos]);

  // Function to shuffle an array
  const shuffleArray = (array: Celebrity[]): Celebrity[] => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <section className={`p-8 flex flex-col items-center justify-center w-full gap-5`}
    style={isSideBarOpen ? { width: DetailRadioWidth, float: 'right' } : {}}>
    <motion.div
      variants={staggerContainer(0.1, 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="flex flex-col items-center justify-center w-full gap-5"
    >
      <motion.div
        variants={fadeIn('up', 'spring', 0 * 1, 1)}
        className="stats stats-vertical lg:stats-horizontal shadow w-full bg-secondary-focus mb-4"
      >
        <div className="stat">
          <div className="stat-title">Radio</div>
          <div className="stat-value mb-4">{infos.radio?.name}</div>
          {infos.radio?.url_resolved && (
              <audio controls>
                  <source src={infos.radio?.url_resolved} type={determineAudioType(infos.radio?.url_resolved)} />
                  Votre navigateur ne supporte pas l'élément audio.
              </audio>
          )}
          <div className="stat-actions">
            <a href={infos.radio?.homepage} target="_blank" className="btn btn-sm">Website</a>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={fadeIn('up', 'spring', 1 * 0.5, 1)}
        className="stats stats-vertical lg:stats-horizontal shadow w-full bg-accent-focus"
      >
        <div className="stat">
          <div className="stat-title">Insolite</div>
          <div className="stat-value text-3xl">{infos.insolite}</div>
        </div>
      </motion.div>

    </motion.div>

      <div className="container px-4 mx-auto w-full">
        <div className="xl:max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl text-white font-bold tracking-tighter leading-tight">
            Celebrities
          </h1>
          <AnimatedText text="TEAM" />
          <p className="text-lg md:text-xl text-white font-medium">
            Famous Aliens in their country
          </p>
        </div>
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
    </section>
  );
}

export default Infos;