const pokeApi = {}

function convertPokeApiToModel(pokemonDetails) {
    const pokemon = new Pokemon()

    pokemon.number = pokemonDetails.id
    pokemon.name = pokemonDetails.name

    const types = pokemonDetails.types.map((type) => type.type.name)
    const [type] = types

    pokemon.mainType = type
    pokemon.types = types   
    pokemon.image = pokemonDetails.sprites.other.dream_world.front_default 

    return pokemon
}

pokeApi.getDetailedPokemon = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiToModel)
}

pokeApi.getPokemon = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getDetailedPokemon))
        .then((detailedRequests) => Promise.all(detailedRequests))
        .then((detailedResponses) => detailedResponses)
}