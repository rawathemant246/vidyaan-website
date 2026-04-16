import { Physics } from "@react-three/rapier";

export function PhysicsWorld({ children }: { children: React.ReactNode }) {
  return (
    <Physics gravity={[0, -9.81, 0]} debug={false}>
      {children}
    </Physics>
  );
}
