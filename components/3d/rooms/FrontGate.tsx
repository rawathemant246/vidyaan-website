"use client";

import { useMemo } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { RoomShell } from "./RoomShell";
import { DoorTrigger } from "./DoorTrigger";
import { useRoomTransformation } from "./RoomTransformation";
import { ROOMS } from "@/lib/room-data";

const room = ROOMS.find((r) => r.id === 1)!;

export function FrontGate() {
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

        {/* 3 box-figures standing in queue */}
        {[
          { x: -1.5, z: 0, ref: 0 },
          { x: 0, z: 1, ref: 1 },
          { x: 1.5, z: 2, ref: 2 },
        ].map((f) => (
          <group key={f.ref} ref={setProblemRef(f.ref)} position={[f.x, 0, f.z]}>
            {/* Body */}
            <mesh castShadow position={[0, 1.0, 0]}>
              <boxGeometry args={[0.5, 0.8, 0.3]} />
              <meshStandardMaterial color="#6B4226" />
            </mesh>
            {/* Head */}
            <mesh castShadow position={[0, 1.65, 0]}>
              <sphereGeometry args={[0.22, 8, 8]} />
              <meshStandardMaterial color="#D2B48C" />
            </mesh>
            {/* Legs */}
            <mesh castShadow position={[-0.1, 0.35, 0]}>
              <boxGeometry args={[0.15, 0.5, 0.2]} />
              <meshStandardMaterial color="#2C3E50" />
            </mesh>
            <mesh castShadow position={[0.1, 0.35, 0]}>
              <boxGeometry args={[0.15, 0.5, 0.2]} />
              <meshStandardMaterial color="#2C3E50" />
            </mesh>
          </group>
        ))}

        {/* Paper register on table */}
        <group ref={setProblemRef(3)} position={[3, 0, -rd / 2 + 1.5]}>
          {/* Table */}
          <mesh castShadow position={[0, 0.55, 0]}>
            <boxGeometry args={[1.2, 0.08, 0.8]} />
            <meshStandardMaterial color="#8B6914" />
          </mesh>
          {/* Table legs */}
          <mesh position={[-0.5, 0.27, -0.3]}>
            <boxGeometry args={[0.06, 0.54, 0.06]} />
            <meshStandardMaterial color="#8B6914" />
          </mesh>
          <mesh position={[0.5, 0.27, -0.3]}>
            <boxGeometry args={[0.06, 0.54, 0.06]} />
            <meshStandardMaterial color="#8B6914" />
          </mesh>
          <mesh position={[-0.5, 0.27, 0.3]}>
            <boxGeometry args={[0.06, 0.54, 0.06]} />
            <meshStandardMaterial color="#8B6914" />
          </mesh>
          <mesh position={[0.5, 0.27, 0.3]}>
            <boxGeometry args={[0.06, 0.54, 0.06]} />
            <meshStandardMaterial color="#8B6914" />
          </mesh>
          {/* Paper register (flat box) */}
          <mesh castShadow position={[0, 0.63, 0]}>
            <boxGeometry args={[0.8, 0.04, 0.5]} />
            <meshStandardMaterial color="#FFFACD" />
          </mesh>
        </group>

        {/* Wall clock */}
        <group ref={setProblemRef(4)} position={[0, 3, -rd / 2 + 0.2]}>
          {/* Clock face */}
          <mesh castShadow>
            <cylinderGeometry args={[0.5, 0.5, 0.08, 16]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          {/* Clock border */}
          <mesh>
            <torusGeometry args={[0.5, 0.05, 8, 24]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
        </group>

        {/* ===== SOLUTION OBJECTS (hidden initially, scale 0) ===== */}

        {/* Tablet on stand */}
        <group
          ref={setSolutionRef(0)}
          position={[3, 0, -rd / 2 + 1.5]}
          scale={[0, 0, 0]}
        >
          {/* Stand */}
          <mesh castShadow position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.05, 0.15, 1.2, 8]} />
            <meshStandardMaterial color="#555555" />
          </mesh>
          {/* Tablet screen */}
          <mesh castShadow position={[0, 1.3, 0]}>
            <boxGeometry args={[0.8, 0.5, 0.04]} />
            <meshStandardMaterial color="#1A1A2E" />
          </mesh>
          {/* Glowing screen */}
          <mesh position={[0, 1.3, 0.025]}>
            <planeGeometry args={[0.7, 0.4]} />
            <meshStandardMaterial
              color="#20C997"
              emissive="#20C997"
              emissiveIntensity={0.5}
              toneMapped={false}
            />
          </mesh>
        </group>

        {/* Glowing APAAR ID card */}
        <group
          ref={setSolutionRef(1)}
          position={[0, 2, 0]}
          scale={[0, 0, 0]}
        >
          <mesh castShadow>
            <boxGeometry args={[1.2, 0.8, 0.05]} />
            <meshStandardMaterial
              color="#FFD700"
              emissive="#FFD700"
              emissiveIntensity={0.6}
              toneMapped={false}
            />
          </mesh>
          {/* ID photo area */}
          <mesh position={[-0.35, 0.1, 0.03]}>
            <planeGeometry args={[0.3, 0.35]} />
            <meshStandardMaterial color="#E0E0E0" />
          </mesh>
          {/* Text lines */}
          <mesh position={[0.15, 0.15, 0.03]}>
            <planeGeometry args={[0.5, 0.06]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
          <mesh position={[0.15, 0.0, 0.03]}>
            <planeGeometry args={[0.4, 0.06]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
        </group>

        {/* Figures walking smoothly (3 in motion) */}
        {[
          { x: -1.5, z: 0.5, color: "#3498DB", ref: 2 },
          { x: 0, z: 1.5, color: "#2ECC71", ref: 3 },
          { x: 1.5, z: 2.5, color: "#E74C3C", ref: 4 },
        ].map((f) => (
          <group
            key={f.ref}
            ref={setSolutionRef(f.ref)}
            position={[f.x, 0, f.z]}
            scale={[0, 0, 0]}
          >
            {/* Body */}
            <mesh castShadow position={[0, 1.0, 0]}>
              <boxGeometry args={[0.5, 0.8, 0.3]} />
              <meshStandardMaterial color={f.color} />
            </mesh>
            {/* Head */}
            <mesh castShadow position={[0, 1.65, 0]}>
              <sphereGeometry args={[0.22, 8, 8]} />
              <meshStandardMaterial color="#F4C28F" />
            </mesh>
            {/* Legs (walking stride) */}
            <mesh castShadow position={[-0.1, 0.35, 0.1]}>
              <boxGeometry args={[0.15, 0.5, 0.2]} />
              <meshStandardMaterial color="#2C3E50" />
            </mesh>
            <mesh castShadow position={[0.1, 0.35, -0.1]}>
              <boxGeometry args={[0.15, 0.5, 0.2]} />
              <meshStandardMaterial color="#2C3E50" />
            </mesh>
          </group>
        ))}

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
