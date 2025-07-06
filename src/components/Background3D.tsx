
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

// 3D Robot Component
const Robot3D = ({ onClick }: { onClick: () => void }) => {
  const robotRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (robotRef.current) {
      // Gentle floating animation
      robotRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      // Subtle rotation
      robotRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      
      if (hovered) {
        robotRef.current.scale.setScalar(1.1 + Math.sin(state.clock.elapsedTime * 8) * 0.05);
      } else {
        robotRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <group 
      ref={robotRef} 
      position={[-3, 1, 0]}
      onClick={onClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Robot Head */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color={hovered ? "#4fc3f7" : "#90a4ae"} />
      </mesh>
      
      {/* Robot Eyes */}
      <mesh position={[-0.2, 1.3, 0.41]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial color="#1e88e5" emissive="#1e88e5" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.2, 1.3, 0.41]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial color="#1e88e5" emissive="#1e88e5" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Robot Body */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[1.2, 1.4, 0.8]} />
        <meshStandardMaterial color={hovered ? "#42a5f5" : "#78909c"} />
      </mesh>
      
      {/* Robot Arms */}
      <mesh position={[-0.8, 0.5, 0]} rotation={[0, 0, Math.sin(Date.now() * 0.002) * 0.2]}>
        <cylinderGeometry args={[0.15, 0.15, 1]} />
        <meshStandardMaterial color="#607d8b" />
      </mesh>
      <mesh position={[0.8, 0.5, 0]} rotation={[0, 0, -Math.sin(Date.now() * 0.002) * 0.2]}>
        <cylinderGeometry args={[0.15, 0.15, 1]} />
        <meshStandardMaterial color="#607d8b" />
      </mesh>
      
      {/* Robot Legs */}
      <mesh position={[-0.3, -0.8, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 1.2]} />
        <meshStandardMaterial color="#546e7a" />
      </mesh>
      <mesh position={[0.3, -0.8, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 1.2]} />
        <meshStandardMaterial color="#546e7a" />
      </mesh>
      
      {/* Robot Feet */}
      <mesh position={[-0.3, -1.5, 0.2]}>
        <boxGeometry args={[0.4, 0.2, 0.6]} />
        <meshStandardMaterial color="#37474f" />
      </mesh>
      <mesh position={[0.3, -1.5, 0.2]}>
        <boxGeometry args={[0.4, 0.2, 0.6]} />
        <meshStandardMaterial color="#37474f" />
      </mesh>
      
      {/* Glowing effect when hovered */}
      {hovered && (
        <pointLight position={[0, 0, 1]} color="#00bfff" intensity={0.5} distance={3} />
      )}
    </group>
  );
};

const Background3D: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleRobotClick = () => {
    setIsClicked(true);
    
    // Text-to-speech
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("Hey! I am Shourya's assistant");
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
    
    // Reset after animation
    setTimeout(() => setIsClicked(false), 2000);
  };

  return (
    <div className="absolute inset-0 pointer-events-auto z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#ff7043" intensity={0.3} />
        
        {/* 3D Robot */}
        <Robot3D onClick={handleRobotClick} />
        
        {/* Speech bubble when clicked */}
        {isClicked && (
          <Text
            position={[-1.5, 2.5, 0]}
            fontSize={0.3}
            color="#1e88e5"
            anchorX="center"
            anchorY="middle"
          >
            Hey! I am Shourya's assistant
          </Text>
        )}
        
        {/* Allow camera controls */}
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default Background3D;
