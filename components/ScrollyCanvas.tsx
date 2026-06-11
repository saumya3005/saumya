'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { fetchFrameUrls, preloadImages } from '@/lib/preloadFrames';
import { AIMotionEngine } from '@/lib/aiMotion';
import { audioEngine } from '@/lib/audioEngine';

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // React state for loader progress
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadPercentage, setLoadPercentage] = useState(0);
  const [urlsCount, setUrlsCount] = useState(0);

  // References to bypass React render cycles
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const scrollProgressRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let active = true;

    async function loadAssets() {
      try {
        const urls = await fetchFrameUrls();
        if (!active) return;
        setUrlsCount(urls.length);

        if (urls.length > 0) {
          const loadedImages = await preloadImages(urls, (p) => {
            if (active) setLoadPercentage(p);
          });
          if (active) {
            setImages(loadedImages);
            imagesRef.current = loadedImages;
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load frames:', err);
        if (active) setLoading(false);
      }
    }

    loadAssets();

    // Mouse tracking for camera gaze look-at shifts
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current.x = (e.clientX / innerWidth) - 0.5;
      mouseRef.current.y = (e.clientY / innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      active = false;
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Three.js WebGL Rendering Loop & Engine Integration
  useEffect(() => {
    if (loading) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Detect user accessibility preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect device viewport category
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    // Adaptive Quality DPR allocation
    const dpr = isMobile 
      ? 1.0 
      : isTablet 
        ? 1.25 
        : Math.min(window.devicePixelRatio, 2);

    // Disable heavy shaders on mobile / low power devices
    const isLowPower = prefersReducedMotion || isMobile;

    // 1. Initialise Three.js WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isLowPower,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 2. Initialise Scene and Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07060a, isMobile ? 0.03 : 0.05); // Lighter fog on mobile

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8);

    // 3. Cinematic Spline Camera Paths
    const cameraSpline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 8),       // Section 0 Start
      new THREE.Vector3(1.2, 0.3, 7),   // Section 1 (About)
      new THREE.Vector3(-1.0, -0.2, 6.2), // Section 2 (Experience)
      new THREE.Vector3(0.6, 0.4, 6),   // Section 3 (Projects)
      new THREE.Vector3(0, 0, 5),       // Section 4 End (Contact)
    ]);

    // 4. Pre-create THREE.Texture pool to prevent real-time GPU upload bottlenecks
    const textures = imagesRef.current.map((img) => {
      const tex = new THREE.Texture(img);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      tex.needsUpdate = true; // Force upload in background
      return tex;
    });

    const quadGeo = new THREE.PlaneGeometry(1, 1);
    const quadMat = new THREE.MeshBasicMaterial({
      map: textures[0] || null,
      transparent: true,
      depthWrite: false,
    });
    const quadMesh = new THREE.Mesh(quadGeo, quadMat);
    scene.add(quadMesh);

    // Aspect ratio covering helper (Object-cover equivalent)
    const fitQuadToViewport = (imgWidth: number, imgHeight: number) => {
      const distance = camera.position.distanceTo(quadMesh.position);
      const fovRad = (camera.fov * Math.PI) / 180;
      const vHeight = 2 * Math.tan(fovRad / 2) * distance;
      const vWidth = vHeight * camera.aspect;

      const vRatio = vWidth / vHeight;
      const imgRatio = imgWidth / imgHeight;

      let scaleX = vWidth;
      let scaleY = vHeight;

      if (vRatio > imgRatio) {
        scaleY = vWidth / imgRatio;
      } else {
        scaleX = vHeight * imgRatio;
      }

      quadMesh.scale.set(scaleX, scaleY, 1);
      quadMesh.position.set(0, 0, 0); // Always face centered
    };

    // 5. Adaptive Particle Count (50 on Mobile, 120 on Tablet, 240 on Desktop)
    const particleCount = isLowPower ? 50 : isTablet ? 120 : 240;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const particleSpeeds: { radius: number; angle: number; speed: number; yOffset: number }[] = [];

    const themeColors = [
      new THREE.Color(0xE8D8EE),
      new THREE.Color(0xD0B1DD),
      new THREE.Color(0xBB8ECD),
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 8 + 1;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 8;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const color = themeColors[Math.floor(Math.random() * themeColors.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      particleSpeeds.push({
        radius,
        angle,
        speed: (Math.random() * 0.008 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
        yOffset: (Math.random() - 0.5) * 0.02,
      });
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      vertexShader: `
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = (10.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          if (dist > 0.5) discard;
          float strength = 1.0 - (dist * 2.0);
          gl_FragColor = vec4(vColor, strength * 0.35);
        }
      `,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Unreal Engine-inspired Post Processing Pass
    let renderTarget: THREE.WebGLRenderTarget | null = null;
    let postScene: THREE.Scene | null = null;
    let postCamera: THREE.OrthographicCamera | null = null;
    let postMat: THREE.ShaderMaterial | null = null;
    let postMesh: THREE.Mesh | null = null;

    if (!isLowPower) {
      renderTarget = new THREE.WebGLRenderTarget(
        window.innerWidth * dpr,
        window.innerHeight * dpr,
        {
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          format: THREE.RGBAFormat,
        }
      );

      postScene = new THREE.Scene();
      postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      
      postMat = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D tDiffuse;
          uniform float uTime;
          uniform float uScrollVelocity;
          varying vec2 vUv;

          // ACES Filmic Tone Mapping Curve
          vec3 ACESFilmic(vec3 x) {
            float a = 2.51;
            float b = 0.03;
            float c = 2.43;
            float d = 0.59;
            float e = 0.14;
            return clamp((x*(a*x+b))/(x*(c*x+d)+e), 0.0, 1.0);
          }

          // Pseudo-random noise for grain
          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
          }

          void main() {
            vec2 uv = vUv;
            vec2 distFromCenter = uv - 0.5;
            
            // 1. Chromatic Aberration
            float shift = 0.0022 * length(distFromCenter) * (1.0 + abs(uScrollVelocity) * 2.5);
            vec3 color;
            color.r = texture2D(tDiffuse, uv - vec2(shift, 0.0)).r;
            color.g = texture2D(tDiffuse, uv).g;
            color.b = texture2D(tDiffuse, uv + vec2(shift, 0.0)).b;
            
            // 2. Optimized cinematic focus blur (DoF)
            float blurScale = 0.0015 * smoothstep(0.12, 0.6, length(distFromCenter));
            if (blurScale > 0.0) {
              vec3 blurColor = vec3(0.0);
              float weight = 0.0;
              for (float xOffset = -1.5; xOffset <= 1.5; xOffset += 1.0) {
                for (float yOffset = -1.5; yOffset <= 1.5; yOffset += 1.0) {
                  vec2 offset = vec2(xOffset, yOffset) * blurScale;
                  blurColor += texture2D(tDiffuse, uv + offset).rgb;
                  weight += 1.0;
                }
              }
              color = mix(color, blurColor / weight, 0.5);
            }

            // 3. Subtle Bloom (Luminance glow)
            vec3 luminanceWeights = vec3(0.2126, 0.7152, 0.0722);
            float luminance = dot(color, luminanceWeights);
            vec3 bloom = vec3(0.0);
            if (luminance > 0.5) {
              bloom = color * 0.15;
            }
            color += bloom;

            // 4. Subtle Film Grain
            float grain = (hash(uv + uTime * 0.01) - 0.5) * 0.02;
            color += grain;

            // 5. Vignette (Soft shaded borders)
            float vignette = 1.0 - dot(distFromCenter, distFromCenter) * 0.75;
            color *= clamp(vignette, 0.0, 1.0);

            // 6. ACES Filmic Tone Mapping
            color = ACESFilmic(color);

            // Luxury pearl color grading tint
            vec3 luxuryTint = vec3(0.94, 0.90, 0.96);
            color = mix(color, color * luxuryTint, 0.1);

            gl_FragColor = vec4(color, 1.0);
          }
        `,
        uniforms: {
          tDiffuse: { value: renderTarget.texture },
          uTime: { value: 0 },
          uScrollVelocity: { value: 0 },
        },
      });

      postMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), postMat);
      postScene.add(postMesh);
    }

    // 7. Initialize AI Motion Engine
    const aiMotion = new AIMotionEngine(0);

    // 8. Animation & Physics Update Frame Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const dt = clock.getDelta();

      // Get predictive values from the AI Motion Engine
      aiMotion.setTarget(scrollProgressRef.current);
      const motionData = aiMotion.update();

      // Trigger Web Audio updates dynamically based on scroll velocity (attenuated gain)
      audioEngine.update(motionData.velocity * 0.7);

      // A. Drive Camera position along Spline
      const t = Math.max(0, Math.min(0.999, isLowPower ? motionData.current : motionData.anticipated));
      const targetCamPos = cameraSpline.getPointAt(t);
      
      if (isLowPower) {
        camera.position.copy(targetCamPos);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
      } else {
        camera.position.lerp(targetCamPos, 0.12);
        // Gaze camera tracking: offset target slightly based on mouse
        const targetLookAt = new THREE.Vector3(
          mouseRef.current.x * 0.4,
          mouseRef.current.y * 0.4,
          0
        );
        camera.lookAt(targetLookAt);
      }

      // B. Swap Textures from Pool (Instantly updates, removing CPU upload drops)
      if (textures.length > 0) {
        const frameIndex = Math.min(
          textures.length - 1,
          Math.max(0, Math.floor(motionData.current * textures.length))
        );
        const tex = textures[frameIndex];
        
        if (tex) {
          quadMat.map = tex;
          quadMat.needsUpdate = true;
          quadMesh.visible = true;
          fitQuadToViewport(tex.image.width, tex.image.height);
        }
      } else {
        quadMesh.visible = false;
      }

      // C. Swirl Particle System in 3D Space (Disable swirl on mobile/low-power for CPU safety)
      if (!isLowPower) {
        const positionsAttr = particleGeo.getAttribute('position') as THREE.BufferAttribute;
        const positionsArray = positionsAttr.array as Float32Array;

        const velocityImpact = Math.abs(motionData.velocity) * 1.0;

        for (let i = 0; i < particleCount; i++) {
          const pSpeed = particleSpeeds[i];
          pSpeed.angle += (pSpeed.speed + (pSpeed.speed > 0 ? 1 : -1) * velocityImpact * 0.02) * (dt * 60);
          
          const radius = pSpeed.radius * (1.0 + velocityImpact * 0.08);
          positionsArray[i * 3] = Math.cos(pSpeed.angle) * radius;
          positionsArray[i * 3 + 1] += pSpeed.yOffset * (1.0 + velocityImpact * 1.5);
          positionsArray[i * 3 + 2] = Math.sin(pSpeed.angle) * radius;

          if (Math.abs(positionsArray[i * 3 + 1]) > 5) {
            positionsArray[i * 3 + 1] = -positionsArray[i * 3 + 1] * 0.95;
          }
        }
        positionsAttr.needsUpdate = true;
        particles.rotation.y = elapsedTime * 0.025;
      }

      // D. Draw and Render Scene (Bypasses double pass entirely on mobile/prefers-reduced-motion)
      if (isLowPower || !renderer || !renderTarget || !postScene || !postCamera || !postMat) {
        renderer.render(scene, camera);
      } else {
        postMat.uniforms.uTime.value = elapsedTime;
        postMat.uniforms.uScrollVelocity.value = motionData.velocity;

        // Render main scene to texture, then screen quad with post-process filters
        renderer.setRenderTarget(renderTarget);
        renderer.render(scene, camera);
        
        renderer.setRenderTarget(null);
        renderer.render(postScene, postCamera);
      }
    };

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      const newIsMobile = w < 768;
      const newIsTablet = w >= 768 && w < 1024;
      const newDpr = newIsMobile 
        ? 1.0 
        : newIsTablet 
          ? 1.25 
          : Math.min(window.devicePixelRatio, 2);

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      
      renderer.setSize(w, h);
      renderer.setPixelRatio(newDpr);

      if (renderTarget) {
        renderTarget.setSize(w * newDpr, h * newDpr);
      }
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      renderer.dispose();
      quadGeo.dispose();
      quadMat.dispose();
      textures.forEach((tex) => tex.dispose());
      particleGeo.dispose();
      particleMat.dispose();
      
      if (renderTarget) renderTarget.dispose();
      if (postMat) postMat.dispose();
      if (postMesh) {
        postMesh.geometry.dispose();
      }
    };
  }, [loading]);

  // Sync scroll values from parent container
  useEffect(() => {
    const syncScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / totalScrollable));
      scrollProgressRef.current = p;
    };

    window.addEventListener('scroll', syncScroll);
    syncScroll();

    return () => {
      window.removeEventListener('scroll', syncScroll);
    };
  }, [loading]);

  return (
    <div
      ref={containerRef}
      id="scrolly-container"
      className="relative w-full h-[500vh] bg-[#07060A]"
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0 bg-[#07060A]">
        <canvas ref={canvasRef} className="block w-full h-full object-cover" />
        
        {/* Cinematic Film Vignette shadow backdrop overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#07060A] via-transparent to-transparent opacity-80 z-10" />

        {/* Loader Status Overlay */}
        {loading && urlsCount > 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#07060A] z-50 transition-opacity duration-700">
            <div className="text-[#E8D8EE] text-xs tracking-[0.3em] uppercase mb-4 opacity-75 font-mono drop-shadow-[0_0_10px_rgba(208,177,221,0.2)]">
              Synchronizing Engine
            </div>
            <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-[#D0B1DD] transition-all duration-300 shadow-[0_0_8px_rgba(208,177,221,0.5)]"
                style={{ width: `${loadPercentage}%` }}
              />
            </div>
            <div className="text-[10px] text-neutral-500 font-mono mt-2">
              {loadPercentage}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
