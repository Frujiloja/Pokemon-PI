import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPokemonDetail } from "../../redux/actions";
import style from "./Detail.module.css"


const Detail = (props) => {

     const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getPokemonDetail(props.match.params.id))
    // },[dispatch])

    const myPokemon = useSelector ((state) => state.pokemonDetail)

    return(
        <div>
            {
                myPokemon.length>0 ?
                <div>
                    <h1>Soy {myPokemon[0].name}</h1>
                    <img src={myPokemon[0].img? myPokemon[0].img : myPokemon[0].image}></img>
                    <h2>Type: {myPokemon[0].types}</h2>
                    <p>Hp: {myPokemon[0].hp}</p>
                    <p>Attack: {myPokemon[0].attack}</p>
                    <p>Defense: {myPokemon[0].defense}</p>
                    <p>Speed: {myPokemon[0].speed}</p>
                    <p>Height: {myPokemon[0].height}</p>
                    <p>Weight: {myPokemon[0].weight}</p>
                </div> : <p>Loading...</p>
            }
        </div>
    )
}

export default Detail;