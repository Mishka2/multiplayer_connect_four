import { useEffect, useState } from "react";
import ConnectToGame from "../ConnectToGame/ConnectToGame";
import LogIn from "../LogIn/LogIn";
import LoggedIn from "../LogIn/LoggedIn";
import CookieHelper from "../../utils/CookieHelper";
import { CookieNames } from "../../utils/Constants";

function InfoSection() {

    const [username, setUsername] = useState<string | null>(null)
    const [connectedToGame, setConnectedToGame] = useState(false)

    useEffect(() => {
        checkForUsername()
    }, [])

    function checkForUsername() {
        const cookieUsername = CookieHelper.getCookie(CookieNames.username)
        console.log(cookieUsername)
        if (cookieUsername) {
            setUsername(cookieUsername)
        }
    }

    return (
        <>
            {username ? <LoggedIn username={username} setUsername={setUsername} /> : <LogIn setUsername={setUsername} />}
            {connectedToGame ?
                <p>connected!</p>
                :
                <ConnectToGame />
            }
        </>
    )
}

export default InfoSection
