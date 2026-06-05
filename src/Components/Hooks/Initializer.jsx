import { fetchPokeApi } from "../../API/ApiFetcher.js";
import { GlobalData } from "../../Utility/GlobalData.js";
import { saveToStorage, getItem } from "../../Utility/storagehelper.js";
import { useRef, useEffect, useContext } from "react";
import { PokeContext } from "./PokedexContext.jsx";

export function useInitializer(ref, setFunct, offset, setFunct2) {
    const { setError } = useContext(PokeContext);
    const isFetching = useRef(false);
    const totalPokemonEntry = useRef(0);
    const scrollAnchor = useRef(0);

    useEffect(() => {
        isFetching.current = true;
        const prevData = getItem('pokedex-scroll');
        if (!prevData) {
            fetchPokeApi(GlobalData.apiLimit, 3, 0, setError).then((data) => {
                if (data) {
                    setFunct(data[0]);
                    offset.current = data[1];
                    totalPokemonEntry.current = data[2];

                    setTimeout(() => {
                        isFetching.current = false;
                    }, 100);
                }
            });
        } else {
            setFunct(prevData);
            offset.current = prevData.length;
            totalPokemonEntry.current = getItem('pokedex-limit');
            setTimeout(() => {
                isFetching.current = false;
            }, 100);
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
                scrollAnchor.current = window.scrollY;

                fetchPokeApi(GlobalData.apiLimit, 3, offset.current, setError).then(data => {
                    if (data) {
                        setFunct(previous => {
                            const updated = [...previous, ...data[0]];
                            saveToStorage(updated, 'pokedex-scroll');
                            return updated;
                        });
                        offset.current = data[1];

                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                window.scrollTo(0, scrollAnchor.current);
                            });
                        });
                    }
                    isFetching.current = false;
                    if (ref.current) {
                        observer.unobserve(ref.current);
                        observer.observe(ref.current);
                    }
                });
            }
        });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
}