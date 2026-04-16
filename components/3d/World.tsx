"use client";

import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Ground } from "./environment/Ground";
import { Sky } from "./environment/Sky";
import { Lights } from "./environment/Lights";
import { PhysicsWorld } from "./PhysicsWorld";
import { Principal } from "./Principal";
import { CameraRig } from "./CameraRig";
import { FrontGate } from "./rooms/FrontGate";
import { Classroom } from "./rooms/Classroom";
import { ExamHall } from "./rooms/ExamHall";
import { StaffRoom } from "./rooms/StaffRoom";
import { Library } from "./rooms/Library";
import { PrincipalOffice } from "./rooms/PrincipalOffice";
import { AccountsOffice } from "./rooms/AccountsOffice";
import { ParentRoom } from "./rooms/ParentRoom";
import { PostProcessing } from "./effects/PostProcessing";
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
          <FrontGate />
          <Classroom />
          <ExamHall />
          <StaffRoom />
          <Library />
          <PrincipalOffice />
          <AccountsOffice />
          <ParentRoom />
          <Decorations />
        </PhysicsWorld>
        <CameraRig />
        <PostProcessing />
      </Canvas>
    </KeyboardControls>
  );
}
