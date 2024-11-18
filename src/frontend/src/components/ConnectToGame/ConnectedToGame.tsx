import { useContext, useState } from "react"
import { postData } from "../../services/api"
import { GameContext } from "../../utils/GameContext"
import CookieHelper from "../../utils/CookieHelper"
import { CookieNames } from "../../utils/Constants"

function ConnectedToGame() {
    const { gameCode, setGameCode, otherUser } = useContext(GameContext)

    async function exitGame() {
        CookieHelper.removeCookie(CookieNames.currentGameCode)
        setGameCode(null)
    }

    return (
        <>
            <p>Connected to game: {gameCode}</p>
            <p>Connected to user: {otherUser?.username}</p>
            <button onClick={exitGame}>Exit game</button>
        </>
    )

}

export default ConnectedToGame
