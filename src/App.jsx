import { useState, useRef, forwardRef } from "react";
import { capitalize } from "./Utility/util-basic.js";
import { useInitializer } from "./Components/Hooks/Initializer.jsx";
export default function PokedexGrid() {
    const unloadedRef = useRef();
    const offset = useRef();
    const [pokedex, setPokemon] = useState([]);
    const [isComplete, setComplete] = useState(false);
    useInitializer(unloadedRef, setPokemon, offset, setComplete);
    return (
        <div className="bg-black text-white">
            <div className="grid grid-cols-5 gap-2 m-2 p-2">
                {
                    pokedex.map((poke, i) => {
                        return <RenderPokemon key={i} pokemon={poke} />
                    })
                }{
                    !isComplete && <RenderBlank ref={unloadedRef} />
                }
            </div>
        </div>
    )
}

function RenderPokemon({ pokemon }) {
    return (
        <div className="bg-green-500 flex flex-col justify-center items-center rounded-lg aspect-square p-4">
            <span>{'#' + pokemon.id}</span>
            <img loading="lazy" className="aspect-square" src={pokemon.sprite.frontSprite || pokemon.sprite.shinySprite} alt={pokemon.name+'.png'} />
            <div>{capitalize(pokemon.name)}</div>
            {
                pokemon.types.map(type => <span className="bg-indigo-400 border-2 border-sky-100 px-1 py-0.4 rounded-lg" key={type}>{capitalize(type)}</span>)
            }
        </div>
    )
}
const RenderBlank = forwardRef((props, ref) => {
    const style = 'min-w-20 aspect-square bg-amber-200'
    return (
        <>
            <div className={style}></div>
            <div className={style}></div>
            <div className={style}></div>
            <div ref={ref} className={style}></div>
        </>
    )
})
