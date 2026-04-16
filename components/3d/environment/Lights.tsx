export function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} color="#ffe4c4" />
      <directionalLight
        position={[20, 30, 15]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      <hemisphereLight args={["#87CEEB", "#8B7355", 0.4]} />
    </>
  );
}
