const axios = require("axios");
const { Type } = require("../db")
const { getTypesFromBDD } = require("../controllers/typesController")


const getTypeHandler = async (req,res)=>{
    try {
        const response = await getTypesFromBDD()
        res.status(200).json(response);
    } catch (error) {
        console.error("Error al obtener los tipos de pokemons:", error.message);
        res.status(500).json({message: error.message});
    }
}


module.exports={ getTypeHandler }