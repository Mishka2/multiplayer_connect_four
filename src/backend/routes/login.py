import asyncio
from fastapi import APIRouter, Request, HTTPException
from db import Database

router = APIRouter(
    # prefix="/user",
    # tags=["user"],
)

@router.post("/add")
async def ask():
    return {"hi": "world"}


async def makeNewUser(username: str):
    query = "INSERT INTO \"user\" (name) VALUES ($1)"
    try:
        user = await Database._connection.execute(query, username)
        if user is None:
            raise HTTPException(status_code=400, detail="Unable to make user") 

        return {"username": username}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail="Cannot insert user into table") from e


@router.post("/login")
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
