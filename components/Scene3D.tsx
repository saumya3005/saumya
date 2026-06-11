'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';

function FloatingGeometry() {
  const group = useRef<THREE.Group>(null);
  const { mouse, viewport } = useThree();

  useFrame((state) => {
    if (group.current) {
      // Gentle rotation
      group.current.rotation.x += 0.001;
      group.current.rotation.y += 0.002;
      
      // Subtle parallax based on mouse
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, (mouse.x * viewport.width) / 15, 0.05);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, (mouse.y * viewport.height) / 15, 0.05);
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1, 64, 64]} position={[-3, 2, -5]} scale={1.5}>
          <meshPhysicalMaterial 
            color="#D0B1DD"
            transmission={0.9}
            opacity={1}
            metalness={0}
            roughness={0}
            ior={1.5}
            thickness={0.5}
          />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[0.5, 32, 32]} position={[4, -1, -2]}>
          <meshBasicMaterial color="#E8D8EE" wireframe transparent opacity={0.3} />
        </Sphere>
      </Float>

      <Float speed={3} rotationIntensity={0.8} floatIntensity={1.5}>
        <Sphere args={[0.8, 64, 64]} position={[2, 3, -6]}>
          <meshPhysicalMaterial 
            color="#BB8ECD"
            transmission={0.8}
            opacity={1}
            metalness={0.1}
            roughness={0.1}
            ior={1.2}
          />
        </Sphere>
      </Float>
      
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[-4, -3, -4]} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1, 0.02, 16, 100]} />
          <meshBasicMaterial color="#DDC6E6" transparent opacity={0.4} />
        </mesh>
      </Float>
    </group>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#E8D8EE" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#BB8ECD" />
      
      <FloatingGeometry />
      
      <Stars 
        radius={50} 
        depth={50} 
        count={2000} 
        factor={3} 
        saturation={0.5} 
        fade 
        speed={0.5} 
      />
    </>
  );
}

export default function Scene3D() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Do not render complex 3D on mobile or if reduced motion is enabled
  if (isMobile || reducedMotion) return null;

  return (
    <div className="absolute inset-0 z-10 pointer-events-none w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]} // limit dpr for performance
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
