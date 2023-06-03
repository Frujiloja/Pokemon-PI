import style from "./Card.module.css"
import { Link } from 'react-router-dom'

const Card = (props)=>{
    return(
        <div className={style.card}>
            <Link key={props.id} to={`/detail/${props.id}`}>
                <img src={props.image} alt={props.name} className={style.img} />
            </Link>
            <p className={style.cardText}>Name: {props.name}</p>
            <p className={style.cardText}>Type: {props.types}</p>
        </div>
    )
}

export default Card