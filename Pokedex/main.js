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
let pokemonTypeColors = ["#83C300", "#5B5466", "#006FC9", "#FBD100", "#FB89EB",
                         "#E0306A", "#FF9741", "#89AAE3", "#4C6AB2", "#38BF4B",
                         "#E87236", "#4CD1C0", "#919AA2", "#B567CE", "#FF6675",
                         "#C8B686", "#5A8EA2", "#3692DC"];
let pokemonStats = {
    hp: "",
    attack: "",
    defence: ""
}


async function ShowPokemonList(generation)
{
    let gens = ["/1/", "/2/", "/3/", "/4/", "/5/", "/6/", "/7/"];
    let currentGen;

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
    let pokemonCard = document.createElement("div");
        pokemonCard.classList.add("pokemonCard");

    let pokemonPic = document.createElement("div");
        pokemonPic.classList.add("pic");
        pokemonPic.style.backgroundImage = `url(${pic})`;
        pokemonCard.appendChild(pokemonPic);

    let pokemonAbilities = document.createElement("div");
    
    for(let i = 0; i < abilities.length; i++)
    {
        let pAbilities = document.createElement("p");
        pAbilities.innerHTML = abilities[i];
        pokemonAbilities.appendChild(pAbilities);
    }
        pokemonAbilities.classList.add("abilities");
        pokemonCard.appendChild(pokemonAbilities);

    let pokemonStats = document.createElement("div");
    let pHP = document.createElement("p");
        pHP.innerHTML = `HP: ${stats.hp}`;
    let pAttack = document.createElement("p");
        pAttack.innerHTML = `Attack: ${stats.attack}`;
    let pDefence = document.createElement("p");
        pDefence.innerHTML = `Defence: ${stats.defence}`;
        pokemonStats.appendChild(pHP);
        pokemonStats.appendChild(pAttack);
        pokemonStats.appendChild(pDefence);
        pokemonStats.classList.add("stats");
        pokemonCard.appendChild(pokemonStats);

    let pokemonName = document.createElement("div");
    let pName = document.createElement("p");
        pName.innerHTML = name;
        pokemonName.appendChild(pName);
        pokemonName.classList.add("name");
        pokemonCard.appendChild(pokemonName);


    let pokemonType = document.createElement("div");

    for(let i = types.length - 1; i >= 0; i--)
    {
        let pokemonTypePic = document.createElement("img");

        switch(types[i])
        {
            case "bug": pokemonTypePic.src = "images/icons/Pokémon_Bug_Type_Icon.svg";
                         pokemonPic.style.backgroundColor = pokemonTypeColors[0];
                         pokemonType.style.backgroundColor = pokemonTypeColors[0];
                         pokemonName.style.backgroundColor = pokemonTypeColors[0];
                         pokemonStats.style.backgroundColor = pokemonTypeColors[0];
                         pokemonAbilities.style.backgroundColor = pokemonTypeColors[0];
                break;
            case "dark": pokemonTypePic.src = "images/icons/Pokémon_Dark_Type_Icon.svg";
                         pokemonPic.style.backgroundColor = pokemonTypeColors[1];
                         pokemonType.style.backgroundColor = pokemonTypeColors[1];
                         pokemonName.style.backgroundColor = pokemonTypeColors[1];
                         pokemonStats.style.backgroundColor = pokemonTypeColors[1];
                         pokemonAbilities.style.backgroundColor = pokemonTypeColors[1];
                break;
            case "dragon": pokemonTypePic.src = "images/icons/Pokémon_Dragon_Type_Icon.svg";
                           pokemonPic.style.backgroundColor = pokemonTypeColors[2];
                           pokemonType.style.backgroundColor = pokemonTypeColors[2];
                           pokemonName.style.backgroundColor = pokemonTypeColors[2];
                           pokemonStats.style.backgroundColor = pokemonTypeColors[2];
                           pokemonAbilities.style.backgroundColor = pokemonTypeColors[2];
                break;
            case "electric": pokemonTypePic.src = "images/icons/Pokémon_Electric_Type_Icon.svg";
                             pokemonPic.style.backgroundColor = pokemonTypeColors[3];
                             pokemonType.style.backgroundColor = pokemonTypeColors[3];
                             pokemonName.style.backgroundColor = pokemonTypeColors[3];
                             pokemonStats.style.backgroundColor = pokemonTypeColors[3];
                             pokemonAbilities.style.backgroundColor = pokemonTypeColors[3];
                break;
            case "fairy": pokemonTypePic.src = "images/icons/Pokémon_Fairy_Type_Icon.svg";
                          pokemonPic.style.backgroundColor = pokemonTypeColors[4];
                          pokemonType.style.backgroundColor = pokemonTypeColors[4];
                          pokemonName.style.backgroundColor = pokemonTypeColors[4];
                          pokemonStats.style.backgroundColor = pokemonTypeColors[4];
                          pokemonAbilities.style.backgroundColor = pokemonTypeColors[4];
                break;
            case "fighting": pokemonTypePic.src = "images/icons/Pokémon_Fighting_Type_Icon.svg";
                             pokemonPic.style.backgroundColor = pokemonTypeColors[5];
                             pokemonType.style.backgroundColor = pokemonTypeColors[5];
                             pokemonName.style.backgroundColor = pokemonTypeColors[5];
                             pokemonStats.style.backgroundColor = pokemonTypeColors[5];
                             pokemonAbilities.style.backgroundColor = pokemonTypeColors[5];
                break;
            case "fire": pokemonTypePic.src = "images/icons/Pokémon_Fire_Type_Icon.svg";
                         pokemonPic.style.backgroundColor = pokemonTypeColors[6];
                         pokemonType.style.backgroundColor = pokemonTypeColors[6];
                         pokemonName.style.backgroundColor = pokemonTypeColors[6];
                         pokemonStats.style.backgroundColor = pokemonTypeColors[6];
                         pokemonAbilities.style.backgroundColor = pokemonTypeColors[6];
                break;
            case "flying": pokemonTypePic.src = "images/icons/Pokémon_Flying_Type_Icon.svg";
                           pokemonPic.style.backgroundColor = pokemonTypeColors[7];
                           pokemonType.style.backgroundColor = pokemonTypeColors[7];
                           pokemonName.style.backgroundColor = pokemonTypeColors[7];
                           pokemonStats.style.backgroundColor = pokemonTypeColors[7];
                           pokemonAbilities.style.backgroundColor = pokemonTypeColors[7];
                break;
            case "ghost": pokemonTypePic.src = "images/icons/Pokémon_Ghost_Type_Icon.svg";
                          pokemonPic.style.backgroundColor = pokemonTypeColors[8];
                          pokemonType.style.backgroundColor = pokemonTypeColors[8];
                          pokemonName.style.backgroundColor = pokemonTypeColors[8];
                          pokemonStats.style.backgroundColor = pokemonTypeColors[8];
                          pokemonAbilities.style.backgroundColor = pokemonTypeColors[8];
                break;
            case "grass": pokemonTypePic.src = "images/icons/Pokémon_Grass_Type_Icon.svg";
                          pokemonPic.style.backgroundColor = pokemonTypeColors[9];
                          pokemonType.style.backgroundColor = pokemonTypeColors[9];
                          pokemonName.style.backgroundColor = pokemonTypeColors[9];
                          pokemonStats.style.backgroundColor = pokemonTypeColors[9];
                          pokemonAbilities.style.backgroundColor = pokemonTypeColors[9];
                break;
            case "ground": pokemonTypePic.src = "images/icons/Pokémon_Ground_Type_Icon.svg";
                           pokemonPic.style.backgroundColor = pokemonTypeColors[10];
                           pokemonType.style.backgroundColor = pokemonTypeColors[10];
                           pokemonName.style.backgroundColor = pokemonTypeColors[10];
                           pokemonStats.style.backgroundColor = pokemonTypeColors[10];
                           pokemonAbilities.style.backgroundColor = pokemonTypeColors[10];
                break;
            case "ice": pokemonTypePic.src = "images/icons/Pokémon_Ice_Type_Icon.svg";
                        pokemonPic.style.backgroundColor = pokemonTypeColors[11];
                        pokemonType.style.backgroundColor = pokemonTypeColors[11];
                        pokemonName.style.backgroundColor = pokemonTypeColors[11];
                        pokemonStats.style.backgroundColor = pokemonTypeColors[11];
                        pokemonAbilities.style.backgroundColor = pokemonTypeColors[11];
                break;
            case "normal": pokemonTypePic.src = "images/icons/Pokémon_Normal_Type_Icon.svg";
                           pokemonPic.style.backgroundColor = pokemonTypeColors[12];
                           pokemonType.style.backgroundColor = pokemonTypeColors[12];
                           pokemonName.style.backgroundColor = pokemonTypeColors[12];
                           pokemonStats.style.backgroundColor = pokemonTypeColors[12];
                           pokemonAbilities.style.backgroundColor = pokemonTypeColors[12];
                break;
            case "poison": pokemonTypePic.src = "images/icons/Pokémon_Poison_Type_Icon.svg";
                           pokemonPic.style.backgroundColor = pokemonTypeColors[13];
                           pokemonType.style.backgroundColor = pokemonTypeColors[13];
                           pokemonName.style.backgroundColor = pokemonTypeColors[13];
                           pokemonStats.style.backgroundColor = pokemonTypeColors[13];
                           pokemonAbilities.style.backgroundColor = pokemonTypeColors[13];
                break;
            case "psychic": pokemonTypePic.src = "images/icons/Pokémon_Psychic_Type_Icon.svg";
                            pokemonPic.style.backgroundColor = pokemonTypeColors[14];
                            pokemonType.style.backgroundColor = pokemonTypeColors[14];
                            pokemonName.style.backgroundColor = pokemonTypeColors[14];
                            pokemonStats.style.backgroundColor = pokemonTypeColors[14];
                            pokemonAbilities.style.backgroundColor = pokemonTypeColors[14];
                break;
            case "rock": pokemonTypePic.src = "images/icons/Pokémon_Rock_Type_Icon.svg";
                         pokemonPic.style.backgroundColor = pokemonTypeColors[15];
                         pokemonType.style.backgroundColor = pokemonTypeColors[15];
                         pokemonName.style.backgroundColor = pokemonTypeColors[15];
                         pokemonStats.style.backgroundColor = pokemonTypeColors[15];
                         pokemonAbilities.style.backgroundColor = pokemonTypeColors[15];
                break;
            case "steel": pokemonTypePic.src = "images/icons/Pokémon_Steel_Type_Icon.svg";
                          pokemonPic.style.backgroundColor = pokemonTypeColors[16];
                          pokemonType.style.backgroundColor = pokemonTypeColors[16];
                          pokemonName.style.backgroundColor = pokemonTypeColors[16];
                          pokemonStats.style.backgroundColor = pokemonTypeColors[16];
                          pokemonAbilities.style.backgroundColor = pokemonTypeColors[16];
                break;
            case "water": pokemonTypePic.src = "images/icons/Pokémon_Water_Type_Icon.svg";
                          pokemonPic.style.backgroundColor = pokemonTypeColors[17];
                          pokemonType.style.backgroundColor = pokemonTypeColors[17];
                          pokemonName.style.backgroundColor = pokemonTypeColors[17];
                          pokemonStats.style.backgroundColor = pokemonTypeColors[17];
                          pokemonAbilities.style.backgroundColor = pokemonTypeColors[17];
                break;
            default: console.log(types[i])
            break;
        }
        pokemonType.classList.add("type");
        pokemonCard.appendChild(pokemonType);
        pokemonType.appendChild(pokemonTypePic);
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