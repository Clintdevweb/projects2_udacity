Setting project:

create a postgres local name: shopping, username:postgres, password: Password123
create .env file and put all enviroment variable to it
Running: 'db-migrate up' to creation DB  
create all 3 table User, Product, Order in a file ts in migrations folder

db-migrate down: to drop a table DB

#Environment variable

PROSTGRES_HOST = 127.0.0.1
PROSTGRES_DB = shopping
PROSTGRES_DB_TEST = shopping_test
PROSTGRES_USER = shopping_user
PRODUCTION_USERNAME = shopping_user
PROSTGRES_PASSWORD = Password123
TOKEN_SECRET = hanhpass1
ENV = dev