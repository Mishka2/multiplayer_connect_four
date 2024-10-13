import { postData } from "../../services/api"
import { CookieNames } from "../../utils/Constants"
import CookieHelper from "../../utils/CookieHelper"

type LoggedInProps = {
    username: string,
    setUsername: (username: string | null) => void
}

function LoggedIn({ username, setUsername }: LoggedInProps) {

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
