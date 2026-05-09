import { forwardRef, useState } from "react";
import { capitalize } from "../Utility/util-basic";
import { analyzeNature } from "../PokemonTags/PokeNature";
import '../ComponentCSS/Renderer.css';
export function RenderPokemon({ pokemon, setData, modalview = false }) {
    const mewUrl = "./mew.png";
    const [isShiny, setShiny] = useState(false);
    const [isLoading, setLoaded] = useState(true);
    const [iserror, setError] = useState(false);
    const spriteUrl =
        isShiny ? pokemon.sprite.shinySprite :
            pokemon.sprite.frontSprite;
    return (
        <div className={!modalview ? `cards aspect-square flex flex-col items-center justify-center gap-4 rounded-4xl` : ''}
            onClick={() => { if (!modalview) setData([pokemon]) }}>
            <span>{'#' + pokemon.id}</span>
            <div className="img-container relative aspect-square w-full flex items-center justify-center">
                {(isLoading || iserror) && (
                    <img
                        src={mewUrl}
                        className="absolute img-mew inset-0 w-full h-full object-contain z-0"
                        alt="Loading/Error Placeholder"
                    />
                )}
                {!iserror && (
                    <img
                        loading="lazy"
                        className={`poke-img relative z-10 w-full h-full object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}
                        drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]`}
                        onLoad={() => setLoaded(false)}
                        onError={() => {
                            setError(true);
                            setLoaded(false);
                        }}
                        src={spriteUrl}
                        onClick={() => {
                            playCry(pokemon.cry);
                            if (modalview) setShiny(!isShiny);
                        }}
                    />
                )}
            </div>
            <div className="bg-(--bg-main)/25 p-3 w-full text-center rounded-4xl">
                <div className="text-lg font-light">Species:
                    <span className="text-(--text-inverse)">{capitalize(pokemon.name)}</span>
                </div>
                <div className="flex gap-2 justify-center">
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

// <div className="relative">
//     {(isLoading || iserror) && (
//         <img
//             src={mewUrl}
//             className={`absolute mewAnimation inset-0 mewAnimation object-contain transition-opacity duration-300`}
//         />
//     )}
//     <img
//         loading="lazy"
//         className={`relative z-10 transition-opacity duration-300 ${isLoading || iserror ? 'opacity-0' : 'opacity-100'}`}
//         onLoad={() => {
//             setLoaded(true);
//             setLoaded(false);
//         }}
//         onError={() => setError(true)}
//         src={spriteUrl}
//         onClick={() => {
//             playCry(pokemon.cry)
//             modalview ? setShiny(!isShiny) : '';
//         }}
//     />
// </div>