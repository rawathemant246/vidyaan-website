"use client";

import { useMemo } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { RoomShell } from "./RoomShell";
import { DoorTrigger } from "./DoorTrigger";
import { useRoomTransformation } from "./RoomTransformation";
import { ROOMS } from "@/lib/room-data";

const room = ROOMS.find((r) => r.id === 8)!;

export function ParentRoom() {
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

        {/* Parent figure (frustrated pose) */}
        <group ref={setProblemRef(0)} position={[-1.5, 0, 0]}>
          {/* Body */}
          <mesh castShadow position={[0, 1.0, 0]}>
            <boxGeometry args={[0.5, 0.8, 0.3]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          {/* Head */}
          <mesh castShadow position={[0, 1.65, 0]}>
            <sphereGeometry args={[0.22, 8, 8]} />
            <meshStandardMaterial color="#F4C28F" />
          </mesh>
          {/* Arms crossed (frustrated) */}
          <mesh castShadow position={[0, 1.05, 0.2]}>
            <boxGeometry args={[0.6, 0.12, 0.15]} />
            <meshStandardMaterial color="#8B4513" />
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

        {/* Teacher figure (frustrated pose) */}
        <group ref={setProblemRef(1)} position={[1.5, 0, 0]}>
          {/* Body */}
          <mesh castShadow position={[0, 1.0, 0]}>
            <boxGeometry args={[0.5, 0.8, 0.3]} />
            <meshStandardMaterial color="#4A4A4A" />
          </mesh>
          {/* Head */}
          <mesh castShadow position={[0, 1.65, 0]}>
            <sphereGeometry args={[0.22, 8, 8]} />
            <meshStandardMaterial color="#D2B48C" />
          </mesh>
          {/* Arms out (exasperated) */}
          <mesh castShadow position={[-0.4, 1.1, 0]}>
            <boxGeometry args={[0.3, 0.1, 0.1]} />
            <meshStandardMaterial color="#4A4A4A" />
          </mesh>
          <mesh castShadow position={[0.4, 1.1, 0]}>
            <boxGeometry args={[0.3, 0.1, 0.1]} />
            <meshStandardMaterial color="#4A4A4A" />
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

        {/* Phone with missed-call icon */}
        <group ref={setProblemRef(2)} position={[-1.5, 2.2, 0]}>
          {/* Phone body */}
          <mesh castShadow>
            <boxGeometry args={[0.3, 0.5, 0.04]} />
            <meshStandardMaterial color="#2C3E50" />
          </mesh>
          {/* Screen */}
          <mesh position={[0, 0.02, 0.025]}>
            <planeGeometry args={[0.24, 0.35]} />
            <meshStandardMaterial color="#DC3545" />
          </mesh>
          {/* X mark for missed call */}
          <mesh position={[0, 0.02, 0.03]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.04, 0.2, 0.01]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          <mesh position={[0, 0.02, 0.03]} rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.04, 0.2, 0.01]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        </group>

        {/* Report card with "???" */}
        <group ref={setProblemRef(3)} position={[1.5, 2.2, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.6, 0.8, 0.04]} />
            <meshStandardMaterial color="#FFFACD" />
          </mesh>
          <Text
            position={[0, 0, 0.03]}
            fontSize={0.25}
            color="#DC3545"
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
          >
            ???
          </Text>
        </group>

        {/* ===== SOLUTION OBJECTS (hidden initially, scale 0) ===== */}

        {/* Phone showing app screen */}
        <group
          ref={setSolutionRef(0)}
          position={[0, 2, -1]}
          scale={[0, 0, 0]}
        >
          {/* Phone body */}
          <mesh castShadow>
            <boxGeometry args={[0.8, 1.3, 0.06]} />
            <meshStandardMaterial color="#1A1A2E" />
          </mesh>
          {/* Glowing app screen */}
          <mesh position={[0, 0, 0.035]}>
            <planeGeometry args={[0.7, 1.1]} />
            <meshStandardMaterial
              color="#7B2FBE"
              emissive="#7B2FBE"
              emissiveIntensity={0.4}
              toneMapped={false}
            />
          </mesh>
          {/* App content lines */}
          {[0.3, 0.15, 0, -0.15, -0.3].map((yOff, i) => (
            <mesh key={i} position={[0, yOff, 0.04]}>
              <planeGeometry args={[0.5 - (i % 2) * 0.1, 0.04]} />
              <meshStandardMaterial
                color="#E0E0FF"
                emissive="#E0E0FF"
                emissiveIntensity={0.3}
                toneMapped={false}
              />
            </mesh>
          ))}
        </group>

        {/* Notification bell (cone + sphere) */}
        <group
          ref={setSolutionRef(1)}
          position={[2.5, 2.5, 0]}
          scale={[0, 0, 0]}
        >
          {/* Bell body (cone) */}
          <mesh castShadow>
            <coneGeometry args={[0.25, 0.4, 8]} />
            <meshStandardMaterial
              color="#FFD700"
              emissive="#FFD700"
              emissiveIntensity={0.4}
              toneMapped={false}
            />
          </mesh>
          {/* Bell top (sphere) */}
          <mesh castShadow position={[0, 0.25, 0]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial
              color="#FFD700"
              emissive="#FFD700"
              emissiveIntensity={0.4}
              toneMapped={false}
            />
          </mesh>
          {/* Clapper */}
          <mesh position={[0, -0.22, 0]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#DAA520" />
          </mesh>
        </group>

        {/* Happy figures (parent + child) */}
        <group
          ref={setSolutionRef(2)}
          position={[-2, 0, 1]}
          scale={[0, 0, 0]}
        >
          {/* Parent */}
          <mesh castShadow position={[-0.3, 1.0, 0]}>
            <boxGeometry args={[0.5, 0.8, 0.3]} />
            <meshStandardMaterial color="#2ECC71" />
          </mesh>
          <mesh castShadow position={[-0.3, 1.65, 0]}>
            <sphereGeometry args={[0.22, 8, 8]} />
            <meshStandardMaterial color="#F4C28F" />
          </mesh>
          <mesh castShadow position={[-0.3, 0.35, -0.05]}>
            <boxGeometry args={[0.15, 0.5, 0.2]} />
            <meshStandardMaterial color="#2C3E50" />
          </mesh>
          <mesh castShadow position={[-0.15, 0.35, -0.05]}>
            <boxGeometry args={[0.15, 0.5, 0.2]} />
            <meshStandardMaterial color="#2C3E50" />
          </mesh>
          {/* Child */}
          <mesh castShadow position={[0.3, 0.7, 0]}>
            <boxGeometry args={[0.35, 0.55, 0.25]} />
            <meshStandardMaterial color="#3498DB" />
          </mesh>
          <mesh castShadow position={[0.3, 1.15, 0]}>
            <sphereGeometry args={[0.18, 8, 8]} />
            <meshStandardMaterial color="#F4C28F" />
          </mesh>
          {/* Raised hand (waving) */}
          <mesh castShadow position={[0.5, 1.35, 0]}>
            <boxGeometry args={[0.08, 0.25, 0.08]} />
            <meshStandardMaterial color="#3498DB" />
          </mesh>
        </group>

        {/* ===== ALWAYS VISIBLE: 3 Testimonial boxes on wall ===== */}
        {[
          {
            x: -2.5,
            quote: '"My child\'s grades improved\n in just 2 months!"',
            author: "- Priya S., Parent",
          },
          {
            x: 0,
            quote: '"I finally know what\'s\n happening at school."',
            author: "- Rajesh K., Parent",
          },
          {
            x: 2.5,
            quote: '"The app makes PTM\n meetings so easy!"',
            author: "- Anita M., Parent",
          },
        ].map((t, i) => (
          <group key={i} position={[t.x, 2.5, -rd / 2 + 0.2]}>
            {/* Card */}
            <mesh castShadow>
              <boxGeometry args={[1.5, 1.4, 0.08]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            {/* Quote mark decoration */}
            <Text
              position={[-0.5, 0.4, 0.05]}
              fontSize={0.3}
              color="#7B2FBE"
              anchorX="center"
              anchorY="middle"
            >
              {"\u201C"}
            </Text>
            {/* Quote text */}
            <Text
              position={[0, 0.05, 0.05]}
              fontSize={0.1}
              color="#333333"
              anchorX="center"
              anchorY="middle"
              maxWidth={1.2}
              textAlign="center"
            >
              {t.quote}
            </Text>
            {/* Author */}
            <Text
              position={[0, -0.4, 0.05]}
              fontSize={0.08}
              color="#7B2FBE"
              anchorX="center"
              anchorY="middle"
            >
              {t.author}
            </Text>
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
