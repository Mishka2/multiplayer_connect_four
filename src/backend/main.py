from fastapi import FastAPI, HTTPException
import asyncio
import asyncpg
import random
import string
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware
from routes.user import router as user_router
from db import Database

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173", "http://127.0.0.1:8000"],  # Allows requests from specific origins
    allow_credentials=True,  # Allows cookies and HTTP auth credentials
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

connection = None
app.include_router(user_router)

@app.on_event("startup")
async def setup_connection():
    global connection
    connection = await Database.get_connection()

@app.on_event("shutdown")
async def shutdown_event():
    global connection
    await Database.close_connection()


@app.get("/")
async def root():
    if Database._connection is None:
        raise RuntimeError("Database connection has not been established!")
    
    return {"message": "Hello World"}

@app.post("/connect")
async def connectWithCode(code: str, username: str):
    if Database._connection is None:
        raise RuntimeError("Database connection has not been established!")

def generate_random_code():
    letters = string.ascii_uppercase
    code = ''.join(random.choice(letters) for _ in range(4))
    return code

async def find_unique_game_code():
    query = "SELECT * FROM game WHERE name = $1"
    while True:
        code: str = generate_random_code()
        try:
            user = await Database._connection.fetchval(query, code)
            if user is None:
                return {"code": code}
            
        except Exception as e:
            raise HTTPException(status_code=500, detail="Failed querying for game code") from e



@app.post("/newGame")
async def makeNewGame(username: str):
    if Database._connection is None:
        raise RuntimeError("Database connection has not been established!")

    return await find_unique_game_code()


async def makeNewUser(username: str):
    query = "INSERT INTO \"user\" (name) VALUES ($1)"
    try:
        user = await Database._connection.execute(query, username)
        if user is None:
            raise HTTPException(status_code=400, detail="Unable to make user") 

        return {"username": username}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail="Cannot insert user into table") from e


@app.post("/login")
async def loginWithUsername(username: str):
    if Database._connection is None:
        raise RuntimeError("Database connection has not been established!")
  
    query = "SELECT id FROM \"user\" WHERE name = $1"
    try:
        print("trying to select from user", username)
        userList = await Database._connection.fetchval(query, username)
        print("userlist")
        if userList is None:
            # Make new user
            await makeNewUser(username)
            return {"username": username}

        # Re-write old user
        return {"username": username}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail="Could not find user") from e
