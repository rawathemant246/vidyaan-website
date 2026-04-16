"use client";

import { useMemo } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { RoomShell } from "./RoomShell";
import { DoorTrigger } from "./DoorTrigger";
import { useRoomTransformation } from "./RoomTransformation";
import { ROOMS } from "@/lib/room-data";

const room = ROOMS.find((r) => r.id === 5)!;

export function Library() {
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

        {/* Lonely student at desk */}
        <group ref={setProblemRef(0)} position={[0, 0, 0]}>
          {/* Desk */}
          <mesh castShadow position={[0, 0.55, 0]}>
            <boxGeometry args={[1.0, 0.06, 0.7]} />
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
          {/* Student body */}
          <mesh castShadow position={[0, 0.9, -0.4]}>
            <boxGeometry args={[0.4, 0.6, 0.25]} />
            <meshStandardMaterial color="#3498DB" />
          </mesh>
          {/* Head */}
          <mesh castShadow position={[0, 1.4, -0.4]}>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshStandardMaterial color="#F4C28F" />
          </mesh>
        </group>

        {/* Floating "?" text above student's head */}
        <group ref={setProblemRef(1)} position={[0, 2.0, -0.4]}>
          <Text
            fontSize={0.5}
            color="#DC3545"
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
          >
            ?
          </Text>
        </group>

        {/* Empty bookshelves (2 box frames on back wall) */}
        {[
          { x: -2.5, ref: 2 },
          { x: 2.5, ref: 3 },
        ].map((s) => (
          <group
            key={s.ref}
            ref={setProblemRef(s.ref)}
            position={[s.x, 0.5, -rd / 2 + 0.4]}
          >
            {/* Shelf frame - vertical sides */}
            <mesh castShadow position={[-0.6, 1.0, 0]}>
              <boxGeometry args={[0.08, 2.0, 0.4]} />
              <meshStandardMaterial color="#5C3317" />
            </mesh>
            <mesh castShadow position={[0.6, 1.0, 0]}>
              <boxGeometry args={[0.08, 2.0, 0.4]} />
              <meshStandardMaterial color="#5C3317" />
            </mesh>
            {/* Shelves (3 horizontal) */}
            {[0, 0.65, 1.3].map((y, i) => (
              <mesh key={i} castShadow position={[0, y, 0]}>
                <boxGeometry args={[1.2, 0.06, 0.4]} />
                <meshStandardMaterial color="#5C3317" />
              </mesh>
            ))}
          </group>
        ))}

        {/* ===== SOLUTION OBJECTS (hidden initially, scale 0) ===== */}

        {/* Glowing AI screen */}
        <group
          ref={setSolutionRef(0)}
          position={[0, 1.5, -rd / 2 + 0.3]}
          scale={[0, 0, 0]}
        >
          {/* Screen backing */}
          <mesh castShadow>
            <boxGeometry args={[2.5, 1.8, 0.08]} />
            <meshStandardMaterial color="#1A1A2E" />
          </mesh>
          {/* Glowing screen */}
          <mesh position={[0, 0, 0.05]}>
            <planeGeometry args={[2.3, 1.6]} />
            <meshStandardMaterial
              color="#7B2FBE"
              emissive="#7B2FBE"
              emissiveIntensity={0.5}
              toneMapped={false}
            />
          </mesh>
          {/* AI icon (sparkle) */}
          <mesh position={[0, 0.3, 0.06]}>
            <octahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial
              color="#FFD700"
              emissive="#FFD700"
              emissiveIntensity={0.8}
              toneMapped={false}
            />
          </mesh>
        </group>

        {/* Chat bubble boxes (2 rounded) */}
        {[
          { x: -1.5, y: 2.5, z: 1, ref: 1 },
          { x: 1.5, y: 2.2, z: 0.5, ref: 2 },
        ].map((b) => (
          <group
            key={b.ref}
            ref={setSolutionRef(b.ref)}
            position={[b.x, b.y, b.z]}
            scale={[0, 0, 0]}
          >
            <mesh castShadow>
              <boxGeometry args={[0.8, 0.5, 0.08]} />
              <meshStandardMaterial
                color="#E0E0FF"
                emissive="#7B2FBE"
                emissiveIntensity={0.15}
                toneMapped={false}
              />
            </mesh>
            {/* Chat text lines */}
            <mesh position={[0, 0.05, 0.045]}>
              <boxGeometry args={[0.5, 0.04, 0.01]} />
              <meshStandardMaterial color="#7B2FBE" />
            </mesh>
            <mesh position={[0, -0.07, 0.045]}>
              <boxGeometry args={[0.4, 0.04, 0.01]} />
              <meshStandardMaterial color="#7B2FBE" />
            </mesh>
          </group>
        ))}

        {/* Knowledge graph (3 spheres connected by cylinders) */}
        <group
          ref={setSolutionRef(3)}
          position={[0, 2.8, 0]}
          scale={[0, 0, 0]}
        >
          {/* Node 1 */}
          <mesh castShadow position={[-0.6, 0, 0]}>
            <sphereGeometry args={[0.18, 8, 8]} />
            <meshStandardMaterial
              color="#3498DB"
              emissive="#3498DB"
              emissiveIntensity={0.4}
              toneMapped={false}
            />
          </mesh>
          {/* Node 2 */}
          <mesh castShadow position={[0.6, 0, 0]}>
            <sphereGeometry args={[0.18, 8, 8]} />
            <meshStandardMaterial
              color="#2ECC71"
              emissive="#2ECC71"
              emissiveIntensity={0.4}
              toneMapped={false}
            />
          </mesh>
          {/* Node 3 */}
          <mesh castShadow position={[0, 0.5, 0]}>
            <sphereGeometry args={[0.18, 8, 8]} />
            <meshStandardMaterial
              color="#E74C3C"
              emissive="#E74C3C"
              emissiveIntensity={0.4}
              toneMapped={false}
            />
          </mesh>
          {/* Connection 1-2 */}
          <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 1.2, 6]} />
            <meshStandardMaterial color="#999999" />
          </mesh>
          {/* Connection 1-3 */}
          <mesh
            position={[-0.3, 0.25, 0]}
            rotation={[0, 0, Math.PI / 3]}
          >
            <cylinderGeometry args={[0.03, 0.03, 0.8, 6]} />
            <meshStandardMaterial color="#999999" />
          </mesh>
          {/* Connection 2-3 */}
          <mesh
            position={[0.3, 0.25, 0]}
            rotation={[0, 0, -Math.PI / 3]}
          >
            <cylinderGeometry args={[0.03, 0.03, 0.8, 6]} />
            <meshStandardMaterial color="#999999" />
          </mesh>
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
