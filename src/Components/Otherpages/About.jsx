import { RenderNav } from "../Navbar";
import { useState, useRef } from "react"
import { GlobalData } from "../../Utility/GlobalData";
import { clearStorage } from "../../Utility/storagehelper";
const POKEDEX_KEY = GlobalData.pokedexKey;
const FAVDEX_KEY = GlobalData.favdex.favdexKey;

export default function RenderAbout() {
    const dialogRef = useRef(null);
    const [message, setMessage] = useState("");
    const greenButton = 'bg-emerald-400 border(--border) border-2 px-4 rounded-lg';
    const redButton = 'bg-rose-400 border(--border) border-2 px-4 rounded-lg';

    function showMessage(msg) {
        setMessage(msg)
        setTimeout(() => setMessage(""), 3000);
    }

    function clearPokedexCache() {
        clearStorage(POKEDEX_KEY);
        showMessage("Pokédex cache cleared.");
    }

    function clearFavdexData() {
        clearStorage(FAVDEX_KEY)
        dialogRef.current.close();
        showMessage("FavDex data cleared.");
    }

    return (
        <div id="home" className="text-(--text-primary) text-xl relative">
            <dialog
                onClick={(e) => {
                    if (e.target === dialogRef.current) dialogRef.current.close();
                }}
                onChange={(e) => {
                    if (e.key === 'Esc') dialogRef.current.close();
                }}
                ref={dialogRef}
                className="bg-(--bg-overlay) text-(--text-primary) text-center m-auto p-8 border-2 border-(--border) rounded-xl">
                <div>
                    <p>This will permanently delete all your FavDex data. This action cannot be undone.</p>
                    <div className="flex justify-center items-center gap-4">
                        <button className={greenButton} onClick={() => dialogRef.current.close()}>Cancel</button>
                        <button className={redButton} onClick={clearFavdexData}>Delete</button>
                    </div>
                </div>
            </dialog>

            <nav className="sticky top-0 bg-(--bg-overlay) py-2">
                <RenderNav />
                {message && <div>{message}</div>}
                <ul className="flex flex-wrap gap-4">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about-project">Project</a></li>
                    <li><a href="#tech-used">Tech Stack</a></li>
                    <li><a href="#tutorial">Tutorial</a></li>
                    <li><a href="#cache-clear">Cache</a></li>
                    <li><a href="#contacts">Contact</a></li>
                </ul>
            </nav>

            <section id="about-project"
                className="scroll-mt-30">
                <h1>#About the Project</h1>
                <p>
                    Favdex is a visual-first Pokédex built around appreciation — not battle stats.
                    The goal is to showcase Pokémon as creatures worth admiring: their designs, shiny forms, and cries.
                    There are no movesets, natures, or PVP metrics here. Instead, you build a bond with your favorites
                    through a berry-feeding system. For details on how it works, see{" "}
                    <span className="text-(--accent)"><a href="#tutorial">#Tutorial</a></span>.
                </p>
                <article id="tech-used">
                    <h1>#Tech Stack</h1>
                    <p>
                        Built with React and the PokéAPI. Styled using CSS and Tailwind v4 — chosen for its modern LCH color support,
                        which ensures visually consistent colors across devices. All data is stored locally on your device
                        via localStorage, so avoid clearing your browser cache for this site.
                    </p>
                </article>
            </section>

            <section id="tutorial" className="py-4 mt-4 scroll-mt-30">
                <h2>#How It Works</h2>
                <p>
                    Favdex caches Pokémon data directly on your device. Once loaded, the site works offline and
                    loads significantly faster. Just avoid clearing your browser cache, as that will remove the stored data.
                </p>
                <p>
                    Every 24 hours, you receive a set of berries. Feed them to any Pokémon you like — each feeding
                    increases that Pokémon's friendship. Once friendship reaches 100%, the Pokémon is added to your Favdex.
                    Berries expire after 2 days, so use them daily or lose them.
                </p>
                <p>Features at a glance:</p>
                <ul>
                    <li>Search Pokémon by name</li>
                    <li>Filter by type</li>
                    <li>Toggle shiny forms in the detail view</li>
                    <li>Play Pokémon cries</li>
                    <li>Track and manage your favorites</li>
                    <li>Custom tags for special Pokémon</li>
                    <li>Fast offline experience after initial load</li>
                </ul>
            </section>

            <section id="cache-clear"
                className="scroll-mt-30">
                <h1>#Your Data</h1>
                <p>All data is stored locally on your device. Nothing is sent to any server.</p>
                <div>
                    <h2>Clear Pokédex Cache</h2>
                    <p>Re-fetches Pokémon data from the API. Your Favdex progress is not affected.</p>
                    <button className="bg-(--accent-cta) px-2 rounded-lg" onClick={clearPokedexCache}>Clear Cache</button>
                </div>
                <div>
                    <h2>Clear Favdex Data</h2>
                    <p>Permanently deletes your favorites, berries, and friendship progress.</p>
                    <button className="bg-(--accent-cta) px-2 rounded-lg" onClick={() => dialogRef.current.showModal()}>Clear Favdex</button>
                </div>
            </section>

            <section id="contacts"
                className="scroll-mt-30">
                <h1>#Contact & Suggestions</h1>
                <p>Have a suggestion or found a bug? Reach out on Discord.</p>
                <a href="#">Discord</a>
            </section>
        </div>
    )
}