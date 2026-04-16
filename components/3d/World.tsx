"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Ground } from "./environment/Ground";
import { Sky } from "./environment/Sky";
import { Lights } from "./environment/Lights";
import { PhysicsWorld } from "./PhysicsWorld";
import { Principal } from "./Principal";
import { CameraRig } from "./CameraRig";
import { Classroom } from "./rooms/Classroom";
import { Decorations } from "./environment/Decorations";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "jump", keys: ["Space"] },
  { name: "interact", keys: ["KeyE"] },
];

export function World() {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh" }}>
      <KeyboardControls map={keyboardMap}>
        <Canvas
          camera={{ position: [0, 8, 12], fov: 60 }}
          gl={{ antialias: true, powerPreference: "high-performance" }}
        >
          <Lights />
          <Sky />
          <Suspense fallback={null}>
            <PhysicsWorld>
              <Ground />
              <Principal />
              <Classroom />
              <Decorations />
            </PhysicsWorld>
          </Suspense>
          <CameraRig />
        </Canvas>
      </KeyboardControls>
    </div>
  );
}
