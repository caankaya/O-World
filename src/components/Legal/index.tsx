import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useAppSelector } from '../../GlobalRedux/hooks';
import AnimatedText from '../../utils/motion';

export default function Legal() {
  const aboutWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const [active, setActive] = useState(0);

  const handleSetActive = (index: number) => {
    setActive(index === active ? -1 : index);
  };

  return (
    <section
      className="p-4 flex flex-col items-center justify-center orbitron-font"
      style={
        isSideBarOpen
          ? isLargeScreen
            ? { width: aboutWidth, float: 'right' }
            : { width: '100%', float: 'none' }
          : {}
      }
    >
      <div className="container px-4 mx-auto w-full">
        <div className="xl:max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-7xl gradient-text font-bold tracking-widest leading-tight">
            Legal
          </h1>
          <AnimatedText text="TEAM" />
          <p className="text-lg md:text-xl text-white font-medium">
            Even in space, respect for users is important
          </p>
        </div>
      </div>

      <div className="orbitron-font w-full flex flex-col items-center justify-center gap-2 shadow m-16">
        <div
          className={`collapse collapse-arrow ${
            active === 0 ? 'bg-base-100' : 'bg-base-200'
          } p-6`}
        >
          <input
            type="radio"
            name="my-accordion-2"
            checked={active === 0}
            onChange={() => handleSetActive(0)}
          />
          <div
            className={`collapse-title text-2xl font-bold ${
              active === 0 ? 'text-primary' : 'text-white'
            }`}
          >
            Privacy statement
          </div>
          <div className="collapse-content pr-10">
            <p>
              This privacy statement describes how we collect, use, store and
              protect the personal information information, including e-mail
              addresses, that you provide to us when you use our site. We are
              committed to respect your privacy and protect your personal
              information in accordance with applicable laws and regulations,
              including the General Data Protection Regulation (RGPD).
            </p>
          </div>
        </div>
        <div
          className={`collapse collapse-arrow ${
            active === 1 ? 'bg-base-100' : 'bg-base-200'
          } p-6`}
        >
          <input
            type="radio"
            name="my-accordion-2"
            checked={active === 1}
            onChange={() => handleSetActive(1)}
          />
          <div
            className={`collapse-title text-2xl font-bold ${
              active === 1 ? 'text-primary' : 'text-white'
            }`}
          >
            Collecting and using information
          </div>
          <div className="collapse-content pr-10">
            <p>
              When you use our site, we collect and store the e-mail addresses
              e-mail addresses that you voluntarily provide to us. This
              information is collected for the specific purpose of providing
              provide you with a personalized service. We will not resell rent
              or share your e-mail addresses with any third party without your
              explicit consent.
            </p>
          </div>
        </div>
        <div
          className={`collapse collapse-arrow ${
            active === 2 ? 'bg-base-100' : 'bg-base-200'
          } p-6`}
        >
          <input
            type="radio"
            name="my-accordion-2"
            checked={active === 2}
            onChange={() => handleSetActive(2)}
          />
          <div
            className={`collapse-title text-2xl font-bold ${
              active === 2 ? 'text-primary' : 'text-white'
            }`}
          >
            Data security
          </div>
          <div className="collapse-content">
            <p>
              We take appropriate measures to protect the personal personal
              information you provide against loss, unauthorized unauthorized
              access, disclosure, alteration or destruction. destruction. We
              implement technical, administrative and physical and physical
              security measures to ensure the security and confidentiality of
              your personal information.
            </p>
          </div>
        </div>
        <div
          className={`collapse collapse-arrow ${
            active === 3 ? 'bg-base-100' : 'bg-base-200'
          } p-6`}
        >
          <input
            type="radio"
            name="my-accordion-2"
            checked={active === 3}
            onChange={() => handleSetActive(3)}
          />
          <div
            className={`collapse-title text-2xl font-bold ${
              active === 3 ? 'text-primary' : 'text-white'
            }`}
          >
            Liability for incorrect data
          </div>
          <div className="collapse-content">
            <p>
              We make every effort to provide accurate and up-to-date
              information information on our site. However, we accept no
              liability for for incorrect, incomplete or out-of-date information
              on the site. The information provided on our site is for
              information purposes and should not be construed as professional
              advice or definitive or definitive decisions. We encourage you
              encourage you to verify the information with official sources
              sources or contact the relevant organizations to obtain accurate
              accurate and up-to-date information.
            </p>
          </div>
        </div>
        <div
          className={`collapse collapse-arrow ${
            active === 4 ? 'bg-base-100' : 'bg-base-200'
          } p-6`}
        >
          <input
            type="radio"
            name="my-accordion-2"
            checked={active === 4}
            onChange={() => handleSetActive(4)}
          />
          <div
            className={`collapse-title text-2xl font-bold ${
              active === 4 ? 'text-primary' : 'text-white'
            }`}
          >
            Sources
          </div>
          <div className="collapse-content">
            <p>- World Bank - Rest Country - Radio Browser - Ninja API</p>
          </div>
        </div>
        <div
          className={`collapse collapse-arrow ${
            active === 5 ? 'bg-base-100' : 'bg-base-200'
          } p-6`}
        >
          <input
            type="radio"
            name="my-accordion-2"
            checked={active === 5}
            onChange={() => handleSetActive(5)}
          />
          <div
            className={`collapse-title text-2xl font-bold ${
              active === 5 ? 'text-primary' : 'text-white'
            }`}
          >
            Links to third parties
          </div>
          <div className="collapse-content">
            <p>
              Our site may contain links to third-party websites that have their
              own have their own privacy policies. We are not responsible for
              the privacy practices or the content of such websites. of these
              websites. We encourage you to read the privacy policies the
              privacy policies of these third-party sites before providing your
              personal information.
            </p>
          </div>
        </div>
        <div
          className={`collapse collapse-arrow ${
            active === 6 ? 'bg-base-100' : 'bg-base-200'
          } p-6`}
        >
          <input
            type="radio"
            name="my-accordion-2"
            checked={active === 6}
            onChange={() => handleSetActive(6)}
          />
          <div
            className={`collapse-title text-2xl font-bold ${
              active === 6 ? 'text-primary' : 'text-white'
            }`}
          >
            Your data protection rights
          </div>
          <div className="collapse-content">
            <p>
              You have the right to access, correct, delete or restrict limit
              the use of your personal information. You may also object to the
              processing of your personal information or request the portability
              of this information. To exercise your rights or ask questions
              about our privacy policy, please contact us using the contact
              details contact details provided below.
            </p>
          </div>
        </div>
        <div
          className={`collapse collapse-arrow ${
            active === 7 ? 'bg-base-100' : 'bg-base-200'
          } p-6`}
        >
          <input
            type="radio"
            name="my-accordion-2"
            checked={active === 7}
            onChange={() => handleSetActive(7)}
          />
          <div
            className={`collapse-title text-2xl font-bold ${
              active === 7 ? 'text-primary' : 'text-white'
            }`}
          >
            Contact
          </div>
          <div className="collapse-content">
            <p>
              If you have any questions, concerns or requests about our privacy
              policy or data protection practices, please please contact us at
              the following address :oworld.entreprise@gmail.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
