/* eslint-disable jsx-a11y/media-has-caption */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '../utils/motion';
import { useAppSelector } from '../GlobalRedux/hooks';
import { Celebrity, Radio } from '../@types/infos';
import CardCelebrity from './CardCelebrity';
import SimpleLoader from './SimpleLoader';

interface InfosProps {
  radio: Radio;
  insolite: string;
  celebrity: Celebrity[];
}

function Infos({ radio, insolite, celebrity }: InfosProps) {
  const [active, setActive] = useState('1');
  const [shuffledCelebrities, setShuffledCelebrities] = useState<Celebrity[]>(
    []
  );
  const shuffleArray = (array: Celebrity[]): Celebrity[] => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  useEffect(() => {
    if (celebrity) {
      const shuffled = shuffleArray(celebrity);
      setShuffledCelebrities(shuffled.slice(0, 4));
    }
  }, [celebrity]);
  const infiniteLoadingInfos = useAppSelector(
    (state) => state.infos.infiniteLoading
  );

  if (infiniteLoadingInfos || (!radio && !insolite && !celebrity)) {
    return <SimpleLoader />;
  }

  const determineAudioType = (url: string) => {
    if (!url) return 'audio/*';

    if (url.endsWith('.mp3')) {
      return 'audio/mpeg';
    }
    if (url.endsWith('.ogg')) {
      return 'audio/ogg';
    }
    if (url.endsWith('.wav')) {
      return 'audio/wav';
    }
    if (url.endsWith('.aac')) {
      return 'audio/aac';
    }
    if (url.endsWith('.flac')) {
      return 'audio/flac';
    }
    if (url.endsWith('.webm')) {
      return 'audio/webm';
    }
    if (url.endsWith('.opus')) {
      return 'audio/opus';
    }
    if (url.endsWith('.mp4')) {
      return 'audio/mp4';
    }
    if (url.endsWith('.audio')) {
      return 'audio/mpeg';
    }
    if (url.endsWith('.m3u8')) {
      return 'application/x-mpegURL';
    }
    return 'audio/*';
  };

  return (
    <section className="p-8 flex flex-col items-center justify-center w-full gap-5 orbitron-font">
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
              {radio?.name !== '' ? radio?.name : 'Radio not available'}
            </div>
            {radio?.url_resolved ? (
              <>
                <audio controls>
                  <source
                    src={radio?.url_resolved}
                    type={determineAudioType(radio?.url_resolved)}
                  />
                  Your browser doesn&apos;t support audio.
                </audio>
                <div className="stat-actions">
                  <a
                    href={radio?.homepage}
                    target="_blank"
                    className="btn btn-sm"
                    rel="noreferrer"
                  >
                    Website
                  </a>
                </div>
              </>
            ) : (
              <div className="stat-actions">
                <a className="btn btn-sm">
                  No radio URL available for this Country
                </a>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn('up', 'spring', 1 * 0.5, 1)}
          className="stats stats-vertical lg:stats-horizontal shadow w-full bg-accent-focus overflow-auto"
        >
          <div className="stat">
            <div className="stat-title">Anecdote</div>
            <div className="stat-value text-3xl whitespace-normal break-words">
              {insolite !== ''
                ? insolite
                : 'No anecdote available for this Country'}
            </div>
          </div>
        </motion.div>

        <div
          id="celebrities"
          className="container px-4 mx-auto w-full text-center"
        >
          <h2 className="text-3xl md:text-7xl gradient-text font-bold tracking-widest leading-tight">
            Celebrities
          </h2>
          <div className="mt-[50px] flex lg:flex-row flex-col justify-center min-h-[70vh] gap-5">
            {shuffledCelebrities.length > 0 ? (
              shuffledCelebrities.map((celebrities, index) => (
                <CardCelebrity
                  key={celebrities.name}
                  {...celebrities}
                  index={index}
                  active={active}
                  handleClick={setActive}
                />
              ))
            ) : (
              <CardCelebrity
                key={'Not available'}
                name={'Not available'}
                net_worth={0}
                gender={'Not available'}
                nationality={'Not available'}
                occupation={['Not available']}
                birthday={'Not available'}
                age={0}
                is_alive={false}
                index={0}
                active={active}
                handleClick={setActive}
              />
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Infos;
