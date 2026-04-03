'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useScroll, ScrollControls, Scroll, Float, PerspectiveCamera, MeshDistortMaterial, Text, Backdrop, Sphere, Cylinder, MeshPhysicalMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';

// 🫀 The Procedural Heart Component
function HeartModel({ scroll }: { scroll: any }) {
  const heartGroup = useRef<THREE.Group>(null);
  const leftHalf = useRef<THREE.Group>(null);
  const rightHalf = useRef<THREE.Group>(null);
  const aorta = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selection, setSelection] = useState<any>(null);

  // Pathology Data
  const PATHOLOGY_DATA: any = {
    aorta: { title: 'The Aorta', anatomy: 'Primary artery leaving the heart.', diseases: 'Aortic Aneurysm, Aortic Stenosis, Aortitis' },
    valves: { title: 'Heart Valves', anatomy: 'Ensure one-way blood flow.', diseases: 'Mitral Valve Prolapse, Aortic Regurgitation' },
    ventricles: { title: 'Ventricles', anatomy: 'Lower pumping chambers.', diseases: 'Congestive Heart Failure, Myocardial Infarction' }
  };

  useFrame((state) => {
    const r = scroll.offset; // 0 to 1
    
    // 1. Biological Beating (Sinusoidal independent of scroll)
    const beat = 1 + Math.sin(state.clock.elapsedTime * 6) * 0.02;
    if (heartGroup.current) heartGroup.current.scale.set(beat, beat, beat);

    // 2. Phase 1-2: Approach (0 - 30%)
    const approachScale = 1 + r * 2;
    if (heartGroup.current) heartGroup.current.scale.multiplyScalar(approachScale);

    // 3. Phase 3: Dissection (30 - 50%)
    if (r > 0.3 && r < 0.8) {
      const split = (r - 0.3) * 5;
      if (leftHalf.current) leftHalf.current.position.x = -split;
      if (rightHalf.current) rightHalf.current.position.x = split;
    } else if (r <= 0.3) {
      if (leftHalf.current) leftHalf.current.position.x = 0;
      if (rightHalf.current) rightHalf.current.position.x = 0;
    }

    // 4. Phase 4: The Dive (50 - 80%)
    const diveZ = r > 0.5 ? (r - 0.5) * 40 : 0;
    state.camera.position.z = 10 - diveZ;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={heartGroup}>
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ff0000" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#00ffff" />

      <group ref={leftHalf}>
        <Sphere args={[2, 64, 64]} position={[-0.5, 0, 0]} onClick={() => setSelection(PATHOLOGY_DATA.ventricles)} onPointerOver={() => setHovered('ventricles')} onPointerOut={() => setHovered(null)}>
          <MeshDistortMaterial 
            color={hovered === 'ventricles' ? "#00f2ff" : "#b21818"} 
            speed={2} 
            distort={0.4} 
            roughness={0} 
            transmission={0.5} 
            thickness={2}
          />
        </Sphere>
      </group>

      <group ref={rightHalf}>
        <Sphere args={[2, 64, 64]} position={[0.5, 0, 0]} onClick={() => setSelection(PATHOLOGY_DATA.ventricles)}>
          <MeshDistortMaterial color="#b21818" speed={2} distort={0.4} transmission={0.5} thickness={2} />
        </Sphere>
      </group>

      <Cylinder 
        ref={aorta}
        args={[0.6, 0.4, 4, 32]} 
        position={[0, 3, -1]} 
        rotation={[0, 0, 0.5]}
        onClick={() => setSelection(PATHOLOGY_DATA.aorta)}
        onPointerOver={() => setHovered('aorta')}
        onPointerOut={() => setHovered(null)}
      >
        <MeshPhysicalMaterial 
          color={hovered === 'aorta' ? "#00f2ff" : "#8a1212"} 
          transmission={0.8} 
          thickness={1} 
        />
      </Cylinder>

      {selection && (
        <Scroll html>
          <div className="pathology-modal glass liquid-glass">
            <button className="close-btn" onClick={() => setSelection(null)}>×</button>
            <h2>{selection.title}</h2>
            <div className="info-section">
              <label>Anatomy:</label>
              <p>{selection.anatomy}</p>
            </div>
            <div className="info-section">
              <label>Diseases:</label>
              <p className="neon-cyan">{selection.diseases}</p>
            </div>
          </div>
        </Scroll>
      )}

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Text
          position={[5, 4, -10]}
          fontSize={1}
          color="#00f2ff"
          font="https://fonts.gstatic.com/s/fustat/v1/rax_HiCOvM0vOKr_zS-R.woff"
        >
          {scroll.offset > 0.5 ? "DIVE IN" : "HUMAN HEART"}
        </Text>
      </Float>

      <style jsx global>{`
        .pathology-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 400px;
          padding: 40px;
          border-radius: 24px;
          color: white;
          z-index: 1000;
          pointer-events: auto;
        }
        .close-btn {
          position: absolute;
          top: 15px; right: 20px;
          background: none; border: none; color: white;
          font-size: 2rem; cursor: pointer;
        }
        .pathology-modal h2 { color: #00f2ff; margin-bottom: 20px; font-size: 2rem; }
        .info-section { margin-bottom: 20px; }
        .info-section label { text-transform: uppercase; font-size: 0.7rem; letter-spacing: 2px; opacity: 0.6; }
        .neon-cyan { color: #00f2ff; font-weight: 700; text-shadow: 0 0 10px rgba(0, 242, 255, 0.4); }
      `}</style>
    </group>
  );
}

export default function HeartExperience() {
  return (
    <div className="heart-canvas-container">
      <Canvas shadows dpr={[1, 2]}>
        <color attach="background" args={['#000']} />
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        
        <ambientLight intensity={0.5} />
        <ScrollControls pages={4} damping={0.2}>
          <HeartModel scroll={useScroll()} />
          
          <Scroll html>
            <div className="story-layer">
              <section className="story-vignette" style={{ height: '100vh', opacity: 1 }}>
                <h1 className="cinematic-title">The Eternal Beat</h1>
                <p>100,000 pulses of life every single day.</p>
              </section>
              <section className="story-vignette" style={{ height: '100vh', opacity: 0.8 }}>
                <h2>A Masterpiece of Anatomy</h2>
              </section>
              <section className="story-vignette" style={{ height: '100vh' }}>
                <h2>The Dissection</h2>
                <p>Splitting the core to reveal the interior chambers.</p>
              </section>
              <section className="story-vignette" style={{ height: '100vh' }}>
                <h2>The Deep Dive</h2>
                <p>Descending through the valves into the ventricles.</p>
              </section>
            </div>
          </Scroll>
        </ScrollControls>

        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={1} luminanceSmoothing={0.9} height={300} />
          <Noise opacity={0.05} />
          <Vignette eskil={false} offset={0.1} darkness={1} />
        </EffectComposer>
      </Canvas>

      <style jsx>{`
        .heart-canvas-container {
          position: fixed;
          top: 0; left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 0;
        }
        .story-layer {
          width: 100vw;
          pointer-events: none;
        }
        .story-vignette {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          max-width: 800px;
          margin: 0 auto;
        }
        .cinematic-title {
          font-family: var(--font-brand);
          font-size: 5rem;
          margin-bottom: 20px;
          background: linear-gradient(to bottom, #fff, #94a3b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @media (max-width: 900px) {
          .cinematic-title { font-size: 3rem; }
        }
      `}</style>
    </div>
  );
}
