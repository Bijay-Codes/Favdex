import { GlobalData } from "../Utility/GlobalData";
import { saveToStorage, getItem } from "../Utility/storagehelper";
export async function fetchPokeApi(limit = GlobalData.apiLimit, retry = 3, offset = 0) {
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
    } catch (e) {
        retry--;
        console.error('Fetch crashed:', e);
        if (retry > 0) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            return fetchPokeApi(limit = GlobalData.apiLimit, retry, offset);
        } else {
            alert('Something went wrong, Please Check your Internet connection');
        }
    }
}

export async function fetchSingle(url) {
    const rawData = await fetch(url);
    if (!rawData.ok) throw new Error('Not Found');
    const realData = await rawData.json();
    const species = await fetch(realData.species.url).then(response => response.json());
    realData.speciesData = species;

    return formating(realData);
}

function formating(data) {
    return {
        id: data.id,
        name: data.name,
        types: data.types.map(tArr => tArr.type.name),
        abilities: data.abilities.map(aArr => (
            {
                name: aArr.ability.name,
                url:aArr.ability.url,
                is_hidden: String(aArr.is_hidden)
            }
        )),
        sprite: {
            shinySprite: data.sprites.other["official-artwork"].front_shiny ||
                data.sprites.other["home"].front_shiny ||
                data.sprites.front_shiny ||
                null,

            frontSprite: data.sprites.other["official-artwork"].front_default ||
                data.sprites.other["home"].front_default ||
                data.sprites.front_default ||
                null,
        },
        height: (data.height * 0.328).toFixed(2),
        weight: (data.weight / 10).toFixed(2),
        cry: data.cries.latest || null,

        habitat: data.speciesData.habitat?.name ?? null,
        capture_rate: data.speciesData.capture_rate ?? null,
        base_happiness: data.speciesData.base_happiness ?? null,
        gender_rate: data.speciesData.gender_rate ?? null,
        pokedexEntry: data.speciesData.flavor_text_entries.find(e => e.language.name === 'en')?.flavor_text ?? null
    }

}