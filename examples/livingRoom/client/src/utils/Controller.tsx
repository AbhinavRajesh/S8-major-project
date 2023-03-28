import { useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { socket } from "./socket";

const Controller = () => {
  const [paused, setPaused] = useState<boolean>(false);

  useFrame(({ gl, camera }) => {
    if (gl.xr.getSession() !== null && !paused) {
      console.log("[SENDING COORDINATES]: ", camera.position)
      socket.emit("coordinates", JSON.stringify({
        type: "coordinates",
        position: camera.position.toArray()
      }))
      setPaused(() => true);
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPaused(() => false);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <></>;
};

export default Controller;
