import { useContext, useMemo, useState } from 'react'
import { fetchSingle } from '../API/ApiFetcher.js'
import { GlobalData } from '../Utility/GlobalData.js';
import { PokeContext } from './Hooks/PokedexContext.jsx';
export function RenderSearchbar() {
    const [text, setText] = useState('');
    const { pokedex, setData, type, setType } = useContext(PokeContext);

    return (<div>
        <input className='bg-blue-500 text-amber-200 rounded-2xl w-1/4' type="search" value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={() => handleSearch(text, setText, pokedex, setData, setType)}>
            Search
        </button>
    </div>
    )
}

function cleanInput(inp) {
    if (!inp) return;
    const cleanInp = inp.trim().toLowerCase();
    const isNumber = /^\d+$/.test(cleanInp);
    if (isNumber || !cleanInp.includes(' ')) {
        return cleanInp;
    } else {
        return cleanInp.replace(/\s+/g, '-').split('-').reverse().join('-');
    }
}

function searchLocal(list, criteria) {
    const pokeData = list.find((data) => {
        return data.id == criteria || data.name == criteria;
    })
    return pokeData;
}
async function handleSearch(text, setText, pokedex, setData, setType) {
    const cleanData = cleanInput(text);
    const localData = searchLocal(pokedex, cleanData);
    setText('');
    if (!cleanData) {
        return;
    } else if (GlobalData.types.includes(cleanData)) {
        setType(cleanData);
        return;
    }

    if (localData) {
        setData([localData]);
        return;
    } else {
        try {
            const url = `${GlobalData.apiUrl}/${cleanData}`;
            const pokeData = await fetchSingle(url);
            setData([pokeData]);

        } catch {
            const flipped = cleanData.split('-').reverse().join('-');
            try {
                const pokeData = await fetchSingle(`${GlobalData.apiUrl}/${flipped}`);
                setData([pokeData]);
            } catch {
                alert('Pokemon not Found');
            }
        }
    }
}

