import { CameraControls, Environment, useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Avatar } from "./Avatar";

const Ground = () => {
  const texture = useTexture(
    "https://cdn.polyhaven.org/textures/jpeg/2k/grass_0002_2k.jpg"
  );

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial
        map={texture}
        map-repeat={[100, 100]}
        map-wrapS={1000}
        map-wrapT={1000}
      />
    </mesh>
  );
};

export const Scenario = () => {
  const cameraControls = useRef();
  useEffect(() => {
    cameraControls.current.setLookAt(0, 2.2, 5, 0, 1.0, 0, true);
  }, []);

  return (
    <>
      <CameraControls ref={cameraControls} />
      <Environment
        background
        files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/docklands_02_2k.hdr"
      />
      <Ground />
      <Avatar />
    </>
  );
};
