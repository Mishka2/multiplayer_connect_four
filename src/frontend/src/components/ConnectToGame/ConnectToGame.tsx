import { useContext, useState } from "react"
import { postData } from "../../services/api"
import { GameContext } from "../../utils/GameContext"
import CookieHelper from "../../utils/CookieHelper"
import { CookieNames } from "../../utils/Constants"

function ConnectToGame() {
    const [input, setInput] = useState("")
    const { username, setGameCode } = useContext(GameContext)

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInput(event.target.value.toUpperCase())
    }

    async function connect() {
        const response = await postData(`/connectToGame?gameId=${input}&username=${username}`)
        if (response.otherUser) {
            setGameCode(input)
        }
    }

    async function newGame() {
        const response = await postData(`/newGame?username=${username}`)
        CookieHelper.setCookie(CookieNames.currentGameCode, response.code)
        setGameCode(response.code)
    }

    return (
        <>
            <div>
                <p>connect...</p>
                <button onClick={newGame}>New Game</button>
                <div>
                    <input
                        value={input}
                        onChange={handleInputChange}
                    ></input>
                    <button onClick={connect}>Connect</button>
                </div>
            </div>
        </>
    )

}

export default ConnectToGame
