import React, { Suspense, useEffect, useRef, useState } from "react";
import "./App.css";
import { VRButton, XR, Controllers, Hands } from "@react-three/xr";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";
import Controller from "./utils/Controller";
import Avatars from "./utils/Avatars";
import Room from "./Room";
import AudioChannel from "./Audio";
import { io } from "socket.io-client";

interface IConnections {
  serverEndpoint: string;
  clients: {
    [clientId: string]: number[];
  };
}

function App() {
  const socket = io("https://worried-pie-production.up.railway.app");
  const [avatarPositions, setAvatarPositions] = useState<number[][]>([]);

  const handleCoordinates = () => {
    socket.on("connections", (data) => {
      const connections = JSON.parse(data) as IConnections;
      console.log("[CONNECTIONS]: ", connections)
      const coordinates: number[][] = [];
      Object.keys(connections.clients).map((clientId) => {
        coordinates.push(connections.clients[clientId]);
      });
      setAvatarPositions(coordinates);
    });
  };

  useEffect(() => {
    handleCoordinates();
  }, []);

  return (
    <>
      <VRButton />
      <Canvas
        camera={{
          position: [0, 0, 0],
          manual: true,
        }}
      >
        <XR>
          <PerspectiveCamera position={[0, 0, 0]} makeDefault manual />
          <Controllers />
          <Hands />
          <AudioChannel />
          {/* <OrbitControls
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={0}
            minDistance={10}
            maxDistance={30}
          /> */}
          <ambientLight intensity={0.1} color="#b9d5ff" />
          <directionalLight
            intensity={1.2}
            color="#b9d5ff"
            position={[-4, 5, 2]}
          />
          <Suspense fallback={<Room />}>
            <Avatars positions={avatarPositions} />
            <Room />
            <Controller />
          </Suspense>
        </XR>
      </Canvas>
    </>
  );
}

export default App;
