import { useContext, useEffect, useState } from "react";
import ConnectToGame from "../ConnectToGame/ConnectToGame";
import LogIn from "../LogIn/LogIn";
import LoggedIn from "../LogIn/LoggedIn";
import CookieHelper from "../../utils/CookieHelper";
import { CookieNames } from "../../utils/Constants";
import { GameContext } from "../../utils/GameContext";
import ConnectedToGame from "../ConnectToGame/ConnectedToGame";

function InfoSection() {
    const { username, setUsername, gameCode, setGameCode } = useContext(GameContext)

    useEffect(() => {
        checkForUsername()
    }, [])

    useEffect(() => {
        checkForGameCode()
    }, [username])

    function checkForUsername() {
        const cookieUsername = CookieHelper.getCookie(CookieNames.username)
        if (cookieUsername) {
            setUsername(cookieUsername)
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
