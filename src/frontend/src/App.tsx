import { useState } from 'react'
import './App.css'
import FullBoard from './components/Board/FullBoard'
import InfoSection from './components/InformationSection/InfoSection'
import { GameContext } from './utils/GameContext'
import { User } from './utils/Constants'


function App() {
  const [username, setUsername] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [gameCode, setGameCode] = useState<string | null>(null)
  const [otherUser, setOtherUser] = useState<User | null>(null)
  const [otherUserId, setOtherUserId] = useState<User | null>(null)

  return (
    <GameContext.Provider value={{
      username,
      setUsername,
      userId,
      setUserId,
      gameCode,
      setGameCode,
      otherUser,
      setOtherUser,
      otherUserId,
      setOtherUserId
    }}>
      <InfoSection />
      <FullBoard />
    </GameContext.Provider >
  )
}

export default App
