import { useContext } from "react"
import { postData } from "../../services/api"
import { CookieNames } from "../../utils/Constants"
import CookieHelper from "../../utils/CookieHelper"
import { GameContext } from "../../utils/GameContext"

type LoggedInProps = {
}

function LoggedIn({ }: LoggedInProps) {
    const { username, setUsername } = useContext(GameContext)

    async function logOut() {
        const response = await postData(`/logout?username=${username}`)
        CookieHelper.removeCookie(CookieNames.username)
        setUsername(null)
    }

    return (
        <>
            <p>Welcome {username}</p>
            <button onClick={logOut}>Log Out</button>
        </>
    )

}

export default LoggedIn
