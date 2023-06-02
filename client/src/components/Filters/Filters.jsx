import React from "react";
import { useDispatch } from "react-redux";
import { filterType, getPokemons, filterByApi, filterByDb, filterByAttack, filterByName } from "../../redux/actions";
import style from "./Filters.module.css";


const FilterAndOrder = ({ setPage }) => {
    const dispatch = useDispatch();

    const handleTypeFilter = (e) => {
        const selectedType = e.target.value;
        dispatch(filterType(selectedType));
        setPage(1);
    };

    const clickHandlerDb = () => {
        dispatch(filterByDb());
    };

    const clickHandlerApi = () => {
        dispatch(filterByApi());
    };

    const clickHandlerAttack = (e) => {
        dispatch(filterByAttack(e.target.value));
    };

    const clickHandlerName = (e) => {
        dispatch(filterByName(e.target.value))
    }

    const resetInput = () => { 
        const selects = document.querySelectorAll(".resetSelect");
            selects.forEach((select) => (select.selectedIndex = 0)); //funcion para resetear los selects
        }

    const types = [
        'all',
        'water',
        'fire',
        'grass',
        'electric',
        'fairy',
        'dragon',
        'ghost',
        'bug',
        'normal',
        'rock',
        'ice',
        'poison',
        'ground',
        'psychic',
        'fighting',
        'flying',
        'steel',
        'dark',
        'unknown',
        'shadow',
    ]

    return (
        <div className={style.filters}>
            <select onChange={handleTypeFilter}>
                {types.map((e) => (
                    <option key={e} value={e}>
                        {e}
                    </option>
                ))}
            </select>
            <button onClick={clickHandlerApi} >Filter Api</button>
            <button onClick={clickHandlerDb} >Filter Created</button>
            <button value="desc" onClick={clickHandlerAttack}>-ATTACK</button>
            <button value="asc" onClick={clickHandlerAttack}>+ATTACK</button>
            <button value="asc" onClick={clickHandlerName}>A-Z</button>
            <button value="desc" onClick={clickHandlerName}>Z-A</button>
            <button onClick={() => {
                setPage(1)
                dispatch(getPokemons())
                dispatch(filterType('all'))
                resetInput()
            }}>Reset</button>
        </div>
            )
};


export default FilterAndOrder;