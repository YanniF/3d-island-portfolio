import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../components/Loader.jsx";
import Island from "../models/Island.jsx";
import Sky from "../models/Sky.jsx";
import Bird from "../models/Bird.jsx";
import Plane from "../models/Plane.jsx";
import HomeInfo from "../components/HomeInfo.jsx";
import sakura from "../assets/sakura.mp3";
import { soundon, soundoff } from "../assets/icons/index.js";

const Home = () => {
  const [isRotating, setIsRotating] = useState(false)
  const [currentStage, setCurrentStage] = useState(1)
  const [isPlayingMusic, setIsPlayingMusic] = useState(false)

  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = .4
  audioRef.current.loop = true

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play()
    }

    return() => {
      audioRef.current.pause()
    }

  }, [isPlayingMusic]);

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
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        { !!currentStage && <HomeInfo currentStage={currentStage} /> }
      </div>
      <Canvas className='w-full h-screen bg-transparent'
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight skyColor='#b1e1ff' groundColor='#000000' intensity={1} />

          <Bird />
          <Sky isRotating={isRotating} />
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            isRotating={isRotating}
            position={planePosition}
            scale={planeScale}
            rotation={[0, 20, 0]}
          />
        </Suspense>
      </Canvas>
      <div className="absolute bottom-2 left-2" onClick={() => setIsPlayingMusic(!isPlayingMusic)}>
        <img src={isPlayingMusic ? soundon : soundoff} className="w-10 h-10 cursor-pointer object-contain" alt="Sound" />
      </div>
    </section>
  )
}

export default Home
