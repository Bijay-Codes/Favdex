import { GlobalData } from "../Utility/GlobalData";
import { saveToStorage, getItem } from "../Utility/storagehelper";
export async function fetchPokeApi(limit = GlobalData.apiLimit, retry = 3, offset = 0) {
    const apiUrl = GlobalData.apiUrl;
    try {
        const rawData = await fetch(apiUrl + '?limit=' + limit + '&offset=' + offset);
        const fetchData = await rawData.json();
        const totalData = await Promise.all(fetchData.results.map(link =>
            fetch(link.url).then(response => response.json())
        ));
        const cutDownData = totalData.map(data => {
            return {
                id: data.id,
                name: data.name,
                types: data.types.map(tArr => tArr.type.name),
                abilities: data.abilities.map(aArr => (
                    {
                        name: aArr.ability.name,
                        is_hidden: aArr.is_hidden
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
                height: data.height,
                weight: data.weight,
                cry: data.cries.latest,
                habitatUrl: data.species.url
            }
        });
        saveToStorage(fetchData.count, 'pokedex-limit')
        return [cutDownData, offset + GlobalData.apiLimit, fetchData.count]
    } catch (e) {
        retry--;
        if (retry > 0) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            return fetchPokeApi(limit = GlobalData.apiLimit, retry, offset);
        } else {
            console.log('Failed to Fetch', e);

        }
    }
}

