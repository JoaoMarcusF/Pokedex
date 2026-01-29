from app.database import get_connection

#verifica se a tabela esta vazia
def is_pokemon_table_empty():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT COUNT(*) FROM pokemons")
    count = cur.fetchone()[0]
    cur.close()
    conn.close()
    return count == 0
#ordena os pokemons da tabela por ordem de id
def get_all_pokemons():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT id,name,types FROM pokemons ORDER BY id")
    rows = cur.fetchall()
    pokemons = []
    for row in rows:
        pokemons.append({
            "id": row[0],
            "name": row[1],
            "types": row[2]
        })
    cur.close()
    conn.close()
    return pokemons

def get_images():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT name,sprite_front_default FROM pokemons ORDER BY id")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    print(rows[1])
    return rows

