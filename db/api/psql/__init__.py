from os import environ

from dotenv import load_dotenv
from psycopg2.pool import ThreadedConnectionPool

load_dotenv()

# Create a connection pool.
db = ThreadedConnectionPool(5, 20, environ.get("DB_CONN_STRING"))
