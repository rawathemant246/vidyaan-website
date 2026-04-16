import { RigidBody } from "@react-three/rapier";

export function Ground() {
  return (
    <RigidBody type="fixed" friction={1}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#7CCD7C" />
      </mesh>
    </RigidBody>
  );
}
