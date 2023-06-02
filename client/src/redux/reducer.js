import { GET_POKEMONS, GET_POKEMONDETAIL, SEARCH_POKEMONS, FILTER_TYPE, GET_TYPES, FILTER_BY_API, FILTER_BY_DB, ORDER_BY_ATTACK, ORDER_BY_NAME, DELETE_POKEMON, CLEAN_DETAIL } from "./actions";

const initialState = {
    pokemons: [],
    pokemonDetail: [],
    pokemonFilter: [],
    infoType: [],
};

const rootReducer=(state = initialState, action)=>{
    switch (action.type) {
        case GET_POKEMONS:
            return {...state, pokemons:action.payload };
        case GET_POKEMONDETAIL:
            return {...state, pokemonDetail:action.payload};
        case "POST_CHARACTER":
            return{
                ...state,
            }
        case SEARCH_POKEMONS:
            let pokemonFounded = action.payload.length > 0 ? action.payload: [...state.pokemonFilter]
            return {
                ...state,
                pokemons: pokemonFounded
            }
        case GET_TYPES:
            return {
                ...state, infoType: action.payload
            }
        case FILTER_TYPE:
            debugger;
            const filteredPokemons = action.payload === 'all' ?
            [...state.pokemons] :
            [...state.pokemons].filter(t => t.types?.some(e => e === action.payload))
            return {
                ...state,
                pokemons: filteredPokemons
    
            };
        case FILTER_BY_DB:
            return {
                ...state,
                pokemons: action.payload,
            };

        case FILTER_BY_API:
            return {
                ...state,
                pokemons: action.payload,
            };
        case ORDER_BY_ATTACK:
            const orderAttack =
                action.payload === "asc"
                    ? state.pokemons.slice().sort((a, b) => {
                        return b.attack - a.attack;
                    })
                    : state.pokemons.slice().sort((a, b) => {
                        return a.attack - b.attack;
                    });
            return {
                ...state,
                pokemons: orderAttack,
            };
    
        case ORDER_BY_NAME:
            const orderName =
                action.payload === "asc"
                    ? state.pokemons.slice().sort((a, b) => {
                        let first = a.name.toLowerCase();
                        let second = b.name.toLowerCase();
                        if (first > second) return 1;
                        if (first < second) return -1;
                        return 0;
                    })
                    : state.pokemons.slice().sort((a, b) => {
                        let first = a.name.toLowerCase();
                        let second = b.name.toLowerCase();
                        if (first > second) return -1;
                        if (first < second) return 1;
                        return 0;
                    });
            return {
                ...state,
                pokemons: orderName,
                }
        case DELETE_POKEMON:
            return {
                ...state,
                pokemon: action.payload,
                pokemonFilter: action.payload
            }
        case CLEAN_DETAIL:
            return {
                ...state,
                pokemonDetail: []
            }
        default:
            return {...state};
    }
}



export default rootReducer;