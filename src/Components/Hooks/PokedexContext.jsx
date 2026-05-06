import { createContext, useContext, useMemo, useState } from "react";
import { GlobalData } from "../../Utility/GlobalData";
import { favdexStorage } from "../../Utility/Favdex";
import { getItem } from "../../Utility/storagehelper";
export const PokeContext = createContext();
export function PokeProvider({ children }) {
    const [pokedex, setPokemon] = useState([]);
    const [isComplete, setComplete] = useState(false);
    const [modalData, setData] = useState(null);
    const [type, setType] = useState(null);
    const [berry, setBerry] = useState(getItem(GlobalData.favdex.favdexKey)?.berries ?? favdexStorage.berries);

    const passingValue = useMemo(() => ({
        pokedex, setPokemon,
        isComplete, setComplete,
        modalData, setData,
        type, setType,
        berry, setBerry,
    }), [pokedex, isComplete, modalData, type, berry])
    return (
        <PokeContext.Provider value={passingValue}>
            {children}
        </PokeContext.Provider>
    )
}
