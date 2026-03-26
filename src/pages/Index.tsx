import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Grid } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

function AnimatedBox({ initialPosition }: { initialPosition: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [targetPosition, setTargetPosition] = useState(new THREE.Vector3(...initialPosition))
  const currentPosition = useRef(new THREE.Vector3(...initialPosition))

  const getAdjacentIntersection = (current: THREE.Vector3) => {
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    const randomDirection = directions[Math.floor(Math.random() * directions.length)]
    return new THREE.Vector3(
      current.x + randomDirection[0] * 3,
      0.5,
      current.z + randomDirection[1] * 3
    )
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const newPosition = getAdjacentIntersection(currentPosition.current)
      newPosition.x = Math.max(-15, Math.min(15, newPosition.x))
      newPosition.z = Math.max(-15, Math.min(15, newPosition.z))
      setTargetPosition(newPosition)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useFrame(() => {
    if (meshRef.current) {
      currentPosition.current.lerp(targetPosition, 0.1)
      meshRef.current.position.copy(currentPosition.current)
    }
  })

  return (
    <mesh ref={meshRef} position={initialPosition}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#1e40af" opacity={0.6} transparent />
      <lineSegments>
        <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(1, 1, 1)]} />
        <lineBasicMaterial attach="material" color="#3b82f6" linewidth={2} />
      </lineSegments>
    </mesh>
  )
}

function Scene() {
  const initialPositions: [number, number, number][] = [
    [-9, 0.5, -9], [-3, 0.5, -3], [0, 0.5, 0], [3, 0.5, 3],
    [9, 0.5, 9], [-6, 0.5, 6], [6, 0.5, -6], [-12, 0.5, 0],
    [12, 0.5, 0], [0, 0.5, 12],
  ]

  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} color="#3b82f6" intensity={1.5} />
      <Grid
        renderOrder={-1}
        position={[0, 0, 0]}
        infiniteGrid
        cellSize={1}
        cellThickness={0.3}
        sectionSize={3}
        sectionThickness={0.8}
        sectionColor={[0.2, 0.3, 0.8]}
        fadeDistance={50}
      />
      {initialPositions.map((position, index) => (
        <AnimatedBox key={index} initialPosition={position} />
      ))}
    </>
  )
}

const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const Index = () => {
  return (
    <div className="w-full text-white font-inter" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* Hero Section */}
      <section
        className="relative w-full h-screen overflow-hidden"
        style={{
          backgroundImage: 'url(https://cdn.poehali.dev/projects/77c6a9b8-2f06-4deb-b5ca-3270f6a846a7/bucket/70b69beb-ae56-4c0a-b6b4-75a75da5820d.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/40 z-0" />

        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-20 p-6">
          <nav className="flex justify-between items-center max-w-6xl mx-auto">
            <span className="text-2xl font-bold tracking-wide text-white drop-shadow-lg">NexusFlow</span>
            <ul className="hidden md:flex space-x-8 text-sm font-medium">
              <li><a href="#features" className="hover:text-blue-300 transition">Возможности</a></li>
              <li><a href="#how-it-works" className="hover:text-blue-300 transition">Как работает</a></li>
              <li><a href="#contact" className="hover:text-blue-300 transition">Контакты</a></li>
            </ul>
          </nav>
        </header>

        {/* Hero content */}
        <div className="absolute inset-0 z-10 flex flex-col items-end justify-center pr-12 md:pr-24 text-right">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight drop-shadow-2xl max-w-2xl">
            Умная<br />оркестрация
          </h1>
          <p className="text-lg md:text-xl mb-10 text-gray-200 max-w-md drop-shadow">
            Управляйте распределёнными сервисами через единый мощный интерфейс
          </p>

          {/* Three navigation buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollToSection('features')}
              className="px-7 py-3 rounded-md font-semibold text-white border-2 border-white hover:bg-white hover:text-blue-900 transition duration-300 backdrop-blur-sm"
            >
              Возможности
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="px-7 py-3 rounded-md font-semibold text-white border-2 border-blue-400 hover:bg-blue-600 hover:border-blue-600 transition duration-300 backdrop-blur-sm"
            >
              Как работает
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-7 py-3 rounded-md font-semibold bg-red-600 hover:bg-red-700 border-2 border-red-600 hover:border-red-700 transition duration-300"
            >
              Связаться
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative bg-gray-950 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">Возможности</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-blue-500/40 transition">
              <div className="text-blue-400 text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">Единый центр управления</h3>
              <p className="text-gray-400 leading-relaxed">Контролируйте все распределённые сервисы из интуитивной панели с мониторингом в реальном времени.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-blue-500/40 transition">
              <div className="text-red-400 text-4xl mb-4">🔀</div>
              <h3 className="text-xl font-semibold mb-3">Умная маршрутизация</h3>
              <p className="text-gray-400 leading-relaxed">Интеллектуальное распределение трафика обеспечивает оптимальную производительность всех узлов.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-blue-500/40 transition">
              <div className="text-green-400 text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-3">Нулевой простой</h3>
              <p className="text-gray-400 leading-relaxed">Автоматическое переключение и балансировка нагрузки поддерживают работу без перебоев.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section with 3D */}
      <section id="how-it-works" className="relative bg-black py-24 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Как работает</h2>
          <p className="text-center text-gray-400 mb-14 max-w-xl mx-auto">Три шага до полного контроля над вашей инфраструктурой</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Подключите сервисы', desc: 'Интегрируйте существующую инфраструктуру за несколько минут через API или готовые коннекторы.' },
              { step: '02', title: 'Настройте правила', desc: 'Задайте политики маршрутизации, приоритеты и пороги автомасштабирования под вашу задачу.' },
              { step: '03', title: 'Наблюдайте и управляйте', desc: 'Получайте аналитику в реальном времени и управляйте всей системой из единой точки.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative pl-6 border-l-2 border-blue-600">
                <span className="text-blue-500 text-sm font-mono font-bold">{step}</span>
                <h3 className="text-xl font-semibold mt-2 mb-3">{title}</h3>
                <p className="text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3D background */}
        <div className="absolute inset-0 z-0 opacity-30">
          <Canvas shadows camera={{ position: [30, 30, 30], fov: 50 }}>
            <Scene />
          </Canvas>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-950 py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Готовы начать?</h2>
          <p className="text-gray-400 mb-10">Оставьте заявку — мы свяжемся и покажем, как NexusFlow подойдёт для вашего проекта.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-1 px-5 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
            />
            <button className="px-8 py-3 rounded-md font-semibold bg-blue-600 hover:bg-blue-700 transition duration-300 whitespace-nowrap">
              Получить доступ
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 px-4 border-t border-white/10 text-center text-gray-600 text-sm">
        © 2024 NexusFlow. Все права защищены.
      </footer>
    </div>
  )
}

export default Index
