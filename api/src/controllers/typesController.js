const {Type} = require("../db");
const axios = require("axios");


const cleanArray = (arr) => {
    const clean = arr.map(elem => {
        return {
            id:elem.id,
            name:elem.name,
        }
    })
    return clean;
}
//funcion para obtener los tipos de datos desde la API y guardarlos en la BDD
const storeAllTypes = async () => {
    // const apiTypes = 
    //     (await axios.get('https://pokeapi.co/api/v2/type')).data.results;

    // const apiTypesFinal = apiTypes.map(async el => (await axios.get(`${el.url}`)).data);  

    // const typesDetailsRaw = await Promise.all(apiTypesFinal)

    // const typesDetailsFinal = cleanArray(typesDetailsRaw)

    // return typesDetailsFinal;

    try {
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        const typesApi = response.data.results;

        for(const type of typesApi) {
            await Type.findOrCreate({
                where: {name: type.name},
            });
        }
        console.log("tipos de pokemons almacenados correctamente");
    } catch (error) {
        console.log("erroa al obtener y almacenar los tipos de pokemons:", error.message);
    }

}

const getTypesFromBDD = async (req,res) => {
    try {
        const types = await Type.findAll({
            attributes: ['name'],
        });
        const typeNames = types.map(type => type.name);
        return typeNames;
    } catch (error) {
        console.error("Error al obtener los tipos desde la base de datos:", error.message);
        throw new Error('Error al obtener los tipos desde la base de datos');
    }
}

module.exports = { storeAllTypes, getTypesFromBDD }