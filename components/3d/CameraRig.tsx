"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { usePlayerStore } from "@/hooks/usePlayerPosition";
import { PLAYER } from "@/lib/constants";

const targetPos = new THREE.Vector3();
const cameraTarget = new THREE.Vector3();
const offset = new THREE.Vector3(...PLAYER.cameraOffset);

export function CameraRig() {
  const { camera } = useThree();

  useFrame(() => {
    const playerPos = usePlayerStore.getState().position;
    const isInRoom = usePlayerStore.getState().isInRoom;
    const roomCameraTarget = usePlayerStore.getState().roomCameraTarget;

    if (isInRoom && roomCameraTarget) {
      targetPos.copy(roomCameraTarget).add(new THREE.Vector3(0, 3, 5));
      cameraTarget.copy(roomCameraTarget);
    } else {
      targetPos.set(
        playerPos.x + offset.x,
        playerPos.y + offset.y,
        playerPos.z + offset.z
      );
      cameraTarget.copy(playerPos).add(new THREE.Vector3(0, 1.2, 0));
    }

    camera.position.lerp(targetPos, 0.05);
    camera.lookAt(cameraTarget);
  });

  return null;
}
