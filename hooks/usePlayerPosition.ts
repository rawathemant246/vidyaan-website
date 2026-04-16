import { create } from "zustand";
import * as THREE from "three";

interface PlayerState {
  position: THREE.Vector3;
  setPosition: (pos: THREE.Vector3) => void;
  isInRoom: boolean;
  setIsInRoom: (val: boolean) => void;
  roomCameraTarget: THREE.Vector3 | null;
  setRoomCameraTarget: (target: THREE.Vector3 | null) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  position: new THREE.Vector3(0, 2, 0),
  setPosition: (pos) => set({ position: pos.clone() }),
  isInRoom: false,
  setIsInRoom: (val) => set({ isInRoom: val }),
  roomCameraTarget: null,
  setRoomCameraTarget: (target) => set({ roomCameraTarget: target }),
}));
