import { createContext, useContext, useMemo, useState } from "react";
export const PokeContext = createContext();
export function PokeProvider({ children }) {
    const [pokedex, setPokemon] = useState([]);
    const [isComplete, setComplete] = useState(false);
    const [modalData, setData] = useState(null);
    const [type, setType] = useState(null);

    const passingValue = useMemo(() => ({
        pokedex, setPokemon,
        isComplete, setComplete,
        modalData, setData,
        type,setType
    }), [pokedex, isComplete, modalData,type])
    return (
        <PokeContext.Provider value={passingValue}>
            {children}
        </PokeContext.Provider>
    )
}
