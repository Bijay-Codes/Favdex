import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { GlobalData } from "../../Utility/GlobalData";
import { favdexStorage } from "../../Utility/Favdex";
import { getItem, saveToStorage } from "../../Utility/storagehelper";
export const PokeContext = createContext();
export function PokeProvider({ children }) {
    const [pokedex, setPokemon] = useState([]);
    const [isComplete, setComplete] = useState(false);
    const [modalData, setData] = useState(null);
    const [type, setType] = useState(null);
    const [berry, setBerry] = useState(getItem(GlobalData.favdex.favdexKey)?.berries ?? favdexStorage.berries);
    const [error, setError] = useState('');
    const passingValue = useMemo(() => ({
        pokedex, setPokemon,
        isComplete, setComplete,
        modalData, setData,
        type, setType,
        berry, setBerry,
        error, setError
    }), [pokedex, isComplete, modalData, type, berry, error]);
    useEffect(() => {
        const { favdexKey, berryDaily, cooldown, expiry } = GlobalData.favdex;
        let favdex = getItem(favdexKey);
        if (!favdex) {
            favdex = { ...favdexStorage };
        }
        const now = Date.now();
        let currentBerries = favdex.berries;
        const cooldownMs = cooldown * 24 * 60 * 60 * 1000;
        const expiryMs = expiry * 24 * 60 * 60 * 1000;

        // 1. Expiry check FIRST
        if (favdex.lastExpiry && (now - favdex.lastExpiry >= expiryMs)) {
            currentBerries = 0;
            favdex.berries = 0;
            favdex.lastExpiry = now;
        }

        // 2. Then daily grant
        if (now - (favdex.lastLogin || 0) >= cooldownMs) {
            currentBerries = currentBerries + berryDaily; // no hardcoded cap
            favdex.lastLogin = now;
            favdex.lastExpiry = now; // reset expiry window on fresh grant
            favdex.berries = currentBerries;
        }

        favdex.progress.forEach(item => {
            if (item.friendship >= 100 && !(favdex.pokemon.includes(item.id))) {
                favdex.pokemon.push(item.id);
            }
        });

        saveToStorage(favdex, favdexKey);
        setBerry(currentBerries);
    }, []);
    return (
        <PokeContext.Provider value={passingValue}>
            {children}
        </PokeContext.Provider>
    )
}
