import { createContext } from "react"
import { User } from "./Constants"


type GameContextType = {
    username: string | null,
    setUsername: (username: string | null) => void,
    userId: string | null,
    setUserId: (userId: string | null) => void,
    gameCode: string | null,
    setGameCode: (gameCode: string | null) => void,
    otherUser: User | null,
    setOtherUser: (user: User | null) => void,
    otherUserId: User | null,
    setOtherUserId: (user: User | null) => void,
    websocketConnection: WebSocket | null,
    setWebsocketConnection: (websocketConnection: WebSocket | null) => void
}

const defaultContext: GameContextType = {
    username: null,
    setUsername: () => { },
    userId: null,
    setUserId: () => { },
    gameCode: null,
    setGameCode: () => { },
    otherUser: null,
    setOtherUser: () => { },
    otherUserId: null,
    setOtherUserId: () => { },
    websocketConnection: null,
    setWebsocketConnection: () => { }
}

export const GameContext = createContext<GameContextType>(defaultContext)
