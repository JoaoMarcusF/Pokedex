import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import PokemonCard from './components/PokemonCards'; // <-- ajuste aqui

import './App.css';

type Pokemon = {
  name: string;
  image: string;
  types: string[];
};

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const promises = [];

      for (let i = 1; i <= 1025; i++) {
        promises.push(
          fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((res) => res.json())
        );
      }

      const results = await Promise.all(promises);

      const loadedPokemons = results.map((pokemon) => ({
        name: pokemon.name,
        image: pokemon.sprites.front_default,
        types: pokemon.types.map((t: any) => t.type.name),
      }));

      setPokemons(loadedPokemons);
    };

    fetchPokemons();
  }, []);
  console.log(setPokemons)
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <div className="App">
        <h1>Pokédex</h1>
        <div className="pokedex">
          {pokemons.map((pokemon) => (
            <ul>
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              image={pokemon.image}
              types={pokemon.types}
            />
            </ul>
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
