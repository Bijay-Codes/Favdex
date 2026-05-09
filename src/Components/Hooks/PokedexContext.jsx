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
        const { favdexKey, berryDaily, cooldown } = GlobalData.favdex;
        let favdex = getItem(favdexKey);

        if (!favdex) {
            favdex = { ...favdexStorage };
            saveToStorage(favdex, favdexKey);
        }

        const now = Date.now();
        const cooldownMs = cooldown * 24 * 60 * 60 * 1000;

        if (now - (favdex.lastLogin || 0) >= cooldownMs) {
            favdex.berries = berryDaily;
            favdex.lastLogin = now;

            saveToStorage(favdex, favdexKey);
            setBerry(berryDaily);
        } else {
            setBerry(favdex.berries);
        }
    }, []);
    return (
        <PokeContext.Provider value={passingValue}>
            {children}
        </PokeContext.Provider>
    )
}
