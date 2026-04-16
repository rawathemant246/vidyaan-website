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
    id: 1,
    name: "Front Gate",
    position: [0, 0, 10],
    size: [10, 4, 8],
    doorSide: "back",
    problemText: "1 hour every morning on paper attendance",
    solutionText: "30-second digital check-in with APAAR ID",
    statText: "100% attendance accuracy",
    color: "#F5E6CA",
  },
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
  {
    id: 3,
    name: "Exam Hall",
    position: [18, 0, -15],
    size: [12, 4, 8],
    doorSide: "left",
    problemText: "Teachers spend 40% of the year grading",
    solutionText: "7 question types, auto-graded in minutes",
    statText: "40 hours → 40 minutes",
    color: "#F0F0F0",
  },
  {
    id: 4,
    name: "Staff Room",
    position: [18, 0, 0],
    size: [10, 4, 8],
    doorSide: "left",
    problemText: "Writing 500 report cards by hand",
    solutionText: "AI-generated remarks in Hindi & English",
    statText: "500 report cards in 10 minutes",
    color: "#E8DCC8",
  },
  {
    id: 5,
    name: "Library",
    position: [-18, 0, -15],
    size: [10, 4, 8],
    doorSide: "right",
    problemText: "Students stuck at 10 PM, no one to help",
    solutionText: "AI tutor that teaches, never just gives answers",
    statText: "24/7 personalized tutoring",
    color: "#DEB887",
  },
  {
    id: 6,
    name: "Principal Office",
    position: [-18, 0, 0],
    size: [10, 4, 8],
    doorSide: "right",
    problemText: "Flying blind — no idea what's really happening",
    solutionText: "Real-time visibility into every metric",
    statText: "Catch at-risk students 3 months earlier",
    color: "#D4C4A8",
  },
  {
    id: 7,
    name: "Accounts Office",
    position: [18, 0, 10],
    size: [10, 4, 8],
    doorSide: "left",
    problemText: "30% fee defaults, no tracking",
    solutionText: "100% fee visibility, auto-reminders",
    statText: "Fee collection up 40%",
    color: "#E8E8E8",
  },
  {
    id: 8,
    name: "Parent Room",
    position: [-18, 0, 10],
    size: [10, 4, 8],
    doorSide: "right",
    problemText: "Parents only hear from school when there's a problem",
    solutionText: "Parents see everything, in real-time",
    statText: "95% parent satisfaction",
    color: "#FFE4E1",
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
