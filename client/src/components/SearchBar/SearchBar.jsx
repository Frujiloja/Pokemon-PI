import { useState } from "react";
import { useDispatch } from "react-redux"
import { searchPokemon } from "../../redux/actions";
import styles from "./SearchBar.module.css"

export default function SearchBar() {

   const dispatch = useDispatch();
   const[searchTerm, setSearchTerm]= useState("");

   const handleInputChange = (event) => {
      const { value } = event.target;
      setSearchTerm(value);
   };

   const handleSearch = () => {
      dispatch(searchPokemon(searchTerm))
   };


   return (
      <div>
      <input className={styles.inputStyle} placeholder="Search Pokemon..." type='text' value={searchTerm} onChange={handleInputChange} />
      <button className={styles.buttonStyle} onClick={handleSearch}>SEARCH</button>
      </div>
   );
}