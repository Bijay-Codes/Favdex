import { useContext, useEffect, useState } from "react";
import { favdexStorage } from "../Utility/Favdex";
import { GlobalData } from "../Utility/GlobalData";
import { genRandom } from "../Utility/util-basic";
import { saveToStorage, getItem } from "../Utility/storagehelper";
import { PokeContext } from "./Hooks/PokedexContext";
export function RenderFeedingStrip({ data }) {
    const pokemon = data[0];
    const { favdexKey, berryDaily } = GlobalData.favdex;
    const { berry, setBerry } = useContext(PokeContext);
    const [prog, setProg] = useState(getItem(favdexKey)?.progress || favdexStorage.progress);
    useEffect(() => {
        Initialize(favdexKey);
        if (!onCooldown()) {
            setBerry(berryDaily);
        } else {
            setBerry(getItem(favdexKey)?.berries ?? 0)
        }
        isExpired(berry, setBerry);
    }, []);
    return (
        <>
            <RenderFavdexElem pokemon={pokemon} progress={prog} />
            <button onClick={() => {
                const updatedProg = feedBerry(pokemon, berry, setBerry);
                setProg([...updatedProg])
            }}>Feed({berry})</button>
        </>
    )
}

function onCooldown() {
    let { favdexKey, cooldown } = GlobalData.favdex;
    cooldown *= 24 * 60 * 60 * 1000;
    const updated = getItem(favdexKey);
    const lastLogin = updated?.lastLogin ?? 0;
    const current = Date.now();
    if (current - lastLogin >= cooldown) {
        updated.lastLogin = Date.now();
        saveToStorage(updated, favdexKey);
        return false;
    } else {
        saveToStorage(updated, favdexKey);
        return true;
    }
}

function isExpired(berry, setBerry) {
    if (!berry || berry === 0) return;
    const current = Date.now();
    const { favdexKey, expiry } = GlobalData.favdex;
    const prev = getItem(favdexKey);
    const cooldown = expiry * 24 * 60 * 60 * 1000;
    if (prev.lastExpiry === null) {
        prev.lastExpiry = Date.now();
        saveToStorage(prev, favdexKey);
    }
    if (current - prev.lastExpiry >= cooldown) {
        setBerry(0);
        const updated = prev;
        updated.berries = 0;
        updated.lastExpiry = Date.now();
        return updateStorage(updated, favdexKey);
    };
};

function feedBerry(pokemon, berry, setBerry) {
    if (berry < 1) return;
    let berrycount = berry; berrycount--;
    setBerry(berrycount);
    const updated = getItem(GlobalData.favdex.favdexKey);
    const { progress, added } = updateProgressList(pokemon, updated);
    updated.berries = berrycount;
    updated.progress = progress;
    const response = checkMilestones(pokemon, updated, added)
    if (response) { alert(response); }
    saveToStorage(updated, GlobalData.favdex.favdexKey);
    return progress;
};

function updateProgressList(pokemon, updated) {
    const { min, max } = GlobalData.favdex.randomPoints;
    const progress = updated.progress;
    const id = pokemon.id;
    const isFound = progress.find((poke) => {
        return poke.id === id;
    })
    const added = genRandom(min, max);
    if (isFound) {
        isFound.freindship += added;
    } else {
        progress.push({ id: id, name: pokemon.name, freindship: added })
    }
    return { progress, added };
}

function updateStorage(data, key) {
    saveToStorage(data, key);
    return getItem(key);
}

function Initialize(key) {
    let favdex = getItem(key);
    if (!favdex) {
        saveToStorage(favdexStorage, key);
        favdex = favdexStorage;
    }
    favdex.progress.forEach(data => {
        if (data.freindship >= 100 &&
            !(favdex.pokemon.includes(data.id))) {
            favdex.pokemon.push(data.id);
            saveToStorage(favdex, key);
        }
    })
}

function checkMilestones(poke, updated, added) {
    const { milestones, favdexKey } = GlobalData.favdex;
    const freindship = updated.progress.find(data => data.id === poke.id)?.freindship;
    if (!freindship) return;

    const checkCrossed = (milestone) =>
        freindship >= milestone
        && (freindship - added) < milestone;

    if (checkCrossed(milestones[0])) {
        return `Congratulations on Reaching 25 Freindship with your ${poke.name}`
    }
    else if (checkCrossed(milestones[1])) {
        return `Milestone Achieved: Halfway there with your Buddy ${poke.name}`
    }
    else if (checkCrossed(milestones[2])) {
        return `Milestone Achieved: ${freindship}% there with your Buddy ${poke.name}`
    }
    else if (checkCrossed(milestones[3])) {
        return `You are Almost there keep going. ${poke.name}`
    }
    else if (checkCrossed(milestones[4])) {

        if (!(updated.pokemon.includes(poke.id))
            && updated.pokemon.length < 60) {
            updated.pokemon.push(poke.id);
            saveToStorage(updated, favdexKey);
        }
        return `You Have Succesfully Added ${poke.name} to you Favdex.`
    }
    else if (checkCrossed(150)) {
        return `You know Its already in your Favdex dont you?`;
    }
    else if (checkCrossed(1000)) {
        return `Unmoved Love for ${poke.name}: Im impressed Keep going.`
    }
    return;
}

export function RenderBerry({ count }) {
    return (
        <div className="image">
            <img className="aspect-square max-w-1/12" src="./sitrus-berry.png" />
            <span>{count}</span>
        </div>
    )
}

export function RenderFavdexElem({ pokemon, progress }) {
    if (!pokemon) return;
    let poke = progress.find(data => data.id === pokemon.id);
    if (!poke) return
    let percent = poke.freindship <= 100 ? poke.freindship : 100
    return (
        <>
            <div className={`w-1/2 bg-white outline-2 outline-blue-700`}>
                <div className={`h-2 ${percent < 25 ? 'bg-red-300'
                    : percent < 50 ? 'bg-yellow-300'
                        : percent < 75 ? 'bg-green-300'
                            : percent < 90 ? 'bg-green-500'
                                : percent <= 100 ? 'bg-green-600'
                                    : 'bg-gray-700'}`}
                    style={{ width: `${percent}%` }}>
                </div>
            </div>
            <span>{poke.freindship <= 100 ? percent + '%' : poke.freindship + ' pts'}</span>
        </>
    )
}