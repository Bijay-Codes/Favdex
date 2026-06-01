import { useContext, useMemo, useState } from 'react'
import { fetchSingle } from '../API/ApiFetcher.js'
import { GlobalData } from '../Utility/GlobalData.js';
import { PokeContext } from './Hooks/PokedexContext.jsx';
import { genKeyWords } from '../Utility/Rounding-Searches.js';
export function RenderSearchbar() {
    const { setError } = useContext(PokeContext);
    const [text, setText] = useState('');
    const { pokedex, setData, setType } = useContext(PokeContext);
    const [loading, setLoading] = useState(false);
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
                        handleSearch(text, setText, pokedex, setData, setType, setError, loading, setLoading);
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

// Cleans the user typed info in the search bar
// if its a number it returns the stringyfied number to fetch directly from PokeApi
// if its a text it turns it to lowercase to normalize it (first layer)
// checks if the input contains any of the keywords in the form map for easier search and (second layer)
// grabs the correct PokeApi version of the name for example gives gmax-pokemon if the user searched gigantamax-pokemon (third layer)

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

    // checks if the first word is listed in the formMap to grab the PokeApi accurate prefix
    const prefix = formMap[words[0]];

    if (prefix) {
        const pokeName = words.slice(1).join('-');
        return `${pokeName}-${prefix}`;
    }

    // Fallbacks
    return words.join('-');
}
// Finds if the pokemon user is searching for already exists in out cache to avoid a redundant fetch
// checks by id and name
function searchLocal(list, criteria) {
    const pokeData = list.find((data) => {
        return data.id == criteria || data.name == criteria;
    })
    return pokeData;
}
// Fetches 1 single pokemon using the fetchSingle function from ApiFetcher.js
// Tries the normal search if not found then it retrys the reversed version of the users input for example if gmax-gengar fails it searches gengar-gmax
async function handleSearch(text, setText, pokedex, setData, setType, setError) {
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
        setError('Please wait while we load the Pokèmon data.');
        try {
            const url = `${GlobalData.apiUrl}/${cleanData}`;
            const pokeData = await fetchSingle(url);
            setError('');
            setData([pokeData]);
        } catch {
            const flipped = cleanData.split('-').reverse().join('-');
            try {
                const pokeData = await fetchSingle(`${GlobalData.apiUrl}/${flipped}`);
                setError('');
                setData([pokeData]);
            } catch {
                setTimeout(() => {
                    setError('');
                }, 2000);
                setError('We couldnt find the requested Pokèmon in the Database.');
            }
        }
    }
}
// Shows the name suggestions to help ease of acces to the pokemon searches
// gets the list containing name of all the pokemon currently fetched and
// checks if it contains the letter user searches limits the search suggestion to 4 for now
// User can click the search suggestion to direcly search up the pokemon without hitting enter or the search button
function RenderSearchUtil({ text, setText, pokedex, setData, setType, setError }) {
    const searches = useMemo(() => genKeyWords(pokedex), [pokedex]);
    const filtered = useMemo(() => {
        if (!text) return [];
        return searches.filter(name => name.startsWith(text.toLowerCase())).slice(0, 4);
    }, [text, searches]);
    return (
        <>
            {filtered.length === 0 ? <div>Searching...</div> : ''}
            {filtered.map(data => (
                <div key={data}
                    onClick={() => {
                        handleSearch(data, setText, pokedex, setData, setType, setError);
                    }}>
                    {data}
                </div>
            )
            )}
        </>
    )
}
