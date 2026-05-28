import { useContext, useState } from 'react'
import { fetchSingle } from '../API/ApiFetcher.js'
import { GlobalData } from '../Utility/GlobalData.js';
import { PokeContext } from './Hooks/PokedexContext.jsx';
export function RenderSearchbar() {
    const { setError } = useContext(PokeContext);
    const [text, setText] = useState('');
    const { pokedex, setData, setType } = useContext(PokeContext);

    return (
        <div className='header-part [grid-area:search] relative overflow-hidden mb-2'>
            <input
                className='w-full pl-2 rounded-lg text-[clamp(1rem,1.5vw,1.5rem)]
                 bg-(--bg-elevated) mask-r-from-90% border-2 border-(--border-white)
                 focus:outline-2 focus:outline-(--accent)'
                placeholder='Search'
                type="search"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSearch(text, setText, pokedex, setData, setType, setError)
                    }
                }
                }
            />
            <button
                className='[grid-area:search] absolute top-1/2 -translate-y-1/2 right-0
                bg-(--accent-cta) px-2 hover:bg-(--accent-hover) h-full text-[clamp(1rem,1.3vw,1.5rem)]
                rounded rounded-tl-2xl rounded-tr-2xl border-r-4 border-double'
                onClick={() => handleSearch(text, setText, pokedex, setData, setType, setError)}>
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
async function handleSearch(text, setText, pokedex, setData, setType, setError) {
    const cleanData = cleanInput(text);
    const localData = searchLocal(pokedex, cleanData);
    console.log('cleanData:', cleanData);
    console.log('localData:', localData);
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
                setTimeout(() => {
                    setError('');
                }, 2000);
                setError('We couldnt find the requested data in our Database.');
            }
        }
    }
}

