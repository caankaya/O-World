import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useAppSelector } from '../../GlobalRedux/hooks';
import AnimatedText from '../../utils/motion';

export default function Legal() {
  const aboutWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const [active, setActive] = useState(0);

  const handleSetActive = (index) => {
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
            Déclaration de confidentialité
          </div>
          <div className="collapse-content pr-10">
            <p>
              Cette déclaration de confidentialité décrit comment nous
              collectons, utilisons, stockons et protégeons les informations
              personnelles, y compris les adresses e-mail, que vous nous
              fournissez lorsque vous utilisez notre site. Nous nous engageons à
              respecter votre vie privée et à protéger vos informations
              personnelles conformément aux lois et réglementations applicables,
              y compris le Règlement général sur la protection des données
              (RGPD).
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
            Collecte et utilisation des informations
          </div>
          <div className="collapse-content pr-10">
            <p>
              Lorsque vous utilisez notre site, nous collectons et stockons les
              adresses e-mail que vous nous fournissez volontairement. Ces
              informations sont collectées dans le but spécifique de vous
              fournir un service personnalisé. Nous ne revendrons pas, ne
              louerons pas et ne partagerons pas vos adresses e-mail avec des
              tiers sans votre consentement explicite.
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
            Sécurité des données
          </div>
          <div className="collapse-content">
            <p>
              Nous prenons des mesures appropriées pour protéger les
              informations personnelles que vous nous fournissez contre la
              perte, l'accès non autorisé, la divulgation, l'altération ou la
              destruction. Nous mettons en œuvre des mesures de sécurité
              techniques, administratives et physiques pour assurer la sécurité
              et la confidentialité de vos informations personnelles.
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
            Responsabilité des données erronées
          </div>
          <div className="collapse-content">
            <p>
              Nous nous efforçons de fournir des informations précises et à jour
              sur notre site. Cependant, nous déclinons toute responsabilité en
              cas de données erronées, incomplètes ou obsolètes sur le site. Les
              informations fournies sur notre site sont fournies à titre
              indicatif et ne doivent pas être considérées comme des conseils
              professionnels ou des décisions définitives. Nous vous
              encourageons à vérifier les informations auprès de sources
              officielles ou à contacter les organismes concernés pour obtenir
              des informations précises et à jour.
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
            Liens vers des tiers
          </div>
          <div className="collapse-content">
            <p>
              Notre site peut contenir des liens vers des sites web de tiers qui
              ont leurs propres politiques de confidentialité. Nous ne sommes
              pas responsables des pratiques de confidentialité ou du contenu de
              ces sites web. Nous vous encourageons à lire attentivement les
              politiques de confidentialité de ces sites tiers avant de fournir
              vos informations personnelles.
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
            Vos droits en matière de protection des données
          </div>
          <div className="collapse-content">
            <p>
              Vous avez le droit d'accéder, de corriger, de supprimer ou de
              limiter l'utilisation de vos informations personnelles. Vous
              pouvez également vous opposer au traitement de vos informations
              personnelles ou demander la portabilité de ces informations. Pour
              exercer vos droits ou poser des questions concernant notre
              politique de confidentialité, veuillez nous contacter aux
              coordonnées fournies ci-dessous.
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
            Coordonnées{' '}
          </div>
          <div className="collapse-content">
            <p>
              Si vous avez des questions, des préoccupations ou des demandes
              concernant notre politique de confidentialité ou nos pratiques en
              matière de protection des données, veuillez nous contacter à
              l'adresse suivante :oworld@oworld.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
