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
const pic = document.querySelector("#pics");
const cardContainer = document.querySelector("#container");
const searchField = document.querySelector("#searchField");
const searchText = document.querySelector("#searchText");
const firstGenbutton = document.querySelector("#gen_01");
const secondGenbutton = document.querySelector("#gen_02");
const thirdGenbutton = document.querySelector("#gen_03");
const fourthGenbutton = document.querySelector("#gen_04");
const fifthGenbutton = document.querySelector("#gen_05");
const sixthGenbutton = document.querySelector("#gen_06");
const seventhGenbutton = document.querySelector("#gen_07");
const buttons = [firstGenbutton, secondGenbutton, thirdGenbutton, fourthGenbutton, fifthGenbutton, sixthGenbutton, seventhGenbutton];

let pokeBall = [];
buttons.forEach(button => button.addEventListener("click", function() 
{
    pokeBall = [];

    while(cardContainer.lastChild) 
    {
        cardContainer.lastChild.remove()
    }; 
    searchField.value = "";
    ShowPokemonList(button.id)
}));

let root = document.querySelector(":root");
let listWrapper = new FetchWrapper("https://pokeapi.co/api/v2/generation");
let pokemonWrapper = new FetchWrapper("https://pokeapi.co/api/v2/pokemon");
let listDataPromise;
let pokemonDataPromise;
let cardDataPromise;
let pokemonTypes = [];
let pokemonAbilities = [];
let pokemonTypeObj = [
    { type: "bug", color: "#83C300" },
    { type: "dark", color: "#5B5466" },
    { type: "dragon", color: "#006FC9" },
    { type: "electric", color: "#FBD100" },
    { type: "fairy", color: "#FB89EB" },
    { type: "fighting", color: "#E0306A" },
    { type: "fire", color: "#FF9741" },
    { type: "flying", color: "#89AAE3" },
    { type: "ghost", color: "#4C6AB2" },
    { type: "grass", color: "#38BF4B" },
    { type: "ground", color: "#E87236" },
    { type: "ice", color: "#4CD1C0" },
    { type: "normal", color: "#919AA2" },
    { type: "poison", color: "#B567CE" },
    { type: "psychic", color: "#FF6675" },
    { type: "rock", color: "#C8B686" },
    { type: "steel", color: "#5A8EA2" },
    { type: "water", color: "#3692DC" }
]
let pokemonStats = {
    hp: "",
    attack: "",
    defence: ""
}


async function ShowPokemonList(generation)
{
    let currentGen;
    let gens = ["/1/", "/2/", "/3/", "/4/", "/5/", "/6/", "/7/"];

    switch(generation)
    {
        case "gen_01": currentGen = gens[0];
        break;
        case "gen_02": currentGen = gens[1];
        break;
        case "gen_03": currentGen = gens[2];
        break;
        case "gen_04": currentGen = gens[3];
        break;
        case "gen_05": currentGen = gens[4];
        break;
        case "gen_06": currentGen = gens[5];
        break;
        case "gen_07": currentGen = gens[6];
        break;
        default: console.log("switch case default");
        break;
    }

    listDataPromise = listWrapper.get(currentGen);
            listDataPromise.then(function(generationData) // Fetching the list data
            {
                searchText.innerHTML = `This generation has ${generationData.pokemon_species.length} pokemons`;
                generationData.pokemon_species.forEach(function(speciesData)
                {
                    fetch(speciesData.url).then(responce => responce.json())
                    .then(function(pokemonGeneralData)
                    {
                        pokemonDataPromise = pokemonWrapper.get(`/${pokemonGeneralData.id}/`);
                        pokemonDataPromise.then(function(pokemonSpecificData)
                        {
                            pokemonSpecificData.types.forEach(param => pokemonTypes.push(param.type.name));
                            pokemonSpecificData.abilities.forEach(param => pokemonAbilities.push(param.ability.name));
                            pokemonSpecificData.stats.forEach(function(param)
                            {
                                switch(param.stat.name)
                                {
                                    case "hp":
                                        pokemonStats.hp = param.base_stat;
                                        break;
                                    case "attack":
                                        pokemonStats.attack = param.base_stat;
                                        break;
                                    case "defense":
                                        pokemonStats.defence = param.base_stat;
                                        break;
                                }
                            })

                            CreatePokemonCard(pokemonSpecificData.name, 
                                              pokemonSpecificData.sprites.other.home.front_default, 
                                              pokemonTypes, 
                                              pokemonAbilities,
                                              pokemonStats);

                            pokemonTypes = [];
                            pokemonAbilities = [];
                            pokemonStats.hp = "";
                            pokemonStats.attack = "";
                            pokemonStats.defence = "";
                        });
                    });
                })
            });
}

function CreatePokemonCard(name, pic, types, abilities, stats)
{
    let cardPiecesStash = [];

    //Creating the card
    let pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemonCard");

    //Adding the picture
    let pokemonPic = document.createElement("div");
    pokemonPic.classList.add("pic");
    pokemonPic.style.backgroundImage = `url(${pic})`;
    pokemonCard.appendChild(pokemonPic);
    cardPiecesStash.push(pokemonPic);
    
    //Adding the abilities
    let pokemonAbilities = document.createElement("div");
    for(let i = 0; i < abilities.length; i++)
    {
        let pAbilities = document.createElement("p");
        pAbilities.innerHTML = abilities[i];
        pokemonAbilities.appendChild(pAbilities);
    }
    pokemonAbilities.classList.add("abilities");
    pokemonCard.appendChild(pokemonAbilities);
    cardPiecesStash.push(pokemonAbilities);

    //Adding the stats
    let pokemonStats = document.createElement("div");
    let pHP = document.createElement("p");
    let pAttack = document.createElement("p");
    let pDefence = document.createElement("p");
    pHP.innerHTML = `HP: ${stats.hp}`;
    pAttack.innerHTML = `Attack: ${stats.attack}`;
    pDefence.innerHTML = `Defence: ${stats.defence}`;
    
    pokemonStats.appendChild(pHP);
    pokemonStats.appendChild(pAttack);
    pokemonStats.appendChild(pDefence);
    pokemonStats.classList.add("stats");
    pokemonCard.appendChild(pokemonStats);
    cardPiecesStash.push(pokemonStats);

    //Adding the name
    let pokemonName = document.createElement("div");
    let pName = document.createElement("p");
    pName.innerHTML = name;
    pokemonName.appendChild(pName);
    pokemonName.classList.add("name");
    pokemonCard.appendChild(pokemonName);
    cardPiecesStash.push(pokemonName);

    //Adding the types
    let pokemonType = document.createElement("div");
    cardPiecesStash.push(pokemonType);

    for(let i = types.length - 1; i >= 0; i--)
    {
        let pokemonTypePic = document.createElement("img");
        pokemonType.classList.add("type");
        pokemonCard.appendChild(pokemonType);
        pokemonType.appendChild(pokemonTypePic);

        //Switch that sets the card background according to the type of the pokemon
        //Keep closed (I warned you)
        switch(types[i])
        {
            case "bug": 
            pokemonTypePic.src = "images/icons/Pokémon_Bug_Type_Icon.svg";
            cardPiecesStash.forEach(piece => piece.style.backgroundColor = pokemonTypeObj[pokemonTypeObj.findIndex(param => param.type == types[i])].color);
            break;

            case "dark": pokemonTypePic.src = "images/icons/Pokémon_Dark_Type_Icon.svg";
            cardPiecesStash.forEach(piece => piece.style.backgroundColor = pokemonTypeObj[pokemonTypeObj.findIndex(param => param.type == types[i])].color);
            break;

            case "dragon": pokemonTypePic.src = "images/icons/Pokémon_Dragon_Type_Icon.svg";
            cardPiecesStash.forEach(piece => piece.style.backgroundColor = pokemonTypeObj[pokemonTypeObj.findIndex(param => param.type == types[i])].color);
            break;

            case "electric": pokemonTypePic.src = "images/icons/Pokémon_Electric_Type_Icon.svg";
            cardPiecesStash.forEach(piece => piece.style.backgroundColor = pokemonTypeObj[pokemonTypeObj.findIndex(param => param.type == types[i])].color);
            break;

            case "fairy": pokemonTypePic.src = "images/icons/Pokémon_Fairy_Type_Icon.svg";
            cardPiecesStash.forEach(piece => piece.style.backgroundColor = pokemonTypeObj[pokemonTypeObj.findIndex(param => param.type == types[i])].color);
            break;

            case "fighting": pokemonTypePic.src = "images/icons/Pokémon_Fighting_Type_Icon.svg";
            cardPiecesStash.forEach(piece => piece.style.backgroundColor = pokemonTypeObj[pokemonTypeObj.findIndex(param => param.type == types[i])].color);
            break;

            case "fire": pokemonTypePic.src = "images/icons/Pokémon_Fire_Type_Icon.svg";
            cardPiecesStash.forEach(piece => piece.style.backgroundColor = pokemonTypeObj[pokemonTypeObj.findIndex(param => param.type == types[i])].color);
            break;

            case "flying": pokemonTypePic.src = "images/icons/Pokémon_Flying_Type_Icon.svg";
            cardPiecesStash.forEach(piece => piece.style.backgroundColor = pokemonTypeObj[pokemonTypeObj.findIndex(param => param.type == types[i])].color);
            break;

            case "ghost": pokemonTypePic.src = "images/icons/Pokémon_Ghost_Type_Icon.svg";
            cardPiecesStash.forEach(piece => piece.style.backgroundColor = pokemonTypeObj[pokemonTypeObj.findIndex(param => param.type == types[i])].color);
            break;

            case "grass": pokemonTypePic.src = "images/icons/Pokémon_Grass_Type_Icon.svg";
            cardPiecesStash.forEach(piece => piece.style.backgroundColor = pokemonTypeObj[pokemonTypeObj.findIndex(param => param.type == types[i])].color);
            break;

            case "ground": pokemonTypePic.src = "images/icons/Pokémon_Ground_Type_Icon.svg";
            cardPiecesStash.forEach(piece => piece.style.backgroundColor = pokemonTypeObj[pokemonTypeObj.findIndex(param => param.type == types[i])].color);
            break;

            case "ice": pokemonTypePic.src = "images/icons/Pokémon_Ice_Type_Icon.svg";
            cardPiecesStash.forEach(piece => piece.style.backgroundColor = pokemonTypeObj[pokemonTypeObj.findIndex(param => param.type == types[i])].color);
            break;

            case "normal": pokemonTypePic.src = "images/icons/Pokémon_Normal_Type_Icon.svg";
            cardPiecesStash.forEach(piece => piece.style.backgroundColor = pokemonTypeObj[pokemonTypeObj.findIndex(param => param.type == types[i])].color);
            break;

            case "poison": pokemonTypePic.src = "images/icons/Pokémon_Poison_Type_Icon.svg";
            cardPiecesStash.forEach(piece => piece.style.backgroundColor = pokemonTypeObj[pokemonTypeObj.findIndex(param => param.type == types[i])].color);
            break;

            case "psychic": pokemonTypePic.src = "images/icons/Pokémon_Psychic_Type_Icon.svg";
            cardPiecesStash.forEach(piece => piece.style.backgroundColor = pokemonTypeObj[pokemonTypeObj.findIndex(param => param.type == types[i])].color);
            break;

            case "rock": pokemonTypePic.src = "images/icons/Pokémon_Rock_Type_Icon.svg";
            cardPiecesStash.forEach(piece => piece.style.backgroundColor = pokemonTypeObj[pokemonTypeObj.findIndex(param => param.type == types[i])].color);
            break;

            case "steel": pokemonTypePic.src = "images/icons/Pokémon_Steel_Type_Icon.svg";
            cardPiecesStash.forEach(piece => piece.style.backgroundColor = pokemonTypeObj[pokemonTypeObj.findIndex(param => param.type == types[i])].color);
            break;

            case "water": pokemonTypePic.src = "images/icons/Pokémon_Water_Type_Icon.svg";
            cardPiecesStash.forEach(piece => piece.style.backgroundColor = pokemonTypeObj[pokemonTypeObj.findIndex(param => param.type == types[i])].color);
            break;
        }
    }
    cardContainer.appendChild(pokemonCard);
    pokeBall.push({name: name, card: pokemonCard});
}

function Search()
{
    for(let i = 0; i < pokeBall.length; i++)
    {
        if(pokeBall[i].name.toUpperCase().includes(searchField.value.toUpperCase()))
        {
            pokeBall[i].card.style.display = "";
        } else
        {
            pokeBall[i].card.style.display = "none";
        }
    }
}