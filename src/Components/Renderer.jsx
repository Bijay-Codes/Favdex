import { forwardRef, useState } from "react";
import { capitalize } from "../Utility/util-basic";
import { analyzeNature } from "../PokemonTags/PokeNature";
import { map } from "../PokemonTags/TagClass";
import { getItem, saveToStorage } from "../Utility/storagehelper";
import { GlobalData } from "../Utility/GlobalData";
import { favdexStorage } from "../Utility/Favdex";
import '../app.css'
import '../ComponentCSS/Tags.css'
import '../ComponentCSS/Renderer.css'
export function RenderPokemon({ pokemon, setData, modalview = false, favView = false }) {
    const mewUrl = "/mew.png";
    const [isShiny, setShiny] = useState(false);
    const [isLoading, setLoaded] = useState(true);
    const [iserror, setError] = useState(false);
    const spriteUrl =
        isShiny ? pokemon.sprite.shinySprite :
            pokemon.sprite.frontSprite;
    const pokeTag = analyzeNature(pokemon);
    const [favdex, setFavdex] = useState(getItem(GlobalData.favdex.favdexKey)?.pokemon || favdexStorage.pokemon);

    return (
        <div className={`${!modalview && !favView ?
            `${favdex.includes(pokemon.id) ? 'fav-pokemons' : 'cards'}
               flex flex-col items-center justify-center text-center
               gap-6 h-fit rounded-2xl p-4
               border-2 border-(--border)
               hover:bg-(--bg-elevated) hover:-translate-y-1.5 hover:border-(--border-white) hover:shadow-[0_4px_5px_var(--accent-hover)]
               transition-all ease-in-out duration-300` : modalview ? '' : `fav-pokemons rounded-4xl p-4 mt-4`}
        ${pokemon.types.includes('psychic') ? 'psyshock' : ''}`}
            onClick={() => { if (!modalview && !favView) setData([pokemon]) }}>
            <span
                className="flex gap-2 text-xl justify-center items-center
                text-(--text-primary)">
                {'#' + pokemon.id}
            </span>

            <div className="relative aspect-square w-fit flex items-center justify-center
            ">
                {(isLoading || iserror) && (
                    <img
                        src={mewUrl}
                        className="absolute inset-0 w-full h-full object-contain z-0"
                        alt="Loading/Error Placeholder"
                    />
                )}
                {!iserror && (
                    <img
                        loading="lazy"
                        className={`relative z-1 w-full h-full object-contain
                            transition-all ease-in-out duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}
                        `}
                        onLoad={() => setLoaded(false)}
                        onError={() => {
                            setError(true);
                            setLoaded(false);
                        }}
                        src={spriteUrl}
                        onClick={() => {
                            playCry(pokemon.cry);
                            if (modalview || favView) setShiny(!isShiny);
                        }}
                    />
                )}
            </div>
            <div className="text-xl flex flex-col items-center gap-2 pb-1">
                <div className="text-(--text-muted) font-extrabold">Species:
                    <span className="text-(--text-primary)">{capitalize(pokemon.name)}</span>
                </div>
                {!favView &&
                    <div className="flex gap-4 justify-center relative min-w-0 overflow-hidden">
                        {
                            pokemon.types.map(type => {
                                return <span
                                    key={type}
                                    className={`${type} poke-types px-4 rounded`}
                                >{capitalize(type)}</span>
                            })
                        }
                    </div>
                }
                <span className={`${map[pokeTag] ?? ''} poke-tag py-1 px-2 min-h-6`}>
                    {pokeTag}
                </span>

                {/* <span className={`${map[pokeTag] ?? ''} poke-tag py-1 px-2`}>
                    {pokeTag ?? '\u00A0'}
                </span> saving this here for backup and also this \u00a0 is confusing as heck on what it does */}
            </div>
        </div>
    )
}
export const RenderBlank = forwardRef((props, ref) => {
    const style = 'empty-cards cards aspect-square rounded-4xl';
    return (
        <>
            <div className={style} ref={ref}></div>
            <div className={style}></div>
            <div className={style}></div>
            <div className={style}></div>
        </>
    )
})

function playCry(url) {
    const audio = new Audio(url);
    audio.play();
}

