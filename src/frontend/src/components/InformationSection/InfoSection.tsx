import { useContext, useEffect, useState } from "react";
import ConnectToGame from "../ConnectToGame/ConnectToGame";
import LogIn from "../LogIn/LogIn";
import LoggedIn from "../LogIn/LoggedIn";
import CookieHelper from "../../utils/CookieHelper";
import { CookieNames } from "../../utils/Constants";
import { GameContext } from "../../utils/GameContext";
import ConnectedToGame from "../ConnectToGame/ConnectedToGame";

function InfoSection() {
    const { username, setUsername, userId, setUserId, gameCode, setGameCode } = useContext(GameContext)

    useEffect(() => {
        checkForUsername()
    }, [username])

    useEffect(() => {
        checkForGameCode()
    }, [gameCode])

    function checkForUsername() {
        const cookieUsername = CookieHelper.getCookie(CookieNames.username)
        const cookieUserId = CookieHelper.getCookie(CookieNames.userId)
        console.log(cookieUsername)
        if (cookieUsername && cookieUserId) {
            setUsername(cookieUsername)
            setUserId(cookieUserId)
        }
    }

    function checkForGameCode() {
        const cookieGameCode = CookieHelper.getCookie(CookieNames.currentGameCode)
        if (cookieGameCode) {
            setGameCode(cookieGameCode)
        }
    }

    return (
        <>
            {username ? <LoggedIn /> : <LogIn />}
            {gameCode ? <ConnectedToGame /> : <ConnectToGame />}
        </>
    )
}

export default InfoSection
