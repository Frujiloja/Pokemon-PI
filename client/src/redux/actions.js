import axios from "axios";
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMONDETAIL = "GET_POKEMONDETAIL";
export const SEARCH_POKEMONS = "SEARCH_POKEMONS";
export const FILTER_TYPE = "FILTER_TYPE";
export const GET_TYPES = 'GET_TYPES';
export const FILTER_BY_DB = 'FILTER_BY_DB'
export const FILTER_BY_API = 'FILTER_BY_API'
export const ORDER_BY_ATTACK = 'ORDER_BY_ATTACK'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const DELETE_POKEMON = 'DELETE_POKEMON'
export const CLEAN_DETAIL = 'CLEAN_DETAIL'


export const getPokemons = () => {
    return async function(dispatch){
        const apiData = await axios.get("http://localhost:3001/pokemon");
        const pokemons = apiData.data;
        dispatch({ type: GET_POKEMONS, payload: pokemons });
    };
};

export const cleanDetail = () => {
    return {
        type: CLEAN_DETAIL,
    }
}

export const filterByApi = () => {
    return async function (dispatch) {
        const apiData = await axios.get('http://localhost:3001/pokemon')
        const pokemons = apiData.data
        const pokemonsApi = pokemons.filter((pokemon) => typeof  pokemon.id === 'number')
        dispatch({ type: FILTER_BY_API, payload: pokemonsApi })
    }
}

export const filterByDb = () => {
    return async function (dispatch) {
        const apiData = await axios.get('http://localhost:3001/pokemon')
        const pokemons = apiData.data
        const pokemonsDb = pokemons.filter((pokemon) => typeof  pokemon.id === 'string')
        dispatch({ type: FILTER_BY_DB, payload: pokemonsDb })
    }
}

export const getPokemonDetail = (id)=>{
    return async function (dispatch){
        // try {
        //     var json = await axios.get(`http://localhost:3001/pokemon/${id}`);
        //     return dispatch({
        //         type: GET_POKEMONDETAIL,
        //         payload: json.data
        //     })
        // } catch (error) {
        //     console.log(error)
        // }
        //////////////
        // const apiData = await fetch(`http://localhost:3001/pokemon/${id}`);
        // const pokemon = await apiData.json();
        const apiData = await axios.get(`http://localhost:3001/pokemon/${id}`);
        const pokemon = await apiData.data;
        dispatch({type:GET_POKEMONDETAIL, payload: pokemon })
    }
}

export const searchPokemon = (name) => {
    return async function (dispatch) {
        const apiData = await axios.get(`http://localhost:3001/pokemon?name=${name}`)
        const pokemon = apiData.data
        dispatch({ type: SEARCH_POKEMONS, payload: pokemon})
    }}


export const getTypes = () => {
    return async function (dispatch) {
        const apiData = await axios.get("http://localhost:3001/types")
        const types = apiData.data
        dispatch({ type: GET_TYPES, payload: types })
    }
}

export const postPokemon = (payload) => {
    return async function(dispatch){
        const response = await axios.post("http://localhost:3001/pokemon", payload);
        return response;
    }
}

export const filterByAttack = (method) => {
    return {
        type: ORDER_BY_ATTACK,
        payload: method
    }
}
export const filterByName = (method) => {
    return {
        type: ORDER_BY_NAME,
        payload: method,
    };
};

export const deletedPokemon = (id) => {
    return async function (dispatch) {
        const apiData = await axios.delete(`http://localhost:3001/pokemon/${id}`);
        const pokemon = apiData.data
        dispatch({ type: DELETE_POKEMON, payload: pokemon });
    }
}

export const filterType = (types) => {
    return {
        type: FILTER_TYPE,
        payload: types
    }
}



// export const filterBySource = () => {
//     dispatch ({ type: "FILTER_BY_SOURCE" });
// };