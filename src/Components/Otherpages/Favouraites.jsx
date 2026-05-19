import { useContext, useEffect, useState } from "react";
import { PokeContext } from "../Hooks/PokedexContext";
import { fetchSingle } from '../../API/ApiFetcher.js';
import { GlobalData } from "../../Utility/GlobalData.js";
import { RenderPokemon } from "../Renderer.jsx";
import { favdexStorage } from "../../Utility/Favdex.js";
import { getItem } from "../../Utility/storagehelper.js";
export function RenderFavdex() {
    const [favdex, setFavdex] = useState(null);
    const { pokedex, setData } = useContext(PokeContext);
    const list = getItem(GlobalData.favdex.favdexKey).pokemon || favdexStorage.pokemon;
    console.log('list:', list)
    console.log('pokedex:', pokedex)
    useEffect(() => {
        async function load(params) {
            const data = await getPokeData(list, pokedex);
            setFavdex(data);
        };
        load();
    }, []);
    return (
        favdex && favdex.map(poke => {
            return <RenderPokemon key={poke.id} pokemon={poke} setData={setData} favView={true} />
        })
    )
}

async function getPokeData(list, pokedex) {
    const pokeMap = new Map(pokedex.map(p => [p.id, p]));
    const res = await Promise.all(list.map(async (li) => {
        if (pokeMap.has(li)) {
            return pokeMap.get(li);
        } else {
            const url = `${GlobalData.apiUrl}/${li}`;
            const fetData = await fetchSingle(url);
            return fetData;
        }
    })
    )
    console.log(res);
    return res;
}