import { useContext, useState, useEffect } from "react"
import { postData } from "../../services/api"
import { GameContext } from "../../utils/GameContext"
import CookieHelper from "../../utils/CookieHelper"
import { CookieNames } from "../../utils/Constants"

function ConnectedToGame() {
    const { gameCode, setGameCode, otherUser, setWebsocketConnection, websocketConnection } = useContext(GameContext)

    let otherUsername = otherUser?.username

    async function exitGame() {
        CookieHelper.removeCookie(CookieNames.currentGameCode)
        setGameCode(null)
    }

    useEffect(() => {
        const websocket = new WebSocket(`ws://localhost:8000/ws/${gameCode}`);
        setWebsocketConnection(websocket)
    }, [gameCode])

    useEffect(() => {
        otherUsername = otherUser?.username
    }, [otherUser?.username])

    return (
        <>
            <p>Connected to game: {gameCode}</p>
            <p>Connected to user: {otherUsername}</p>
            <button onClick={exitGame}>Exit game</button>
        </>
    )

}

export default ConnectedToGame
