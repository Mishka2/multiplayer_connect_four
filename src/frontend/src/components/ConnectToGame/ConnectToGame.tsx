import { useContext, useState } from "react"
import { postData } from "../../services/api"
import { GameContext } from "../../utils/GameContext"
import CookieHelper from "../../utils/CookieHelper"
import { CookieNames, User } from "../../utils/Constants"

function ConnectToGame() {
    const [input, setInput] = useState("")
    const { username, userId, setGameCode, otherUser, setOtherUser } = useContext(GameContext)

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInput(event.target.value.toUpperCase())
    }

    async function connect() {
        console.log(userId)
        const response = await postData(`/connectToGame?game_name=${input}&user_id=${userId}`)

        console.log("REEE", response)
        if (response.otherUser) {
            setGameCode(input)
            let otherUser: User = {
                id: response.otherUser.id,
                username: response.otherUser.name
            }
            setOtherUser(otherUser)
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
