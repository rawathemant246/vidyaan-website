"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import type { RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { COLORS, PLAYER } from "@/lib/constants";

export function Principal() {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const groupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const walkTimeRef = useRef(0);
  const targetRotationRef = useRef(0);

  const [, getKeys] = useKeyboardControls();

  useFrame((_, delta) => {
    if (!rigidBodyRef.current) return;

    const { forward, backward, left, right, jump } = getKeys();
    const velocity = rigidBodyRef.current.linvel();

    // Movement direction
    let moveX = 0;
    let moveZ = 0;
    if (forward) moveZ -= 1;
    if (backward) moveZ += 1;
    if (left) moveX -= 1;
    if (right) moveX += 1;

    // Normalize diagonal movement
    const length = Math.sqrt(moveX * moveX + moveZ * moveZ);
    if (length > 0) {
      moveX = (moveX / length) * PLAYER.speed;
      moveZ = (moveZ / length) * PLAYER.speed;
    }

    // Apply movement velocity
    rigidBodyRef.current.setLinvel(
      { x: moveX, y: velocity.y, z: moveZ },
      true
    );

    // Jump - only when near ground (vertical velocity close to 0)
    if (jump && Math.abs(velocity.y) < 0.1) {
      rigidBodyRef.current.setLinvel(
        { x: velocity.x, y: PLAYER.jumpForce, z: velocity.z },
        true
      );
    }

    // Rotate character to face movement direction
    if (length > 0 && groupRef.current) {
      targetRotationRef.current = Math.atan2(moveX, moveZ);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationRef.current,
        0.15
      );
    }

    // Walking animation
    const isMoving = length > 0;
    if (isMoving) {
      walkTimeRef.current += delta * 8;
      const swing = Math.sin(walkTimeRef.current) * 0.4;

      if (leftLegRef.current) leftLegRef.current.rotation.x = swing;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -swing;
      if (leftArmRef.current) leftArmRef.current.rotation.x = -swing;
      if (rightArmRef.current) rightArmRef.current.rotation.x = swing;
    } else {
      walkTimeRef.current = 0;
      if (leftLegRef.current) leftLegRef.current.rotation.x = 0;
      if (rightLegRef.current) rightLegRef.current.rotation.x = 0;
      if (leftArmRef.current) leftArmRef.current.rotation.x = 0;
      if (rightArmRef.current) rightArmRef.current.rotation.x = 0;
    }
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={PLAYER.spawnPosition}
      enabledRotations={[false, false, false]}
      mass={1}
      friction={1}
      linearDamping={4}
      colliders={false}
    >
      <CapsuleCollider args={[0.4, 0.3]} position={[0, 0.7, 0]} />

      <group ref={groupRef}>
        {/* Head */}
        <mesh position={[0, 1.45, 0]} castShadow>
          <sphereGeometry args={[0.22, 8, 8]} />
          <meshStandardMaterial color={COLORS.skin} />
        </mesh>

        {/* Hair */}
        <mesh position={[0, 1.6, 0]} castShadow>
          <boxGeometry args={[0.4, 0.1, 0.35]} />
          <meshStandardMaterial color={COLORS.hair} />
        </mesh>

        {/* Glasses - left lens */}
        <mesh position={[-0.1, 1.47, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.06, 0.015, 4, 8]} />
          <meshStandardMaterial color={COLORS.glasses} />
        </mesh>

        {/* Glasses - right lens */}
        <mesh position={[0.1, 1.47, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.06, 0.015, 4, 8]} />
          <meshStandardMaterial color={COLORS.glasses} />
        </mesh>

        {/* Glasses - bridge */}
        <mesh position={[0, 1.47, 0.22]}>
          <boxGeometry args={[0.08, 0.015, 0.015]} />
          <meshStandardMaterial color={COLORS.glasses} />
        </mesh>

        {/* Torso / Shirt */}
        <mesh position={[0, 1.05, 0]} castShadow>
          <boxGeometry args={[0.45, 0.55, 0.25]} />
          <meshStandardMaterial color={COLORS.shirt} />
        </mesh>

        {/* Tie */}
        <mesh position={[0, 1.05, 0.13]}>
          <boxGeometry args={[0.06, 0.4, 0.02]} />
          <meshStandardMaterial color={COLORS.tie} />
        </mesh>

        {/* Left Arm */}
        <mesh
          ref={leftArmRef}
          position={[-0.32, 1.05, 0]}
          castShadow
        >
          <boxGeometry args={[0.14, 0.5, 0.18]} />
          <meshStandardMaterial color={COLORS.shirt} />
        </mesh>

        {/* Right Arm */}
        <mesh
          ref={rightArmRef}
          position={[0.32, 1.05, 0]}
          castShadow
        >
          <boxGeometry args={[0.14, 0.5, 0.18]} />
          <meshStandardMaterial color={COLORS.shirt} />
        </mesh>

        {/* Briefcase (right hand) */}
        <mesh position={[0.4, 0.75, 0]} castShadow>
          <boxGeometry args={[0.18, 0.14, 0.06]} />
          <meshStandardMaterial color={COLORS.briefcase} />
        </mesh>

        {/* Left Leg */}
        <mesh
          ref={leftLegRef}
          position={[-0.12, 0.55, 0]}
          castShadow
        >
          <boxGeometry args={[0.16, 0.45, 0.2]} />
          <meshStandardMaterial color={COLORS.pants} />
        </mesh>

        {/* Right Leg */}
        <mesh
          ref={rightLegRef}
          position={[0.12, 0.55, 0]}
          castShadow
        >
          <boxGeometry args={[0.16, 0.45, 0.2]} />
          <meshStandardMaterial color={COLORS.pants} />
        </mesh>

        {/* Left Shoe */}
        <mesh position={[-0.12, 0.3, 0.04]} castShadow>
          <boxGeometry args={[0.17, 0.08, 0.25]} />
          <meshStandardMaterial color={COLORS.shoes} />
        </mesh>

        {/* Right Shoe */}
        <mesh position={[0.12, 0.3, 0.04]} castShadow>
          <boxGeometry args={[0.17, 0.08, 0.25]} />
          <meshStandardMaterial color={COLORS.shoes} />
        </mesh>
      </group>
    </RigidBody>
  );
}
