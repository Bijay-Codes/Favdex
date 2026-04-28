import { useState, useRef } from "react";
import { useInitializer } from "./Components/Hooks/Initializer.jsx";
import { RenderBlank,RenderPokemon } from "./Components/Renderer.jsx";
import { RenderModal } from "./Components/ModelHandler.jsx";
import './app.css';
import './ComponentCSS/TypesCss.css';
export default function PokedexGrid() {
    const unloadedRef = useRef();
    const offset = useRef();
    const [pokedex, setPokemon] = useState([]);
    const [isComplete, setComplete] = useState(false);
    const [modalData, setData] = useState(null);
    useInitializer(unloadedRef, setPokemon, offset, setComplete);
    return (
        <div className="pokedex-body bg-black text-white p-4">
            <RenderModal data={modalData} setData={setData} />
            <div className="pokedex-grid gap-2 m-2 p-2">
                {
                    pokedex.map((poke) => {
                        return <RenderPokemon key={poke.id} pokemon={poke} setData={setData} />
                    })
                }
                {
                    !isComplete && <RenderBlank ref={unloadedRef} />
                }
            </div>
        </div>
    )
}

