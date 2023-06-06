'use client';

import { useState, useRef, Suspense } from "react"; //  Suspense est un composant qui vous permet de "suspendre" le rendu de certaines parties du composant jusqu'à ce qu'une condition soit remplie 
import { Canvas, useFrame } from "@react-three/fiber"; // On importe ici les composants de la bibliothèque React pour travailler avec Three.js, Canvas est le composant principal qui crée une scène 3D, et useFrame est un Hook qui permet d'exécuter du code à chaque image de l'animation de la scène 3D
import { Points, PointMaterial, Preload } from "@react-three/drei"; // Points est un composant qui représente un nuage de points dans la scène 3D, PointMaterial est un matériau que on utilisze pour rendre ces points, et Preload est un utilitaire qui précharge toutes les ressources 3D.

function randomInSphere(count, radius) { // Cette fonction génère un certain nombre (count) de points aléatoires à l'intérieur d'une sphère de rayon donné (radius). Les points sont uniformément distribués dans la sphère. Les coordonnées de chaque point sont stockées dans un Float32Array
  let positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    let r = radius * Math.cbrt(Math.random());  // Cube root to get uniform distribution
    let theta = Math.random() * 2 * Math.PI;
    let phi = Math.acos(2 * Math.random() - 1);
    positions[3 * i] = r * Math.sin(phi) * Math.cos(theta);
    positions[3 * i + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[3 * i + 2] = r * Math.cos(phi);
  }
  return positions;
}

const Stars = (props) => { // Ceci est le composant principal qui génère les étoiles. Il utilise useRef pour conserver une référence à l'objet Points, useState pour stocker les positions initiales des étoiles, et useFrame pour faire tourner les étoiles à chaque image.
  const ref = useRef();
  const [sphere] = useState(() => randomInSphere(5000, 1.2));

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}> 
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}> {/* composant Points qui crée le nuage de points (étoiles). Il utilise les positions générées par la fonction randomInSphere et passe d'autres props à travers. */}
        <PointMaterial
          transparent
          color='#f272c8'
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        /> {/* composant PointMaterial qui définit le matériau des points. Il est transparent, de couleur rose, et a une taille de 0,002. */}
      </Points>
    </group>
  );
};

const StarsCanvas = () => { // Ceci est le composant principal qui crée la scène 3D. Il utilise le composant Canvas de @react-three/fiber pour créer la scène, et le composant Stars pour créer le nuage de points.
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};
'use client';

import { useState, useRef, Suspense } from "react"; //  Suspense est un composant qui vous permet de "suspendre" le rendu de certaines parties du composant jusqu'à ce qu'une condition soit remplie 
import { Canvas, useFrame } from "@react-three/fiber"; // On importe ici les composants de la bibliothèque React pour travailler avec Three.js, Canvas est le composant principal qui crée une scène 3D, et useFrame est un Hook qui permet d'exécuter du code à chaque image de l'animation de la scène 3D
import { Points, PointMaterial, Preload } from "@react-three/drei"; // Points est un composant qui représente un nuage de points dans la scène 3D, PointMaterial est un matériau que on utilisze pour rendre ces points, et Preload est un utilitaire qui précharge toutes les ressources 3D.

function randomInSphere(count, radius) { // Cette fonction génère un certain nombre (count) de points aléatoires à l'intérieur d'une sphère de rayon donné (radius). Les points sont uniformément distribués dans la sphère. Les coordonnées de chaque point sont stockées dans un Float32Array
  let positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    let r = radius * Math.cbrt(Math.random());  // Cube root to get uniform distribution
    let theta = Math.random() * 2 * Math.PI;
    let phi = Math.acos(2 * Math.random() - 1);
    positions[3 * i] = r * Math.sin(phi) * Math.cos(theta);
    positions[3 * i + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[3 * i + 2] = r * Math.cos(phi);
  }
  return positions;
}

const Stars = (props) => { // Ceci est le composant principal qui génère les étoiles. Il utilise useRef pour conserver une référence à l'objet Points, useState pour stocker les positions initiales des étoiles, et useFrame pour faire tourner les étoiles à chaque image.
  const ref = useRef();
  const [sphere] = useState(() => randomInSphere(5000, 1.2));

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}> 
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}> {/* composant Points qui crée le nuage de points (étoiles). Il utilise les positions générées par la fonction randomInSphere et passe d'autres props à travers. */}
        <PointMaterial
          transparent
          color='#f272c8'
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        /> {/* composant PointMaterial qui définit le matériau des points. Il est transparent, de couleur rose, et a une taille de 0,002. */}
      </Points>
    </group>
  );
};

const StarsCanvas = () => { // Ceci est le composant principal qui crée la scène 3D. Il utilise le composant Canvas de @react-three/fiber pour créer la scène, et le composant Stars pour créer le nuage de points.
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;