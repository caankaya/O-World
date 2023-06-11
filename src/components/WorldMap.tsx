'use client';

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/GlobalRedux/hooks';
import * as d3 from 'd3';

// interface pour les propriétés d'un pays.
interface CountryProperties {
  name: string;
}

// interface utilisée pour les éléments de données de pays.
interface CountryFeature {
  properties: CountryProperties;
  id: string;
}

function WorldMap() {
  const chartRef = useRef(null);
  const [countryName, setCountryName] = useState<string>('');
  const [searchText, setSearchText] = useState('');
  const worldWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);

  let countries: d3.Selection<d3.BaseType, CountryFeature, HTMLElement, any>;

  useEffect(() => {
    const width = 800;
    const height = 800;

    // Définir la projection
    const projection = d3
      .geoOrthographic()
      .scale(350)
      .translate([width / 2, height / 2])
      .clipAngle(90)
      .precision(0.1)
      .rotate([0, 0, 0]);

    // Définir le chemin de projection
    const path = d3.geoPath().projection(projection);

    // Ajouter le svg
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('id', 'world')
      .attr('width', width)
      .attr('height', height);

    // Ajouter la grille
    const graticule = d3.geoGraticule();
    svg
      .append('path')
      .datum(graticule())
      .attr('class', 'graticule')
      .attr('d', path);

    // Ajouter les pays avec une requete ajax + liens vers les pays
    d3.json('/world-countries.json').then((collection: any) => {
      countries = svg
        .selectAll('path.country')
        .data(collection.features)
        .enter()
        .append('a')
        .attr('href', (d: any) => `country/${d.id}`)
        .append('path')
        .attr('d', (d: any) => path(d))
        .attr('class', 'country')
        .attr('id', (d: any) => d.id)
        .attr('fill', 'white')
        .attr('stroke', 'gray')
        .attr('stroke-width', '.5px')
        .on('mouseover', function (event: any, d: any) {
          d3.select(this).style('fill', '#0ff');
          setCountryName(d.properties.name);
        })
        .on('mouseout', function (event: any, d: any) {
          d3.select(this).style('fill', '');
          setCountryName('');
        });
    });

    // gestion de la rotation du globe avec la souris
    const lambda = d3.scaleLinear().domain([0, width]).range([-180, 180]);
    const phi = d3.scaleLinear().domain([0, height]).range([90, -90]);
    const drag = d3
      .drag()
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
        svg.selectAll('.country').attr('d', (d: any) => path(d));
      });

    svg.call(drag as any);

    // Définir handleSearchChange dans le useeffect pour accéder aux autres variables comme countries
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value.toLowerCase();
      setSearchText(query);

      // Effectuer la recherche
      const matchedCountry = countries
        .data()
        .find((d) => d.properties.name.toLowerCase().includes(query));

      // Rset les couleur des pays
      countries.style('fill', '');

      if (matchedCountry) {
        // Surligner le pays recherché.
        d3.select(`#${matchedCountry.id}`).style('fill', '#0ff');

        // Rotation du globe pour centrer sur le pays recherché.
        const centroid = d3.geoCentroid(matchedCountry);
        projection.rotate([-centroid[0], -centroid[1]]);
        svg.selectAll('.graticule').datum(graticule()).attr('d', path);
        svg.selectAll('.country').attr('d', (d) => path(d));

        // Mettre à jour le nom du pays dans les balises h1 et h2
        setCountryName(matchedCountry.properties.name);
      } else {
        // Si aucun pays ne correspond à la recherche, réinitialiser le nom du pays
        setCountryName('');
      }
    };

    // Assigner handleSearchChange à une propriété globale
    chartRef.current.handleSearchChange = handleSearchChange;
  }, []);

  return (
    <div
      className={`z-[1] items-center p-4 grid justify-center ${
        isSideBarOpen ? 'float-right' : ''
      }`}
      style={isSideBarOpen ? { width: worldWidth } : {}}
    >
      <div ref={chartRef} className="flex flex-col items-center">
        <h1 className="alien-font text-center font-extrabold text-3xl tracking-wider shadow-neon">
          {countryName || 'Click on a country'}
        </h1>
        <h2 className="text-center text-2xl font-bold mb-2">
          {countryName || 'Click on a country'}
        </h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(event) => chartRef.current.handleSearchChange(event)}
          className="input input-bordered input-info input-sm w-full max-w-sm bg-transparent"
        />
        <span className="italic text-sm text-neutral-content">
          Use search if you don't know where to find it
        </span>
      </div>
    </div>
  );
}

export default WorldMap;
