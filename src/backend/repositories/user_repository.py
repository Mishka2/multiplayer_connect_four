
def get_users():
    return 'SELECT * FROM "user"'

def is_unique_username(username: str):
    'SELECT * FROM "user" where "user".username like {username}'

def put_username(username: str):
    'INSERT INTO "user" (username) VALUES (\'{username}\');'
    
