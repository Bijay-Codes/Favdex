import { useEffect, useState } from "react";
import { GlobalData } from "./Utility/GlobalData"
import { saveToStorage, getItem } from "./Utility/storagehelper";
export default function App() {
    const [pokedex, setPokemon] = useState([]);
    const [panel, setPanel] = useState([]);
    useEffect(() => {
        const prevData = getItem('pokedex-scroll');
        if (!prevData) {
            fetchPokeApi(20, 3).then((data) => {
                if (data) {
                    setPokemon(data[0]);
                }
            });
        } else {
            setPokemon(prevData);
        }
    }, []);
    return (
        <div className="bg-black text-white">
            <div className="flex justify-start gap-4 flex-wrap">
                {
                    pokedex.map((poke, i) => {
                        return <RenderPokemon key={i} pokemon={poke} />
                    })
                }
                {

                }
            </div>
        </div>
    )
}
async function fetchPokeApi(limit = 20, retry) {
    const apiUrl = GlobalData.apiUrl;
    try {
        const rawData = await fetch(apiUrl + '?limit=' + limit);
        const fetchData = await rawData.json();
        const totalData = await Promise.all(fetchData.results.map(link =>
            fetch(link.url).then(response => response.json())
        ));
        const cutDownData = totalData.map(data => {
            return {
                name: data.name,
                types: data.types.map(tArr => tArr.type.name),
                abilities: data.abilities.map(aArr => (
                    {
                        name: aArr.ability.name,
                        is_hidden: aArr.is_hidden
                    }
                )),
                sprite: {
                    shinySprite: data.sprites.front_shiny,
                    frontSprite: data.sprites.front_default
                }
            }
        });
        saveToStorage(cutDownData, 'pokedex-scroll');
        return [cutDownData, limit + 30]
    } catch (e) {
        retry--;
        if (!(retry <= 0)) {
            return fetchPokeApi(limit, retry);
        }
    }
}

function RenderPokemon({ pokemon }) {
    return (
        <div className="bg-amber-200 flex flex-col justify-center aspect-1:1 p-2">
            <img className="object-contain" src={pokemon.sprite.frontSprite} alt={pokemon.name + '.img'} />
            <div>{pokemon.name}</div>
            {
                pokemon.types.map(type => <span key={type}>{type}</span>)
            }
        </div>
    )
}