export const COLORS = {
  skin: "#F4C28F",
  hair: "#2C1810",
  shirt: "#F5F5F5",
  pants: "#2C3E50",
  shoes: "#1A1A1A",
  briefcase: "#8B4513",
  tie: "#C0392B",
  glasses: "#333333",
} as const;

export const PLAYER = {
  speed: 5,
  jumpForce: 4,
  spawnPosition: [0, 2, 0] as [number, number, number],
  cameraOffset: [0, 4, 8] as [number, number, number],
} as const;

export const ROOM_NAMES = [
  "Front Gate",
  "Classroom",
  "Exam Hall",
  "Staff Room",
  "Library",
  "Principal Office",
  "Accounts Office",
  "Parent Room",
] as const;
