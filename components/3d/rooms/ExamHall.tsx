"use client";

import { useMemo } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { RoomShell } from "./RoomShell";
import { DoorTrigger } from "./DoorTrigger";
import { useRoomTransformation } from "./RoomTransformation";
import { ROOMS } from "@/lib/room-data";

const room = ROOMS.find((r) => r.id === 3)!;

export function ExamHall() {
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

        {/* Stack of answer sheets (5 stacked flat boxes) */}
        <group ref={setProblemRef(0)} position={[-3, 0, 0]}>
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
          {/* 5 stacked sheets */}
          {[0, 1, 2, 3, 4].map((i) => (
            <mesh key={i} castShadow position={[0, 0.63 + i * 0.04, 0]}>
              <boxGeometry args={[0.7, 0.03, 0.5]} />
              <meshStandardMaterial color={i % 2 === 0 ? "#FFFACD" : "#FFF8DC"} />
            </mesh>
          ))}
        </group>

        {/* Stressed teacher figure */}
        <group ref={setProblemRef(1)} position={[0, 0, -rd / 2 + 1.5]}>
          {/* Body */}
          <mesh castShadow position={[0, 1.0, 0]}>
            <boxGeometry args={[0.5, 0.8, 0.3]} />
            <meshStandardMaterial color="#8B0000" />
          </mesh>
          {/* Head */}
          <mesh castShadow position={[0, 1.65, 0]}>
            <sphereGeometry args={[0.22, 8, 8]} />
            <meshStandardMaterial color="#F4C28F" />
          </mesh>
          {/* Hands on head (stressed) */}
          <mesh castShadow position={[-0.2, 1.75, 0]}>
            <boxGeometry args={[0.1, 0.15, 0.1]} />
            <meshStandardMaterial color="#F4C28F" />
          </mesh>
          <mesh castShadow position={[0.2, 1.75, 0]}>
            <boxGeometry args={[0.1, 0.15, 0.1]} />
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

        {/* Calendar box saying "3 MONTHS" */}
        <group ref={setProblemRef(2)} position={[3, 2, -rd / 2 + 0.3]}>
          <mesh castShadow>
            <boxGeometry args={[1.2, 1.0, 0.1]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          {/* Calendar header */}
          <mesh position={[0, 0.35, 0.06]}>
            <boxGeometry args={[1.2, 0.25, 0.01]} />
            <meshStandardMaterial color="#DC3545" />
          </mesh>
          <Text
            position={[0, 0, 0.07]}
            fontSize={0.2}
            color="#DC3545"
            anchorX="center"
            anchorY="middle"
          >
            3 MONTHS
          </Text>
        </group>

        {/* ===== SOLUTION OBJECTS (hidden initially, scale 0) ===== */}

        {/* Computer screen */}
        <group
          ref={setSolutionRef(0)}
          position={[0, 0, -rd / 2 + 1]}
          scale={[0, 0, 0]}
        >
          {/* Monitor stand */}
          <mesh castShadow position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.05, 0.15, 1.2, 8]} />
            <meshStandardMaterial color="#555555" />
          </mesh>
          {/* Screen backing */}
          <mesh castShadow position={[0, 1.5, 0]}>
            <boxGeometry args={[1.8, 1.2, 0.08]} />
            <meshStandardMaterial color="#1A1A2E" />
          </mesh>
          {/* Glowing screen */}
          <mesh position={[0, 1.5, 0.05]}>
            <planeGeometry args={[1.6, 1.0]} />
            <meshStandardMaterial
              color="#7B2FBE"
              emissive="#7B2FBE"
              emissiveIntensity={0.4}
              toneMapped={false}
            />
          </mesh>
        </group>

        {/* Shield icon (octahedron) */}
        <group
          ref={setSolutionRef(1)}
          position={[3, 2, -rd / 2 + 0.5]}
          scale={[0, 0, 0]}
        >
          <mesh castShadow>
            <octahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial
              color="#20C997"
              emissive="#20C997"
              emissiveIntensity={0.3}
              toneMapped={false}
            />
          </mesh>
        </group>

        {/* Floating grade checkmarks (3) */}
        {[
          { x: -2, y: 2.5, z: 1, ref: 2 },
          { x: 0, y: 2.8, z: 1.5, ref: 3 },
          { x: 2, y: 2.3, z: 0.5, ref: 4 },
        ].map((c) => (
          <group
            key={c.ref}
            ref={setSolutionRef(c.ref)}
            position={[c.x, c.y, c.z]}
            scale={[0, 0, 0]}
          >
            {/* Checkmark made of two thin boxes */}
            <mesh castShadow rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.15, 0.5, 0.08]} />
              <meshStandardMaterial
                color="#2ECC71"
                emissive="#2ECC71"
                emissiveIntensity={0.5}
                toneMapped={false}
              />
            </mesh>
            <mesh castShadow position={[-0.18, -0.08, 0]} rotation={[0, 0, -Math.PI / 4]}>
              <boxGeometry args={[0.15, 0.3, 0.08]} />
              <meshStandardMaterial
                color="#2ECC71"
                emissive="#2ECC71"
                emissiveIntensity={0.5}
                toneMapped={false}
              />
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
            maxWidth={10}
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
            maxWidth={10}
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
            maxWidth={10}
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
