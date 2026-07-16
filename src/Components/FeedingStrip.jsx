import { useContext, useState } from "react";
import { favdexStorage } from "../Utility/Favdex";
import { GlobalData } from "../Utility/GlobalData";
import { genRandom } from "../Utility/util-basic";
import { saveToStorage, getItem } from "../Utility/storagehelper";
import { PokeContext } from "./Hooks/PokedexContext";
import '../app.css';
import '../ComponentCSS/Header.css';

// This page provides components for the feeding progress bar (with feed button),
//  component to show berry count in the navbar


/* The functtion below get the modal data which is selected (can be taken from pokecontext too)
it first sets state for the progress bar which it finds from localstorage then on click the progress updates
if the progress hits 100 then a function adds that pokemon to favdex and shows milestones messages */
export function RenderFeedingStrip({ data }) {
    const pokemon = data[0];
    const { favdexKey } = GlobalData.favdex;
    const { berry, setBerry, error, setError } = useContext(PokeContext);
    const favdex = getItem(favdexKey) || favdexStorage;
    const [prog, setProg] = useState(() => {
        const currentData = getItem(favdexKey);
        return currentData?.progress || favdex.progress;
    });
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full lg:w-1/2 select-none flex flex-col items-center gap-2">
                {/* Progress bar */}
                <RenderFavdexElem pokemon={pokemon} progress={prog} />

                {/* Message/milestone */}
                <div className={`text-center fixed top-1/2 text-[clamp(1rem,1.2vw,1.5rem)]
                 font-bold secondary-font text-emerald-300 m-auto
                 bg-(--bg-overlay) border p-6 ${error ? 'opacity-100' : 'opacity-0'}`}>
                    {error}
                </div>
                {/* Feed button to show current berry and increase progress */}
                <button
                    className={`m-3 px-6 py-1 lg:px-10 text-lg lg:text-xl rounded-lg border-2 lg:border-4 border-(--border) bg-(--accent-cta)
                    ${berry === 0 ? 'opacity-60' : 'opacity-100'}
                    text-(--text-primary) hover:border-(--border-white) primary-font inline-flex justify-center items-center
                    transition-all duration-200 ease-in active:opacity-40 tracking-wide whitespace-nowrap`}
                    onClick={() => {
                        if (favdex.pokemon.length <= GlobalData.favdex.favdexLimit) {
                            const updatedProg = feedBerry(pokemon, berry, setBerry, setError);
                            if (updatedProg) setProg([...updatedProg]);
                        }
                    }
                    }>
                    {berry === 0 ? 'Feed' : `Feed [ ${berry} ]`}
                </button>
            </div>
        </div>
    )
}
// Handles berry feeding logic and deducts berry on feed/click shows milestone on message
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
// checks the favdex to find if the pokemon being fed has been fed before and has progress
function updateProgressList(pokemon, updated) {
    const { min, max } = GlobalData.favdex.randomPoints;
    const progress = updated.progress;
    const id = pokemon.id;
    const isFound = progress.find((poke) => poke.id === id);
    const added = genRandom(min, max);

    if (isFound) {
        isFound.friendship += added;
    } else {
        progress.push({ id: id, friendship: added });
    }
    return { progress, added };
}
// checks if a certain milestone has been achieved and returns message only 1 time when the milestone was acieved per pokemon
function checkMilestones(poke, updated, added) {
    const { milestones, favdexKey } = GlobalData.favdex;
    const entry = updated.progress.find(data => data.id === poke.id);
    const friendship = entry?.friendship;

    if (!friendship) return;

    const checkCrossed = (milestone) =>
        friendship >= milestone && (friendship - added) < milestone;

    if (checkCrossed(milestones[0])) {
        return `Congratulations on Reaching 25 Friendship with your ${poke.name}`;
    }
    else if (checkCrossed(milestones[1])) {
        return `Milestone Achieved: Halfway there with your Buddy ${poke.name}`;
    }
    else if (checkCrossed(milestones[2])) {
        return `Milestone Achieved: ${friendship}% there with your Buddy ${poke.name}`;
    }
    else if (checkCrossed(milestones[3])) {
        return `You are Almost there keep going, ${poke.name}!`;
    }
    else if (checkCrossed(milestones[4])) {
        if (!(updated.pokemon.includes(poke.id)) && updated.pokemon.length < GlobalData.favdex.favdexLimit) {
            updated.pokemon.push(poke.id);
            saveToStorage(updated, favdexKey);
        }
        return `You Have Successfully Added࠷ ${poke.name} to your Favdex.`;
    }
    else if (checkCrossed(150)) {
        return 'The Pokemon is already in your Favdex';
    }
    else if (checkCrossed(300)) {
        return `Unmoved Love for the Pokemon࠷ ${poke.name} `;
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
// renders current berry on the navbar by reading state named berry (gets the state from the header)
export function RenderBerry({ count }) {
    return (
        <div className="[grid-area:berry] items-center flex ml-auto mr-2 text-xl lg:text-2xl">
            <img className="w-8 aspect-square" src="./berry.webp" alt="berry" />
            <span className="ml-1 text-(--text-inverse)">{count}</span>
        </div>
    );
}
// The actual progress bar that randomly increases per click and shows progress if pokemon already had progress
function RenderFavdexElem({ pokemon, progress }) {
    if (!pokemon) return null;

    let poke = progress.find(data => data.id === pokemon.id) || { friendship: 0 };
    let percent = poke.friendship <= 100 ? poke.friendship : 100;

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
                {poke.friendship <= 100 ? percent + '%' : poke.friendship + ' pts'}
            </span>
        </div>
    );
}