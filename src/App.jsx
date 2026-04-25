import { useState, useRef, forwardRef } from "react";
import { capitalize } from "./Utility/util-basic.js";
import { useInitializer } from "./Components/Hooks/Initializer.jsx";
import { typeStyles } from "../public/TypeStyle.js";
export default function PokedexGrid() {
    const unloadedRef = useRef();
    const offset = useRef();
    const [pokedex, setPokemon] = useState([]);
    const [isComplete, setComplete] = useState(false);
    useInitializer(unloadedRef, setPokemon, offset, setComplete);
    return (
        <div className="bg-black text-white p-4">
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
        <div className="mask-r-from-60% flex flex-col justify-center items-center rounded-lg aspect-square p-4">
            <span>{'#' + pokemon.id}</span>
            <img loading="lazy" className="aspect-square" src={pokemon.sprite.frontSprite || pokemon.sprite.shinySprite} alt={pokemon.name+'.png'} />
            <div className="whitespace-nowrap">{capitalize(pokemon.name)}</div>
            {
                pokemon.types.map(type => <span className={`${typeStyles[type]} px-2 rounded-2xl mask-b-from-80% border-t-2`} key={type}>{capitalize(type)}</span>)
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
