import { useEffect, useState } from 'react'
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
  const [websocketConnection, setWebsocketConnection] = useState<WebSocket | null>(null)


  useEffect(() => {
    if (websocketConnection) {
      websocketConnection.onmessage = function (event) {
        console.log('Received message from server:', event.data);

        // Assuming the received message is JSON formatted
        try {
          const message = JSON.parse(event.data);
          console.log('Parsed message object:', message);

          for (const player of message["connected_users"]) {
            console.log("Player: ", player)
            if (player.user.user_id != userId) {
              let otherUser: User = {
                id: player.user.user_id,
                username: player.user.username
              }
              console.log("OTHER USER: ", otherUser)
              setOtherUser(otherUser)
            }
          }

        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };
    }
  }, [websocketConnection])

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
      setOtherUserId,
      websocketConnection,
      setWebsocketConnection
    }}>
      <InfoSection />
      <FullBoard />
    </GameContext.Provider >
  )
}

export default App
