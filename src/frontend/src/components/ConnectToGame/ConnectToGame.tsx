import { useState } from "react"
import { postData } from "../../services/api"

function ConnectToGame() {
    const [input, setInput] = useState("")

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInput(event.target.value.toUpperCase())
    }

    async function connect() {
        const response = await postData(`/connect?code=${input}`)
        console.log(response)
    }

    return (
        <>
            <p>connect...</p>
            <input
                value={input}
                onChange={handleInputChange}
            ></input>
            <button onClick={connect}>Connect</button>
        </>
    )

}

export default ConnectToGame
