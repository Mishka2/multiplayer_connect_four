import asyncio
from fastapi import APIRouter, Request, HTTPException
from db import Database
import random
import string
import uuid


router = APIRouter(
    # prefix="/user",
    # tags=["user"],
)

def generate_random_code():
    letters = string.ascii_uppercase
    code = ''.join(random.choice(letters) for _ in range(4))
    return code

async def initialize_new_game(code: str):
    make_game_query = """
    INSERT INTO game (name, game_state, active) VALUES ($1, 'trial', TRUE)
    RETURNING id
    """

    try:
        new_game_id = await Database._connection.fetchval(make_game_query, code)
        return new_game_id

    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed querying for game code") from e

async def get_user_id_by_name(username: str):
    get_user_id = """
    SELECT id from "user" where "name" = $1;
    """

    try:
        user_id = await Database._connection.fetchval(get_user_id, username)
        return user_id

    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed querying for game code") from e



async def make_new_game(code: str, username: str):
    add_user_to_game = "INSERT INTO user_to_game (user_id, game_id) VALUES ($1, $2)"

    try:
        new_game_id = await initialize_new_game(code)
        user_id = await get_user_id_by_name(username)
        await Database._connection.execute(add_user_to_game, user_id, new_game_id)

    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed querying for game code") from e

async def get_players_in_game(game_name: str):
    get_players = """
    SELECT "user".* FROM "user" 
    JOIN user_to_game ON "user".id = user_to_game.user_id 
    WHERE user_to_game.game_id = (SELECT id FROM game WHERE name = $1)
    """
    try:
        users_in_game = await Database._connection.fetch(get_players, game_name)
        return users_in_game

    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed get_players_in_game") from e

async def add_player_to_game(game_name: str, user_id: str):
    get_game = "SELECT id FROM game WHERE name = $1"
    add_user_to_game = "INSERT INTO user_to_game (user_id, game_id) VALUES ($1, $2)"
    try:
        game_id = await Database._connection.fetchval(get_game, game_name)
        await Database._connection.execute(add_user_to_game, user_id, game_id)

    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed querying for game code") from e


@router.post("/connectToGame")
async def connectToGame(game_name: str, user_id: str):
    if Database._connection is None:
        raise RuntimeError("Database connection has not been established!")

    players_in_game = await get_players_in_game(game_name)
    if (players_in_game == []):
        return {"error": "Not a valid game code"}
    elif (len(players_in_game) == 2):
        if (str(players_in_game[0]['id']) == user_id):
            return {"otherUser": players_in_game[1]}
        
        if (str(players_in_game[1]['id']) == user_id):
            return {"otherUser": players_in_game[0]}

        return {"error": "Game full"}
    else:
        await add_player_to_game(game_name, user_id)
        return {"otherUser":players_in_game[0]}




@router.get("/getPlayers")
async def getPlayers(gameId: str):
    if Database._connection is None:
        raise RuntimeError("Database connection has not been established!")

    return await get_players_in_game(gameId)


async def find_unique_game_code(username: str):
    query = "SELECT * FROM game WHERE name = $1"
    while True:
        code: str = generate_random_code()
        try:
            game = await Database._connection.fetchval(query, code)
            if game is None:
                await make_new_game(code, username)
                return {"code": code}
            
        except Exception as e:
            raise HTTPException(status_code=500, detail="Failed querying for game code") from e



@router.post("/newGame")
async def makeNewGame(username: str):
    if Database._connection is None:
        raise RuntimeError("Database connection has not been established!")

    return await find_unique_game_code(username)
