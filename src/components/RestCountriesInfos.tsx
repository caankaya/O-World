'use client';

import { useAppSelector } from '@/GlobalRedux/hooks';

import UpdateProfile from './UpdateProfile';
import UserFavorites from './UserFavorites';

function Profile() {
  const DetailCountryWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);

  return (
    <section
      className={`p-8 flex flex-col items-center justify-center w-full gap-5 ${
        isSideBarOpen ? 'float-right' : ''
      }`}
      style={isSideBarOpen ? { width: DetailCountryWidth } : {}}
    >
      <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
        <div className="stat">
            <div className="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </div>
            <div className="stat-title">Country</div>
            <div className="stat-value text-primary">FRANCE</div>
            <div className="stat-desc">French Republic</div>
            <div className="stat-desc">Area: 551695 km2</div>
        </div>
        <div className="stat">
          <div className="relative h-32">
            <img src="https://flagcdn.com/fr.svg" alt="france" className="absolute w-full h-full object-cover" />
          </div>
        </div>
        <div className="stat">
          <div className="relative h-32 w-full">
            <iframe
                className="absolute w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10545095.45824776!2d-5.266387098248878!3d46.15124116025365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e4e6163c32a7f1%3A0xcca21e0d1971db85!2sFrance!5e0!3m2!1sen!2sus!4v1631377242236!5m2!1sen!2sus"
                loading="lazy"
                title="Google Map of France"
            ></iframe>
          </div>
        </div>
      </div>   

      <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
        <div className="stat">
            <div className="stat-title">Region</div>
            <div className="stat-value text-primary">Europe</div>
        </div>
        <div className="stat">
            <div className="stat-title">Capital</div>
            <div className="stat-value text-secondary">Paris</div>
        </div>
        <div className="stat">
          <div className="stat-title">Coat Of Arms</div>
          <div className="relative h-32">
            <img src="https://mainfacts.com/media/images/coats_of_arms/fr.svg" alt="france" className="absolute w-full h-full object-cover" />
          </div>
        </div>
      </div>  

      <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
        <div className="stat">
          <div className="stat-title">Population</div>
          <div className="stat-value">67 391 582</div>
        </div>
        <div className="stat">
          <div className="stat-title">Languages</div>
          <div className="stat-value">French</div>
        </div>
        <div className="stat">
          <div className="stat-title">Currencies</div>
          <div className="stat-value">€</div>
          <div className="stat-desc">EURO</div>
        </div>
        <div className="stat">
          <div className="stat-title">Side</div>
          <div className="stat-value">Right</div>
          <div className="stat-desc">Car sign: F</div>
        </div>
      </div>
    </section>
  );
}

export default Profile;