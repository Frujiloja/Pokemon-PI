import React, { useState, useEffect } from "react";
import { useHistory} from 'react-router-dom';
import { postPokemon, getTypes } from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux"
import style from "./Form.module.css"


function validate(form){
    let errors = {};
    if(!form.name){
        errors.name = `This Field Is Required`;
    } if(!form.hp){
        errors.hp = "This Field Is Required";
    }if(!form.attack){
        errors.attack = "This Field Is Required";
    }if(!form.defense){
        errors.defense = "This Field Is Required";
    }if(!form.speed){
        errors.speed = "This Field Is Required";
    }if(!form.weight){
        errors.weight = "This Field Is Required";
    }if(!form.height){
        errors.height = "This Field Is Required";
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
        if(form.name && form.hp && form.attack && form.defense && form.speed && form.height && form.weight){
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
        history.push('/home')} else{
            alert("Missing Data")
        }
    }

    useEffect(() => {
        dispatch(getTypes());
    },[]);

    return (
        <div className={style.pageContainer}>
            <div className={style.createContainer} >
            <form className={style.form} onSubmit={(e)=>handleSubmit(e)}>
                <div  className={style.formContainer}>
                    <label className={style.text}>Name: <span className={style.error}>{errors.name}</span> </label>
                    <input className={style.inputField} type="text" value={form.name} name="name" onChange={(e)=>handleChange(e)} ></input>
                </div>
                <div className={style.formContainer}>
                    <label className={style.text}>Image: </label>
                    <input type="text" value={form.image} name="image" onChange={(e)=>handleChange(e)} ></input>
                </div>
                <div className={style.formContainer}>
                    <label className={style.text}>Hp: <span className={style.error}>{errors.hp}</span> </label>
                    <input className={style.inputField} type="number" value={form.hp} name="hp" onChange={(e)=>handleChange(e)} ></input>
                
                </div>
                <div className={style.formContainer}>
                    <label className={style.text}>Attack: <span className={style.error}>{errors.attack}</span> </label>
                    <input className={style.inputField} type="number" value={form.attack} name="attack" onChange={(e)=>handleChange(e)} ></input>
                    
                </div>
                <div className={style.formContainer}>
                    <label className={style.text}>Defense: <span className={style.error}>{errors.defense}</span> </label>
                    <input className={style.inputField} type="number" value={form.defense} name="defense" onChange={(e)=>handleChange(e)} ></input>
                    
                </div>
                <div className={style.formContainer}>
                    <label className={style.text}>Speed: <span className={style.error}>{errors.speed}</span> </label>
                    <input className={style.inputField} type="number" value={form.speed} name="speed" onChange={(e)=>handleChange(e)} ></input>
                    
                </div>
                <div className={style.formContainer}>
                    <label className={style.text}>Height: <span className={style.error}>{errors.height}</span> </label>
                    <input className={style.inputField} type="number" value={form.height} name="height" onChange={(e)=>handleChange(e)} ></input>
                    
                </div>
                <div className={style.formContainer}>
                    <label className={style.text}>Weight: <span className={style.error}>{errors.weight}</span> </label>
                    <input className={style.inputField} type="number" value={form.weight} name="weight" onChange={(e)=>handleChange(e)} ></input>
                    
                </div>
                <div>
                    <label>Type: </label>
                    <select className={style.select} onChange={(e)=>handleSelect(e)}>
                        {types.map((t) => (
                            <option value={t}>{t}</option>
                        ))}
                </select>
                
                </div>
                
                <ul><li>{form.types.map(el => el + " ,")}</li></ul> 

                <button type="submit" className={style.submitButton} >Create Pokemon</button>
            </form>
            </div>
            
        </div>
    )

}

export default Form;