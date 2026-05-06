import { useEffect, useRef, useState } from "react"
import { RenderPokemon } from "./Renderer";
import { RenderFavdexElem, RenderFeedingStrip } from "./FeedingStrip";
import { capitalize, genRandom } from "../Utility/util-basic";
export function RenderModal({ data, setData }) {
    const modalRef = useRef(null);
    const closeModal = () => setData(null);
    const [ability, setAbility] = useState([]);
    useEffect(() => {
        if (!data) {
            modalRef.current.close();
            return;
        }
        const pokemon = data[0];
        Promise.all(pokemon.abilities.map(async abilt => {
            const abiltText = await fetch(abilt.url).then(r => r.json());
            return {
                ...abilt,
                text: abiltText.flavor_text_entries.find(
                    entry => entry.language.name === 'en')
                    ?.flavor_text
                    ?? 'Still Mystery'
            }
        }
        )).then(r => {
            setAbility(r)
        })
        if (data) {
            modalRef.current.showModal();
        } else {
            if (modalRef.current?.open) {
                modalRef.current.close();
            }
        }
    }, [data]);

    return (
        <dialog id="pokemon-details"
            className="w-1/1.5"
            ref={modalRef}
            onClick={closeModal}
            onCancel={closeModal}>
            <div onClick={(e) => e.stopPropagation()}
                className="bg-gray-500">
                <button onClick={closeModal}>Close</button>
                {data ? <RenderPokemon pokemon={data[0]} modalview={true} /> : ''}
                {data ? <RenderDetails pokemon={data[0]} ability={ability} /> : ''}
                {data ? <RenderFeedingStrip data={data} /> : ''}
            </div>
        </dialog>
    )
}

function RenderDetails({ pokemon, ability }) {
    return (
        <div>
            <span>BMI:{(pokemon.weight / (pokemon.height ** 2)).toFixed(2)}</span>
            <span>Weight: {pokemon.weight} Kg</span>
            <span>Height: {pokemon.height} Metres</span>
            <div className="flex flex-col gap-1">
                <span>Gender-Rate: {checkGender(pokemon.gender_rate)}</span>
                <span>Nature: {checkSocial(pokemon.base_happiness)}</span>
                <span>Personality: {checkBehavior(pokemon.capture_rate)}</span>
                <span>Habitat: {checkHabitat(pokemon.habitat)}</span>
            </div>
            <div>
                {ability.map(a => {
                    return <div key={a.name}>
                        <span className="m-2">{capitalize(a.name)}</span>
                        <span>Hidden-{capitalize(a.is_hidden)}</span>
                        <div>{a.text}</div>
                    </div>
                })}
            </div>

            <div>{pokemon.pokedexEntry}</div>
        </div>
    )
}

function checkSocial(base_happiness) {
    if (base_happiness < 50) {
        return 'Introverted- So Shy/Pround to Distance itself with others leading to its grumpy mood.';
    } else if (base_happiness < 110) {
        return 'Ambivert- Initially Distant but can be a good company if given care.';
    } else {
        return 'Extrovert- So Social that it is already in your Heart, Pure Mascot XD'
    }
}

function checkBehavior(catchrate) {
    if (catchrate < 5) {
        return 'Did you Bring a Master Ball? ±0.4% Catchrate... Good Luck you will need it .'
    }
    if (catchrate < 30) {
        return 'Egoistic- Too Proud of itself to go in a Companionship/Obey with humans. Did you bring a Ultra Ball?';
    } else if (catchrate < 150) {
        return 'Approachable- Mid Catchrate  😐'
    } else {
        return 'Humble- No ego, Magikarp is that you? Nevermind into the wild you go.'
    }
}

function checkHabitat(habitat) {
    if (!habitat) {
        return 'Unknown Georaphical Area ⯑'
    } else if (habitat === 'cave') {
        return 'Cave Dweller 🕳️, Poor Eyesight Probably? Here, take mine 👓. Their eyesights are sensitive idiot dont say that';
    } else if (habitat === 'forest') {
        return 'Forest monk 🌳, Away from humans hand Good. Yeah i Agree';
    } else if (habitat === 'grassland') {
        return ' 🌾 Nothing feels like a peacefull grassland to build my home... oh wait this isnt Minecraft';
    } else if (habitat === 'mountain') {
        return ' ⛰️ Mountains hmm nice place to be just make sure not to fall off that cliff while being chased or chasing someone, IS THAT A GOLEM COMING MY WAY!! CUT! CUT! CUT! GOO SNORLAX! GOOO Save meee!';
    } else if (habitat === 'rare') {
        return ' ✨ Its An honour to see this pokemon, Oh wait... what is this Rare habitat they speak of? like heaven or something?';
    } else if (habitat === 'rough-terrain') {
        return ' 🪨 Are we in Rough terrains yet? youre already live Idiot, So... why do i see a Rhydon and Onix fighting each other? Get ME OUTTA HEREEE';
    } else if (habitat === 'sea') {
        return ' 🌊 Sea- Okay so Peacefull here,No wonder Water type pokemons so are cool and chill, I wish i could stay here. Your Wish has been granted by our Jirachi. Whatt, WAIT WAIT WAIT NOOOO why a magikarp';
    } else if (habitat === 'urban') {
        return ' 🏡 Isnt this my hometown why are we here? Oh some pokemon like to stay close to humans, or clould be that we chose to stay here because pokemon live here well whatever. CUT! i said CUT! Are you DEAF Stop petting that Meowth';
    } else if (habitat === 'waters-edge') {
        return 'Waters Edge- Why we here now? Oh look a cute duck did you bring a bread pack?, Thats a psyduck';
    } else if (habitat === 'wasteland') {
        return 'Wasteland- This is a very remote place... Okay were out, Not interesting at all. Is that a decaying chari bzzt bzzt and its ki bzzz?';
    } else {
        return ' 📡 We are trying our best to reach there Please stand by';
    }
}

function checkGender(genderrate) {
    if (genderrate === null || genderrate === undefined) {
        return 'No Data Provided! Reseach Mode... ⯑';
    } else if (genderrate === -1) {
        return '⚧️ Genderless (No comments)';
    } else if (genderrate === 0) {
        return '♂️ Males Only Species (How do they continue to exist i wonder)';
    } else if (genderrate === 1) {
        return '♀️ 12.5% Chance for Female to be born, Must be harsh... Fighting for love';
    } else if (genderrate === 4) {
        return '⚖️ Equal Chance- 50/50';
    } else if (genderrate === 8) {
        return '♀️ Always Female (How do they continue to exist i wonder)'
    } else {
        const genChance = (genderrate / 8) * 100;
        return genChance + ' ♀️ Female chance';
    }
}

