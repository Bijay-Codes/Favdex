import { forwardRef, useState } from "react";
import { capitalize } from "../Utility/util-basic";
import { analyzeNature } from "../PokemonTags/PokeNature";
import { map } from "../PokemonTags/TagClass";
import { getItem, saveToStorage } from "../Utility/storagehelper";
import { GlobalData } from "../Utility/GlobalData";
import { favdexStorage } from "../Utility/Favdex";
import '../app.css'
import '../ComponentCSS/Tags.css'
import '../ComponentCSS/Renderer.css';


export function RenderPokemon({ pokemon, setData, modalview = false, favView = false}) {
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
       h-fit rounded-2xl p-4 gap-2
       border-2 border-(--border)
       hover:bg-(--bg-elevated) hover:-translate-y-1 hover:border-(--border-white) hover:shadow-[0_4px_5px_var(--accent-hover)]
       transition-all ease-in-out duration-300` : modalview ? 'm-auto' : `fav-pokemons rounded-4xl p-4 mt-4`}
${pokemon.types.includes('psychic') ? 'psyshock' : ''}`}
            onClick={() => { if (!modalview && !favView) setData([pokemon]) }}>
            <span
                className="flex gap-2 text-xl justify-center items-center
                text-(--text-primary)">
                {'#' + pokemon.orgId}
                {pokemon.id > GlobalData.formsStart ? `(${pokemon.id})` : ''}
            </span>

            <div className="relative aspect-square min-h-1/2  w-full min-w-1/2 m-auto flex items-center justify-center">
                {(isLoading || iserror) && (
                    <img
                        src={mewUrl}
                        alt="Mew.png"
                        loading="lazy"
                        className="mew-loading absolute inset-0 w-full h-full object-contain z-0"
                    />
                )}
                {!iserror && (

                    <img
                        alt={`${pokemon.name} sprite`}
                        loading="lazy"
                        className={`relative z-0 w-full h-full object-contain 
                        transition-all ease-in-out duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={() => setLoaded(false)}
                        onError={() => { setError(true); setLoaded(false); }}
                        src={spriteUrl}
                        onClick={() => { playCry(pokemon.cry); if (modalview || favView) setShiny(!isShiny); }}
                    />
                )}
            </div>
            <p className="text-xs text-(--text-muted) text-center m-auto">
                Click pokemon for Cry 🔊 ·  Toggle Shiny ✨
            </p>
            <div className="flex flex-col items-center gap-2 mb-1 text-[clamp(1rem,1.2vw,3rem)]">
                <div className="text-(--text-muted) font-extrabold primary-font">Species:
                    <span className="text-(--text-primary) secondary-font text-[clamp(1rem,1.4vw,4rem)]">{capitalize(pokemon.name)}</span>
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
    const blanks = [1, 2, 3];
    return (
        <>
            <div ref={ref} className="cards flex flex-col items-center justify-center gap-6 min-h-105 h-fit rounded-2xl p-4 border-2 border-(--border)">
                <img src="/mew.png"
                    className="mew-loading w-full h-full object-contain" alt="Mew.png" />
                <div className="skeleton h-4 w-1/3 rounded-lg" />
                <div className="skeleton h-4 w-1/2 rounded-lg" />
            </div>
            {blanks.map(num => (
                <div key={num} className="cards flex flex-col items-center justify-center gap-6 min-h-105 h-fit rounded-2xl p-4 border-2 border-(--border)">
                    <img src="/mew.png"
                        className="mew-loading w-full h-full object-contain" alt="Mew.png" />
                    <div className="skeleton h-4 w-1/3 rounded-lg" />
                    <div className="skeleton h-4 w-1/2 rounded-lg" />
                </div>
            ))}
        </>
    );
})
function playCry(url) {
    const audio = new Audio(url);
    audio.play();
}