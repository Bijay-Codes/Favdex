import { useContext, useMemo, useState } from 'react'
import { fetchSingle } from '../API/ApiFetcher.js'
import { GlobalData } from '../Utility/GlobalData.js';
import { PokeContext } from './Hooks/PokedexContext.jsx';
import { genKeyWords } from '../Utility/Rounding-Searches.js';
export function RenderSearchbar() {
    const { setError } = useContext(PokeContext);
    const [text, setText] = useState('');
    const { pokedex, setData, setType } = useContext(PokeContext);

    return (
        <div className='header-part [grid-area:search] relative mb-2'>
            <input
                className='w-full pl-2 py-1 rounded-lg text-[clamp(1rem,1.5vw,1.5rem)]
                 bg-(--bg-elevated) mask-r-from-50% border-2 border-(--border-white)
                 focus:outline-2 focus:outline-(--accent) primary-font'
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
                bg-(--accent-cta) px-2 hover:bg-(--accent-hover) h-[90%] text-[clamp(1rem,1.3vw,1.5rem)]
                rounded rounded-bl-2xl rounded-br-2xl border-r-4 border-double'
                onClick={() => handleSearch(text, setText, pokedex, setData, setType, setError)}>
                Search
            </button>
            {text && (
                <div className="absolute w-fit left-1 top-full z-50
             bg-(--bg-overlay) outline primary-font outline-(--accent) text-(--text-primary) rounded-b-2xl rounded-xl p-2">
                    <RenderSearchUtil text={text} setText={setText} pokedex={pokedex}
                        setData={setData} setType={setType} setError={setError} />
                </div>
            )}
        </div>
    )
}
function cleanInput(inp) {
    if (!inp) return;

    const cleanInp = inp.trim().toLowerCase();
    const isNumber = /^\d+$/.test(cleanInp);

    if (isNumber || !cleanInp.includes(' ')) return cleanInp;

    const formMap = {
        'gigantamax': 'gmax',
        'gmax': 'gmax',
        'mega': 'mega',
        'alolan': 'alola',
        'alola': 'alola',
        'galarian': 'galar',
        'galar': 'galar',
        'hisuian': 'hisui',
        'hisui': 'hisui',
        'paldean': 'paldea',
        'paldea': 'paldea',
    };

    const words = cleanInp.split(/\s+/);

    // first word is a known form prefix?
    const prefix = formMap[words[0]];

    if (prefix) {
        const pokeName = words.slice(1).join('-');
        return `${pokeName}-${prefix}`;
    }

    // Fallbacks
    return words.join('-');
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

function RenderSearchUtil({ text, setText, pokedex, setData, setType, setError }) {
    const searches = useMemo(() => genKeyWords(pokedex), [pokedex]);
    const filtered = useMemo(() => {
        if (!text) return [];
        return searches.filter(name => name.startsWith(text.toLowerCase())).slice(0, 4);
    }, [text, searches]);
    return (
        <>
            {filtered.map(data => (
                <div key={data}
                    onClick={() => {
                        handleSearch(data, setText, pokedex, setData, setType, setError)
                    }}
                    className=''
                    >
                    {data}
                </div>
            )
            )}
        </>
    )
}
