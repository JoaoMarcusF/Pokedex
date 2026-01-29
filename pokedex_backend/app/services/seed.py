from app.models.pokemon import is_pokemon_table_empty
from app.services.import_pokemons import import_pokemons,missing_sprites,download_missing_sprites_multithreaded

def auto_seed():
    if is_pokemon_table_empty():
        print("📥 Banco vazio — iniciando seed")
        import_pokemons()
        print("✅ Seed finalizado")
    else:
        print("ℹ️ Banco já populado — seed ignorado")




def ensure_sprites():
    missing = missing_sprites()

    if missing:
        print(f"⚠ {len(missing)} sprites faltando")
        download_missing_sprites_multithreaded(8,missing)
    else:
        print("✔ Sprites completos")