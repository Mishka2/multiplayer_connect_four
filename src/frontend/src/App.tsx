import { useState } from 'react'
import './App.css'
import FullBoard from './components/Board/FullBoard'
import InfoSection from './components/InformationSection/InfoSection'
import { GameContext } from './utils/GameContext'


function App() {
  const [username, setUsername] = useState<string | null>(null)
  const [gameCode, setGameCode] = useState<string | null>(null)

  return (
    <GameContext.Provider value={{ username, setUsername, gameCode, setGameCode }}>
      <InfoSection />
      <FullBoard />
    </GameContext.Provider >
  )
}

export default App
