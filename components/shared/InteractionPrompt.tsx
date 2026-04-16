"use client";

import { useGameStore } from "@/hooks/useGameStore";
import { ROOMS } from "@/lib/room-data";

export function InteractionPrompt() {
  const nearDoor = useGameStore((s) => s.nearDoor);
  const activeRoom = useGameStore((s) => s.activeRoom);

  if (nearDoor === null || activeRoom !== null) return null;

  const room = ROOMS.find((r) => r.id === nearDoor);
  if (!room) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <div className="bg-black/70 backdrop-blur-sm text-white px-6 py-3 rounded-xl text-center">
        <p className="text-lg font-semibold">
          Press{" "}
          <kbd className="bg-white/20 px-2 py-0.5 rounded mx-1">E</kbd> to
          enter {room.name}
        </p>
      </div>
    </div>
  );
}
