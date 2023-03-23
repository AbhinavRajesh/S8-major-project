import React, { Suspense, useEffect, useRef, useState } from "react";
import "./App.css";
import { VRButton, XR, Controllers, Hands } from "@react-three/xr";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";
import Controller from "./utils/Controller";
import Avatars from "./utils/Avatars";
import Room from "./Room";
import { SERVER } from "./infrastructure";
import AudioChannel from "./Audio";

function App() {
  const [avatarPositions, setAvatarPositions] = useState([
    [0, 0, 0],
    [0, 1, 0],
    [1, 0, 0],
  ]);

  const handleStream = () => {
    SERVER.receive((data) => {
      const jsonData = JSON.parse(data);
      if (jsonData.type === "coordinates") {
        setAvatarPositions((prev: any) => {
          return [...jsonData.positions];
        });
      }
    });
  };

  useEffect(() => {
    SERVER.start();
    handleStream();
  });

  return (
    <>
      <VRButton />
      <Canvas
        camera={{
          // near: 0.1,
          // far: 100,
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
