import { Link } from "react-router-dom"
import style from "./Landing.module.css"


const Landing = () => {
    return(
        <div className={style.landing}>
            <button className={style.enter}>
                <Link to="/home" className={style.button}>ENTER</Link>
            </button>
        </div>
    )
}

export default Landing;