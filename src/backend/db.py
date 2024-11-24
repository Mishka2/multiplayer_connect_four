# db.py
import asyncpg
import os
from dotenv import load_dotenv
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import List

load_dotenv()

class Database:
    _connection = None

    @classmethod
    async def get_connection(cls):
        if cls._connection is None:
            cls._connection = await asyncpg.connect(
                user=os.environ.get('POSTGRES_USER'),
                password=os.environ.get('POSTGRES_PASSWORD'),
                database=os.environ.get('POSTGRES_DB'),
                host=os.environ.get('POSTGRES_HOST')
            )
        return cls._connection

    @classmethod
    async def close_connection(cls):
        if cls._connection:
            await cls._connection.close()
            cls._connection = None


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        print("Successfully connected to websocket: ", websocket)
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        print("Disconnecting websocket")
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        print("Sending message", message, self.active_connections)
        for connection in self.active_connections:
            await connection.send_text(message)
