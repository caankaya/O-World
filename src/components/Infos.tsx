import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '../utils/motion';
import { useAppSelector } from '@/GlobalRedux/hooks';
import CardCelebrity from './CardCelebrity';
import { useMediaQuery } from 'react-responsive';
import { Celebrity, Radio } from '@/@types/infos';
import SimpleLoader from './SimpleLoader';

interface InfosProps {
  radio: Radio;
  insolite: string;
  celebrity: Celebrity[];
}

function Infos({ radio, insolite, celebrity }: InfosProps) {
  const DetailRadioWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const [active, setActive] = useState('1');
  const [shuffledCelebrities, setShuffledCelebrities] = useState<Celebrity[]>(
    []
  );
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const infiniteLoadingInfos = useAppSelector(
    (state) => state.infos.infiniteLoading
  );

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

  return (
    <section
      className={`p-8 flex flex-col items-center justify-center w-full gap-5 orbitron-font`}
      style={
        isSideBarOpen
          ? isLargeScreen
            ? { width: DetailRadioWidth, float: 'right' }
            : { width: '100%', float: 'none' }
          : {}
      }
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
            {radio?.url_resolved && (
              <audio controls>
                <source
                  src={radio?.url_resolved}
                  type={determineAudioType(radio?.url_resolved)}
                />
                Your browser doesn't support audio.
              </audio>
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
            <div className="stat-title">Insolite</div>
            <div className="stat-value text-3xl whitespace-normal break-words">
              {insolite}
            </div>
          </div>
        </motion.div>
        <div className="container px-4 mx-auto w-full">
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
