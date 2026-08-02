// used in home.jsx for initializing and data refetching
import { fetchPokeApi } from "../../API/ApiFetcher.js";
import { GlobalData } from "../../Utility/GlobalData.js";
import { saveToStorage, getItem } from "../../Utility/storagehelper.js";
import { useRef, useEffect, useContext } from "react";
import { PokeContext } from "./PokedexContext.jsx";

export function useInitializer(ref, pokedex, setFunct, offsetRef, setFunct2) {
    const { setError } = useContext(PokeContext);
    // this one is the function used to show the error is the internet is down or fetch fails

    const isFetching = useRef(false);
    // this ref contains boolean if a fetch is already in progress or not if it is the fetch wont happen

    const totalPokemonEntry = useRef(0);
    // this ref contains data of how many pokemon are there in pokeapi total. need this for rendering blank divs/intesection observers

    const scrollAnchor = useRef(0);
    // contains the position of the place we have to make user scroll to after each succssfull fetch

    const hasAttached = useRef(false);
    // contains data about if the scroll anchor has already been attached 

    useEffect(() => {
        isFetching.current = true;
        const prevData = getItem('pokedex-scroll');
        if (!prevData) {
            fetchPokeApi(GlobalData.apiLimit, 3, 0, setError).then((data) => {
                if (data) {
                    setFunct(data[0]);
                    offsetRef.current = data[1];
                    totalPokemonEntry.current = data[2];
                }
                isFetching.current = false;
            });
        } else {
            setFunct(prevData);
            offsetRef.current = prevData.length;
            totalPokemonEntry.current = getItem('pokedex-limit');
            isFetching.current = false;
        }
    }, [offsetRef, setFunct, setError]);

    useEffect(() => {
        if (pokedex.length === 0) return;
        if (hasAttached.current) return;
        hasAttached.current = true;

        function isSentinelVisible() {
            if (!ref.current) return false;
            const rect = ref.current.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom >= 0;
        }

        function loadMore() {
            if (totalPokemonEntry.current > 0 && offsetRef.current >= totalPokemonEntry.current) {
                setFunct2(true);
                return;
            }
            if (!offsetRef.current || isFetching.current) return;

            isFetching.current = true;
            scrollAnchor.current = window.scrollY;

            fetchPokeApi(GlobalData.apiLimit, 3, offsetRef.current, setError).then(data => {
                if (data) {
                    setFunct(previous => {
                        const updated = [...previous, ...data[0]];
                        saveToStorage(updated, 'pokedex-scroll');
                        return updated;
                    });
                    offsetRef.current = data[1];

                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            window.scrollTo(0, scrollAnchor.current);
                        });
                    });
                }
                isFetching.current = false;

                if (isSentinelVisible()) {
                    loadMore();
                }
            });
        }

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadMore();
            }
        });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref, pokedex.length, offsetRef, setError, setFunct, setFunct2]);
}