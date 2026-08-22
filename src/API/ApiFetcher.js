import { GlobalData } from "../Utility/GlobalData";
import { saveToStorage, getItem } from "../Utility/storagehelper";

// offset is the starting point from which pokeapi is to send us data
// retry is the times the fetch will try again if the previous request was not successfull for any reason

// basically the flow is, user or we call this function with the relavant data it fetches the url given
//  => then it checks if the request was successfull or not if it didnt we schedule another fetch request
//  => this repeats till either the request succeeds or just retry attempts run out

// inside it, since pokeapi has layered and object nested path where the data we want lives we have to fetch 
//  => 2 times 
//       first time we fetch we get the name, his species endpoint (link) and total pokemon in existence in pokeapi database
//  => we need total pokemon in existence too so that we can remove the loading cards from homepage
//  => second time we fetch we get the relevant data like stats name species etc out of which i didnt need stats
//  => so i have a format function that takes full pokemon object and retruns only the relevant feilds

//     as the function is in its first fetch we dont need to wait for each species endpoint to respond before fetching other,
// =>  just use promise.all to only return once all promises resolve

//  the issue with my previous version, 
// i was using promise.all which discards all the fetched data the moment 1 of the promise is not successfull
//  then the retry happens from scratch discarding the succeeded or pending promised which is not whats optimal

//  what can be changed => now using promise.allSettled this one retruns the promises that were successfull and failed separately
//      => why im not using it? because using it means breaking the chain of fetches
//      currently we return the offset we can use for new fetch on a successfull fetch but if we get incomplete data
//      the offset will be inconsistent since i force the number of pokemon that can be fetched to be fixed from globalData

//      what i can do but not doing => i can surely refetch only the failed ones in the same codeblock and finally retrun 
//      the whole data using the logic but as i can see this function is doing way too many jobs
//      i think implementing it will only add more burden in debugging this

//      all this is happening due to no proper planning and edge case thinking i will make sure to remember this lesson
export async function fetchPokeApi(limit = GlobalData.apiLimit, retry = 3, offset = 0, setError) {
    const apiUrl = GlobalData.apiUrl;
    try {
        const rawData = await fetch(apiUrl + '?limit=' + limit + '&offset=' + offset);
        const fetchData = await rawData.json();
        const totalData = await Promise.all(fetchData.results.map(async link => {
            let pokemon = await fetch(link.url).then(response => response.json());
            const speciesData = await fetch(pokemon.species?.url).then(response => response.json());
            pokemon.speciesData = speciesData;
            return formating(pokemon);
        }));
        saveToStorage(fetchData.count, 'pokedex-limit');
        return [totalData, offset + GlobalData.apiLimit, fetchData.count]
    } catch {
        retry--;
        if (retry > 0) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            return fetchPokeApi(limit = GlobalData.apiLimit, retry, offset, setError);
        } else {
            setTimeout(() => {
                setError('');
            }, 3000);
            setError("Something Went Wrong! Please Check your Internet Connection.");
        }
    }
}

export async function fetchSingle(url, setError) {
    const rawData = await fetch(url);
    if (!rawData.ok && setError) {
        setTimeout(() => {
            setError('');
        }, 2000);
        setError('The Requested Pokemon Data Does not Exist in the Database.');
    };
    const realData = await rawData.json();
    const species = await fetch(realData.species.url).then(response => response.json());
    realData.speciesData = species;

    return formating(realData);
}

function formating(data) {
    return {
        orgId: data.speciesData.id,
        id: data.id,
        name: data.name,
        types: data.types.map(tArr => tArr.type.name),
        abilities: data.abilities.map(aArr => (
            {
                name: aArr.ability.name,
                url: aArr.ability.url,
                is_hidden: aArr.is_hidden
            }
        )),
        sprite: {
            shinySprite: getSpriteUrl(data, 'shiny'),

            frontSprite: getSpriteUrl(data, 'base'),
        },
        height: (data.height * 0.328).toFixed(2),
        weight: (data.weight / 10).toFixed(2),
        cry: data.cries.latest || null,
        stats: {
            hp: data.stats.find(s => s.stat.name === 'hp')?.base_stat ?? 0,
            attack: data.stats.find(s => s.stat.name === 'attack')?.base_stat ?? 0,
            defense: data.stats.find(s => s.stat.name === 'defense')?.base_stat ?? 0,
            sp_atk: data.stats.find(s => s.stat.name === 'special-attack')?.base_stat ?? 0,
            sp_def: data.stats.find(s => s.stat.name === 'special-defense')?.base_stat ?? 0,
            speed: data.stats.find(s => s.stat.name === 'speed')?.base_stat ?? 0,
        },
        base_experience: data.base_experience ?? 0,
        is_baby: data.speciesData.is_baby ?? null,
        growth_rate: data.speciesData.growth_rate?.name ?? null,
        is_legendary: data.speciesData.is_legendary ?? false,
        is_mythical: data.speciesData.is_mythical ?? false,
        egg_groups: data.speciesData.egg_groups.map(g => g.name) ?? [],
        habitat: data.speciesData.habitat?.name ?? null,
        capture_rate: data.speciesData.capture_rate ?? null,
        base_happiness: data.speciesData.base_happiness ?? null,
        gender_rate: data.speciesData.gender_rate ?? null,
        pokedexEntry: data.speciesData.flavor_text_entries.find(e => e.language.name === 'en')?.flavor_text ?? null
    }
}

function getSpriteUrl(data, type) {
    const style = getItem(GlobalData.imgStyleKey) || 'official';
    if (type === 'shiny') {
        const shinyMap = {
            official: data.sprites.other["official-artwork"].front_shiny ||
                data.sprites.other["home"].front_shiny ||
                data.sprites.front_shiny,
            modern: data.sprites.other["official-artwork"].front_shiny ||
                data.sprites.front_shiny, // no dreamworld shiny exists
            pixel: data.sprites.front_shiny ||
                data.sprites.other["official-artwork"].front_shiny,
        };
        return shinyMap[style] || shinyMap.official;
    } else {
        const spriteMap = {
            official: data.sprites.other["official-artwork"].front_default ||
                data.sprites.other["home"].front_default ||
                data.sprites.front_default,
            modern: data.sprites.other.dream_world.front_default ||
                data.sprites.other["official-artwork"].front_default ||
                data.sprites.front_default,
            pixel: data.sprites.front_default ||
                data.sprites.other["official-artwork"].front_default,
        };

        return spriteMap[style] || spriteMap.official;
    }

}