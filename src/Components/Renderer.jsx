import { forwardRef, useState } from "react";
import { capitalize } from "../Utility/util-basic";
export function RenderPokemon({ pokemon, setData, modalview = false }) {
    const [isShiny, setShiny] = useState(false);
    const mewUrl = "./mew.png";
    const isUnloaded = isShiny ?
        !pokemon.sprite.shinySprite :
        !pokemon.sprite.frontSprite;
    return (
        <div onClick={() => { if (!modalview) setData([pokemon]) }}
            className={`rounded-lg aspect-square p-4 card-loading ${!modalview ? 'pokemon' : ''}`}>
            <span>{'#' + pokemon.id}</span>
            <img loading="lazy"
                onClick={() => { setShiny(!isShiny) }}
                className={`aspect-square ${isUnloaded ? 'unloaded' : ''}`}
                src={isShiny ?
                    pokemon.sprite.shinySprite ||
                    mewUrl :
                    pokemon.sprite.frontSprite ||
                    mewUrl}
                onError={(e) => { e.target.src = mewUrl }} />
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
