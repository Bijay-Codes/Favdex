import { useContext, useEffect, useRef, useState } from "react"
import { RenderPokemon } from "./Renderer";
import { RenderFeedingStrip } from "./FeedingStrip";
import { capitalize } from "../Utility/util-basic";
import { PokeContext } from "./Hooks/PokedexContext";
export function RenderModal({ data, setData }) {
    const modalRef = useRef(null);
    const closeModal = () => setData(null);
    const [ability, setAbility] = useState([]);
    const { error, setError } = useContext(PokeContext);

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
                    ?.flavor_text ?? 'Still Mystery'
            }
        })).then(r => setAbility(r));

        if (data) modalRef.current.showModal();
        else if (modalRef.current?.open) modalRef.current.close();
    }, [data]);

    return (
        <>
            <style>{`#pokemon-modal::backdrop { backdrop-filter: blur(40px); }`}</style>
            <dialog
                id="pokemon-modal"
                className="w-[90%] md:w-[70%] lg:w-[55%] max-h-[90dvh] overflow-y-auto
                           text-(--text-secondary) bg-(--bg-overlay)/80
                           border-2 border-(--border-white) p-3 m-auto rounded-2xl"
                ref={modalRef}
                onClick={closeModal}
                onCancel={closeModal}
                onKeyDown={(e) => e.key === 'Escape' && closeModal()}
            >
                <div
                    className="flex flex-col items-center gap-4 w-full relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        className="absolute right-0 top-0 text-red-400 text-xs lg:text-3xl lg:p-2 "
                        onClick={closeModal}
                    >Close <span>𝕩</span></button>

                    <div className="w-full p-4 rounded-2xl flex flex-col items-center justify-center">
                        {data && <RenderPokemon pokemon={data[0]} modalview={true} />}
                    </div>
                    <div className="bg-(--bg-overlay) p-3 rounded-4xl">
                        {data && <RenderDetails pokemon={data[0]} ability={ability} />}
                        <div className="m-auto flex items-center justify-center">
                            {data && <RenderFeedingStrip data={data} />}
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    )
}

function RenderDetails({ pokemon, ability }) {
    return (
        <div className="w-fit flex flex-col justify-center items-center gap-3 px-2 pb-4">
            <div className="flex flex-wrap justify-center w-fit m-auto
             whitespace-nowrap gap-2 lg:gap-12 lg:p-6 lg:rounded-4xl
             bg-(--bg-overlay) border-2 border-(--border) rounded-xl p-2">
                <span className="text-(--text-secondary) text-xs lg:text-3xl">Height:
                    <span className="text-(--text-muted) hover:text-(--text-primary) text-sm lg:text-4xl
                     transition-all duration-200 ease-in-out">{pokemon.height} Feet</span>
                </span>
                <span className="text-(--text-secondary) text-xs lg:text-3xl">Weight:
                    <span className="text-(--text-muted) hover:text-(--text-primary) text-sm lg:text-4xl
                    transition-all duration-200 ease-in-out">{pokemon.weight} KG</span>
                </span>
            </div>

            <div className="border-2 border-(--border) bg-(--bg-overlay) m-auto w-fit
             rounded-xl px-2 text-(--text-muted) hover:text-(--text-primary) lg:p-12 lg:rounded-4xl
             transition-all duration-400 ease-in-out">
                {[
                    { label: 'Gender Rate', value: checkGender(pokemon.gender_rate) },
                    { label: 'Nature', value: checkSocial(pokemon.base_happiness) },
                    { label: 'Personality', value: checkBehavior(pokemon.capture_rate) },
                    { label: 'Habitat', value: checkHabitat(pokemon.habitat) },
                ].map(({ label, value }) => (
                    <div key={label} className="">
                        <span className="text-(--text-secondary) text-xs lg:text-2xl">{label}:</span>
                        <span className="text-sm lg:text-3xl">{value}</span>
                    </div>
                ))}
            </div>

            <div className="flex flex-col justify-center items-center text-xs
             gap-2">
                {ability.map(a => (
                    <div key={a.name}
                        className="bg-(--bg-overlay) border-2 lg:border-4 lg:rounded-2xl border-(--border)
                        rounded-xl p-4">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-(--text-secondary) tracking-widest lg:text-4xl">{capitalize(a.name)}:</span>
                            <span className={`text-xs lg:text-4xl ${a.is_hidden
                                ? 'text-red-400'
                                : 'text-green-400'
                                }`}>
                                {a.is_hidden ? '(Hidden)' : '(Active)'}
                            </span>
                        </div>
                        <p className="text-xs text-(--text-muted) lg:text-3xl
                         hover:text-(--text-primary)
                         transition-all duration-200 ease-in-out leading-relaxed">{a.text}</p>
                    </div>
                ))}
            </div>

            <div className="border-l-2 border-(--accent) p-4 lg:p-6 bg-(--bg-overlay) rounded-r-xl">
                <p className="text-xs lg:text-2xl tracking-widest uppercase text-(--accent) mb-1.5">Pokédex Entry</p>
                <p className="text-xs lg:text-4xl text-(--text-muted) leading-relaxed hover:text-(--text-primary)
                 transition-all duration-400 ease-in-out">{pokemon.pokedexEntry}</p>
            </div>
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

