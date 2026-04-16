"use client";

import { useMemo } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { RoomShell } from "./RoomShell";
import { DoorTrigger } from "./DoorTrigger";
import { useRoomTransformation } from "./RoomTransformation";
import { ROOMS } from "@/lib/room-data";

const room = ROOMS[0]; // Classroom

export function Classroom() {
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

        {/* Blackboard on back wall */}
        <group ref={setProblemRef(0)} position={[0, 2, -rd / 2 + 0.2]}>
          {/* Board */}
          <mesh castShadow>
            <boxGeometry args={[4, 2, 0.1]} />
            <meshStandardMaterial color="#1B4D3E" />
          </mesh>
          {/* Board frame */}
          <mesh position={[0, 0, -0.06]}>
            <boxGeometry args={[4.2, 2.2, 0.05]} />
            <meshStandardMaterial color="#5C3317" />
          </mesh>
          {/* Chalk tray */}
          <mesh position={[0, -1.05, 0.1]}>
            <boxGeometry args={[3.5, 0.08, 0.15]} />
            <meshStandardMaterial color="#5C3317" />
          </mesh>
        </group>

        {/* Teacher figure at back wall */}
        <group ref={setProblemRef(1)} position={[2.5, 0, -rd / 2 + 1]}>
          {/* Body */}
          <mesh castShadow position={[0, 1.0, 0]}>
            <boxGeometry args={[0.5, 0.8, 0.3]} />
            <meshStandardMaterial color="#4A4A4A" />
          </mesh>
          {/* Head */}
          <mesh castShadow position={[0, 1.65, 0]}>
            <sphereGeometry args={[0.22, 8, 8]} />
            <meshStandardMaterial color="#F4C28F" />
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

        {/* Paper stacks on desk */}
        <group ref={setProblemRef(2)} position={[-2.5, 0, -1]}>
          {/* Desk */}
          <mesh castShadow position={[0, 0.55, 0]}>
            <boxGeometry args={[1.2, 0.08, 0.8]} />
            <meshStandardMaterial color="#8B6914" />
          </mesh>
          {/* Desk legs */}
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
          {/* Paper stack 1 */}
          <mesh position={[-0.3, 0.65, 0]}>
            <boxGeometry args={[0.3, 0.1, 0.4]} />
            <meshStandardMaterial color="#FFFACD" />
          </mesh>
          {/* Paper stack 2 */}
          <mesh position={[0, 0.68, 0.1]}>
            <boxGeometry args={[0.3, 0.15, 0.35]} />
            <meshStandardMaterial color="#FFF8DC" />
          </mesh>
          {/* Paper stack 3 */}
          <mesh position={[0.3, 0.63, -0.1]}>
            <boxGeometry args={[0.25, 0.08, 0.35]} />
            <meshStandardMaterial color="#FFEFD5" />
          </mesh>
        </group>

        {/* Sleeping students - 3 desks with heads resting */}
        {[
          { x: -2, z: 1.5, ref: 3 },
          { x: 0, z: 1.5, ref: 4 },
          { x: 2, z: 1.5, ref: 5 },
        ].map((s) => (
          <group
            key={s.ref}
            ref={setProblemRef(s.ref)}
            position={[s.x, 0, s.z]}
          >
            {/* Desk */}
            <mesh castShadow position={[0, 0.55, 0]}>
              <boxGeometry args={[1, 0.06, 0.7]} />
              <meshStandardMaterial color="#8B6914" />
            </mesh>
            {/* Desk legs */}
            <mesh position={[-0.4, 0.27, -0.25]}>
              <boxGeometry args={[0.05, 0.54, 0.05]} />
              <meshStandardMaterial color="#8B6914" />
            </mesh>
            <mesh position={[0.4, 0.27, -0.25]}>
              <boxGeometry args={[0.05, 0.54, 0.05]} />
              <meshStandardMaterial color="#8B6914" />
            </mesh>
            <mesh position={[-0.4, 0.27, 0.25]}>
              <boxGeometry args={[0.05, 0.54, 0.05]} />
              <meshStandardMaterial color="#8B6914" />
            </mesh>
            <mesh position={[0.4, 0.27, 0.25]}>
              <boxGeometry args={[0.05, 0.54, 0.05]} />
              <meshStandardMaterial color="#8B6914" />
            </mesh>
            {/* Head resting on desk (sleeping) */}
            <mesh castShadow position={[0, 0.72, 0]}>
              <sphereGeometry args={[0.16, 8, 8]} />
              <meshStandardMaterial color="#D2B48C" />
            </mesh>
          </group>
        ))}

        {/* ===== SOLUTION OBJECTS (hidden initially, scale 0) ===== */}

        {/* Smartboard replacing blackboard */}
        <group
          ref={setSolutionRef(0)}
          position={[0, 2, -rd / 2 + 0.2]}
          scale={[0, 0, 0]}
        >
          {/* Screen backing */}
          <mesh castShadow>
            <boxGeometry args={[4, 2, 0.08]} />
            <meshStandardMaterial color="#1A1A2E" />
          </mesh>
          {/* Glowing screen */}
          <mesh position={[0, 0, 0.05]}>
            <planeGeometry args={[3.8, 1.8]} />
            <meshStandardMaterial
              color="#7B2FBE"
              emissive="#7B2FBE"
              emissiveIntensity={0.4}
              toneMapped={false}
            />
          </mesh>
          {/* Screen content lines */}
          {[-0.5, 0, 0.5].map((yOff, i) => (
            <mesh key={i} position={[0, yOff, 0.06]}>
              <planeGeometry args={[2.5 - i * 0.3, 0.08]} />
              <meshStandardMaterial
                color="#E0E0FF"
                emissive="#E0E0FF"
                emissiveIntensity={0.3}
                toneMapped={false}
              />
            </mesh>
          ))}
        </group>

        {/* Engaged students - 3 desks with sitting-up figures, different colors */}
        {[
          { x: -2, z: 1.5, color: "#E74C3C", ref: 1 },
          { x: 0, z: 1.5, color: "#3498DB", ref: 2 },
          { x: 2, z: 1.5, color: "#2ECC71", ref: 3 },
        ].map((s) => (
          <group
            key={s.ref}
            ref={setSolutionRef(s.ref)}
            position={[s.x, 0, s.z]}
            scale={[0, 0, 0]}
          >
            {/* Desk */}
            <mesh castShadow position={[0, 0.55, 0]}>
              <boxGeometry args={[1, 0.06, 0.7]} />
              <meshStandardMaterial color="#5C4033" />
            </mesh>
            {/* Desk legs */}
            <mesh position={[-0.4, 0.27, -0.25]}>
              <boxGeometry args={[0.05, 0.54, 0.05]} />
              <meshStandardMaterial color="#5C4033" />
            </mesh>
            <mesh position={[0.4, 0.27, -0.25]}>
              <boxGeometry args={[0.05, 0.54, 0.05]} />
              <meshStandardMaterial color="#5C4033" />
            </mesh>
            <mesh position={[-0.4, 0.27, 0.25]}>
              <boxGeometry args={[0.05, 0.54, 0.05]} />
              <meshStandardMaterial color="#5C4033" />
            </mesh>
            <mesh position={[0.4, 0.27, 0.25]}>
              <boxGeometry args={[0.05, 0.54, 0.05]} />
              <meshStandardMaterial color="#5C4033" />
            </mesh>
            {/* Sitting body */}
            <mesh castShadow position={[0, 0.85, -0.2]}>
              <boxGeometry args={[0.35, 0.5, 0.2]} />
              <meshStandardMaterial color={s.color} />
            </mesh>
            {/* Head sitting up */}
            <mesh castShadow position={[0, 1.25, -0.2]}>
              <sphereGeometry args={[0.16, 8, 8]} />
              <meshStandardMaterial color="#F4C28F" />
            </mesh>
            {/* Raised hand */}
            <mesh castShadow position={[0.25, 1.4, -0.2]}>
              <boxGeometry args={[0.08, 0.3, 0.08]} />
              <meshStandardMaterial color={s.color} />
            </mesh>
          </group>
        ))}

        {/* AI sparkle particles - 5 octahedrons with gold glow */}
        {[
          [1.8, 2.8, -rd / 2 + 1.2],
          [2.8, 2.4, -rd / 2 + 0.8],
          [3.2, 3.0, -rd / 2 + 1.5],
          [2.0, 3.3, -rd / 2 + 1.0],
          [2.6, 2.0, -rd / 2 + 1.8],
        ].map((pos, i) => (
          <group
            key={`sparkle-${i}`}
            ref={setSolutionRef(4 + i)}
            position={pos as [number, number, number]}
            scale={[0, 0, 0]}
          >
            <mesh>
              <octahedronGeometry args={[0.12, 0]} />
              <meshStandardMaterial
                color="#FFD700"
                emissive="#FFD700"
                emissiveIntensity={0.8}
                toneMapped={false}
              />
            </mesh>
          </group>
        ))}

        {/* ===== TEXT ELEMENTS ===== */}

        {/* Problem text (red) */}
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

        {/* Solution text (teal) */}
        <group
          ref={solutionTextRef}
          position={[0, 3.5, 0]}
          scale={[0, 0, 0]}
        >
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

        {/* Stat text (gold, bold) */}
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

      {/* Door trigger sits outside the RoomShell */}
      <DoorTrigger room={room} onEnter={triggerTransformation} />
    </>
  );
}
