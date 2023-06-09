/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.3 scene.gltf
Author: 634230009 (https://sketchfab.com/634230009)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/634230009-my-avatar-5cca7aa30438467b959b9c78c98450e2
Title: 634230009 My Avatar
*/

import { useGLTF } from "@react-three/drei";

const Avatar = (props: any) => {
  const { nodes, materials } = useGLTF(props.model) as any;

  console.log(`Created at position: ${props.position}`);

  return (
    <group
      {...props}
      position={[
        props.position[0],
        props.position[1] - 1.6,
        props.position[2] + 0.1,
      ]}
      rotation={[0, Math.PI, 0]}
    >
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.97}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <primitive object={nodes.GLTF_created_0_rootJoint} />
          <skinnedMesh
            geometry={nodes.Object_7.geometry}
            material={materials.Wolf3D_Eye}
            skeleton={nodes.Object_7.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Object_9.geometry}
            material={materials.Wolf3D_Eye}
            skeleton={nodes.Object_9.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Object_11.geometry}
            material={materials.Wolf3D_Skin}
            skeleton={nodes.Object_11.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Object_13.geometry}
            material={materials.Wolf3D_Teeth}
            skeleton={nodes.Object_13.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Object_15.geometry}
            material={materials.Wolf3D_Body}
            skeleton={nodes.Object_15.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Object_17.geometry}
            material={materials.Wolf3D_Outfit_Bottom}
            skeleton={nodes.Object_17.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Object_19.geometry}
            material={materials.Wolf3D_Outfit_Footwear}
            skeleton={nodes.Object_19.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Object_21.geometry}
            material={materials.Wolf3D_Outfit_Top}
            skeleton={nodes.Object_21.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Object_23.geometry}
            material={materials.Wolf3D_Hair}
            skeleton={nodes.Object_23.skeleton}
          />
        </group>
      </group>
    </group>
  );
};

// useGLTF.preload('/avatar/scene.gltf')

export default Avatar;
