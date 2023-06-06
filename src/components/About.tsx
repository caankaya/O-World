'use client';

import { useState } from 'react';
import CardProfil from './CardProfil';


const About = () => {
  const [active, setActive] = useState('profil-1');
  const infos = [
      {
        id: 'profil-1',
        imgUrl: 'https://media.licdn.com/dms/image/D5603AQERp-rAcDRp9g/profile-displayphoto-shrink_400_400/0/1682122376142?e=1691625600&v=beta&t=54xm0gQ4qqn0jHTrBypCrAhAm2hAmoEb76dN2kkZBU4.jpg',
        title: 'Benjamin',
        role: 'Front-end',
      },
      {
        id: 'profil-2',
        imgUrl: 'https://ca.slack-edge.com/T04F6TNDUEL-U04G62YH909-3419cf2da36e-512.jpg',
        title: 'Can',
        role: 'Front-end',
      },
      {
        id: 'profil-3',
        imgUrl: '../src/assets/images/kanji-world-card.png',
        title: 'Léo',
        role: 'Front-end',
      },
      {
        id: 'profil-4',
        imgUrl: '../src/assets/images/an_anime_woman_wearing_a_suit_black_and_white.png',
        title: 'Loïc',
        role: 'Front-end',
      },
  ];

  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <div className="xl:max-w-4xl mb-12 mx-auto text-center">
          <h1 className="mb-4 text-3xl md:text-4xl text-white font-bold tracking-tighter leading-tight">TEAM</h1>
          <p className="text-lg md:text-xl text-white font-medium">Meet the alien who made this possible</p>
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