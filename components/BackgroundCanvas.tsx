'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSpheres() {
  const sphereRef1 = useRef<THREE.Mesh>(null);
  const sphereRef2 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (sphereRef1.current) {
      sphereRef1.current.rotation.x = t * 0.1;
      sphereRef1.current.rotation.y = t * 0.15;
    }
    if (sphereRef2.current) {
      sphereRef2.current.rotation.x = t * -0.1;
      sphereRef2.current.rotation.y = t * -0.15;
    }
  });

  return (
    <>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Sphere ref={sphereRef1} args={[1, 64, 64]} position={[-4, 2, -5]}>
          <MeshDistortMaterial
            color="#7c3aed" // purple
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            transparent
            opacity={0.15}
          />
        </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <Sphere ref={sphereRef2} args={[1.2, 64, 64]} position={[4, -2, -6]}>
          <MeshDistortMaterial
            color="#06b6d4" // cyan
            attach="material"
            distort={0.5}
            speed={1.5}
            roughness={0.2}
            transparent
            opacity={0.15}
          />
        </Sphere>
      </Float>
    </>
  );
}

function ConnectionLines() {
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, colors } = useMemo(() => {
    const numPoints = 150;
    const positions = new Float32Array(numPoints * 3);
    const colors = new Float32Array(numPoints * 3);
    
    for (let i = 0; i < numPoints; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;

      const color = new THREE.Color(Math.random() > 0.5 ? '#7c3aed' : '#06b6d4');
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  useFrame(({ clock }) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial vertexColors transparent opacity={0.1} />
    </lineSegments>
  );
}

export default function BackgroundCanvas() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-zinc-950">
      {/* CSS Blur Overlays for Aurora Effect */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-accent-purple/10 blur-[120px] rounded-full mix-blend-screen opacity-50 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-accent-blue/10 blur-[120px] rounded-full mix-blend-screen opacity-50 animate-pulse" style={{ animationDuration: '10s' }} />

      {/* WebGL Canvas */}
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <AnimatedSpheres />
        <ConnectionLines />
      </Canvas>
    </div>
  );
}
