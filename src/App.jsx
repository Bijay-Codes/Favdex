import { useRef, useContext, useEffect } from "react";
import { useInitializer } from "./Components/Hooks/Initializer.jsx";
import { RenderBlank, RenderPokemon } from "./Components/Renderer.jsx";
import { RenderModal } from "./Components/ModelHandler.jsx";
import { PokeContext } from "./Components/Hooks/PokedexContext.jsx";
import { filterByType } from "./Components/FilterStrip.jsx";
import { ErrorBox } from './Components/ErrorBox.jsx'
import { RenderHeader } from "./Components/Header.jsx";
import './app.css';
import './ComponentCSS/Renderer.css'
import './ComponentCSS/TypesCss.css';
export default function PokedexGrid() {
    const unloadedRef = useRef();
    const offset = useRef();
    const { pokedex, setPokemon, isComplete, setComplete, modalData, setData, type } = useContext(PokeContext);
    useInitializer(unloadedRef, setPokemon, offset, setComplete);
    const filterData = filterByType(pokedex, type);
    useEffect(() => {
        console.log((JSON.stringify(localStorage).length * 2 / 1024 / 1024).toFixed(2) + ' MB');
        console.log(pokedex);
    }, [pokedex]);
    return (
        <div>
            <ErrorBox message={'hey'} dur={3} />
            <RenderHeader />
            <RenderModal data={modalData} setData={setData} />
            <main className="pokedex-grid pokemons w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 p-2 rounded-xl hover:bg-(--)">
                {filterData.length > 0 &&
                    filterData.map((poke) => {
                        return <RenderPokemon key={poke.id} pokemon={poke} setData={setData} />
                    })
                }
                {
                    !type && !isComplete && <RenderBlank ref={unloadedRef} />
                }
            </main>
        </div>
    )
}

