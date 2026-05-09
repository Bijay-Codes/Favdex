import { useContext, useEffect, useState } from "react";
import { favdexStorage } from "../Utility/Favdex";
import { GlobalData } from "../Utility/GlobalData";
import { genRandom } from "../Utility/util-basic";
import { saveToStorage, getItem } from "../Utility/storagehelper";
import { PokeContext } from "./Hooks/PokedexContext";
import '../app.css';

export function RenderFeedingStrip({ data }) {
    const pokemon = data[0];
    const { favdexKey} = GlobalData.favdex;
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
        <>
            <RenderFavdexElem pokemon={pokemon} progress={prog} />
            <div className="h-6 text-center">{error ? error : ''}</div>
            <button
                className="bg-(--bg-surface) px-3 rounded hover:bg-(--primary-variant) transition-all 3s active:translate(0)"
                onClick={() => {
                    const updatedProg = feedBerry(pokemon, berry, setBerry, setError);
                    if (updatedProg) setProg([...updatedProg]);
                }}>Feed({berry})</button>
        </>
    );
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

    if (checkCrossed(milestones[0])) return `Congratulations on Reaching 25 Friendship with your ${poke.name}`;
    if (checkCrossed(milestones[1])) return `Milestone Achieved: Halfway there with your Buddy ${poke.name}`;
    if (checkCrossed(milestones[2])) return `Milestone Achieved: ${freindship}% there with your Buddy ${poke.name}`;
    if (checkCrossed(milestones[3])) return `You are Almost there keep going, ${poke.name}!`;
    if (checkCrossed(milestones[4])) {
        if (!(updated.pokemon.includes(poke.id)) && updated.pokemon.length < 60) {
            updated.pokemon.push(poke.id);
            saveToStorage(updated, favdexKey);
        }
        return `You Have Successfully Added ${poke.name} to your Favdex.`;
    }
    return;
}

export function RenderBerry({ count }) {
    return (
        <div className="berry-strip pr-1">
            <img className="w-6 h-6" src="./sitrus-berry.png" alt="berry" />
            <span className="ml-1 text-(--text-inverse)">{count}</span>
        </div>
    );
}

export function RenderFavdexElem({ pokemon, progress }) {
    if (!pokemon) return null;

    let poke = progress.find(data => data.id === pokemon.id) || { freindship: 0 };
    let percent = poke.freindship <= 100 ? poke.freindship : 100;

    return (
        <div className="h-6 w-full bg-white outline-2 outline-blue-700 relative overflow-hidden rounded-sm">
            <div
                className={`${percent < 25 ? 'bg-red-300'
                    : percent < 50 ? 'bg-yellow-300'
                        : percent < 75 ? 'bg-green-300'
                            : percent < 100 ? 'bg-green-500'
                                : 'bg-green-600'
                    } h-full transition-all duration-500`}
                style={{ width: `${Math.max(percent, 1)}%` }}
            />
            <span className="absolute inset-0 flex justify-center items-center text-xl text-(--text-main)">
                {poke.freindship <= 100 ? percent + '%' : poke.freindship + ' pts'}
            </span>
        </div>
    );
}