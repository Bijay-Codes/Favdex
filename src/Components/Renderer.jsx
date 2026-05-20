import { forwardRef, useState } from "react";
import { capitalize } from "../Utility/util-basic";
import { analyzeNature } from "../PokemonTags/PokeNature";
import { map } from "../PokemonTags/TagClass";
import '../ComponentCSS/Renderer.css';
import '../ComponentCSS/Tags.css'
import { getItem, saveToStorage } from "../Utility/storagehelper";
import { GlobalData } from "../Utility/GlobalData";
import { favdexStorage } from "../Utility/Favdex";
export function RenderPokemon({ pokemon, setData, modalview = false, favView = false }) {
    const mewUrl = "./mew.png";
    const [isShiny, setShiny] = useState(false);
    const [isLoading, setLoaded] = useState(true);
    const [iserror, setError] = useState(false);
    const spriteUrl =
        isShiny ? pokemon.sprite.shinySprite :
            pokemon.sprite.frontSprite;
    const pokeTag = analyzeNature(pokemon);
    const [favdex, setFavdex] = useState(getItem(GlobalData.favdex.favdexKey).pokemon || favdexStorage.pokemon);

    return (
        <div className={`${!modalview && !favView ? `${favdex.includes(pokemon.id)?'fav-pokemons':'cards'} aspect-square flex flex-col items-center justify-center gap-4 rounded-4xl` : ''}
        ${pokemon.types.includes('psychic') ? 'psyshock' : ''}
        ${favView ? 'fav-pokemon fav-pokemons' : ''}`}
            onClick={() => { if (!modalview) setData([pokemon]) }}>
            <span
                className="flex gap-2 text-xl justify-center items-center">
                {'#' + pokemon.id}
            </span>

            <div className="img-container relative aspect-square w-fit flex items-center justify-center">
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
                        className={`poke-img relative z-1 w-full h-full object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}
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
                {!favView &&
                    <div className="flex gap-2 justify-center relative">
                        {
                            pokemon.types.map(type => {
                                return <span
                                    key={type}
                                    className={`${type} px-4 rounded`}
                                >{capitalize(type)}</span>
                            })
                        }
                    </div>
                }
                <span className={`${map[pokeTag]} poke-tag px-2 mt-1`}
                >
                    {pokeTag}
                </span>
            </div>
        </div>
    )
}
export const RenderBlank = forwardRef((props, ref) => {
    const style = 'empty-cards cards aspect-square rounded-4xl'
    return (
        <>
            <div className={style}></div>
            <div className={style}></div>
            <div className={style}></div>
            <div className={style}
                ref={ref}></div>
        </>
    )
})


function confirmRelease(id, setFavdex) {
    const res = confirm('Do you Want to Remove this Pokemon from your Favdex List?');
    if (res !== true) {
        return;
    } else {
        const favdex = getItem(GlobalData.favdex.favdexKey) || favdexStorage;
        favdex.pokemon = favdex.pokemon.filter(pokeId => pokeId !== id);
        favdex.progress = favdex.progress.filter(poke => poke.id !== id);
        setFavdex(favdex.pokemon);
        saveToStorage(favdex, GlobalData.favdex.favdexKey);
    }
}
function playCry(url) {
    const audio = new Audio(url);
    audio.play();
}

