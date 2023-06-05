'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useAppDispatch } from '@/GlobalRedux/hooks';

function WorldMap() {
  const chartRef = useRef(null);
  const dispatch = useAppDispatch();
  localStorage.clear();

  useEffect(() => {
    const width = 800;
    const height = 800;

    const projection = d3
      .geoOrthographic()
      .scale(350)
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

    d3.json('/world-countries.json').then((collection: any) => {
      const countries = svg
        .selectAll('path.country') // Sélectionner les balises <path> avec la classe 'country'
        .data(collection.features)
        .enter()
        .append('a') // Ajouter la balise <a> autour de chaque balise <path>
        //.attr('href', (d: any) => `#`) // Définir l'attribut href pour le lien
        .attr('href', (d: any) => `world/${d.id}`) // Définir l'attribut href pour le lien
        .append('path')
        .attr('d', (d: any) => path(d))
        .attr('class', 'country')
        .attr('id', (d: any) => d.id)
        .on('click', (event, d) => {
          const clickedPath = d3.select(event.currentTarget);
          const clickedPathD = clickedPath.attr('d');
          localStorage.setItem('path', clickedPathD);
        });

      d3.csv('/world-temperature.csv').then((data: any) => {
        const quantile = d3
          .scaleQuantile<number>()
          .domain([
            d3.min(data, (e: any) => parseFloat(e.temperature)!),
            d3.max(data, (e: any) => parseFloat(e.temperature)!),
          ])
          .range(d3.range(60).map((d: any) => parseFloat(d)));

        // LEGENDE INSERERE ICI LE CODE
        data.forEach((e: any) => {
          d3.select('#' + e.country).attr(
            'class',
            (d: any) => 'country temperature-' + quantile(+e.temperature)
          );
        });
      });
    });

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
  }, []);

  return <div ref={chartRef} />;
}

export default WorldMap;

