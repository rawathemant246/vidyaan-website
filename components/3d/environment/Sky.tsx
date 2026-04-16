export function Sky() {
  return (
    <>
      <color attach="background" args={["#87CEEB"]} />
      <fog attach="fog" args={["#87CEEB", 40, 80]} />
    </>
  );
}
