import os
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed
from app.database import get_connection


QTD_PKM = 1025

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
SPRITES_DIR = os.path.join(BASE_DIR, "assets", "sprites")
os.makedirs(SPRITES_DIR, exist_ok=True)

def import_pokemons():
    conn = get_connection()
    cur = conn.cursor()
    
    
    for i in range(1, QTD_PKM + 1):
        data = requests.get(f"https://pokeapi.co/api/v2/pokemon/{i}").json()
    
    
        cur.execute(
            """
            INSERT INTO pokemons (id, name, types, sprite_front_default)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (id) DO NOTHING
            """,
            (
                data["id"],
                data["name"],
                [t["type"]["name"] for t in data["types"]],
                data["sprites"]["front_default"],
            )
        )
    
    
    conn.commit()
    cur.close()
    conn.close()

#ficou obsoleto devido ao missing_sprites
""" def download_sprites_from_db():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute( """"""
        SELECT name, sprite_front_default
        FROM pokemons
        WHERE sprite_front_default IS NOT NULL
    """""" )

    pokemons = cursor.fetchall()

    for pokemon_name, sprite_front_default in pokemons:
        file_path = os.path.join(SPRITES_DIR, f"{pokemon_name}.png")

        # evita baixar novamente
        if os.path.exists(file_path):
            continue

        try:
            response = requests.get(sprite_front_default, timeout=10)
            if response.status_code == 200:
                with open(file_path, "wb") as f:
                    f.write(response.content)
                print(f"✔ Sprite salvo: {pokemon_name}.png")
            else:
                print(f"⚠ Falha ao baixar sprite {pokemon_name}")

        except Exception as e:
            print(f"❌ Erro no sprite {pokemon_name}: {e}")

    cursor.close()
    conn.close() """

def missing_sprites():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute( """
        SELECT name
        FROM pokemons
        WHERE sprite_front_default IS NOT NULL
    """ )
    pkm_names = {row[0] for row in cursor.fetchall()}

    cursor.close()
    conn.close()

    files = {
        os.path.splitext(f)[0].lower()
        for f in os.listdir(SPRITES_DIR)
        if f.endswith(".png")
    }

    return pkm_names - files 


def download_single_sprite(name, sprite_url):
    if not sprite_url:
        return

    filename = f"{name.lower()}.png"
    file_path = os.path.join(SPRITES_DIR, filename)

    if os.path.exists(file_path):
        return

    try:
        response = requests.get(sprite_url, timeout=10)
        if response.status_code == 200:
            with open(file_path, "wb") as f:
                f.write(response.content)
            print(f"⬇ {filename}")
    except Exception as e:
        print(f"❌ Erro ao baixar {name}: {e}")

""" def download_missing_sprites(missing):

    if not missing:
        print("✔ Todos os sprites já existem")
        return

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute( """"""
        SELECT name, sprite_front_default
        FROM pokemons
        WHERE name = ANY(%s)
    """""" , (list(missing),))

    rows = cursor.fetchall()

    for name, sprite_front_default in rows:
        if not sprite_front_default:
            continue

        file_path = os.path.join(SPRITES_DIR, f"{name.lower()}.png")

        try:
            response = requests.get(sprite_front_default, timeout=10)
            if response.status_code == 200:
                with open(file_path, "wb") as f:
                    f.write(response.content)
                print(f"⬇ Sprite salvo: {name}.png")
        except Exception as e:
            print(f"❌ Erro ao baixar {name}: {e}")

    cursor.close()
    conn.close() """

def download_missing_sprites_multithreaded(max_workers,missing):

    if not missing:
        print("✔ Todos os sprites já existem")
        return

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT name, sprite_front_default
        FROM pokemons
        WHERE name = ANY(%s)
    """, (list(missing),))

    pokemons = cursor.fetchall()

    cursor.close()
    conn.close()

    print(f"⚡ Baixando {len(pokemons)} sprites com {max_workers} threads")

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = [
            executor.submit(download_single_sprite, name, url)
            for name, url in pokemons
        ]

        for future in as_completed(futures):
            future.result()  # garante que exceções apareçam
