'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

function WorldMap() {
  const chartRef = useRef(null);
  const [countryName, setCountryName] = useState<string>('');

  useEffect(() => {
    const width = 800;
    const height = 800;

    if (localStorage) {
      localStorage.clear();
    }
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
        .selectAll('path.country')
        .data(collection.features)
        .enter()
        .append('a')
        .attr('href', (d: any) => `world/${d.id}`)
        .append('path')
        .attr('d', (d: any) => path(d))
        .attr('class', 'country')
        .attr('id', (d: any) => d.id)
        .attr('fill', 'white')
        .attr('stroke', 'gray')
        .attr('stroke-width', '.5px')
        .on('click', (event, d) => {
          const clickedPath = d3.select(event.currentTarget);
          const clickedPathD = clickedPath.attr('d');
          localStorage.setItem('path', clickedPathD);
        })
        .on('mouseover', function (event: any, d: any) {
          d3.select(this).style('fill', '#0ff');
          setCountryName(d.properties.name);
        })
        .on('mouseout', function (event: any, d: any) {
          d3.select(this).style('fill', '');
          setCountryName('');
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

  return (
    <div ref={chartRef}>
      <h1 className="alien-font text-center font-extrabold text-3xl tracking-wider shadow-neon">
        {countryName || 'Hover over a country'}
      </h1>
      <h2 className="text-center text-2xl font-bold">
        {countryName || 'Hover over a country'}
      </h2>
    </div>
  );
}

export default WorldMap;

// <div className="p-4 z-[1]">

// </div>
