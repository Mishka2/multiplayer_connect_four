import { createContext } from "react"

type GameContextType = {
    username: string | null,
    setUsername: (username: string | null) => void,
    gameCode: string | null,
    setGameCode: (gameCode: string | null) => void
}

const defaultContext: GameContextType = {
    username: null,
    setUsername: () => { },
    gameCode: null,
    setGameCode: () => { }
}

export const GameContext = createContext<GameContextType>(defaultContext)
