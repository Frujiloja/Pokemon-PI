import React, { useState, useEffect } from "react";
import {Link, useHistory} from 'react-router-dom';
import { postPokemon, getTypes } from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux"
import style from "./Form.module.css"


function validate(form){
    let errors = {};
    if(!form.name){
        errors.name = "Name is Required";
    } 
    return errors
}



const Form = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const types = useSelector((state) => state.infoType)
    const [errors,setErrors] = useState({});
    
    const [form, setForm] = useState({
        name:"",
        image:"",
        hp:"",
        attack:"",
        defense:"",
        speed:"",
        height:"",
        weight:"",
        types:[]
    })

    function handleChange (e) {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...form,
            [e.target.name] : e.target.value
        }));
    }

    function handleSelect (e) {
        setForm({
            ...form,
            types: [...form.types, e.target.value]
        })
    }



    function handleSubmit (e) {
        e.preventDefault();
        console.log(form)
        dispatch(postPokemon(form))
        alert("Pokemon Created")
        setForm({
            name:"",
            image:"",
            hp:"",
            attack:"",
            defense:"",
            speed:"",
            height:"",
            weight:"",
            types:[]
        })
        history.push('/home')
    }

    useEffect(() => {
        dispatch(getTypes());
    },[]);

    return (
        <div className={style.form}>
            <h1 className={style.text}>Create Your Pokemon!</h1>
            <form className={style.input} onSubmit={(e)=>handleSubmit(e)}>
                <div  className={style.input}>
                    <label className={style.text}>Name: </label>
                    <input className={style.inputDesign} type="text" value={form.name} name="name" onChange={(e)=>handleChange(e)} ></input>
                    {errors.name && (
                        <p className="error">{errors.name}</p>
                    )}
                </div>
                <div className={style.input}>
                    <label className={style.text}>Image: </label>
                    <input type="file" value={form.image} name="image" onChange={(e)=>handleChange(e)} ></input>
                </div>
                <div className={style.input}>
                    <label className={style.text}>Hp: </label>
                    <input className={style.inputDesign} type="text" value={form.hp} name="hp" onChange={(e)=>handleChange(e)} ></input>
                </div>
                <div className={style.input}>
                    <label className={style.text}>Attack: </label>
                    <input className={style.inputDesign} type="text" value={form.attack} name="attack" onChange={(e)=>handleChange(e)} ></input>
                </div>
                <div className={style.input}>
                    <label className={style.text}>Defense: </label>
                    <input className={style.inputDesign} type="text" value={form.defense} name="defense" onChange={(e)=>handleChange(e)} ></input>
                </div>
                <div className={style.input}>
                    <label className={style.text}>Speed: </label>
                    <input className={style.inputDesign} type="text" value={form.speed} name="speed" onChange={(e)=>handleChange(e)} ></input>
                </div>
                <div className={style.input}>
                    <label className={style.text}>Height: </label>
                    <input className={style.inputDesign} type="text" value={form.height} name="height" onChange={(e)=>handleChange(e)} ></input>
                </div>
                <div className={style.input}>
                    <label className={style.text}>Weight: </label>
                    <input className={style.inputDesign} type="text" value={form.weight} name="weight" onChange={(e)=>handleChange(e)} ></input>
                </div>
                <select onChange={(e)=>handleSelect(e)}>
                    {types.map((t) => (
                        <option value={t}>{t}</option>
                    ))}
                </select>
                <ul><li>{form.types.map(el => el + " ,")}</li></ul> 

                <button type="submit" >Create Pokemon</button>
            </form>
        </div>
    )

}

export default Form;