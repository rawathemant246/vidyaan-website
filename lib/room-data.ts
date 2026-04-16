import * as THREE from "three";

export interface RoomConfig {
  id: number;
  name: string;
  position: [number, number, number];
  size: [number, number, number];
  doorSide: "front" | "back" | "left" | "right";
  problemText: string;
  solutionText: string;
  statText: string;
  color: string;
}

export const ROOMS: RoomConfig[] = [
  {
    id: 2,
    name: "Classroom",
    position: [0, 0, -15],
    size: [10, 4, 8],
    doorSide: "front",
    problemText: "Same lesson plan for 30 different learners",
    solutionText: "AI creates personalized lesson plans in seconds",
    statText: "3x student engagement",
    color: "#FFF8DC",
  },
];

export function getDoorPosition(room: RoomConfig): THREE.Vector3 {
  const [x, y, z] = room.position;
  const [w, , d] = room.size;
  switch (room.doorSide) {
    case "front":
      return new THREE.Vector3(x, y, z + d / 2);
    case "back":
      return new THREE.Vector3(x, y, z - d / 2);
    case "left":
      return new THREE.Vector3(x - w / 2, y, z);
    case "right":
      return new THREE.Vector3(x + w / 2, y, z);
  }
}
