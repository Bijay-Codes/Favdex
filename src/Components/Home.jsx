import { useRef, useContext, useEffect } from "react";
import { useInitializer } from "./Hooks/Initializer";
import { RenderBlank, RenderPokemon } from './Renderer.jsx';
import { RenderModal } from "./ModelHandler";
import { PokeContext } from "./Hooks/PokedexContext";
import { filterByType } from "./FilterStrip";
import { ErrorBox } from "./ErrorBox";
import { RenderHeader } from '../Components/Header.jsx'
import '../ComponentCSS/Renderer.css'
import '../ComponentCSS/TypesCss.css';

export function RenderHome() {
    return (
        <PokedexGrid />
    )
}
export default function PokedexGrid() {
    const unloadedRef = useRef();
    const offset = useRef();
    const { pokedex, setPokemon, isComplete, setComplete, modalData, setData, type } = useContext(PokeContext);
    useInitializer(unloadedRef, setPokemon, offset, setComplete);
    const filterData = filterByType(pokedex, type);
    useEffect(() => {
        console.log((JSON.stringify(localStorage).length * 2 / 1024 / 1024).toFixed(2) + ' MB');
    }, [pokedex]);
    return (
        <div className="relative">
            <ErrorBox message={''} dur={3} />
            <div
                className="sticky top-0 z-2 bg-(--bg-main) rounded-b-lg">
                <RenderHeader />
            </div>
            <RenderModal data={modalData} setData={setData} />
            {filterData.length !== 0 ?
                <main
                    className="">
                    {filterData.length > 0 &&
                        filterData.map((poke) => {
                            return <RenderPokemon key={poke.id} pokemon={poke} setData={setData} />
                        })
                    }
                    {
                        !type && !isComplete && <RenderBlank ref={unloadedRef} />
                    }
                </main>
                : ''}
        </div>
    )
}

