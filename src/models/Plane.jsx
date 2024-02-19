import {useAnimations, useGLTF} from "@react-three/drei";
import planeScene from '../assets/3d-models/plane.glb'
import {useEffect, useRef} from "react";

const Plane = ({ isRotating, ...props }) => {
  const planeRef = useRef()
  const { scene, animations } = useGLTF(planeScene)
  const { actions } = useAnimations(animations, planeRef)

  useEffect(() => {
    if (isRotating) {
      actions['Take 001'].play()
    }
    else {
      actions['Take 001'].stop()
    }
  }, [actions, isRotating]);

  return (
    <mesh {...props} ref={planeRef}>
      <primitive object={scene} />
    </mesh>
  )
}

export default Plane
