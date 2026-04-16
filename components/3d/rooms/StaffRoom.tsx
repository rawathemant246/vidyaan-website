"use client";

import { useMemo } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { RoomShell } from "./RoomShell";
import { DoorTrigger } from "./DoorTrigger";
import { useRoomTransformation } from "./RoomTransformation";
import { ROOMS } from "@/lib/room-data";

const room = ROOMS.find((r) => r.id === 4)!;

export function StaffRoom() {
  const roomCenter = useMemo(
    () => new THREE.Vector3(...room.position),
    []
  );

  const {
    setWallRef,
    setProblemRef,
    setSolutionRef,
    problemTextRef,
    solutionTextRef,
    statTextRef,
    triggerTransformation,
  } = useRoomTransformation({ roomId: room.id, roomCenter });

  const [rx, , rz] = room.position;
  const [rw, , rd] = room.size;

  return (
    <>
      <RoomShell
        room={room}
        leftWallRef={setWallRef(0)}
        rightWallRef={setWallRef(1)}
      >
        {/* ===== PROBLEM OBJECTS (visible initially) ===== */}

        {/* Teacher 1 at desk buried in papers */}
        <group ref={setProblemRef(0)} position={[-2, 0, -1]}>
          {/* Desk */}
          <mesh castShadow position={[0, 0.55, 0]}>
            <boxGeometry args={[1.4, 0.08, 0.9]} />
            <meshStandardMaterial color="#8B6914" />
          </mesh>
          {/* Desk legs */}
          <mesh position={[-0.6, 0.27, -0.35]}>
            <boxGeometry args={[0.06, 0.54, 0.06]} />
            <meshStandardMaterial color="#8B6914" />
          </mesh>
          <mesh position={[0.6, 0.27, -0.35]}>
            <boxGeometry args={[0.06, 0.54, 0.06]} />
            <meshStandardMaterial color="#8B6914" />
          </mesh>
          <mesh position={[-0.6, 0.27, 0.35]}>
            <boxGeometry args={[0.06, 0.54, 0.06]} />
            <meshStandardMaterial color="#8B6914" />
          </mesh>
          <mesh position={[0.6, 0.27, 0.35]}>
            <boxGeometry args={[0.06, 0.54, 0.06]} />
            <meshStandardMaterial color="#8B6914" />
          </mesh>
          {/* Paper piles */}
          <mesh position={[-0.4, 0.65, 0]}>
            <boxGeometry args={[0.4, 0.12, 0.35]} />
            <meshStandardMaterial color="#FFFACD" />
          </mesh>
          <mesh position={[0.3, 0.68, 0.1]}>
            <boxGeometry args={[0.35, 0.18, 0.3]} />
            <meshStandardMaterial color="#FFF8DC" />
          </mesh>
          {/* Teacher body (sitting behind desk) */}
          <mesh castShadow position={[0, 1.0, -0.5]}>
            <boxGeometry args={[0.5, 0.8, 0.3]} />
            <meshStandardMaterial color="#4A4A4A" />
          </mesh>
          {/* Head */}
          <mesh castShadow position={[0, 1.65, -0.5]}>
            <sphereGeometry args={[0.22, 8, 8]} />
            <meshStandardMaterial color="#F4C28F" />
          </mesh>
          {/* Coffee cup */}
          <mesh castShadow position={[0.5, 0.65, -0.2]}>
            <cylinderGeometry args={[0.06, 0.05, 0.12, 8]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
        </group>

        {/* Teacher 2 at desk buried in papers */}
        <group ref={setProblemRef(1)} position={[2, 0, -1]}>
          {/* Desk */}
          <mesh castShadow position={[0, 0.55, 0]}>
            <boxGeometry args={[1.4, 0.08, 0.9]} />
            <meshStandardMaterial color="#8B6914" />
          </mesh>
          {/* Desk legs */}
          <mesh position={[-0.6, 0.27, -0.35]}>
            <boxGeometry args={[0.06, 0.54, 0.06]} />
            <meshStandardMaterial color="#8B6914" />
          </mesh>
          <mesh position={[0.6, 0.27, -0.35]}>
            <boxGeometry args={[0.06, 0.54, 0.06]} />
            <meshStandardMaterial color="#8B6914" />
          </mesh>
          <mesh position={[-0.6, 0.27, 0.35]}>
            <boxGeometry args={[0.06, 0.54, 0.06]} />
            <meshStandardMaterial color="#8B6914" />
          </mesh>
          <mesh position={[0.6, 0.27, 0.35]}>
            <boxGeometry args={[0.06, 0.54, 0.06]} />
            <meshStandardMaterial color="#8B6914" />
          </mesh>
          {/* Paper piles */}
          <mesh position={[0, 0.65, 0.1]}>
            <boxGeometry args={[0.5, 0.15, 0.4]} />
            <meshStandardMaterial color="#FFEFD5" />
          </mesh>
          <mesh position={[-0.3, 0.62, -0.2]}>
            <boxGeometry args={[0.3, 0.08, 0.3]} />
            <meshStandardMaterial color="#FFFACD" />
          </mesh>
          {/* Teacher body */}
          <mesh castShadow position={[0, 1.0, -0.5]}>
            <boxGeometry args={[0.5, 0.8, 0.3]} />
            <meshStandardMaterial color="#2C3E50" />
          </mesh>
          {/* Head */}
          <mesh castShadow position={[0, 1.65, -0.5]}>
            <sphereGeometry args={[0.22, 8, 8]} />
            <meshStandardMaterial color="#D2B48C" />
          </mesh>
          {/* Coffee cup */}
          <mesh castShadow position={[-0.5, 0.65, 0.2]}>
            <cylinderGeometry args={[0.06, 0.05, 0.12, 8]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        </group>

        {/* ===== SOLUTION OBJECTS (hidden initially, scale 0) ===== */}

        {/* Printer box outputting papers */}
        <group
          ref={setSolutionRef(0)}
          position={[0, 0, -rd / 2 + 1]}
          scale={[0, 0, 0]}
        >
          {/* Printer body */}
          <mesh castShadow position={[0, 0.8, 0]}>
            <boxGeometry args={[1.0, 0.4, 0.6]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
          {/* Paper coming out */}
          <mesh position={[0, 0.85, 0.35]}>
            <boxGeometry args={[0.6, 0.02, 0.3]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          {/* Stand */}
          <mesh position={[0, 0.35, 0]}>
            <boxGeometry args={[0.8, 0.7, 0.5]} />
            <meshStandardMaterial color="#666666" />
          </mesh>
        </group>

        {/* Floating PDF icons (3 flat boxes) */}
        {[
          { x: -2, y: 2.5, z: 0, ref: 1 },
          { x: 0, y: 2.8, z: 0.5, ref: 2 },
          { x: 2, y: 2.3, z: -0.5, ref: 3 },
        ].map((p) => (
          <group
            key={p.ref}
            ref={setSolutionRef(p.ref)}
            position={[p.x, p.y, p.z]}
            scale={[0, 0, 0]}
          >
            <mesh castShadow>
              <boxGeometry args={[0.5, 0.65, 0.04]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            {/* PDF header */}
            <mesh position={[0, 0.2, 0.025]}>
              <boxGeometry args={[0.4, 0.12, 0.01]} />
              <meshStandardMaterial
                color="#E74C3C"
                emissive="#E74C3C"
                emissiveIntensity={0.3}
                toneMapped={false}
              />
            </mesh>
            {/* Content lines */}
            <mesh position={[0, 0, 0.025]}>
              <boxGeometry args={[0.35, 0.04, 0.01]} />
              <meshStandardMaterial color="#999999" />
            </mesh>
            <mesh position={[0, -0.1, 0.025]}>
              <boxGeometry args={[0.3, 0.04, 0.01]} />
              <meshStandardMaterial color="#999999" />
            </mesh>
          </group>
        ))}

        {/* NEP torus ring */}
        <group
          ref={setSolutionRef(4)}
          position={[0, 3.2, 0]}
          scale={[0, 0, 0]}
        >
          <mesh castShadow>
            <torusGeometry args={[0.4, 0.1, 8, 24]} />
            <meshStandardMaterial
              color="#FFD700"
              emissive="#FFD700"
              emissiveIntensity={0.5}
              toneMapped={false}
            />
          </mesh>
          <Text
            position={[0, 0, 0]}
            fontSize={0.18}
            color="#1A1A2E"
            anchorX="center"
            anchorY="middle"
          >
            NEP
          </Text>
        </group>

        {/* ===== TEXT ELEMENTS ===== */}

        <group ref={problemTextRef} position={[0, 3.5, 0]} scale={[0, 0, 0]}>
          <Text
            fontSize={0.35}
            color="#DC3545"
            anchorX="center"
            anchorY="middle"
            maxWidth={8}
            textAlign="center"
          >
            {room.problemText}
          </Text>
        </group>

        <group ref={solutionTextRef} position={[0, 3.5, 0]} scale={[0, 0, 0]}>
          <Text
            fontSize={0.32}
            color="#20C997"
            anchorX="center"
            anchorY="middle"
            maxWidth={8}
            textAlign="center"
          >
            {room.solutionText}
          </Text>
        </group>

        <group ref={statTextRef} position={[0, 3, 0]} scale={[0, 0, 0]}>
          <Text
            fontSize={0.45}
            color="#FFD700"
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
            maxWidth={8}
            textAlign="center"
          >
            {room.statText}
          </Text>
        </group>
      </RoomShell>

      <DoorTrigger room={room} onEnter={triggerTransformation} />
    </>
  );
}
