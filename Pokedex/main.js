class FetchWrapper 
{
    constructor(baseURL) 
    {
        this.baseURL = baseURL;
    }

    get(endpoint) 
    {
        return fetch(this.baseURL + endpoint)
            .then(response => response.json());
    }
}

const cardContainer = document.querySelector("#container");
const pic = document.querySelector("#pics");
const firstGenbutton = document.querySelector("#gen_01");
firstGenbutton.addEventListener("click", function() {ShowPokemonList(firstGenbutton.id)});

let listWrapper = new FetchWrapper("https://pokeapi.co/api/v2/generation");
let speciesWrapper = new FetchWrapper("https://pokeapi.co/api/v2/pokemon-species");
let listDataPromise;
let speciesDataPromise;
let cardDataPromise;

async function ShowPokemonList(generation)
{
    switch(generation)
    {
        case "gen_01":
            listDataPromise = listWrapper.get("/1/");
            listDataPromise.then(function(listData) // Fetching the list data
            {
                console.log(listData);
                speciesDataPromise = speciesWrapper.get("/1/");
                speciesDataPromise.then(function(speciesData)
                {
                    speciesData.pokemon_species.forEach(function(species) // continue here, iterate through the array of species, fetch pokemons and their data
                    {
                        console.log(species);
                    });
                    console.log(speciesData);
                    cardDataPromise = fetch(speciesData.varieties[0].pokemon.url).then(responce => responce.json())
                    .then(function(cardData)
                    {
                        pic.style.backgroundImage = `url(${cardData.sprites.other.home.front_default})`;
                    });
                });
            });            
        break;
        default: console.log("switch case default");
        break;
    }
}

function CreatePokemonCard()
{
    cardContainer.appendChild(pokemonCard);

    let pokemonCard = document.createElement("div");
        pokemonCard.classList.add("pokemonCard");

    let pokemonPic = document.createElement("div");
        pokemonPic.classList.add("pic");
        pokemonCard.appendChild(pokemonPic);

    let pokemonType = document.createElement("div");
        pokemonType.classList.add("type");
        pokemonCard.appendChild(pokemonType);

    let pokemonAbilities = document.createElement("div");
        pokemonAbilities.classList.add("abilities");
        pokemonCard.appendChild(pokemonAbilities);

    let pokemonStats = document.querySelector("div");
        pokemonStats.classList.add("stats");
        pokemonCard.appendChild(pokemonStats);
    //evolves from


}