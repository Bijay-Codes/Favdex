import { useRef, useContext } from "react";
import { useInitializer } from "./Hooks/Initializer";
import { RenderBlank, RenderPokemon } from './Renderer.jsx';
import { RenderModal } from "./ModelHandler";
import { PokeContext } from "./Hooks/PokedexContext";
import { filterByType } from "./FilterStrip";
import { ErrorBox } from "./ErrorBox";
import { RenderHeader } from '../Components/Header.jsx'
import '../ComponentCSS/TypesCss.css';
// Bundles the whole Pokedex grid to privide as a single component to the App.jsx to render Homepage

export function RenderHome() {
    return (
        <PokedexGrid />
    )
}

// Main component for the homepage DO NOT CHANGE IF DONT KNOW WHAT YOU ARE DOING
// This one gets data from pokecontext and provides it to the other components to link everything together

// Renders initial error box or message box for other components to load from via ErrorBox component
// Renders Header which is our whole navbar via RenderHeader component
// Renders initial Modal to the page so its active when the pokemon data comes(user clicks) via RenderModal component
// Renders Pokemon cards that have been fetched so far and filtered via filterData and RenderPokemon component
// Renders the blank divs/cards which have the intersection observer to fetch more pokemon via RenderBlank component
// Shows error messages if the filtered pokemon is empty
function PokedexGrid() {
    const unloadedRef = useRef();
    const offset = useRef();
    const { pokedex, setPokemon, isComplete, setComplete, modalData, setData, type } = useContext(PokeContext);
    useInitializer(unloadedRef, setPokemon, offset, setComplete);
    const filterData = filterByType(pokedex, type);
    return (
        <div className="relative">
            <ErrorBox message={''} dur={0} />
            <div
                className="sticky top-0 z-2 rounded-b-lg">
                <RenderHeader />
            </div>
            <RenderModal data={modalData} setData={setData} />
            {!type && (
                <p className="text-(--text-primary)
                 secondary-font bg-(--bg-overlay) rounded-2xl
                 p-2 m-4 text-sm tracking-wide text-center">
                    Pokémon fetched so far —{" "}
                    <span className="primary-font text-xl text-(--accent)">
                        {pokedex.length}
                    </span>
                </p>
            )}
            <main
                className={`max-w-[90%] lg:max-w-[90%] mx-auto
                px-2 md:px-6
                grid grid-cols-[repeat(auto-fill,minmax(clamp(280px,15vw,500px),1fr))]
                gap-4 lg:gap-9 p-4 rounded-lg lg:mt-15
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

