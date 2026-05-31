import { useRef, useContext, useEffect } from "react";
import { useInitializer } from "./Hooks/Initializer";
import { RenderBlank, RenderPokemon } from './Renderer.jsx';
import { RenderModal } from "./ModelHandler";
import { PokeContext } from "./Hooks/PokedexContext";
import { filterByType } from "./FilterStrip";
import { ErrorBox } from "./ErrorBox";
import { RenderHeader } from '../Components/Header.jsx'
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
    return (
        <div className="relative">
            <ErrorBox message={''} dur={3} />
            <div
                className="sticky top-0 z-2 rounded-b-lg">
                <RenderHeader />
            </div>
            <RenderModal data={modalData} setData={setData} />
            {!type && (
                <p className="text-(--text-primary) sm:text-left sm:w-fit secondary-font bg-(--bg-overlay) rounded-xl p-2 px-4 text-sm tracking-wide text-center">
                    Pokémon fetched so far —{" "}
                    <span className="primary-font text-(--accent) opacity-100 font-bold">
                        {pokedex.length}
                    </span>
                </p>
            )}
            <main
                className={`max-w-[90%] lg:max-w-[90%] mx-auto
                px-2 md:px-6
                grid grid-cols-[repeat(auto-fill,minmax(clamp(280px,15vw,500px),1fr))]
                gap-4 lg:gap-9 p-4 rounded-lg lg:mt-20
                `}>
                {filterData.length > 0 ? (
                    filterData.map((poke) => (
                        <RenderPokemon key={poke.id} pokemon={poke} setData={setData} />
                    ))
                ) :
                    type && (
                        <p className="col-span-full text-center text-(--text-primary) lg:text-2xl opacity-50 py-20 primary-font text-xl">
                            No Pokémon from your fetched list matches this type.
                        </p>
                    )
                }
                {
                    !type && !isComplete && <RenderBlank ref={unloadedRef} />
                }
            </main>
        </div>
    )
}

