"use client";

import { RigidBody } from "@react-three/rapier";

/* ------------------------------------------------------------------ */
/*  Reusable sub-components                                           */
/* ------------------------------------------------------------------ */

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Upper foliage cone */}
      <mesh position={[0, 3.2, 0]} castShadow>
        <coneGeometry args={[0.8, 1.6, 6]} />
        <meshStandardMaterial color="#2d5a27" />
      </mesh>
      {/* Lower foliage cone */}
      <mesh position={[0, 2.2, 0]} castShadow>
        <coneGeometry args={[1.2, 2, 6]} />
        <meshStandardMaterial color="#3a7d32" />
      </mesh>
      {/* Trunk */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.25, 1.2, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  );
}

function Bench({
  position,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <group position={position} rotation={rotation}>
        {/* Seat */}
        <mesh position={[0, 0.45, 0]} castShadow>
          <boxGeometry args={[1.8, 0.08, 0.5]} />
          <meshStandardMaterial color="#a0522d" />
        </mesh>
        {/* Left leg */}
        <mesh position={[-0.7, 0.2, 0]} castShadow>
          <boxGeometry args={[0.1, 0.4, 0.4]} />
          <meshStandardMaterial color="#6b3a1f" />
        </mesh>
        {/* Right leg */}
        <mesh position={[0.7, 0.2, 0]} castShadow>
          <boxGeometry args={[0.1, 0.4, 0.4]} />
          <meshStandardMaterial color="#6b3a1f" />
        </mesh>
      </group>
    </RigidBody>
  );
}

function FlagPole({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Pole */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.05, 5, 8]} />
        <meshStandardMaterial color="#b0b0b0" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Saffron stripe */}
      <mesh position={[0.5, 4.6, 0]}>
        <boxGeometry args={[0.9, 0.25, 0.02]} />
        <meshStandardMaterial color="#FF9933" />
      </mesh>
      {/* White stripe */}
      <mesh position={[0.5, 4.35, 0]}>
        <boxGeometry args={[0.9, 0.25, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      {/* Green stripe */}
      <mesh position={[0.5, 4.1, 0]}>
        <boxGeometry args={[0.9, 0.25, 0.02]} />
        <meshStandardMaterial color="#138808" />
      </mesh>
    </group>
  );
}

function SchoolNameBoard({
  position,
}: {
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      {/* Dark backing rectangle */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[4, 1.2, 0.15]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      {/* White inner rectangle */}
      <mesh position={[0, 2, 0.08]}>
        <boxGeometry args={[3.6, 0.9, 0.02]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                       */
/* ------------------------------------------------------------------ */

export function Decorations() {
  return (
    <group>
      {/* Trees around campus edges */}
      <Tree position={[-12, 0, -12]} />
      <Tree position={[12, 0, -12]} />
      <Tree position={[-12, 0, 6]} />
      <Tree position={[12, 0, 6]} />
      <Tree position={[-10, 0, -4]} />
      <Tree position={[10, 0, -4]} />
      <Tree position={[-8, 0, 10]} />
      <Tree position={[8, 0, 10]} />

      {/* Benches near the path */}
      <Bench position={[3, 0, -4]} rotation={[0, 0.3, 0]} />
      <Bench position={[-3, 0, -2]} rotation={[0, -0.2, 0]} />
      <Bench position={[4, 0, 4]} rotation={[0, Math.PI / 4, 0]} />

      {/* Flag pole near spawn */}
      <FlagPole position={[-3, 0, 6]} />

      {/* School name board near entrance */}
      <SchoolNameBoard position={[0, 0, 8]} />
    </group>
  );
}
