# db.py
import asyncpg
import os
from dotenv import load_dotenv

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
