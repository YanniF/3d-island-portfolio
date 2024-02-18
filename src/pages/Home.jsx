import {Suspense, useState} from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../components/Loader.jsx";
import Island from "../models/Island.jsx";
import Sky from "../models/Sky.jsx";
import Bird from "../models/Bird.jsx";
import Plane from "../models/Plane.jsx";

const Home = () => {
  const [isRotating, setIsRotating] = useState(false)

  const adjustIslandForScreenSize = () => {
    const screenPosition = [0, -6.5, -43]
    const rotation = [0.1, 4.7, 0]
    let screenScale = [];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9]
    }
    else {
      screenScale = [1, 1, 1]
    }

    return [screenScale, screenPosition, rotation]
  }

  const adjustPlaneForScreenSize = () => {
    let screenPosition = []
    let screenScale = [];

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5]
      screenPosition = [0, -1.5, 0]
    }
    else {
      screenScale = [3, 3, 3]
      screenPosition = [0, -4, -4]
    }

    return [screenScale, screenPosition]
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize()
  const [planeScale, planePosition] = adjustPlaneForScreenSize()

  return (
    <section className={`w-full h-screen relative ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}>
      {/*<div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>*/}
      {/*  popup*/}
      {/*</div>*/}
      <Canvas className='w-full h-screen bg-transparent'
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight skyColor='#b1e1ff' groundColor='#000000' intensity={1} />

          <Bird />
          <Sky />
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
          />
          <Plane
            isRotating={isRotating}
            position={planePosition}
            scale={planeScale}
            rotation={[0, 20, 0]}
          />
        </Suspense>
      </Canvas>
    </section>
  )
}

export default Home
