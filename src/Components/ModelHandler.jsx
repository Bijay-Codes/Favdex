import { useContext, useEffect, useRef, useState } from "react"
import { RenderPokemon } from "./Renderer";
import { RenderFeedingStrip } from "./FeedingStrip";
import { capitalize, genRandom } from "../Utility/util-basic";
import { PokeContext } from "./Hooks/PokedexContext";
import { habitat_texts } from "../FlavourTexts/Habitat";
import { catchrate_texts } from "../FlavourTexts/catchrate";
import { happiness_texts } from "../FlavourTexts/happiness";
import { gender_texts } from "../FlavourTexts/GenderRate";

/* Includes components Responsible for showing modal and
 populating it with custom data via Various functions
 located at the very bottom bundled in RenderDetails component */

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
        //     const timerId = setTimeout(() => {
        //     if (modalRef.current && !modalRef.current.open) {
        //         modalRef.current.showModal();
        //     }
        // }, 0);
        if (data) {
            modalRef.current.showModal();
        } else if (modalRef.current?.open) modalRef.current.close();
    }, [data]);

    return (
        <>
            <style>{`#pokemon-modal::backdrop { backdrop-filter: blur(40px); }`}</style>
            <dialog
                autoFocus
                id="pokemon-modal"
                className="w-full md:w-[70%] max-h-[90vh] overflow-y-auto
                           text-(--text-secondary) bg-(--bg-overlay)/80
                           border-2 border-(--border-white) p-3 m-auto rounded-2xl "
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
                        className="absolute right-0 top-0 text-red-400 text-sm lg:text-2xl lg:p-2 "
                        onClick={closeModal}
                    >Close <span>𝕩</span></button>

                    <div className="w-full p-4 rounded-2xl flex flex-col items-center justify-center">
                        {data && <RenderPokemon pokemon={data[0]} modalview={true} />}
                    </div>
                    {/* Progress bar and feed button coming through feedingStrip.jsx */}
                    <div className="bg-(--bg-overlay) w-fit py-4 rounded-2xl">
                        {data && <RenderFeedingStrip data={data} />}
                        {/* Local component rendering details about pokemon like gender rates ,habitat and pokedex entry */}
                        <div className="m-auto flex items-center justify-center">
                            {data && <RenderDetails pokemon={data[0]} ability={ability} />}
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
            <div className="flex flex-wrap justify-center m-auto p-2
             whitespace-nowrap gap-2 lg:gap-12 lg:p-6 lg:rounded-2xl
             bg-(--bg-overlay) border border-(--border) rounded-xl">
                <span className="text-(--text-secondary) text-sm lg:text-xl">Height:
                    <span className="text-(--text-muted) hover:text-(--text-primary) text-sm lg:text-2xl
                     transition-all duration-200 ease-in-out">{pokemon.height} Feet</span>
                </span>
                <span className="text-(--text-secondary) text-sm lg:text-xl">Weight:
                    <span className="text-(--text-muted) hover:text-(--text-primary) text-sm lg:text-2xl
                    transition-all duration-200 ease-in-out">{pokemon.weight} KG</span>
                </span>
            </div>

            <div className="border-2 border-(--border) bg-(--bg-overlay) m-auto w-fit
             rounded-xl px-2 text-(--text-muted) hover:text-(--text-primary) lg:p-12 lg:rounded-2xl
             transition-all duration-400 ease-in-out">
                {[
                    { label: 'Gender Rate', value: checkGender(pokemon.gender_rate) },
                    { label: 'Base Happiness', value: checkSocial(pokemon.base_happiness) },
                    { label: 'Catchrate', value: checkBehavior(pokemon.capture_rate) },
                    { label: 'Habitat', value: checkHabitat(pokemon.habitat) },
                ].map(({ label, value }) => (
                    <div key={label} className="">
                        <span className="text-(--text-secondary) text-xs lg:text-xl">{label}:</span>
                        <span className="text-sm lg:text-2xl">{value}</span>
                    </div>
                ))}
            </div>

            <div className="flex flex-col justify-center items-center
             gap-2">
                {ability.map(a => (
                    <div key={a.name}
                        className="bg-(--bg-overlay) border-2 lg:border-4 lg:rounded-2xl border-(--border)
                        rounded-xl p-4">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-(--text-secondary) tracking-widest lg:text-xl">{capitalize(a.name)}:</span>
                            <span className={`text-sm lg:text-xl ${a.is_hidden
                                ? 'text-red-400'
                                : 'text-green-400'
                                }`}>
                                {a.is_hidden ? '(Hidden)' : '(Active)'}
                            </span>
                        </div>
                        <p className="text-sm text-(--text-muted) lg:text-2xl
                         hover:text-(--text-primary)
                         transition-all duration-200 ease-in-out leading-relaxed">{a.text}</p>
                    </div>
                ))}
            </div>

            <div className="border-l-2 border-(--accent) p-4 lg:p-6 bg-(--bg-overlay) rounded-r-xl">
                <p className="text-sm lg:text-xl tracking-widest uppercase text-(--accent) mb-1.5">Pokédex Entry</p>
                <p className="text-sm lg:text-xl text-(--text-muted) leading-relaxed hover:text-(--text-primary)
                 transition-all duration-400 ease-in-out">{pokemon.pokedexEntry}</p>
            </div>
        </div>
    )
}
function checkSocial(base_happiness) {
    if (base_happiness < 50) {
        return `Low࠷ ${happiness_texts.low[genRandom(0, happiness_texts.low.length - 1)]}`;
    } else if (base_happiness < 110) {
        return `Average࠷ ${happiness_texts.mid[genRandom(0, happiness_texts.mid.length - 1)]}`;
    } else {
        return `High࠷ ${happiness_texts.high[genRandom(0, happiness_texts.high.length - 1)]}`
    }
}

function checkBehavior(catchrate) {
    if (catchrate < 5) {
        return `Very Hard to catch࠷ ${catchrate_texts.veryLow[genRandom(0, catchrate_texts.veryLow.length - 1)]}`;
    }
    if (catchrate < 30) {
        return `Not very Easy to catch࠷ ${catchrate_texts.lowMid[genRandom(0, catchrate_texts.lowMid.length - 1)]}`;
    }
    if (catchrate < 150) {
        return `Easy to catch࠷ ${catchrate_texts.high[genRandom(0, catchrate_texts.high.length - 1)]}`;
    }
    return `Very Easy to catch࠷ ${catchrate_texts.veryHigh[genRandom(0, catchrate_texts.veryHigh.length - 1)]}`;
}
function checkHabitat(habitat) {
    if (!habitat) {
        return 'Unknown Geographical Area ⯑'
    } else if (habitat === 'cave') {
        return `Caves࠷ ${habitat_texts.cave[genRandom(0, habitat_texts.cave.length - 1)]}`;
    } else if (habitat === 'forest') {
        return `Forests࠷ ${habitat_texts.forest[genRandom(0, habitat_texts.forest.length - 1)]}`;
    } else if (habitat === 'grassland') {
        return `Grasslands࠷ ${habitat_texts.grassland[genRandom(0, habitat_texts.grassland.length - 1)]}`;
    } else if (habitat === 'mountain') {
        return `Mountains࠷ ${habitat_texts.mountain[genRandom(0, habitat_texts.mountain.length - 1)]}`;
    } else if (habitat === 'rare') {
        return `Rare࠷ ${habitat_texts.rare[genRandom(0, habitat_texts.rare.length - 1)]}`;
    } else if (habitat === 'rough-terrain') {
        return `Rough terrain࠷ ${habitat_texts.rough_terrain[genRandom(0, habitat_texts.rough_terrain.length - 1)]}`;
    } else if (habitat === 'sea') {
        return `Sea࠷ ${habitat_texts.sea[genRandom(0, habitat_texts.sea.length - 1)]}`;
    } else if (habitat === 'urban') {
        return `Urban࠷ ${habitat_texts.urban[genRandom(0, habitat_texts.urban.length - 1)]}`;
    } else if (habitat === 'waters-edge') {
        return `Waters Edge࠷ ${habitat_texts.waters_edge[genRandom(0, habitat_texts.waters_edge.length - 1)]}`;
    }
}

function checkGender(genderrate) {
    if (genderrate === null || genderrate === undefined) {
        return 'No Data Provided! Reseach Mode... ⯑';
    } else if (genderrate === -1) {
        return 'Genderless (No comments)';
    } else if (genderrate === 0) {
        return `♂️ Males Only Species࠷ ${gender_texts.maleOnly[genRandom(0, gender_texts.maleOnly.length - 1)]}`;
    } else if (genderrate === 1) {
        return `♀️ 12.5% Chance for Female to be born࠷ ${gender_texts.mostlyMale[genRandom(0, gender_texts.mostlyMale.length - 1)]}`;
    } else if (genderrate === 4) {
        return `Balanced࠷ ${gender_texts.equal[genRandom(0, gender_texts.equal.length - 1)]}`;
    } else if (genderrate === 8) {
        return `♀️ Female Only Species࠷ ${gender_texts.femaleOnly[genRandom(0, gender_texts.femaleOnly.length - 1)]}`
    } else {
        const genChance = (genderrate / 8) * 100;
        return genChance + '%࠷ ♀️ Female chance';
    }
}

