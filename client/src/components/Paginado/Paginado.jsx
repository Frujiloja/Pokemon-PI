import React from "react";
import style from "./Paginado.module.css"

export default function Paginado ({pokemonsPerPage, allPokemons,paginado}){
    const pageNumbers = []

    for( let i=0; i <= Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumbers.push(i)
    }
    

    return(
        <nav>
            <ul className='paginado'>
                { pageNumbers &&
                pageNumbers.map(number => {
                    <li className='number' key={number}>
                        <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                })}
            </ul>
        </nav>
    )
}