from flask import Flask


def create_app(config: str = "config.DevConfig"):
    """Factory for the core application instance."""
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object(config)

    with app.app_context():
        from . import routes  # noqa: F401

        return app
