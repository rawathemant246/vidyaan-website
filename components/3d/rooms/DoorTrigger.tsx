"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { getDoorPosition, type RoomConfig } from "@/lib/room-data";
import { usePlayerStore } from "@/hooks/usePlayerPosition";
import { useGameStore } from "@/hooks/useGameStore";

interface DoorTriggerProps {
  room: RoomConfig;
  onEnter: () => void;
}

const TRIGGER_DISTANCE = 3;
const INTERACT_COOLDOWN = 500; // ms

export function DoorTrigger({ room, onEnter }: DoorTriggerProps) {
  const doorPos = getDoorPosition(room);
  const lastInteractRef = useRef(0);
  const [, getKeys] = useKeyboardControls();

  const setNearDoor = useGameStore((s) => s.setNearDoor);

  useFrame(() => {
    const playerPos = usePlayerStore.getState().position;
    const distance = playerPos.distanceTo(doorPos);

    if (distance < TRIGGER_DISTANCE) {
      setNearDoor(room.id);

      const { interact } = getKeys();
      const now = Date.now();

      if (interact && now - lastInteractRef.current > INTERACT_COOLDOWN) {
        lastInteractRef.current = now;
        onEnter();
      }
    } else {
      // Only clear if we were the one set
      const current = useGameStore.getState().nearDoor;
      if (current === room.id) {
        setNearDoor(null);
      }
    }
  });

  return (
    <mesh position={[doorPos.x, doorPos.y + 2, doorPos.z]} rotation={[0, 0, 0]}>
      <planeGeometry args={[2, 4]} />
      <meshBasicMaterial
        color="#FFD700"
        transparent
        opacity={0.15}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
