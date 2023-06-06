'use client';

import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";

function randomInSphere(count, radius) {
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

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => randomInSphere(5000, 1.2));

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color='#f272c8'
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
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