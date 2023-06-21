/* eslint-disable no-nested-ternary */
import { useMediaQuery } from 'react-responsive';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useAppSelector } from '../GlobalRedux/hooks';
import { CountryFavorites } from '../@types/countryFavorites';

interface CountryProperties {
  name: string;
}

interface WorldData {
  features: CountryFeature[];
  // Autres propriétés présentes dans le fichier JSON, si nécessaire
}

interface CountryFeature {
  properties: CountryProperties;
  id: string;
  favorite: boolean;
  fill: string;
}

interface Props {
  favoritesCountries: CountryFavorites[];
  isLogged: boolean;
}

function WorldMap({ favoritesCountries, isLogged }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [countryName, setCountryName] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const worldWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    const scale = isLargeScreen ? 350 : 150;
    const width = isLargeScreen ? 800 : 400;
    const height = isLargeScreen ? 800 : 400;
    let countries: d3.Selection<
      SVGPathElement,
      CountryFeature,
      SVGSVGElement,
      unknown
    >;

    const projection = d3
      .geoOrthographic()
      .scale(scale)
      .translate([width / 2, height / 2])
      .clipAngle(90)
      .precision(0.1)
      .rotate([0, 0, 0]);

    const path = d3.geoPath().projection(projection);

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('id', 'world')
      .attr('width', width)
      .attr('height', height);

    const graticule = d3.geoGraticule();
    svg
      .append('path')
      .datum(graticule())
      .attr('class', 'graticule')
      .attr('d', path);

    d3.json('/world-countries.json').then((collection: WorldData) => {
      const filteredCollection: CountryFeature[] = collection.features.map(
        (feature: CountryFeature) => {
          const isFavorite =
            favoritesCountries &&
            favoritesCountries.some((favorite) => favorite.cca3 === feature.id);
          const favorite = isFavorite && isLogged; // Marquer comme favori uniquement si l'utilisateur est connecté
          return {
            ...feature,
            favorite,
          };
        }
      );

      countries = svg
        .selectAll<SVGPathElement, CountryFeature>('path.country')
        .data(filteredCollection)
        .enter()
        .append('a')
        .attr('href', (d: CountryFeature) => `country/${d.id}`)
        .append('path')
        .attr('d', (d: CountryFeature) => path(d))
        .attr('class', 'country')
        .attr('id', (d: CountryFeature) => d.id)
        .attr('fill', (d: CountryFeature) =>
          d.favorite ? ' #828df8' : 'white'
        )
        .attr('stroke', 'gray')
        .attr('stroke-width', '.5px')
        .on('mouseover', (event: MouseEvent, d: CountryFeature) => {
          if (d.favorite) {
            d3.select(event.currentTarget).style('fill', '#4ecca3');
            // Couleur différente pour les pays favoris lors du survol
          } else {
            d3.select(event.currentTarget).style('fill', '#3abff8');
          }
          setCountryName(d.properties.name);
        })
        .on('mouseout', () => {
          d3.select(event.currentTarget).style('fill', '');
          setCountryName('');
        });
    });
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value.toLowerCase();
      setSearchText(query);

      countries.style('fill', '');

      const matchedCountry: CountryFeature | undefined = countries
        .data()
        .find((d: CountryFeature) =>
          d.properties.name.toLowerCase().includes(query)
        );

      if (matchedCountry) {
        d3.select(`#${matchedCountry.id}`).style('fill', '#0ff');

        const centroid = d3.geoCentroid(matchedCountry);
        projection.rotate([-centroid[0], -centroid[1]]);
        svg.selectAll('.graticule').datum(graticule()).attr('d', path);
        svg.selectAll('.country').attr('d', (d: CountryFeature) => path(d));

        setCountryName(matchedCountry.properties.name);
      } else {
        setCountryName('');
      }
    };

    if (chartRef.current) {
      chartRef.current.handleSearchChange = handleSearchChange;
    }

    const lambda = d3.scaleLinear().domain([0, width]).range([-180, 180]);
    const phi = d3.scaleLinear().domain([0, height]).range([90, -90]);
    const drag = d3
      .drag<SVGSVGElement, unknown>()
      .subject(() => {
        const r = projection.rotate();
        return {
          x: lambda.invert(r[0]),
          y: phi.invert(r[1]),
        };
      })
      .on('drag', (event) => {
        projection.rotate([lambda(event.x), phi(event.y)]);
        svg.selectAll('.graticule').datum(graticule()).attr('d', path);
        svg.selectAll('.country').attr('d', (d: CountryFeature) => path(d));
      });

    svg.call(drag);
  }, [favoritesCountries, isLogged, isLargeScreen]);

  return (
    <div
      className="z-[1] items-center p-4 grid justify-center"
      style={
        isSideBarOpen
          ? isLargeScreen
            ? { width: worldWidth, float: 'right' }
            : { width: '100%', float: 'none' }
          : {}
      }
    >
      <div ref={chartRef} className="flex flex-col items-center">
        <h1 className="alien-font text-center font-extrabold text-xl md:text-3xl tracking-wider shadow-neon">
          {countryName || 'Click on a country'}
        </h1>
        <h2 className="orbitron-font text-center text-xl md:text-2xl font-bold mb-2">
          {countryName || 'Click on a country'}
        </h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(event) => chartRef.current?.handleSearchChange(event)}
          className="orbitron-font input input-bordered input-info input-sm max-w-sm bg-transparent md:w-full"
        />
        <p className="orbitron-font italic text-[10px] md:text-sm text-neutral-content">
          Type the name of the country if you don&apos;t know where it is
        </p>
      </div>
    </div>
  );
}

export default WorldMap;
