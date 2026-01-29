import React, {useEffect, useState} from "react";
import SearchBar from "../components/SearchBar";
import PokemonCard from "../components/PokemonCards";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import axios from "axios"

const API_URL = "http://localhost:5000";

export const Home = ( ) =>{
    var QTD_PKM =  1000
    const [pokemons, setPokemons] = useState([])
    const [allPokemons, setAllPokemons] = useState([]);

    useEffect(() =>{
        getpokemon()
    },[])

    const getpokemon = async () => {
        try {
            const response = await axios.get(`${API_URL}/pokemons`);
            setPokemons(response.data);
            //console.log(response.data)
            setAllPokemons(response.data);
        } catch (error) {
            console.error("Erro ao buscar pokémons:", error);
        }
    };
                

    const getPokemonSprite = (name) => {
        //console.log(name)
        return `http://localhost:5000/sprites/${name}.png`;
    };        
        // pega os dados dos pokemon, depos retorna a resposta em set pokemon,que é acessada por "pokemons", caso de erro, retorna o erro no console
        // axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${QTD_PKM}`)
        // .then((res) => setPokemons(res.data.results))
        // .then((res) => console.log(res))
        // .catch((err) => console.log (err))
        
    
    //console.log(pokemons)
    

    const pokemonSearch = (name) => {
        var filteredPkm = []
        if (name ===""){
            setPokemons(allPokemons)
            return
        }   

        filteredPkm = allPokemons.filter(pokemon => 
            pokemon.name.includes(name.toLowerCase())
        )
        //console.log(filteredPkm)
        //console.log(allPokemons)
        setPokemons(filteredPkm)
        return
    }





    return(
        <div> 
            <SearchBar pokemonSearch={pokemonSearch}/>
            <Container maxWidth = "False">
                <Grid container spacing={3} >
                    
                    {pokemons.map((pokemon) => (   
                     <Grid item xs = {5} key = {pokemon.id}>
                        <PokemonCard name ={pokemon.name} id = {pokemon.id} image = {getPokemonSprite(pokemon.name)} types = {pokemon.types}/>
                    </Grid>))}
                </Grid>
                
            </Container>    
        </div>
    )
}