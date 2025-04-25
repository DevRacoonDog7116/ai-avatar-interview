20import { CameraControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Avatar } from "./Avatar";
import * as THREE from "three";

export const Scenario = () => {
  const cameraControls = useRef();

  // Set the initial camera position and look-at point
  useEffect(() => {
    cameraControls.current.setLookAt(0, 2.2, 5, 0, 1.0, 0, true);
  }, []);

  return (
    <>
      {/* Camera controls */}
      <CameraControls ref={cameraControls} />
      
      {/* Background sphere with HDRI */}
      <mesh>
        <sphereGeometry args={[200, 60, 60]} />
        <meshBasicMaterial
          side={THREE.BackSide} // Ensures it's visible from inside the sphere
          map={new THREE.TextureLoader().load(
            "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/docklands_02_4k.hdr"
          )}
        />
      </mesh>
      
      {/* Your Avatar component */}
      <Avatar />
    </>
  );
};
