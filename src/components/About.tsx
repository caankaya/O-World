'use client';

import { useState } from 'react';
import CardProfil from './CardProfil';


const About = () => {
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
    <section className="container px-4 mx-auto">
        <div className="xl:max-w-4xl mb-12 mx-auto text-center">
          <h1 className="mb-4 text-3xl md:text-4xl text-white font-bold tracking-tighter leading-tight">TEAM</h1>
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
    </section>
  );
};

export default About;