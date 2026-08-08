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
        isFetching.current = true;// flip this true because we dont want a extra fetch while one is in progress or we get CORS err
        const prevData = getItem('pokedex-scroll');// we chek if its the first load by checking if data exists in localstorage
        if (!prevData) {
            fetchPokeApi(GlobalData.apiLimit, 3, 0, setError).then((data) => {
                // first we fetched now when it happens we do destructure a little
                // set function is the state setter that sets state for pokemon to be rendered
                // we get the details we can use to trigger next fetch too, that is offset... we put the offset(start point of fetch) like
                // 1st fetch happend we get 1st batch for example 5 pokemon the offset is 5 so we say- pokeapi get me 5 more starting from index 5
                // pokeapi gives us the total amount of pokemon they have in data[2] position

                if (data) {
                    setFunct(data[0]);
                    offsetRef.current = data[1];
                    totalPokemonEntry.current = data[2];
                }
                isFetching.current = false;// finally set it false again because fetching is complete on this branch
            });
        } else { // this branch triggers when the user has already logged in previously
            setFunct(prevData);// state setter again for rendering in this branch too
            offsetRef.current = prevData.length; // this time we can just count pokemon in out exising list for offset
            totalPokemonEntry.current = getItem('pokedex-limit');
            // get the pokemon array for the total entry... this is temporary because we have no way of knowing actual data in this branch

            isFetching.current = false;// end of this branch so set it false so a second fetch can be triggereed
        }
    }, [offsetRef, setFunct, setError]);

    useEffect(() => {
        if (pokedex.length === 0) return;
        // if the lenght of pokemon is 0 then return because this branch is for infinite scroll function only

        if (hasAttached.current) return;// if an observer has already been attached then dont rerun on every rerender
        hasAttached.current = true;// on first visit this goes true and then never goes false

        // This function below checks that if the sentinel div is visbible or not
        // why? because we need it for refetches as for this scenario
        // the fetch happened but the cards were not enough to push the senitnel outside of viewport breaking the infinite scroll
        // to avoid that we has this checker we use below
        function isSentinelVisible() {
            if (!ref.current) return false; // return if the sentinel is not visible or not been rendered
            const rect = ref.current.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom >= 0;
        }
        // this function is the one that loads more batches if the first batch couldnt fill the screen to avoid the said problem above 
        function loadMore() {
            if (totalPokemonEntry.current > 0 && offsetRef.current >= totalPokemonEntry.current) {
                setFunct2(true); // set funct is actually the state setter that says true when the pokeapi doesnt have anymore pokemon we cam fetch
                return;
            }
            if (!offsetRef.current || isFetching.current) return;

            isFetching.current = true;// we flip is true to avoid refetches
            scrollAnchor.current = window.scrollY;// save the current scroll position to revert back to when a fetch is successfull

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
                            window.scrollTo(0, scrollAnchor.current); // go back to previous scroll position
                        });
                    });
                }
                isFetching.current = false;

                if (isSentinelVisible()) {
                    loadMore();
                }
            });
        }

        // if the sentiniel (div/intersection observer) is still visible after 1 fetch batch we fetch another batch with this
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadMore();
            }
        });
        setTimeout(() => {
            if (ref.current) observer.observe(ref.current);
        }, 2000);
        return () => observer.disconnect();
    }, [ref, pokedex.length, offsetRef, setError, setFunct, setFunct2]);
}