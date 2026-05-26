import { RenderNav } from "../Navbar";
import { useState, useRef } from "react";
import { GlobalData } from "../../Utility/GlobalData";
import { clearStorage } from "../../Utility/storagehelper";
const POKEDEX_KEY = GlobalData.pokedexKey;
const FAVDEX_KEY = GlobalData.favdex.favdexKey;

export default function RenderAbout() {
    const dialogRef = useRef(null);
    const [message, setMessage] = useState("");

    // Extracted clean Tailwind button classes
    const greenButton = 'bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-5 py-2 rounded-lg transition-colors cursor-pointer';
    const redButton = 'bg-rose-500 hover:bg-rose-600 text-white font-medium px-5 py-2 rounded-lg transition-colors cursor-pointer';

    const links = `px-3 py-1.5 rounded-xl lg:text-2xl
     hover:bg-(--border) border-(--border) border-2 lg:border-4
     transition-colors`;

    function showMessage(msg) {
        setMessage(msg);
        setTimeout(() => setMessage(""), 3000);
    }

    function clearPokedexCache() {
        clearStorage(POKEDEX_KEY);
        showMessage("Pokédex cache cleared.");
    }

    function clearFavdexData() {
        clearStorage(FAVDEX_KEY);
        dialogRef.current.close();
        location.reload();
        showMessage("FavDex data cleared.");
    }

    return (
        <div className="text-(--text-primary) relative selection:bg-(--accent)/30">
            <dialog
                onClick={(e) => {
                    if (e.target === dialogRef.current) dialogRef.current.close();
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Escape') dialogRef.current.close();
                }}
                ref={dialogRef}
                className="backdrop:bg-black/60 bg-(--bg-overlay) text-(--text-primary) text-center m-auto p-6 md:p-8 border border-(--border) rounded-2xl max-w-md shadow-2xl backdrop-blur-sm">
                <div>
                    <h3 className="font-bold mb-2 text-rose-400">Are you absolutely sure?</h3>
                    <p className="opacity-80 mb-6 leading-relaxed">This will permanently delete all your FavDex data, including your caught Pokémon and berry progress. This action cannot be undone.</p>
                    <div className="flex justify-center items-center gap-4">
                        <button className={greenButton} onClick={() => dialogRef.current.close()}>Cancel</button>
                        <button className={redButton} onClick={clearFavdexData}>Delete Everything</button>
                    </div>
                </div>
            </dialog>

            {message && (
                <div className="fixed top-30 lg:top-1/2 left-1/2 -translate-x-1/6 z-10
                  bg-emerald-500 text-white text-xs lg:text-xl
                    p-4 rounded-xl shadow-lg font-medium tracking-wide
                    animate-bounce duration-300 ease-in-out">
                    {message}
                </div>
            )}
            <nav className="sticky top-0
             bg-(--bg-overlay)/90 backdrop-blur-md border-b-2 lg:border-b-4 border-(--border) py-4 z-6
             transition-all ease-in-out">
                <div className="mx-auto lg:px-6 flex flex-col gap-4">
                    <RenderNav />
                    <ul className="flex flex-wrap justify-center gap-4
                     lg:gap-6 text-sm font-medium">
                        <li><a href="#about-project" className={links}>Project</a></li>
                        <li><a href="#tech-used" className={links}>Tech Stack</a></li>
                        <li><a href="#tutorial" className={links}>Tutorial</a></li>
                        <li><a href="#cache-clear" className={links}>Data Settings</a></li>
                        <li><a href="#contacts" className="px-4 py-1.5 rounded-full
                         lg:text-2xl lg:px-6 lg:py-2
                         bg-(--border) hover:bg-(--accent) hover:text-black
                         transition-all ease-in-out">Contact</a></li>
                    </ul>
                </div>
            </nav>

            <main className="lg:max-w-[60%] lg:px-4 mx-auto p-4 px-2 lg:space-y-16 space-y-10">

                <section id="about-project" className="scroll-mt-32 space-y-4">
                    <h1 className="text-4xl lg:pt-5
                     lg:text-5xl font-extralight tracking-tight text-(--accent)">
                        # About the Project
                    </h1>
                    <p className="text-lg lg:text-3xl text-balance leading-relaxed opacity-90">
                        Favdex is a <span className="font-semibold text-(--accent)">visual-first Pokédex</span> built around appreciation — not battle stats.
                        The goal is to showcase Pokémon as creatures worth admiring: their designs, shiny forms, and cries.
                        There are no movesets, natures, or PVP metrics here. Instead, you build a bond with your favorites
                        through a berry-feeding system.
                    </p>
                </section>

                <section id="tech-used" className="scroll-mt-32
                 bg-(--bg-overlay) border border-(--border) rounded-2xl lg:rounded-4xl p-6 lg:p-8
                  shadow-sm space-y-4">
                    <h2 className="text-3xl lg:text-4xl font-bold tracking-tight flex items-center gap-2">
                        <span className="text-(--accent)">#</span> Tech Stack
                    </h2>
                    <p className="text-xl lg:text-2xl leading-relaxed opacity-80">
                        Built with **React** and the **PokéAPI**. Styled using CSS and **Tailwind v4** — chosen for its modern LCH color support,
                        which ensures visually consistent colors across devices. All data is stored locally on your device
                        via `localStorage`, so avoid clearing your browser cache for this site.
                    </p>
                </section>

                <section id="tutorial" className="scroll-mt-32 space-y-6">
                    <div className="space-y-3">
                        <h2 className="lg:text-4xl text-xl font-extrabold tracking-tight"># How It Works</h2>
                        <p className="lg:text-2xl text-xl leading-relaxed opacity-85">
                            Favdex caches Pokémon data directly on your device. Once loaded, the site works offline and
                            loads significantly faster. Just avoid clearing your browser cache, as that will remove the stored data.
                        </p>
                        <p className="lg:text-2xl text-xl leading-relaxed opacity-85">
                            Every 24 hours, you receive a set of berries. Feed them to any Pokémon you like — each feeding
                            increases that Pokémon's friendship. Once friendship reaches 100%, the Pokémon is added to your Favdex.
                            Berries expire after 2 days, so use them daily or lose them.
                        </p>
                    </div>

                    <div className="bg-(--bg-overlay)/40 border border-(--border)
                     rounded-2xl p-6">
                        <h4 className="text-2xl font-semibold uppercase
                         tracking-wider text-(--accent) mb-4"
                        >Features at a glance</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                         gap-3 lg:text-2xl text-xl">
                            {[
                                "Search Pokémon by name", "Filter by type layout",
                                "Toggle shiny forms in detail view", "Play genuine Pokémon cries",
                                "Track and manage your favorites", "Custom tags for special Pokémon",
                                "Fast offline experience after initial load"
                            ].map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <span className="text-(--accent) pt-1 text-xl lg:text-2xl">✦</span>
                                    <span className="opacity-95">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section id="cache-clear" className="scroll-mt-32 space-y-6">
                    <div>
                        <h2 className="text-3xl font-extrabold tracking-tight mb-2"># Your Data</h2>
                        <p className="text-xl opacity-75">All data is stored locally on your device. Nothing is sent to any external server.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border-2 border-t-0 border-b-0 border-(--border) bg-(--bg-overlay)
                                flex flex-col justify-between items-start 
                                gap-4 transition-all ease-in rounded-2xl p-6
                                hover:border-(--accent) border-l-6 border-r-6 ">
                            <div className="space-y-1">
                                <h3 className="text-2xl font-bold">Clear Pokédex Cache</h3>
                                <p className="text-xl opacity-75 leading-relaxed">Re-fetches Pokémon data from the API. Your Favdex progress is completely safe.</p>
                            </div>
                            <button className="w-full text-xl lg:w-auto
                                bg-(--border) hover:bg-(--accent) font-semibold
                                px-4 py-2 rounded-xl
                                transition-all cursor-pointer"
                                onClick={clearPokedexCache}>
                                Clear Cache
                            </button>
                        </div>

                        <div className="border border-(--border) bg-(--bg-overlay)
                            p-6 rounded-2xl flex flex-col justify-between items-start gap-4
                            transition-all hover:border-rose-400">
                            <div className="space-y-1">
                                <h3 className="text-2xl font-bold text-rose-400">Clear Favdex Data</h3>
                                <p className="text-xl opacity-75 leading-relaxed">Permanently deletes your personal favorites, custom tags, berries, and friendship progress.</p>
                            </div>
                            <button className="w-full text-xl md:w-auto 
                              bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white
                                border border-rose-500/30 font-semibold
                                px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                                onClick={() => dialogRef.current.showModal()}>
                                Clear Favdex
                            </button>
                        </div>
                    </div>
                </section>
                <section id="contacts" className="scroll-mt-32 text-center py-8 space-y-4">
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight"># Contact & Suggestions</h2>
                    <p className="text-xl lg:text-2xl opacity-80 max-w-md mx-auto">Have a suggestion, feature request, or found an edge-case bug? Reach out on our community platform.</p>
                    <div className="flex items-center justify-center gap-3">
                        <a href="#" target="_blank" 
                         className="inline-block
                      bg-[#5865F2] text-white shadow-md hover:bg-[#4752C4]
                        font-semibold px-2 py-1 lg:px-5 lg:text-2xl rounded-full
                        transition-all transform hover:-translate-y-0.5">
                            Discord
                        </a>
                        <a href="https://github.com/Bijay-Codes" target="_blank"
                            className="inline-flex items-center gap-2 px-4 py-2 lg:text-2xl bg-[#1f2328] hover:bg-[#2c3137] text-white font-semibold text-sm rounded-md border border-[rgba(27,31,36,0.15)]
                             shadow-sm transition-colors duration-200">
                            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82A7.48 7.48 0 0 0 8 3c-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
                            </svg>
                            <span>GitHub</span>
                        </a>
                    </div>
                </section>

            </main>
        </div>
    );
}