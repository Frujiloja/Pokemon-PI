const { Router } = require("express");
const {
    getPokemonsHandler,
    getPokemonsIdHandler,
    createPokemonHandler,
} = require("../handlers/pokemonHandlers")

const getPokemons = Router();

const validate = (req,res,next) => {
    const { name } = req.body;
    if(!name) {
        return res.status(400).json({ error: "Missing Name" })
    }
    next();
}


getPokemons.get("/", getPokemonsHandler);

getPokemons.get("/:id", getPokemonsIdHandler);

getPokemons.post("/", validate, createPokemonHandler);


module.exports = getPokemons;