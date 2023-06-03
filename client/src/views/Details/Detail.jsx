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
                <div>
                    <h1>{pokemon.name}</h1>
                    <img src={pokemon.image? pokemon.image : "defaultImg2.png"}></img>
                    <h2>Type: {pokemon.types}</h2>
                    <p>Hp: {pokemon.hp}</p>
                    <p>Attack: {pokemon.attack}</p>
                    <p>Defense: {pokemon.defense}</p>
                    <p>Speed: {pokemon.speed}</p>
                    <p>Height: {pokemon.height}</p>
                    <p>Weight: {pokemon.weight}</p>
                </div>
        ) : (
            ""
        )}
        </div>
     )
}
