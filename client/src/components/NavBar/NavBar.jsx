import { Link } from "react-router-dom"
import style from "./NavBar.module.css"
import SearchBar from "../SearchBar/SearchBar"

const NavBar = (props) => {
    return(
        <nav className={style.mainContainer}>
            <div>
                <img src="pokemon.png" alt="pokemon logo" className={style.imgSmall} ></img>
            </div>
            <button>
                <Link to="/home" className={style.link}>HOME</Link>
            </button>
            <button>
                <Link to="/create" className={style.link}>CREATE POKEMON</Link>
            </button>
            <div className={style.searchDiv}>
                <SearchBar className={style.searchStyle} onSearch={props.onSearch} />
            </div>
        </nav>
        
    )
}


export default NavBar;