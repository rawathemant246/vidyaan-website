"use client";

import { useMemo } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { RoomShell } from "./RoomShell";
import { DoorTrigger } from "./DoorTrigger";
import { useRoomTransformation } from "./RoomTransformation";
import { ROOMS } from "@/lib/room-data";

const room = ROOMS.find((r) => r.id === 7)!;

export function AccountsOffice() {
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

        {/* Counter with queue */}
        <group ref={setProblemRef(0)} position={[0, 0, -rd / 2 + 1]}>
          {/* Counter */}
          <mesh castShadow position={[0, 0.7, 0]}>
            <boxGeometry args={[4, 0.1, 0.8]} />
            <meshStandardMaterial color="#5C3317" />
          </mesh>
          {/* Counter front panel */}
          <mesh castShadow position={[0, 0.35, 0.35]}>
            <boxGeometry args={[4, 0.7, 0.08]} />
            <meshStandardMaterial color="#5C3317" />
          </mesh>
          {/* Person behind counter */}
          <mesh castShadow position={[0, 1.0, -0.3]}>
            <boxGeometry args={[0.5, 0.5, 0.3]} />
            <meshStandardMaterial color="#4A4A4A" />
          </mesh>
          <mesh castShadow position={[0, 1.5, -0.3]}>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshStandardMaterial color="#F4C28F" />
          </mesh>
        </group>

        {/* Ledger stacks */}
        <group ref={setProblemRef(1)} position={[-2, 0.75, -rd / 2 + 0.8]}>
          <mesh castShadow position={[0, 0.05, 0]}>
            <boxGeometry args={[0.5, 0.12, 0.35]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          <mesh castShadow position={[0.05, 0.15, -0.02]}>
            <boxGeometry args={[0.45, 0.1, 0.35]} />
            <meshStandardMaterial color="#A0522D" />
          </mesh>
          <mesh castShadow position={[-0.03, 0.24, 0.01]}>
            <boxGeometry args={[0.48, 0.08, 0.33]} />
            <meshStandardMaterial color="#6B3A2A" />
          </mesh>
        </group>

        {/* Scattered coins (flat cylinders) */}
        <group ref={setProblemRef(2)} position={[2, 0.78, -rd / 2 + 0.9]}>
          {[
            { x: 0, z: 0 },
            { x: 0.15, z: 0.1 },
            { x: -0.12, z: 0.08 },
            { x: 0.08, z: -0.1 },
            { x: -0.05, z: -0.05 },
          ].map((c, i) => (
            <mesh key={i} castShadow position={[c.x, i * 0.015, c.z]}>
              <cylinderGeometry args={[0.06, 0.06, 0.015, 12]} />
              <meshStandardMaterial color="#DAA520" />
            </mesh>
          ))}
        </group>

        {/* ===== SOLUTION OBJECTS (hidden initially, scale 0) ===== */}

        {/* Payment terminal screen */}
        <group
          ref={setSolutionRef(0)}
          position={[0, 1.2, -rd / 2 + 0.8]}
          scale={[0, 0, 0]}
        >
          {/* Screen backing */}
          <mesh castShadow>
            <boxGeometry args={[1.5, 1.2, 0.06]} />
            <meshStandardMaterial color="#1A1A2E" />
          </mesh>
          {/* Glowing screen */}
          <mesh position={[0, 0, 0.035]}>
            <planeGeometry args={[1.3, 1.0]} />
            <meshStandardMaterial
              color="#20C997"
              emissive="#20C997"
              emissiveIntensity={0.4}
              toneMapped={false}
            />
          </mesh>
          {/* Rupee symbol */}
          <Text
            position={[0, 0.1, 0.04]}
            fontSize={0.4}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
          >
            {"\u20B9"}
          </Text>
        </group>

        {/* "PAID" stamp icon */}
        <group
          ref={setSolutionRef(1)}
          position={[2.5, 2.2, 0]}
          scale={[0, 0, 0]}
        >
          <mesh castShadow>
            <boxGeometry args={[1.0, 0.5, 0.06]} />
            <meshStandardMaterial
              color="#2ECC71"
              emissive="#2ECC71"
              emissiveIntensity={0.3}
              toneMapped={false}
            />
          </mesh>
          <Text
            position={[0, 0, 0.04]}
            fontSize={0.22}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
          >
            PAID
          </Text>
        </group>

        {/* Chart trending up */}
        <group
          ref={setSolutionRef(2)}
          position={[-2.5, 2, 0]}
          scale={[0, 0, 0]}
        >
          {/* Chart background */}
          <mesh castShadow>
            <boxGeometry args={[1.4, 1.0, 0.04]} />
            <meshStandardMaterial color="#1A1A2E" />
          </mesh>
          {/* Rising bars */}
          {[-0.4, -0.15, 0.1, 0.35].map((xPos, i) => (
            <mesh key={i} castShadow position={[xPos, -0.3 + (i + 1) * 0.1, 0.03]}>
              <boxGeometry args={[0.18, (i + 1) * 0.2, 0.02]} />
              <meshStandardMaterial
                color="#2ECC71"
                emissive="#2ECC71"
                emissiveIntensity={0.3}
                toneMapped={false}
              />
            </mesh>
          ))}
        </group>

        {/* ===== ALWAYS VISIBLE: 3 Pricing boxes on back wall ===== */}
        {[
          { x: -2.5, label: "Starter", price: "\u20B9500/mo", color: "#3498DB" },
          { x: 0, label: "Growth", price: "\u20B91000/mo", color: "#9B59B6" },
          { x: 2.5, label: "Enterprise", price: "\u20B91500/mo", color: "#E67E22" },
        ].map((plan, i) => (
          <group key={i} position={[plan.x, 2.5, -rd / 2 + 0.2]}>
            {/* Card background */}
            <mesh castShadow>
              <boxGeometry args={[1.5, 1.5, 0.08]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            {/* Color header */}
            <mesh position={[0, 0.45, 0.045]}>
              <boxGeometry args={[1.5, 0.4, 0.01]} />
              <meshStandardMaterial
                color={plan.color}
                emissive={plan.color}
                emissiveIntensity={0.2}
                toneMapped={false}
              />
            </mesh>
            {/* Plan name */}
            <Text
              position={[0, 0.45, 0.06]}
              fontSize={0.14}
              color="#FFFFFF"
              anchorX="center"
              anchorY="middle"
              fontWeight="bold"
            >
              {plan.label}
            </Text>
            {/* Price */}
            <Text
              position={[0, 0.05, 0.06]}
              fontSize={0.18}
              color="#1A1A2E"
              anchorX="center"
              anchorY="middle"
              fontWeight="bold"
            >
              {plan.price}
            </Text>
            {/* Feature lines */}
            {[-0.2, -0.4].map((yOff, j) => (
              <mesh key={j} position={[0, yOff, 0.05]}>
                <boxGeometry args={[0.9, 0.04, 0.01]} />
                <meshStandardMaterial color="#CCCCCC" />
              </mesh>
            ))}
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
