import { useState, useRef, useContext } from "react";
import { useInitializer } from "./Components/Hooks/Initializer.jsx";
import { RenderBlank, RenderPokemon } from "./Components/Renderer.jsx";
import { RenderModal } from "./Components/ModelHandler.jsx";
import { RenderSearchbar } from "./Components/Seachbar.jsx";
import { RenderFilterStrip, filterByType } from "./Components/FilterStrip.jsx";
import { PokeContext } from "./Components/Hooks/PokedexContext.jsx";
import { GlobalData } from "./Utility/GlobalData.js";
import './app.css';
import './ComponentCSS/TypesCss.css';
export default function PokedexGrid() {
    const unloadedRef = useRef();
    const offset = useRef();
    const { pokedex, setPokemon, isComplete, setComplete, modalData, setData, type } = useContext(PokeContext);
    useInitializer(unloadedRef, setPokemon, offset, setComplete);
    const filterData = filterByType(pokedex, type);
    return (
        <div className="pokedex-body bg-black text-white p-4">
            <RenderSearchbar />
            <RenderFilterStrip array={GlobalData.types} />
            <RenderModal data={modalData} setData={setData} />
            <div className="pokedex-grid gap-2 m-2 p-2">
                {filterData.length > 0 &&
                    filterData.map((poke) => {
                        return <RenderPokemon key={poke.id} pokemon={poke} setData={setData} />
                    })
                }
                {
                   !type && !isComplete && <RenderBlank ref={unloadedRef} />
                }
            </div>
        </div>
    )
}

