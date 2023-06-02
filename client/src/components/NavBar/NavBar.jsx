import { Link } from "react-router-dom"
import style from "./NavBar.module.css"
import SearchBar from "../SearchBar/SearchBar"

const NavBar = (props) => {
    return(
        <div className={style.mainContainer}>
            <Link to="/home" className={style.links}>HOME</Link>
            <Link to="/create" className={style.links}>CREATE POKEMON</Link>
            <SearchBar className={style.searchStyle} onSearch={props.onSearch} />
        </div>
    )
}


export default NavBar;