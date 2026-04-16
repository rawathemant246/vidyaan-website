import { create } from "zustand";

interface GameState {
  nearDoor: number | null;
  setNearDoor: (id: number | null) => void;
  activeRoom: number | null;
  setActiveRoom: (id: number | null) => void;
  visitedRooms: Set<number>;
  markVisited: (id: number) => void;
  transformationPhase:
    | "idle"
    | "enter"
    | "problem"
    | "transform"
    | "solution"
    | "reset";
  setTransformationPhase: (phase: GameState["transformationPhase"]) => void;
}

export const useGameStore = create<GameState>((set) => ({
  nearDoor: null,
  setNearDoor: (id) => set({ nearDoor: id }),
  activeRoom: null,
  setActiveRoom: (id) => set({ activeRoom: id }),
  visitedRooms: new Set(),
  markVisited: (id) =>
    set((state) => {
      const next = new Set(state.visitedRooms);
      next.add(id);
      return { visitedRooms: next };
    }),
  transformationPhase: "idle",
  setTransformationPhase: (phase) => set({ transformationPhase: phase }),
}));
