from flask import Flask
from .route import bp as main_blueprint
from .database import init_db


def create_app():
    app = Flask(__name__)
    app.register_blueprint(main_blueprint)

    with app.app_context():
        init_db()

    return app
