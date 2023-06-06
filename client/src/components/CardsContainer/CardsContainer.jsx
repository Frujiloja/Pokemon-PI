import Card from "../Card/Card"
import style from "./CardsContainer.module.css"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import FilterAndOrder from "../Filters/Filters"

const CardsContainer = ()=>{
    
    const pokemons = useSelector(state=>state.filteredPokemons)

    const [page, setPage] = useState(getSavedPage() || 1);

    const CARDS_PER_PAGE = 12;

    const maxPage = Math.ceil(pokemons.length / CARDS_PER_PAGE);

    const indexOfLastCard = page * CARDS_PER_PAGE;
    const indexOfFirstCard = indexOfLastCard - CARDS_PER_PAGE;
    const displayedPokemons = pokemons.slice(
        indexOfFirstCard,
        indexOfLastCard
    );

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < maxPage) {
            setPage(page + 1);
        }
    };

    const handleFirstPage = () => {
        setPage(1);
    };

    const handleLastPage = () => {
        setPage(maxPage);
    };

    useEffect(() => {
        // Guarda la página actual en localStorage
        savePage(page);
    }, [page]);

    function savePage(page) {
        localStorage.setItem('currentPage', page.toString());
    }

    function getSavedPage() {
        const savedPage = localStorage.getItem('currentPage');
        return savedPage ? parseInt(savedPage, 10) : null;
    }

    const goToPage = (pageNumber) => {
        setPage(pageNumber);
    };

    return(
        <div className={style.container}>
            <div className={style.pagination}>
                {page > 1 && (
                    <button  onClick={handleFirstPage} disabled={page === 1}>
                        &lt;&lt; 1
                    </button>
                )}
                <button onClick={handlePrevPage} disabled={page === 1}>
                    Prev
                </button>

                {Array.from({ length: maxPage }, (_, index) => (
                    <button key={index} onClick={() => goToPage(index + 1)} 
                    className={page === index + 1 ? style.active : ''}>
                        {index + 1}
                    </button>
                ))}

                <button onClick={handleNextPage} disabled={page === maxPage}>
                    Next
                </button>
                {page < maxPage && (
                    <button onClick={handleLastPage} disabled={page === maxPage}>
                        {maxPage} &gt;&gt;
                    </button>
                )}
            </div>
            
            <FilterAndOrder setPage={setPage}/>
            <div className={style.pokemonList}>
            {displayedPokemons.length > 0 && displayedPokemons.map(pokemon => {
                console.log(pokemon)
                return <Card
                    key={pokemon.id}
                    id={pokemon.id}
                    image={pokemon.image ? pokemon.image : "defaultImg2.png" }
                    name={pokemon.name}
                    hp={pokemon.hp}
                    attack={pokemon.attack}
                    defense={pokemon.defense}
                    types={pokemon.types ? pokemon.types.join(' / ') : pokemon.Types.map((t) => t.name).join(' / ')}
                />
            })}
            {!(displayedPokemons.length > 0) && <p>No Pokemons Found</p>}
            </div>
        </div>
    )
}

export default CardsContainer