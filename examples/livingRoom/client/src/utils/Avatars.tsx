import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";

const Avatars = ({ positions }: { positions: any }) => {
  const [avatars, setAvatars] = useState<any>();

  useEffect(() => {
    if (positions) {
      const temp = positions?.map(({position, rotation}: any, key: any) => {
        return (
          <Avatar
            position={position}
            rotation={rotation}
            key={key}
            model={`/avatar/scene.gltf?randomId=${key}`}
          />
        );
      });
      setAvatars(temp);
    }
  }, [positions]);

  return <>{avatars}</>;
};

export default Avatars;
