import { CameraControls, Environment } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Avatar } from "./Avatar";

export const Scenario = () => {
  const cameraControls = useRef();
  useEffect(() => {
    cameraControls.current.setLookAt(0, 2.2, 5, 0, 1.0, 0, true);
  }, []);
  return (
    <>
      <CameraControls ref={cameraControls} />
      <Environment preset="sunset" files="https://blenderartists.org/uploads/default/original/3X/6/c/6c3c595edc8b349b2028b28a2f570e89ea7ae7fd.jpg" background/>
      <Avatar />
    </>
  );
};
