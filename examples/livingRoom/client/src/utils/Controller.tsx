import { useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { SERVER } from "../infrastructure";

const Controller = () => {
  const [paused, setPaused] = useState<boolean>(false);

  useFrame(({ gl, camera }) => {
    if (gl.xr.getSession() !== null && !paused) {
      console.log("useFrame:", camera.position);
      SERVER.send({
        type: "coordinates",
        position: camera.position,
      });
      setPaused(() => true);
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPaused(() => false);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <></>;
};

export default Controller;
