"use client";

import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import type { RoomConfig } from "@/lib/room-data";

interface RoomShellProps {
  room: RoomConfig;
  children?: React.ReactNode;
  leftWallRef?: (el: THREE.Mesh | null) => void;
  rightWallRef?: (el: THREE.Mesh | null) => void;
}

export function RoomShell({ room, children, leftWallRef, rightWallRef }: RoomShellProps) {
  const [x, y, z] = room.position;
  const [w, h, d] = room.size;
  const wallThickness = 0.3;
  const doorWidth = 2;

  // Front wall is split into two halves with a door gap in the center
  const frontWallHalfWidth = (w - doorWidth) / 2;

  return (
    <group position={[x, y, z]}>
      {/* Floor */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[w, d]} />
          <meshStandardMaterial color={room.color} />
        </mesh>
      </RigidBody>

      {/* Back wall */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh castShadow receiveShadow position={[0, h / 2, -d / 2]}>
          <boxGeometry args={[w, h, wallThickness]} />
          <meshStandardMaterial color="#E8E0D0" />
        </mesh>
      </RigidBody>

      {/* Left wall */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh ref={leftWallRef} castShadow receiveShadow position={[-w / 2, h / 2, 0]}>
          <boxGeometry args={[wallThickness, h, d]} />
          <meshStandardMaterial color="#E8E0D0" />
        </mesh>
      </RigidBody>

      {/* Right wall */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh ref={rightWallRef} castShadow receiveShadow position={[w / 2, h / 2, 0]}>
          <boxGeometry args={[wallThickness, h, d]} />
          <meshStandardMaterial color="#E8E0D0" />
        </mesh>
      </RigidBody>

      {/* Front wall - left half */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          castShadow
          receiveShadow
          position={[-(doorWidth / 2 + frontWallHalfWidth / 2), h / 2, d / 2]}
        >
          <boxGeometry args={[frontWallHalfWidth, h, wallThickness]} />
          <meshStandardMaterial color="#E8E0D0" />
        </mesh>
      </RigidBody>

      {/* Front wall - right half */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          castShadow
          receiveShadow
          position={[doorWidth / 2 + frontWallHalfWidth / 2, h / 2, d / 2]}
        >
          <boxGeometry args={[frontWallHalfWidth, h, wallThickness]} />
          <meshStandardMaterial color="#E8E0D0" />
        </mesh>
      </RigidBody>

      {/* Door frame - left post */}
      <mesh position={[-doorWidth / 2 - 0.08, h / 2, d / 2]}>
        <boxGeometry args={[0.15, h, wallThickness + 0.05]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Door frame - right post */}
      <mesh position={[doorWidth / 2 + 0.08, h / 2, d / 2]}>
        <boxGeometry args={[0.15, h, wallThickness + 0.05]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Room name sign above door */}
      <mesh position={[0, h + 0.3, d / 2 + 0.1]}>
        <boxGeometry args={[doorWidth + 1, 0.5, 0.1]} />
        <meshStandardMaterial color="#2C1810" />
      </mesh>

      {children}
    </group>
  );
}
