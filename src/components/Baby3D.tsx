import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface Baby3DProps {
  week: number;
}

const Embryo = ({ week }: { week: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const scale = 0.3 + (week - 4) * 0.05;
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[scale, 32, 32]}>
        <MeshDistortMaterial
          color="#fcd5ce"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.4}
          metalness={0.1}
        />
      </Sphere>
    </Float>
  );
};

const EarlyFetus = ({ week }: { week: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const bodyScale = 0.3 + (week - 10) * 0.03;
  const headScale = bodyScale * 1.2;
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Cabeça */}
        <Sphere args={[headScale, 32, 32]} position={[0, bodyScale * 1.2, 0]}>
          <MeshDistortMaterial
            color="#fcd5ce"
            distort={0.15}
            speed={1.5}
            roughness={0.5}
            metalness={0.1}
          />
        </Sphere>
        
        {/* Corpo */}
        <Sphere args={[bodyScale, 32, 32]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#fcd5ce"
            distort={0.2}
            speed={1.5}
            roughness={0.5}
            metalness={0.1}
          />
        </Sphere>
        
        {/* Braços */}
        <Sphere args={[bodyScale * 0.25, 16, 16]} position={[-bodyScale * 1.2, bodyScale * 0.3, 0]}>
          <meshStandardMaterial color="#fcd5ce" roughness={0.5} />
        </Sphere>
        <Sphere args={[bodyScale * 0.25, 16, 16]} position={[bodyScale * 1.2, bodyScale * 0.3, 0]}>
          <meshStandardMaterial color="#fcd5ce" roughness={0.5} />
        </Sphere>
        
        {/* Pernas */}
        <Sphere args={[bodyScale * 0.3, 16, 16]} position={[-bodyScale * 0.5, -bodyScale * 1.1, 0]}>
          <meshStandardMaterial color="#fcd5ce" roughness={0.5} />
        </Sphere>
        <Sphere args={[bodyScale * 0.3, 16, 16]} position={[bodyScale * 0.5, -bodyScale * 1.1, 0]}>
          <meshStandardMaterial color="#fcd5ce" roughness={0.5} />
        </Sphere>
      </group>
    </Float>
  );
};

const DevelopedBaby = ({ week }: { week: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const bodyScale = 0.4 + (week - 20) * 0.015;
  const headScale = bodyScale * 0.9;
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
      <group ref={groupRef}>
        {/* Cabeça */}
        <Sphere args={[headScale, 32, 32]} position={[0, bodyScale * 1.5, 0]}>
          <MeshDistortMaterial
            color="#fcd5ce"
            distort={0.1}
            speed={1}
            roughness={0.5}
            metalness={0.1}
          />
        </Sphere>
        
        {/* Corpo */}
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[bodyScale * 0.7, bodyScale * 1.2, 16, 32]} />
          <MeshDistortMaterial
            color="#fcd5ce"
            distort={0.08}
            speed={1}
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
        
        {/* Braços */}
        <mesh position={[-bodyScale * 1.3, bodyScale * 0.5, bodyScale * 0.3]} rotation={[0.5, 0, 0.8]}>
          <capsuleGeometry args={[bodyScale * 0.15, bodyScale * 0.6, 8, 16]} />
          <meshStandardMaterial color="#fcd5ce" roughness={0.5} />
        </mesh>
        <mesh position={[bodyScale * 1.3, bodyScale * 0.5, bodyScale * 0.3]} rotation={[0.5, 0, -0.8]}>
          <capsuleGeometry args={[bodyScale * 0.15, bodyScale * 0.6, 8, 16]} />
          <meshStandardMaterial color="#fcd5ce" roughness={0.5} />
        </mesh>
        
        {/* Pernas dobradas */}
        <mesh position={[-bodyScale * 0.4, -bodyScale * 1.2, bodyScale * 0.4]} rotation={[1.2, 0, 0.3]}>
          <capsuleGeometry args={[bodyScale * 0.2, bodyScale * 0.8, 8, 16]} />
          <meshStandardMaterial color="#fcd5ce" roughness={0.5} />
        </mesh>
        <mesh position={[bodyScale * 0.4, -bodyScale * 1.2, bodyScale * 0.4]} rotation={[1.2, 0, -0.3]}>
          <capsuleGeometry args={[bodyScale * 0.2, bodyScale * 0.8, 8, 16]} />
          <meshStandardMaterial color="#fcd5ce" roughness={0.5} />
        </mesh>
        
        {/* Cordão umbilical */}
        <mesh position={[0, -bodyScale * 0.3, bodyScale * 0.8]}>
          <torusGeometry args={[bodyScale * 0.3, bodyScale * 0.08, 8, 32, Math.PI]} />
          <meshStandardMaterial color="#d97b9f" roughness={0.6} />
        </mesh>
      </group>
    </Float>
  );
};

const AmnioticSac = ({ week }: { week: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const scale = 1.5 + (week / 40) * 0.8;
  
  useFrame((state) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.MeshStandardMaterial).opacity = 
        0.15 + Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  return (
    <Sphere ref={meshRef} args={[scale, 64, 64]}>
      <meshStandardMaterial
        color="#a855f7"
        transparent
        opacity={0.2}
        roughness={0.1}
        metalness={0.3}
        side={THREE.BackSide}
      />
    </Sphere>
  );
};

const UterusWall = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.MeshStandardMaterial).opacity = 
        0.25 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2.8, 64, 64]}>
      <meshStandardMaterial
        color="#ec4899"
        transparent
        opacity={0.3}
        roughness={0.3}
        metalness={0.2}
        side={THREE.BackSide}
      />
    </Sphere>
  );
};

const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1 + Math.random() * 1.2;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={100}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#f0abfc"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const Scene = ({ week }: { week: number }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ec4899" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
      <spotLight
        position={[0, 5, 5]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        color="#ffffff"
      />
      
      <UterusWall />
      <AmnioticSac week={week} />
      <Particles />
      
      {week < 10 ? (
        <Embryo week={week} />
      ) : week < 20 ? (
        <EarlyFetus week={week} />
      ) : (
        <DevelopedBaby week={week} />
      )}
      
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={2}
        maxDistance={5}
        autoRotate
        autoRotateSpeed={0.5}
      />
      <Environment preset="sunset" />
    </>
  );
};

export const Baby3D = ({ week }: Baby3DProps) => {
  return (
    <div className="relative w-full h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/40 via-pink-800/30 to-indigo-900/40 backdrop-blur-sm border border-purple-500/20">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Scene week={week} />
      </Canvas>
      
      {/* Overlay com gradiente */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-purple-900/30 via-transparent to-pink-900/20 rounded-2xl" />
      
      {/* Indicador de semana */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-5 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-purple-500/40">
        {week} semanas
      </div>
      
      {/* Dica de interação */}
      <div className="absolute top-3 right-3 text-white/50 text-xs">
        👆 Arraste para girar
      </div>
    </div>
  );
};

export default Baby3D;
