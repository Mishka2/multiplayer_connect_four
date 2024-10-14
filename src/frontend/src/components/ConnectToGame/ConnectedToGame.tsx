import { useContext, useState } from "react"
import { postData } from "../../services/api"
import { GameContext } from "../../utils/GameContext"
import CookieHelper from "../../utils/CookieHelper"
import { CookieNames } from "../../utils/Constants"

function ConnectedToGame() {
    const { gameCode, setGameCode } = useContext(GameContext)

    async function exitGame() {
        CookieHelper.removeCookie(CookieNames.currentGameCode)
        setGameCode(null)
    }

    return (
        <>
            <p>connected to game: {gameCode}</p>
            <button onClick={exitGame}>Exit game</button>
        </>
    )

}

export default ConnectedToGame
