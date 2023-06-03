import { Link } from "react-router-dom"
import style from "./Landing.module.css"


const Landing = () => {
    return(
        <div className={style.landing}>
            <div className={style.buttonDiv}>
                <button className={style.bn62}>
                    <Link to="/home" className={style.button}>ENTER</Link>
                </button>
            </div>
            
        </div>
    )
}

export default Landing;