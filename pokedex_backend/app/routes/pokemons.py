from flask import Blueprint,send_from_directory, jsonify,make_response
from app.models.pokemon import get_all_pokemons,get_images
from app.services.import_pokemons import import_pokemons
import os

pokemon_bp = Blueprint("pokemon", __name__)
assets_bp = Blueprint("assets", __name__)

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
SPRITES_DIR = os.path.join(BASE_DIR, "assets", "sprites")

@pokemon_bp.route("/pokemons", methods=["GET"])
def list_pokemons():
    data = get_all_pokemons()
    return jsonify(data)

@pokemon_bp.route("/images", methods=["GET"])
def sprite_images():
    data = get_images()
    return jsonify(data)

@pokemon_bp.route("/import-pokemons", methods=["POST"])
def import_data():
    import_pokemons()
    return {"status": "ok"}



@assets_bp.route("/sprites/<filename>")
def get_sprite(filename):
    response = make_response(send_from_directory(SPRITES_DIR, filename))
    response.headers["Cache-Control"] = "public, max-age=31536000, immutable"
    return response