from flask import Flask
from app.routes.pokemons import pokemon_bp,assets_bp
from app.services.seed import auto_seed,ensure_sprites
from app.services.import_pokemons import init_db
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(pokemon_bp)
    app.register_blueprint(assets_bp)

    # 🚨 roda UMA vez ao subir
    with app.app_context():
        init_db()
        auto_seed()
        ensure_sprites()
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug = True)