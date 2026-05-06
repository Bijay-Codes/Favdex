import { forwardRef, useState } from "react";
import { capitalize } from "../Utility/util-basic";
import { analyzeNature } from "../PokemonTags/PokeNature";
export function RenderPokemon({ pokemon, setData, modalview = false }) {
    const [isShiny, setShiny] = useState(false);
    const mewUrl = "./mew.png";
    const [animating, setAnimating] = useState(false);

    return (
        <div onClick={() => { if (!modalview) setData([pokemon]) }}>
            <span>{'#' + pokemon.id}</span>
            <img loading="lazy"
                onClick={() => {
                    playCry(pokemon.cry)
                    modalview ? setShiny(!isShiny) : '';
                }}
                src={isShiny ?
                    pokemon.sprite.shinySprite ||
                    mewUrl :
                    pokemon.sprite.frontSprite ||
                    mewUrl}
                onError={(e) => { e.target.src = mewUrl; setAnimating(true) }} />
            <div>
                {capitalize(pokemon.name)}
            </div>
            <div>
                {
                    pokemon.types.map(type => {
                        return <span
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
            <div></div>
            <div></div>
            <div></div>
            <div ref={ref}></div>
        </>
    )
})


function playCry(url) {
    const audio = new Audio(url);
    audio.play()
}