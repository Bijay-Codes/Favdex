import { useContext, useEffect, useState } from "react";
import { favdexStorage } from "../Utility/Favdex";
import { GlobalData } from "../Utility/GlobalData";
import { genRandom } from "../Utility/util-basic";
import { saveToStorage, getItem } from "../Utility/storagehelper";
import { PokeContext } from "./Hooks/PokedexContext";
import '../app.css';
import '../ComponentCSS/Header.css'
export function RenderFeedingStrip({ data }) {
    const pokemon = data[0];
    const { favdexKey } = GlobalData.favdex;
    const { berry, setBerry, error, setError } = useContext(PokeContext);
    const [prog, setProg] = useState(getItem(favdexKey)?.progress || favdexStorage.progress);

    useEffect(() => {
        const { favdexKey } = GlobalData.favdex;
        const currentData = getItem(favdexKey);
        if (currentData) {
            setProg(currentData.progress);
        }
    }, []);
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full lg:w-1/2 select-none flex flex-col items-center gap-2">
                <RenderFavdexElem pokemon={pokemon} progress={prog} />
                <div className={`text-center fixed top-1/2 text-[clamp(1rem,1.2vw,1.5rem)]
                 font-bold secondary-font text-emerald-300
                 bg-(--bg-overlay) border p-6 ${error?'opacity-100':'opacity-0'}`}>
                    {error}
                </div>
                <button
                    className="mt-2 px-2 py-1.5 lg:px-4 lg:text-xl rounded-lg border-2 lg:border-4 border-(--border) bg-(--accent-cta) 
                    text-(--text-primary) hover:border-(--border-white) primary-font 
                    transition-all duration-200 active:opacity-40 text-sm tracking-wide whitespace-nowrap"
                    onClick={() => {
                        const updatedProg = feedBerry(pokemon, berry, setBerry, setError);
                        if (updatedProg) setProg([...updatedProg]);
                    }}
                >
                    Feed ({berry})
                </button>
            </div>

        </div>
    )
}

function feedBerry(pokemon, berry, setBerry, setError) {
    if (berry < 1) return;

    let berrycount = berry - 1;
    setBerry(berrycount);

    const updated = getItem(GlobalData.favdex.favdexKey);
    const { progress, added } = updateProgressList(pokemon, updated);

    updated.berries = berrycount;
    updated.progress = progress;

    const response = checkMilestones(pokemon, updated, added);
    if (response) {
        setError(response);
        setTimeout(() => setError(''), 3000);
    }

    saveToStorage(updated, GlobalData.favdex.favdexKey);
    return progress;
}

function updateProgressList(pokemon, updated) {
    const { min, max } = GlobalData.favdex.randomPoints;
    const progress = updated.progress;
    const id = pokemon.id;
    const isFound = progress.find((poke) => poke.id === id);
    const added = genRandom(min, max);

    if (isFound) {
        isFound.freindship += added;
    } else {
        progress.push({ id: id, name: pokemon.name, freindship: added });
    }
    return { progress, added };
}

function checkMilestones(poke, updated, added) {
    const { milestones, favdexKey } = GlobalData.favdex;
    const entry = updated.progress.find(data => data.id === poke.id);
    const freindship = entry?.freindship;

    if (!freindship) return;

    const checkCrossed = (milestone) =>
        freindship >= milestone && (freindship - added) < milestone;

    if (checkCrossed(milestones[0])) {
        return `Congratulations on Reaching 25 Friendship with your ${poke.name}`;
    }
    else if (checkCrossed(milestones[1])) {
        return `Milestone Achieved: Halfway there with your Buddy ${poke.name}`;
    }
    else if (checkCrossed(milestones[2])) {
        return `Milestone Achieved: ${freindship}% there with your Buddy ${poke.name}`;
    }
    else if (checkCrossed(milestones[3])) {
        return `You are Almost there keep going, ${poke.name}!`;
    }
    else if (checkCrossed(milestones[4])) {
        if (!(updated.pokemon.includes(poke.id)) && updated.pokemon.length < 60) {
            updated.pokemon.push(poke.id);
            saveToStorage(updated, favdexKey);
        }
        return `You Have Successfully Added ${poke.name} to your Favdex.`;
    }
    else if (checkCrossed(150)) {
        return 'The Pokemon is already in your Favdex';
    }
    else if (checkCrossed(300)) {
        return `Unmoved Love for the Pokemon- ${poke.name} `;
    }
    else if (checkCrossed(600)) {
        return 'Keep Going Lets see how long you stick to this pokemon';
    }
    else if (checkCrossed(1000)) {
        return `Your Love for this pokemon is has reached its bounds, i cant keep up anymore. Good luck`;
    } else {
        return;
    }
}

export function RenderBerry({ count }) {
    return (
        <div className="[grid-area:berry] items-center flex ml-auto mr-2 text-xl lg:text-2xl">
            <img className="w-fit-content lg:min-w-[5%] lg:scale-150 aspect-square" src="./sitrus-berry.png" alt="berry" />
            <span className="ml-1 text-(--text-inverse)">{count}</span>
        </div>
    );
}

export function RenderFavdexElem({ pokemon, progress }) {
    if (!pokemon) return null;

    let poke = progress.find(data => data.id === pokemon.id) || { freindship: 0 };
    let percent = poke.freindship <= 100 ? poke.freindship : 100;

    return (
        <div className="h-6 lg:h-8 w-[90%] bg-white outline lg:outline-2 outline-(--accent)
        m-auto
         relative overflow-hidden rounded-sm">
            <div
                className={`${percent < 25 ? 'bg-rose-500'
                    : percent < 50 ? 'bg-amber-400'
                        : percent < 75 ? 'bg-sky-400'
                            : percent < 100 ? 'bg-violet-400'
                                : 'bg-emerald-400'
                    } h-full transition-all duration-500 ease-in-out`}
                style={{ width: `${Math.max(percent, 1)}%` }}
            />
            <span className="text-(--bg-base) absolute inset-0 flex justify-center items-center text-sm lg:text-xl">
                {poke.freindship <= 100 ? percent + '%' : poke.freindship + ' pts'}
            </span>
        </div>
    );
}