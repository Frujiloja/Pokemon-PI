import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons } from "../../redux/actions";
import style from "./Home.module.css"
import React from "react";
//import Paginado from "../../components/Paginado/Paginado";

const Home = () => {

    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(getPokemons());
    },[dispatch])


    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons());
    }

    // function handleFilterType (e){
    //     dispatch(filterType(e.target.value))
    // }

    return(
        <div className={style.home}>
            <button onClick={e=>{handleClick(e)}}>Reload Pokemons</button>
                <div>
                    <CardsContainer/>
                </div>
        </div>
    )
}

export default Home;