import { fetchPokeApi } from "../../API/ApiFetcher.js";
import { GlobalData } from "../../Utility/GlobalData.js";
import { saveToStorage, getItem } from "../../Utility/storagehelper.js";
import { useRef, useEffect, useContext } from "react";
import { PokeContext } from "./PokedexContext.jsx";

export function useInitializer(ref, setFunct, offsetRef, setFunct2) {
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
        function isSentinelVisible() {
            if (!ref.current) return false;
            const rect = ref.current.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom >= 0;
        }

        function loadMore() {
            // Guard against acting before we know the real total (0 on first render).
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

                // The observer won't fire again on its own if the sentinel never left
                // the viewport (isIntersecting stayed true the whole time — no transition,
                // no callback). Re-check manually and keep loading if it's still visible.
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
    }, [ref, offsetRef, setError, setFunct, setFunct2]);
}