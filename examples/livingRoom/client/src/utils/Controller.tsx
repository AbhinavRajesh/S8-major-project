import { useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { SERVER } from "../infrastructure";
import { io } from "socket.io-client";

const Controller = () => {
  const [paused, setPaused] = useState<boolean>(false);
  const socket = io("https://worried-pie-production.up.railway.app")

  useFrame(({ gl, camera }) => {
    if (gl.xr.getSession() !== null && !paused) {
      socket.emit("coordinates", JSON.stringify({
        type: "coordinates",
        position: camera.position
      }))
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
