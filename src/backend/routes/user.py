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

