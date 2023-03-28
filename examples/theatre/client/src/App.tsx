import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";
import { VRButton, XR, Controllers, Hands } from "@react-three/xr";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import "./App.css";
import sampleVideo from "./assets/video/sample_video.mp4";
import Hall from "./Hall";
import { socket } from "./utils/socket";
import Avatars from "./utils/Avatars";

interface IConnections {
  serverEndpoint: string;
  clients: {
    [clientId: string]: number[];
  };
  seekTime: number;
}

const Theatre = () => {
  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = sampleVideo;
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();
    return vid;
  });

  const handleCoordinates = () => {
    socket.on("stream", (data) => {
      const connections = JSON.parse(data) as IConnections;
      console.log("stream", connections.seekTime);
      video.currentTime = connections.seekTime;
    });

    setInterval(() => {
      socket.emit(
        "stream",
        JSON.stringify({ type: "stream", seekTime: video.currentTime })
      );
    }, 500);
  };

  useEffect(() => {
    handleCoordinates();
  }, []);

  return (
    <>
      <group position={[0, -11, 10]} scale={10}>
        <mesh rotation={[0, Math.PI, 0]} position={[0, 2, 3]}>
          <planeGeometry args={[3.2, 1.9]} />
          <meshStandardMaterial emissive={"white"} side={THREE.DoubleSide}>
            <videoTexture attach="map" args={[video]} />
            <videoTexture attach="emissiveMap" args={[video]} />
          </meshStandardMaterial>
        </mesh>
      </group>
    </>
  );
};

const Controls = () => {
  const { camera } = useThree();

  const handleKeyPress = (e: KeyboardEvent) => {
    switch (e.key) {
      case "w":
        camera.translateZ(-10);
        break;
      case "s":
        camera.translateZ(10);
        break;
      case "a":
        camera.translateX(10);
        break;
      case "d":
        camera.translateX(-10);
        break;
    }
    console.log(camera);
  };
  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  });

  return null;
};

const Controller = () => {
  const [paused, setPaused] = useState<boolean>(false);

  useFrame(({ gl, camera }) => {
    if (gl.xr.getSession() !== null && !paused) {
      const vector3 = new THREE.Vector3();
      const direction = camera.getWorldDirection(vector3);
      // SERVER.send({
      //   type: "coordinates",
      //   position: camera.position,
      //   direction: direction
      // })
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

  return null;

  // useFrame(() => {
  //   if (!rightController) return;
  //   const { grip: controller } = rightController;

  // })
  // const { camera } = useThree();

  // useEffect(() => {
  //   function handleControllerInput(event: any) {
  //     const gamepad = event.gamepad;
  //     const x = gamepad.axes[0];
  //     const y = gamepad.axes[1];
  //     camera.position.x = x;
  //     camera.position.y = y;
  //   }

  //   window.addEventListener("gamepadconnected", handleControllerInput);
  //   return () =>
  //     window.removeEventListener("gamepadconnected", handleControllerInput);
  // }, []);

  // return null;
};

function App() {
  const [avatarPositions, setAvatarPositions] = useState<number[][]>([]);

  const handleCoordinates = () => {
    socket.on("connections", (data) => {
      const connections = JSON.parse(data) as IConnections;
      // console.log("[CONNECTIONS]: ", connections);
      const coordinates: number[][] = [];
      Object.keys(connections.clients).map((clientId) => {
        coordinates.push(connections.clients[clientId]);
      });
      // console.log("COORDINATES: ", coordinates);
      setAvatarPositions(coordinates);
    });
  };

  useEffect(() => {
    handleCoordinates();
  }, []);

  // useEffect(() => {
  //   function handleControllerInput(event: any) {
  //     const gamepad = event.gamepad;
  //     const x = gamepad.axes[0];
  //     const y = gamepad.axes[1];
  //     SERVER.send(JSON.stringify({x, y}))
  //   }

  //   window.addEventListener("gamepadconnected", handleControllerInput);
  //   return () =>
  //     window.removeEventListener("gamepadconnected", handleControllerInput);
  // }, []);

  // if (window.location.pathname === "/chat") return <Chat />;

  return (
    <>
      <VRButton />
      <Canvas
        camera={{
          // near: 0.1,
          // far: 100,
          position: [0, 0, 0],
        }}
      >
        <XR>
          <Controllers />
          <Hands />
          <OrbitControls
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={0}
            minDistance={10}
            maxDistance={30}
          />
          <ambientLight intensity={0.1} color="#b9d5ff" />
          <directionalLight
            intensity={1.2}
            color="#b9d5ff"
            position={[-4, 5, 2]}
          />
          <Suspense fallback={<Theatre />}>
            <Avatars positions={avatarPositions} />
            <Theatre />
            <Controls />
            <Hall />
            <Controller />
          </Suspense>
        </XR>
      </Canvas>
    </>
  );
}

export default App;
