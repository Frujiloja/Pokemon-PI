const {Pokemon , Type } = require("../db");
const pokemonType = require("../models/Type")
const axios = require("axios");
const { Op } = require("sequelize")


const cleanArray = (arr) => {
    const clean = arr.map(elem => {
        return {
            id:elem.id,
            name:elem.name,
            image:elem.sprites.other["official-artwork"]["front_default"],
            hp:elem.stats.find((stat) => stat.stat.name === 'hp').base_stat,
            attack:elem.stats.find((stat) => stat.stat.name === 'attack').base_stat,
            defense:elem.stats.find((stat) => stat.stat.name === 'defense').base_stat,
            speed:elem.stats.find((stat) => stat.stat.name === 'speed').base_stat,
            height:elem.height,
            weight:elem.weight,
            types:elem.types.map((type) => type.type.name),
            created: false,
        }
    })
    return clean;
}

const cleanApiPoke = (poke) => {
    const cleanedPoke = {
        name: poke.name,
        id:poke.id,
        image:poke.sprites.other["official-artwork"]["front_default"],
        hp:poke.stats.find((stat) => stat.stat.name === 'hp').base_stat,
        attack:poke.stats.find((stat) => stat.stat.name === 'attack').base_stat,
        defense:poke.stats.find((stat) => stat.stat.name === 'defense').base_stat,
        speed:poke.stats.find((stat) => stat.stat.name === 'speed').base_stat,
        height:poke.height,
        weight:poke.weight,
        types:poke.types.map(el => el.type.name),
        created: poke.created,
    }
    return cleanedPoke
}

const cleanDbPoke = (poke) => {
    return {
        name:poke.name,
        id:poke.id,
        image:poke.image,
        hp:poke.hp,
        attack: poke.attack,
        defense: poke.defense,
        speed: poke.speed,
        height: poke.height,
        weight: poke.weight,
        types: poke.Types.map(el => el.name),
        created: poke.created
    }
}

const createPokemon = async (name, hp, attack, defense, speed, height, weight, image, types) => {
    const newPokemon = await Pokemon.create({name, hp, attack, defense, speed, height, weight, image,  createdInDB: true})
    for (const typeName of types) {
        const typeInstance = await Type.findOne({ where: { name: typeName } });
        if (typeInstance) {
            await newPokemon.addTypes(typeInstance);
        }
    }
    const pokemon = await Pokemon.findOne({
        include: {
            model: Type,
            attributes: ["name"],
            through: {
                attributes:[],
            }
        }
    })
    return pokemon
}


const getPokemonById = async (id,source) => {
    
    if(source === "api") {
        const pokeRaw = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data;
        return cleanApiPoke(pokeRaw);
    } else {
        const pokeRaw = await Pokemon.findByPk(id,{
            include: {
                model: Type,
                through: {
                    attributes: [],
                }
            }
        });
        return cleanDbPoke(pokeRaw)
    }
    
};

const getAllPokemons = async () => {
    const databasePokemons = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ["name"],
            through: {
                attributes:[],
            }
        }
    })

    const apiPokemons = 
        (await axios.get('http://pokeapi.co/api/v2/pokemon?limit=150')).data.results;

    const apiPokemonsFinal = apiPokemons.map(async el => (await axios.get(`${el.url}`)).data);  

    const pokemonDetailsRaw = await Promise.all(apiPokemonsFinal)

    const pokemonDetails = cleanArray(pokemonDetailsRaw)

    return [...databasePokemons, ...pokemonDetails];

}

const searchPokemonByName = async (name) => {

    const databasePokemons = await Pokemon.findAll({
        where:{ name: {[Op.iLike]: `%${name}`} }, 
        include: {
            model: Type,
            attributes: ["name"],
            through: {
             attributes:[],
            }
        }}); //Op.iLike = buscar indiferente de mayusculas o minusculas

    console.log(databasePokemons)

    const apiPokemons = 
        (await axios.get('http://pokeapi.co/api/v2/pokemon?limit=150')).data.results;

    const apiPokemonsFinal = apiPokemons.map(async el => (await axios.get(`${el.url}`)).data);
      
    const pokemonDetailsRaw = await Promise.all(apiPokemonsFinal)

    const pokemonDetails = cleanArray(pokemonDetailsRaw)

    const filteredApi = pokemonDetails.filter((pokemon) => {
        return pokemon.name === name.toLowerCase();
    })
    

    return [...filteredApi, ...databasePokemons]
}

module.exports = { createPokemon, getPokemonById, getAllPokemons, searchPokemonByName }