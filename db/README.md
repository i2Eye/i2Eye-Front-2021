# i2Eye-Back

Requirements:

1. Python 3.8
2. [Docker Compose](https://docs.docker.com/compose/install/)

## Setting up your environment

1. Create a virtual environment, and install dependencies. The second command is different if you're on Windows. See the [venv docs](https://docs.python.org/3/library/venv.html#creating-virtual-environments) for details.

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt -r requirements-dev.txt
```

2. Copy the contents of `.env.example` into a new file named `.env`. This file is used to provision environment variables and other secrets.
3. From the root directory, run `docker-compose up -d`. This spins up a postgres container, bound to port 5432 on the host, and applies all migrations.
4. Then use `make seed` to seed some initial values.
5. To start the Flask application, use `flask run`.
