const { createPokemon, getPokemonById, searchPokemonByName, getAllPokemons } = require("../controllers/pokemonControllers")

const getPokemonsHandler = async (req,res)=>{
    const { name } = req.query;

    const response = name ? await searchPokemonByName(name) : await getAllPokemons()

    
    
    try {
        res.status(200).json(response)
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
    
}

const getPokemonsIdHandler = async (req,res)=>{
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api"

    try {
        const pokemon = await getPokemonById(id, source);
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const createPokemonHandler = async (req,res)=>{
    const { name, hp, attack, defense, speed, height, weight, image, types } = req.body;
    
    try{
        const newPokemon = await createPokemon(name, hp, attack, defense, speed, height, weight, image, types);
        res.status(201).json(newPokemon);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports={
    getPokemonsHandler,getPokemonsIdHandler,createPokemonHandler,
}