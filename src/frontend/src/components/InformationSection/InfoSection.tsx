import { useState } from "react";
import ConnectToGame from "./ConnectToGame";

function InfoSection() {

    const [connectedToGame, setConnectedToGame] = useState(false)

    return (
        <>
            {connectedToGame ?
                <p>connected!</p>
                :
                <ConnectToGame />
            }
        </>
    )
}

export default InfoSection
