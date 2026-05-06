import { forwardRef, useState } from "react";
import { capitalize } from "../Utility/util-basic";
import { analyzeNature } from "../PokemonTags/PokeNature";
export function RenderPokemon({ pokemon, setData, modalview = false }) {
    const [isShiny, setShiny] = useState(false);
    const mewUrl = "./mew.png";
    const [animating, setAnimating] = useState(false);

    return (
        <div onClick={() => { if (!modalview) setData([pokemon]) }}
            className={`rounded-lg p-4 card-loading flex justify-center items-center flex-col ${!modalview ? 'pokemon' : ''}`}>
            <span>{'#' + pokemon.id}</span>
            <img loading="lazy"
                onClick={() => {
                    playCry(pokemon.cry)
                    modalview ? setShiny(!isShiny) : '';
                }}
                className={`aspect-square ${modalview ? 'max-w-1/3' : ''}min-w-1/1 max-w-1/1 cursor-pointer ${animating ? 'unloaded' : ''}`}
                src={isShiny ?
                    pokemon.sprite.shinySprite ||
                    mewUrl :
                    pokemon.sprite.frontSprite ||
                    mewUrl}
                onError={(e) => { e.target.src = mewUrl; setAnimating(true) }} />
            <div className="whitespace-nowrap">
                {capitalize(pokemon.name)}
            </div>
            <div>
                {
                    pokemon.types.map(type => {
                        return <span
                            className={`${type} inline-flex items-center gap-2 px-3 py-1 rounded-lg text-[12px] font-extrabold uppercase tracking-wide text-white`}
                            key={type}
                        >{capitalize(type)}</span>
                    })
                }
            </div>
            {analyzeNature(pokemon)}
        </div>
    )
}
export const RenderBlank = forwardRef((props, ref) => {
    const style = 'min-w-20 aspect-square bg-gray-500'
    return (
        <>
            <div className={style}></div>
            <div className={style}></div>
            <div className={style}></div>
            <div ref={ref} className={style}></div>
        </>
    )
})


function playCry(url) {
    const audio = new Audio(url);
    audio.play()
}