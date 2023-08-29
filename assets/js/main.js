const pokemonList = document.getElementById('pokemonList')
const loadButton = document.getElementById('loadMorePoke')
const limit = 5;
let offset = 0;
const maxRecords = 151;

function convertPokemonToHtml(poke) {
    
}
 
function loadPoke(offset, limit){
    pokeApi.getPokemon(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((poke) =>`
            <li class="pokemon ${poke.mainType}">
                <span class="number">#${poke.number}</span>
                <span class="name">${poke.name}</span>
        
                <div class="detail">
                    <ol class="types">
                        ${poke.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${poke.image}" alt="${poke.name}">
                </div>
            </li>`).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPoke(offset, limit)

loadButton.addEventListener('click', () => {
    offset += limit

    const qtdRecord = offset + limit

    if (qtdRecord >= maxRecords){
        const newLimit = maxRecords - offset
        loadPoke(offset, newLimit)
        loadButton.parentElement.removeChild(loadButton)
    } else{
        loadPoke(offset, limit)
    }
})
    