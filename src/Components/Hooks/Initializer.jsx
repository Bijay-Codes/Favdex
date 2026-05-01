import { fetchPokeApi } from "../../API/ApiFetcher.js";
import { GlobalData } from "../../Utility/GlobalData.js";
import { saveToStorage, getItem } from "../../Utility/storagehelper.js";
import { useRef, useEffect } from "react";
export function useInitializer(ref, setFunct, offset, setFunct2) {
    const isFetching = useRef(false);
    const totalPokemonEntry = useRef(0);
    useEffect(() => {
        isFetching.current = true;
        const prevData = getItem('pokedex-scroll');
        if (!prevData) {
            fetchPokeApi(GlobalData.apiLimit, 3, 0).then((data) => {
                if (data) {
                    setFunct(data[0]);
                    offset.current = data[1];
                    totalPokemonEntry.current = data[2];
                    isFetching.current = false;
                }
            });
        } else {
            setFunct(prevData);
            offset.current = prevData.length;
            totalPokemonEntry.current = getItem('pokedex-limit');
            isFetching.current = false;
        }
    }, []);
    useEffect(() => {
        const observer = new IntersectionObserver((ent) => {
            if (offset.current >= totalPokemonEntry.current) {
                setFunct2(true);
                return;
            }
            if (ent[0].isIntersecting && offset.current && !isFetching.current) {
                isFetching.current = true;
                fetchPokeApi(GlobalData.apiLimit, 3, offset.current).then(data => {
                    if (data) {
                        setFunct(previous => {
                            const updated = [...previous, ...data[0]];
                            saveToStorage(updated, 'pokedex-scroll');
                            return updated;
                        });
                        offset.current = data[1];
                    }
                    isFetching.current = false;
                })
            }
        })
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref.current])
}
