"use client";

import dynamic from "next/dynamic";
import { InteractionPrompt } from "@/components/shared/InteractionPrompt";
import { HUD } from "@/components/shared/HUD";

const World = dynamic(
  () => import("@/components/3d/World").then((mod) => ({ default: mod.World })),
  { ssr: false, loading: () => (
    <div className="h-screen w-screen bg-black text-white flex items-center justify-center">
      <h1 className="text-4xl font-bold">Vidyaan — Loading 3D World...</h1>
    </div>
  )}
);

export default function Home() {
  return (
    <>
      <World />
      <InteractionPrompt />
      <HUD />
    </>
  );
}
