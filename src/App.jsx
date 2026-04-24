import { useEffect, useState, useRef, forwardRef } from "react";
import { getItem, saveToStorage } from "./Utility/storagehelper";
import { fetchPokeApi } from "./API/ApiFetcher.js";
import { GlobalData } from "./Utility/GlobalData.js";
export default function App() {
    const unloadedRef = useRef();
    const offset = useRef();
    const [pokedex, setPokemon] = useState([]);
    useInitializer(unloadedRef, setPokemon, offset);
    return (
        <div className="bg-black text-white">
            <div className="grid grid-cols-5 gap-2 m-2">
                {
                    pokedex.map((poke, i) => {
                        return <RenderPokemon key={i} pokemon={poke} />
                    })
                }
                <RenderBlank ref={unloadedRef} />
            </div>
        </div>
    )
}

function RenderPokemon({ pokemon }) {
    return (
        <div className="bg-green-500 flex flex-col justify-center items-center rounded-lg aspect-square">
            <span>{pokemon.id}</span>
            <img className="aspect-square" src={pokemon.sprite.frontSprite || pokemon.sprite.shinySprite} alt={pokemon.name + '.img'} />
            <div>{pokemon.name}</div>
            {
                pokemon.types.map(type => <span className="bg-indigo-400 border-2 border-sky-100 px-1 py-0.4 rounded-lg" key={type}>{type}</span>)
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
function useInitializer(ref, setFunct, offset) {
    const isFetching = useRef(false);
    const totalPokemonEntry = useRef(0);
    useEffect(() => {
        const prevData = getItem('pokedex-scroll');
        if (!prevData) {
            fetchPokeApi(GlobalData.apiLimit, 3, 0).then((data) => {
                if (data) {
                    setFunct(data[0]);
                    offset.current = data[1];
                    totalPokemonEntry.current = data[2];
                }
            });
        } else {
            setFunct(prevData);
            offset.current = prevData.length;
        }
    }, []);
    useEffect(() => {
        const observer = new IntersectionObserver((ent) => {
            if (offset.current >= totalPokemonEntry.current) {
                return;
            }
            if (ent[0].isIntersecting && offset.current && !isFetching.current) {
                isFetching.current = true;
                fetchPokeApi(GlobalData.apiLimit, 3, offset.current).then(data => {
                    if (data) {
                        setFunct(previous => {
                            const updated = [...previous, ...data[0]];
                            saveToStorage(updated,'pokedex-scroll');
                            return updated;
                        });
                        offset.current = data[1];
                    }
                    isFetching.current = false;
                })
            }
        })
        observer.observe(ref.current)
    }, [])
}
console.log(getItem('pokedex-scroll'))