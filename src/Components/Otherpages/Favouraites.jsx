import { useContext, useEffect, useRef, useState } from "react";
import { PokeContext } from "../Hooks/PokedexContext";
import { fetchSingle } from '../../API/ApiFetcher.js';
import { GlobalData } from "../../Utility/GlobalData.js";
import { RenderPokemon } from "../Renderer.jsx";
import { favdexStorage } from "../../Utility/Favdex.js";
import { getItem, saveToStorage } from "../../Utility/storagehelper.js";
import { RenderNav } from "../Navbar.jsx";
export function RenderFavdex() {
    const [favdex, setFavdex] = useState(null);
    const [selected, setSelected] = useState(null);
    const { pokedex, setData } = useContext(PokeContext);
    const favdexList = getItem(GlobalData.favdex.favdexKey) || favdexStorage;
    const list = favdexList.pokemon;
    useEffect(() => {
        async function load(params) {
            const data = await getPokeData(list, pokedex);
            setFavdex(data);
        };
        load();
    }, []);
    return (
        <>
            <RenderNav />
            <RenderRemovePane selected={selected} favdex={favdexList} setFavdex={setFavdex} setSelected={setSelected} handleRemove={handleRemove} />
            {!favdex
                ? null
                : favdex.length === 0
                    ? <RenderEmptyMessage />
                    : <div className="grid grid-cols-[repeat(auto-fill,minmax(clamp(250px,15vw,400px),1fr))]
                     w-[clamp(80%,85vw,90%)]
                     m-auto gap-4 md:gap-16 p-4">
                        {favdex.map(poke => (
                            <div className="bg-(--gradient-page) flex flex-col items-center" key={poke.name}>
                                <RenderPokemon pokemon={poke} setData={setData} favView={true} />
                                <button onClick={() => setSelected(poke.id)}
                                    className="bg-(--accent)/80 text-(--text-primary) text-xl
                                     px-4 border-2 border-(--border-white) rounded-br-3xl rounded-bl-3xl rounded lg:text-2xl">
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
            }
        </>
    )
}

function RenderRemovePane({ selected, favdex, setFavdex, setSelected, handleRemove }) {
    const dialogRef = useRef(null);
    const closePane = () => {
        dialogRef.current.close()
        setSelected(null);
    };
    useEffect(() => {
        if (!selected) {
            closePane();
        } else {
            dialogRef.current.showModal();
        }
    }, [selected]);
    return (
        <dialog id="dialog-confirm"
            className="min-h-1/3 sm:min-w-[60%] md:min-w-[50%] m-auto
            bg-transparent"
            ref={dialogRef}
            onClick={(e) => {
                if (e.target === dialogRef.current) {
                    closePane();
                    !selected
                }
            }}
            onKeyDown={(e) => {
                if (e.key === 'Esc') {
                    closePane();
                }
            }}>
            <section
                className="w-full h-full p-6
                 text-center text-xl text-(--text-primary)
                 bg-(--bg-overlay) border-2 border-(--border-white)
                 flex flex-col justify-center items-center
                 rounded-xl lg:text-3xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h1>Do you want to Remove this Pokemon from Favdex?</h1>
                <div>All Progress you have made with this pokemon will be lost</div>
                <div className="flex gap-2 m-4">
                    <button
                        className="bg-emerald-400 w-max border-2 border-(--border-white) px-4 rounded-lg"
                        onClick={() => closePane()}>
                        No
                    </button>
                    <button
                        className="bg-rose-500 w-max px-4 border-2 border-(--border-white) rounded-lg"
                        onClick={() => {
                            handleRemove(favdex, selected, setFavdex, setSelected, closePane);
                        }}>
                        Yes
                    </button>
                </div>
            </section>
        </dialog>
    )
}

function handleRemove(favdex, id, setFavdex, setSelected, closePane) {
    favdex.pokemon = favdex.pokemon.filter(poke => poke !== id);
    favdex.progress = favdex.progress.filter(obj => obj.id !== id);
    saveToStorage(favdex, GlobalData.favdex.favdexKey);
    setFavdex(prev => prev.filter(p => p.id !== id));
    setSelected(null);
    closePane();
}


async function getPokeData(list, pokedex) {
    const pokeMap = new Map(pokedex.map(p => [p.id, p]));
    const res = await Promise.all(list.map(async (li) => {
        if (pokeMap.has(li)) {
            return pokeMap.get(li);
        } else {
            const url = `${GlobalData.apiUrl}/${li}`;
            const fetData = await fetchSingle(url);
            return fetData;
        }
    })
    )
    return res;
}

function RenderEmptyMessage() {
    return (
        <div className="text-(--text-primary) text-2xl p-2 m-2 flex flex-col items-start justify-center">
            <h1 className="font-extrabold text-shadow-2xs primary-font text-shadow-blue-100">
                Your Favdex is Currently Empty try Feeding a Pokemon to add it here
            </h1>
            <div className="text-xl secondary-font">It will be added here after you reach 100 Freindship Points with that Pokemon</div>
        </div>
    )
}