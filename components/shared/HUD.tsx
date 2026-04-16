"use client";

import { useGameStore } from "@/hooks/useGameStore";
import { ROOMS } from "@/lib/room-data";

export function HUD() {
  const { visitedRooms, activeRoom, transformationPhase } = useGameStore();

  const phaseLabel =
    transformationPhase === "problem"
      ? "The Problem..."
      : transformationPhase === "transform"
        ? "Transforming..."
        : transformationPhase === "solution"
          ? "The Vidyaan Solution"
          : null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Top-left: Vidyaan logo */}
      <div className="absolute top-6 left-6">
        <h1 className="text-white text-2xl font-bold leading-tight">
          विद्यान
        </h1>
        <p className="text-white text-sm opacity-70">Vidyaan</p>
      </div>

      {/* Top-right: Room progress badge */}
      <div className="absolute top-6 right-6">
        <div className="bg-black/50 backdrop-blur-md text-white text-sm px-4 py-2 rounded-full">
          Rooms: {visitedRooms.size}/{ROOMS.length}
        </div>
      </div>

      {/* Bottom-left: Controls hint (only when NOT in a room) */}
      {activeRoom === null && (
        <div className="absolute bottom-6 left-6">
          <div className="bg-black/60 backdrop-blur-sm text-white/80 text-xs px-4 py-2 rounded-lg">
            WASD — Move | E — Interact | Space — Jump
          </div>
        </div>
      )}

      {/* Bottom-center: Transformation phase indicator */}
      {activeRoom !== null && phaseLabel && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="bg-black/60 backdrop-blur-md text-white text-lg font-semibold px-6 py-3 rounded-xl">
            {phaseLabel}
          </div>
        </div>
      )}
    </div>
  );
}
