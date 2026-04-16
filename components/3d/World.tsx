"use client";

import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Ground } from "./environment/Ground";
import { Sky } from "./environment/Sky";
import { Lights } from "./environment/Lights";
import { PhysicsWorld } from "./PhysicsWorld";
import { Principal } from "./Principal";
import { CameraRig } from "./CameraRig";
import { RoomShell } from "./rooms/RoomShell";
import { ROOMS } from "@/lib/room-data";

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
    <KeyboardControls map={keyboardMap}>
      <Canvas
        shadows
        camera={{ position: [0, 8, 12], fov: 60 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        style={{ width: "100vw", height: "100vh" }}
      >
        <Lights />
        <Sky />
        <PhysicsWorld>
          <Ground />
          <Principal />
          <RoomShell room={ROOMS[0]}>
            {/* Classroom interior objects will go here in Task 8 */}
          </RoomShell>
        </PhysicsWorld>
        <CameraRig />
      </Canvas>
    </KeyboardControls>
  );
}
