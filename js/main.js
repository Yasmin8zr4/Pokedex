// teste de funcionamento
console.log("Funcionou!")
// url da API
const url = "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0"
// busca da div do conjunto de todos os pokemons 
const pokemonList = document.getElementById("lista-pokemons")

function convertPokemonToLi(pokemon) {
    // responde com um item (uma caixinha da pokedex) com os resulltados da busca do nome e da img na API
    return `
        <li class="pokemon ${pokemon.types[0].type.name}">
            <p class="nome">${pokemon.name}</p>
            <img src=${pokemon.sprites.other.dream_world.front_default} alt="${pokemon.name}">
        </li>
    `
}

// busca a url de cada pokemon e faz o codigo tratar como json

function getPokemonDetails(pokemon) {
    return fetch(pokemon.url)
        .then((response) => response.json())
}

// busca na url e pega a resposta em json, puxa os detalhes e os nomes de cada pokemon

fetch(url)
    .then((response) => response.json())
    .then((jsonresponse) => jsonresponse.results)
    .then((list) => list.map(getPokemonDetails))
    .then((details) => Promise.all(details))
    .then((newList) => pokemonList.innerHTML = newList.map(convertPokemonToLi).join(""))
    .catch((error) => console.log(error))