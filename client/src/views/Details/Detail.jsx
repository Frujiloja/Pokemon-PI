import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import style from "./Detail.module.css"



export default function Detail () {
    const { id } = useParams()
    const [pokemon, setPokemon] = useState()

    useEffect(() => {
        fetch(`http://localhost:3001/pokemon/${id}`)
           .then((response) => response.json())
           .then((poke) => {
              if (poke.name) {
                 setPokemon(poke);
              } else {
                 window.alert('No hay pokemon con ese ID');
              }
           })
           .catch((err) => {
              window.alert('No hay pokemon con ese ID');
           });
        return setPokemon({});
     }, [id]);


     return (
        <div>
            {pokemon ? (
                <div className={style.detail}>
                    <h1 className={style.text}>{pokemon.name}</h1>
                    <img src={pokemon.image? pokemon.image : "/defaultImg2.png"} alt={pokemon.name} className={style.imgDetail}></img>
                    <h2 className={style.text}>Type: {pokemon.types}</h2>
                    <p className={style.text}>Hp: {pokemon.hp}</p>
                    <p className={style.text}>Attack: {pokemon.attack}</p>
                    <p className={style.text}>Defense: {pokemon.defense}</p>
                    <p className={style.text}>Speed: {pokemon.speed}</p>
                    <p className={style.text}>Height: {pokemon.height}</p>
                    <p className={style.text}>Weight: {pokemon.weight}</p>
                </div>
        ) : (
            ""
        )}
        </div>
     )
}
