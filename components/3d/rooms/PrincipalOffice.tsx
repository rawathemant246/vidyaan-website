"use client";

import { useMemo } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { RoomShell } from "./RoomShell";
import { DoorTrigger } from "./DoorTrigger";
import { useRoomTransformation } from "./RoomTransformation";
import { ROOMS } from "@/lib/room-data";

const room = ROOMS.find((r) => r.id === 6)!;

export function PrincipalOffice() {
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

        {/* Principal figure at big desk */}
        <group ref={setProblemRef(0)} position={[0, 0, -rd / 2 + 1.5]}>
          {/* Big desk */}
          <mesh castShadow position={[0, 0.55, 0]}>
            <boxGeometry args={[2.5, 0.1, 1.2]} />
            <meshStandardMaterial color="#5C3317" />
          </mesh>
          {/* Desk legs */}
          <mesh position={[-1.1, 0.27, -0.5]}>
            <boxGeometry args={[0.08, 0.54, 0.08]} />
            <meshStandardMaterial color="#5C3317" />
          </mesh>
          <mesh position={[1.1, 0.27, -0.5]}>
            <boxGeometry args={[0.08, 0.54, 0.08]} />
            <meshStandardMaterial color="#5C3317" />
          </mesh>
          <mesh position={[-1.1, 0.27, 0.5]}>
            <boxGeometry args={[0.08, 0.54, 0.08]} />
            <meshStandardMaterial color="#5C3317" />
          </mesh>
          <mesh position={[1.1, 0.27, 0.5]}>
            <boxGeometry args={[0.08, 0.54, 0.08]} />
            <meshStandardMaterial color="#5C3317" />
          </mesh>
          {/* Principal body */}
          <mesh castShadow position={[0, 1.0, -0.7]}>
            <boxGeometry args={[0.6, 0.9, 0.35]} />
            <meshStandardMaterial color="#1A1A2E" />
          </mesh>
          {/* Head */}
          <mesh castShadow position={[0, 1.75, -0.7]}>
            <sphereGeometry args={[0.25, 8, 8]} />
            <meshStandardMaterial color="#F4C28F" />
          </mesh>
        </group>

        {/* Pile of reports on desk */}
        <group ref={setProblemRef(1)} position={[1, 0.62, -rd / 2 + 1.5]}>
          <mesh castShadow position={[0, 0.05, 0]}>
            <boxGeometry args={[0.6, 0.12, 0.45]} />
            <meshStandardMaterial color="#FFFACD" />
          </mesh>
          <mesh castShadow position={[0.1, 0.15, -0.05]}>
            <boxGeometry args={[0.5, 0.1, 0.4]} />
            <meshStandardMaterial color="#FFF8DC" />
          </mesh>
          <mesh castShadow position={[-0.05, 0.23, 0.05]}>
            <boxGeometry args={[0.55, 0.08, 0.35]} />
            <meshStandardMaterial color="#FFEFD5" />
          </mesh>
        </group>

        {/* Ringing phone (vibrating box) */}
        <group ref={setProblemRef(2)} position={[-1, 0.65, -rd / 2 + 1.3]}>
          <mesh castShadow rotation={[0, 0, 0.05]}>
            <boxGeometry args={[0.25, 0.08, 0.15]} />
            <meshStandardMaterial color="#2C3E50" />
          </mesh>
          {/* Handset */}
          <mesh castShadow position={[0, 0.12, 0]} rotation={[0, 0, 0.1]}>
            <boxGeometry args={[0.3, 0.06, 0.08]} />
            <meshStandardMaterial color="#1A1A2E" />
          </mesh>
        </group>

        {/* ===== SOLUTION OBJECTS (hidden initially, scale 0) ===== */}

        {/* 3 floating dashboard screens */}
        {[
          { x: -2.5, y: 2, z: 0, color: "#3498DB", ref: 0 },
          { x: 0, y: 2.3, z: -1, color: "#2ECC71", ref: 1 },
          { x: 2.5, y: 2, z: 0, color: "#E74C3C", ref: 2 },
        ].map((d) => (
          <group
            key={d.ref}
            ref={setSolutionRef(d.ref)}
            position={[d.x, d.y, d.z]}
            scale={[0, 0, 0]}
          >
            {/* Screen backing */}
            <mesh castShadow>
              <boxGeometry args={[1.5, 1.0, 0.06]} />
              <meshStandardMaterial color="#1A1A2E" />
            </mesh>
            {/* Colored glowing plane */}
            <mesh position={[0, 0, 0.035]}>
              <planeGeometry args={[1.3, 0.8]} />
              <meshStandardMaterial
                color={d.color}
                emissive={d.color}
                emissiveIntensity={0.4}
                toneMapped={false}
              />
            </mesh>
            {/* Data lines */}
            {[-0.2, 0, 0.2].map((yOff, i) => (
              <mesh key={i} position={[0, yOff, 0.04]}>
                <planeGeometry args={[0.9 - i * 0.15, 0.04]} />
                <meshStandardMaterial
                  color="#FFFFFF"
                  emissive="#FFFFFF"
                  emissiveIntensity={0.2}
                  toneMapped={false}
                />
              </mesh>
            ))}
          </group>
        ))}

        {/* Alert triangle */}
        <group
          ref={setSolutionRef(3)}
          position={[0, 3.2, 0.5]}
          scale={[0, 0, 0]}
        >
          <mesh castShadow>
            <coneGeometry args={[0.35, 0.6, 3]} />
            <meshStandardMaterial
              color="#F39C12"
              emissive="#F39C12"
              emissiveIntensity={0.5}
              toneMapped={false}
            />
          </mesh>
          <Text
            position={[0, -0.05, 0.2]}
            fontSize={0.2}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
          >
            !
          </Text>
        </group>

        {/* Upward graph line */}
        <group
          ref={setSolutionRef(4)}
          position={[0, 1.0, rd / 2 - 0.5]}
          scale={[0, 0, 0]}
        >
          {/* Graph base */}
          <mesh castShadow position={[0, 0.3, 0]}>
            <boxGeometry args={[2.0, 0.04, 0.04]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          <mesh castShadow position={[-1, 0.6, 0]}>
            <boxGeometry args={[0.04, 0.6, 0.04]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          {/* Rising bars */}
          {[-0.6, -0.2, 0.2, 0.6].map((xPos, i) => (
            <mesh key={i} castShadow position={[xPos, 0.3 + (i + 1) * 0.15, 0]}>
              <boxGeometry args={[0.25, (i + 1) * 0.3, 0.15]} />
              <meshStandardMaterial
                color="#2ECC71"
                emissive="#2ECC71"
                emissiveIntensity={0.2 + i * 0.1}
                toneMapped={false}
              />
            </mesh>
          ))}
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
