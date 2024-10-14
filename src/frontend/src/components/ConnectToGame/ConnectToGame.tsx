import { useContext, useState } from "react"
import { postData } from "../../services/api"
import { GameContext } from "../../utils/GameContext"

function ConnectToGame() {
    const [input, setInput] = useState("")
    const { username, setGameCode } = useContext(GameContext)

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInput(event.target.value.toUpperCase())
    }

    async function connect() {
        const response = await postData(`/connect?code=${input}&username=${username}`)
    }

    async function newGame() {
        const response = await postData(`/newGame?username=${username}`)
        setGameCode(response.code)
    }

    return (
        <>
            <p>connect...</p>
            <input
                value={input}
                onChange={handleInputChange}
            ></input>
            <button onClick={connect}>Connect</button>
            <button onClick={newGame}>New Game</button>
        </>
    )

}

export default ConnectToGame
