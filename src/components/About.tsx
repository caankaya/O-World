'use client';

import { useState } from 'react';
import { useAppSelector } from '@/GlobalRedux/hooks';

import CardProfil from './CardProfil';
import AnimatedText from '@/utils/motion';

const About = () => {
  const aboutWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const [active, setActive] = useState('1');
  const infos = [
      {
        id: 1,
        imgUrl: 'https://ca.slack-edge.com/T04F6TNDUEL-U04FTNQRNAF-2aaf24566a07-512',
        title: 'Benjamin',
        role: 'Product OWNER / Scrum Master',
      },
      {
        id: 2,
        imgUrl: 'https://ca.slack-edge.com/T04F6TNDUEL-U04G62YH909-3419cf2da36e-512',
        title: 'Can',
        role: 'Lead Dev Front',
      },
      {
        id: 3,
        imgUrl: 'https://ca.slack-edge.com/T04F6TNDUEL-U04H9P6RYQN-425f0318824d-512',
        title: 'Léo',
        role: 'Git master / Référent technique',
      },
      {
        id: 4,
        imgUrl: 'https://ca.slack-edge.com/T04F6TNDUEL-U04GK9G2T3J-888ff9ac7478-512',
        title: 'Loïc',
        role: 'Lead Dev Back',
      },
  ];

  return (
    <section className={`p-4 flex flex-col items-center justify-center  ${isSideBarOpen ? 'float-right' : ''}`} style={isSideBarOpen ? { width: aboutWidth } : {}}>
      <div className="container">
        <div className="xl:max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl text-white font-bold tracking-tighter leading-tight">TEAM</h1>
          <AnimatedText text="TEAM" />
          <p className="text-lg md:text-xl text-white font-medium">Meet the aliens who made this possible</p>
        </div>
          <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
          {infos.map((info, index) => (
              <CardProfil
                key={info.id}
                {...info}
                index={index}
                active={active}
                handleClick={setActive}
              />
            ))}
          </div>
      </div>
    </section>
  );
};

export default About;