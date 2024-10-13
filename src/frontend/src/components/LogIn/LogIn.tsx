import { useState } from "react"
import { postData } from "../../services/api"
import CookieHelper from "../../utils/CookieHelper"
import { CookieNames } from "../../utils/Constants"

type LogInProps = {
    setUsername: (username: string) => void
}

function LogIn({ setUsername }: LogInProps) {
    const [input, setInput] = useState("")

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInput(event.target.value.toLowerCase())
    }

    async function login() {
        const response = await postData(`/login?username=${input}`)
        const username: string = response.username
        if (username) {
            setUsername(username)
            CookieHelper.setCookie(CookieNames.username, username)
        }

    }

    return (
        <>
            <p>Log in...</p>
            <input
                value={input}
                onChange={handleInputChange}
            ></input>
            <button onClick={login}>Log In</button>
        </>
    )

}

export default LogIn
