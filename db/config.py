from dotenv import load_dotenv
from os import environ

load_dotenv()


class DevConfig:
    DB_CONN_STRING = environ.get("DB_CONN_STRING")


class TestConfig:
    DB_CONN_STRING = environ.get("TEST_DB_CONN_STRING")
    TESTING = True
