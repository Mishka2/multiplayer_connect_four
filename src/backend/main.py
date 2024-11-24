from fastapi import FastAPI, HTTPException
import asyncio
import asyncpg
import json
from dotenv import load_dotenv
import os
from db import ConnectionManager
from fastapi import  WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from routes.user import router as user_router
from routes.login import router as login_router
from routes.game import router as game_router
from routes.game import get_players_in_game
from db import Database
import asyncio
import websockets

load_dotenv()

app = FastAPI()
manager = ConnectionManager()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173", "http://127.0.0.1:8000", "http://localhost:8000"],  # Allows requests from specific origins
    allow_credentials=True,  # Allows cookies and HTTP auth credentials
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

connection = None
app.include_router(user_router)
app.include_router(login_router)
app.include_router(game_router)

@app.on_event("startup")
async def setup_connection():
    global connection
    connection = await Database.get_connection()

@app.on_event("shutdown")
async def shutdown_event():
    global connection
    await Database.close_connection()


@app.websocket("/ws/{game_name}")
async def websocket_endpoint(websocket: WebSocket, game_name: str):
    await manager.connect(websocket)
    try:
        while True:
            players = await get_players_in_game(game_name)
           
            allPlayersInfo = []
            for player in players:
                print(player)
                allPlayersInfo.append({
                    "user": {
                        "username": player["name"],
                        "user_id": str(player["id"])
                    }
                })

            data = {
                "connected_users": allPlayersInfo
            }

            print(data)

            # Use json.dumps to serialize the Python dictionary to a JSON string
            json_data = json.dumps(data)

            print(json_data)
            await manager.broadcast(json_data)
            data = await websocket.receive_text()
            await manager.broadcast(f"Client #{client_id} says: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"Client #{client_id} disconnected")


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")


@app.get("/")
async def root():
    if Database._connection is None:
        raise RuntimeError("Database connection has not been established!")
    
    return {"message": "Hello World"}

# asyncio.run(main())
