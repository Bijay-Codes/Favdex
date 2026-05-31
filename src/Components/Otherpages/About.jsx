import { RenderNav } from "../Navbar";
import { useState, useRef } from "react";
import { GlobalData } from "../../Utility/GlobalData";
import { clearStorage, getItem, saveToStorage } from "../../Utility/storagehelper";

const POKEDEX_KEY = GlobalData.pokedexKey;
const FAVDEX_KEY = GlobalData.favdex.favdexKey;
const imgStyle = getItem(GlobalData.imgStyleKey) || 'default';
export default function RenderAbout() {
    const dialogRef = useRef(null);
    const [message, setMessage] = useState("");
    const greenButton = 'secondary-font bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-5 rounded-lg transition-colors cursor-pointer';
    const redButton = 'secondary-font bg-rose-500 hover:bg-rose-600 text-white font-medium px-5 rounded-lg transition-colors cursor-pointer';

    const navLink = `primary-font px-3 py-1.5 rounded-xl
     text-[clamp(0.85rem,1.4vw,1.125rem)]
     hover:bg-(--border) border-(--border) border-2
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
        showMessage("FavDex data cleared.");
    }

    return (
        <div className="text-(--text-primary) relative selection:bg-(--accent)/30">

            {/* Confirm Dialog */}
            <dialog
                onClick={(e) => { if (e.target === dialogRef.current) dialogRef.current.close(); }}
                onKeyDown={(e) => { if (e.key === 'Escape') dialogRef.current.close(); }}
                ref={dialogRef}
                className="backdrop:bg-black/60 backdrop-blur-sm
                 bg-(--bg-overlay) text-(--text-primary) text-center m-auto
                 p-6 md:p-8 border border-(--border) rounded-2xl
                 min-w-[min(90vw,480px)] shadow-2xl">
                <h3 className="primary-font font-extrabold text-[clamp(1.1rem,3vw,1.75rem)] mb-2 text-rose-400">
                    Are you absolutely sure?
                </h3>
                <p className="secondary-font text-[clamp(0.9rem,1.6vw,1.1rem)] opacity-80 mb-6 leading-relaxed">
                    This will permanently delete all your FavDex data, including your caught Pokémon
                    and berry progress. This action cannot be undone.
                </p>
                <div className="flex justify-center items-center gap-4">
                    <button className={greenButton} onClick={() => dialogRef.current.close()}>Cancel</button>
                    <button className={redButton} onClick={clearFavdexData}>Delete</button>
                </div>
            </dialog>

            {/* Messages */}
            {message && (
                <div className="primary-font fixed top-24 left-1/2 -translate-x-1/2 z-50
                  bg-emerald-500 text-white text-[clamp(0.8rem,1.4vw,1rem)]
                  px-5 py-3 rounded-xl shadow-lg font-medium tracking-wide
                  animate-bounce">
                    {message}
                </div>
            )}

            {/* Sticky Nav */}
            <nav className="sticky top-0 primary-font
             bg-(--bg-overlay)/90 backdrop-blur-md
             border-b-2 border-(--border) pb-4 z-10
             transition-all ease-in-out">
                <div className="mx-auto lg:px-6 flex flex-col gap-4">
                    <RenderNav />
                    <ul className="flex flex-wrap justify-center gap-3 font-medium">
                        <li><a href="#about-project" className={navLink}>Project</a></li>
                        <li><a href="#tech-used" className={navLink}>Tech Stack</a></li>
                        <li><a href="#tutorial" className={navLink}>Tutorial</a></li>
                        <li><a href="#settings" className={navLink}>Data Settings</a></li>
                        <li>
                            <a href="#contacts"
                                className="primary-font px-4 py-1.5 rounded-full
                                text-[clamp(0.85rem,1.4vw,1.125rem)]
                                bg-(--border) hover:bg-(--accent) hover:text-black
                                transition-all ease-in-out">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-5xl w-full mx-auto px-6 md:px-12 lg:px-16 py-8 space-y-14">

                {/* About */}
                <section id="about-project" className="scroll-mt-32 space-y-4">
                    <h1 className="primary-font tracking-tight font-extrabold text-(--accent)
                     text-[clamp(1.75rem,5vw,3rem)]">
                        # About the Project
                    </h1>
                    <p className="secondary-font text-[clamp(1rem,2vw,1.375rem)] text-balance leading-relaxed opacity-90">
                        Favdex is a{" "}
                        <span className="primary-font font-semibold text-(--accent)">visual-first Pokédex</span>{" "}
                        built around appreciation — not battle stats. The goal is to showcase Pokémon as creatures
                        worth admiring: their designs, shiny forms, and cries. There are no movesets, natures, or
                        PVP metrics here. Instead, you build a bond with your favorites through a berry-feeding system.
                    </p>
                </section>

                {/* Tech Stack */}
                <section id="tech-used" className="scroll-mt-32
                 bg-(--bg-overlay) border border-(--border) rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
                    <h2 className="primary-font font-bold tracking-tight flex items-center gap-2
                     text-[clamp(1.375rem,3vw,2rem)]">
                        <span className="text-(--accent)">#</span> Tech Stack
                    </h2>
                    <p className="secondary-font text-[clamp(0.95rem,1.8vw,1.25rem)] leading-relaxed opacity-80">
                        Built with <strong>React</strong> and the <strong>PokéAPI</strong>. Styled using CSS and{" "}
                        <strong>Tailwind v4</strong> — chosen for its modern LCH color support, which ensures
                        visually consistent colors across devices. All data is stored locally on your device
                        via <code className="text-(--accent) text-[0.9em]">localStorage</code>, so avoid clearing
                        your browser cache for this site.
                    </p>
                </section>

                {/* Tutorial */}
                <section id="tutorial" className="scroll-mt-32 space-y-6 primary-font">
                    <div className="space-y-3">
                        <h2 className="primary-font font-extrabold tracking-tight
                         text-[clamp(1.375rem,3vw,2rem)]">
                            # How It Works
                        </h2>
                        <p className="secondary-font text-[clamp(0.95rem,1.8vw,1.25rem)] leading-relaxed opacity-85">
                            Favdex caches Pokémon data directly on your device. Once loaded, the site works offline
                            and loads significantly faster. Just avoid clearing your browser cache, as that will
                            remove the stored data.
                        </p>
                        <p className="secondary-font text-[clamp(0.95rem,1.8vw,1.25rem)] leading-relaxed opacity-85">
                            Every 24 hours, you receive a set of berries. Feed them to any Pokémon you like — each
                            feeding increases that Pokémon's friendship. Once friendship reaches 100%, the Pokémon
                            is added to your Favdex. Berries expire after 2 days, so use them daily or lose them.
                        </p>
                    </div>

                    <div className="bg-(--bg-overlay)/40 border border-(--border) rounded-2xl p-6">
                        <h4 className="primary-font text-[clamp(1rem,2vw,1.25rem)] font-semibold uppercase
                         tracking-wider text-(--accent) mb-4">
                            Features at glance
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {[
                                "Search Pokémon by name",
                                "Filter by type layout",
                                "Toggle shiny forms in detail view",
                                "Play genuine Pokémon cries",
                                "Track and manage your favorites",
                                "Custom tags for special Pokémon",
                                "Fast offline experience after initial load",
                                "Swtich sprites from pixelated to modern or official sprite",
                            ].map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2
                                 secondary-font text-[clamp(0.9rem,1.6vw,1.1rem)]">
                                    <span className="text-(--accent) pt-0.5 shrink-0">✦</span>
                                    <span className="opacity-95">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Data Settings */}
                <section id="settings" className="scroll-mt-32 space-y-6">
                    <div>
                        <div className="space-y-3 p-4">
                            <h2 className="primary-font font-extrabold tracking-tight text-[clamp(1.375rem,3vw,2rem)]">
                                # Image Style
                            </h2>
                            <p className="secondary-font text-[clamp(0.9rem,1.6vw,1.1rem)] opacity-75">
                                Changing style will re-fetch Pokémon data.
                            </p>
                            <select
                                defaultValue={imgStyle}
                                onChange={(e) => {
                                    saveToStorage(e.target.value, GlobalData.imgStyleKey);
                                    clearPokedexCache();
                                }}
                                className="secondary-font w-full md:w-64
                                    bg-(--bg-elevated) text-(--text-primary)
                                    border border-(--border) hover:border-(--border-strong)
                                    focus:outline-none focus:border-(--accent)
                                    text-[clamp(0.9rem,1.6vw,1.1rem)]
                                    px-4 py-2.5 rounded-xl cursor-pointer
                                    transition-all">
                                <option value="official">Default (Suggested)</option>
                                <option value="pixel">Pixelated (Experimental)</option>
                                <option value="modern">Modern (Experimental)</option>
                            </select>
                        </div>
                        <h2 className="primary-font font-extrabold tracking-tight mb-1
                         text-[clamp(1.375rem,3vw,2rem)]">
                            # Your Data
                        </h2>
                        <p className="secondary-font text-[clamp(0.9rem,1.6vw,1.1rem)] opacity-75">
                            All data is stored locally on your device. Nothing is sent to any external server.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Clear Cache Card */}
                        <div className="border-2 border-t-0 border-b-0 border-l-6 border-r-6 border-(--border)
                             bg-(--bg-overlay) flex flex-col justify-between items-start
                             gap-4 rounded-2xl p-6 transition-all hover:border-(--accent)">
                            <div className="space-y-1">
                                <h3 className="primary-font font-bold text-[clamp(1.1rem,2vw,1.375rem)]">
                                    Clear Pokédex Cache
                                </h3>
                                <p className="secondary-font text-[clamp(0.9rem,1.6vw,1.1rem)] opacity-75 leading-relaxed">
                                    Re-fetches Pokémon data from the API. Your Favdex progress is completely safe.
                                </p>
                            </div>
                            <button
                                className="secondary-font w-full md:w-auto
                                 text-[clamp(0.9rem,1.6vw,1.1rem)]
                                 bg-(--border) hover:bg-(--accent) font-semibold
                                 px-4 py-2 rounded-xl transition-all cursor-pointer"
                                onClick={clearPokedexCache}>
                                Clear Cache
                            </button>
                        </div>

                        {/* Clear Favdex Card */}
                        <div className="border border-(--border) bg-(--bg-overlay)
                             p-6 rounded-2xl flex flex-col justify-between items-start gap-4
                             transition-all hover:border-rose-400">
                            <div className="space-y-1">
                                <h3 className="primary-font font-bold text-rose-400
                                 text-[clamp(1.1rem,2vw,1.375rem)]">
                                    Clear Favdex Data
                                </h3>
                                <p className="secondary-font text-[clamp(0.9rem,1.6vw,1.1rem)] opacity-75 leading-relaxed">
                                    Permanently deletes your personal favorites, berries, and friendship progress.
                                </p>
                            </div>
                            <button
                                className="secondary-font w-full md:w-auto
                                 text-[clamp(0.9rem,1.6vw,1.1rem)]
                                 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white
                                 border border-rose-500/30 font-semibold
                                 px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                                onClick={() => dialogRef.current.showModal()}>
                                Clear Favdex
                            </button>
                        </div>
                    </div>
                </section>

                {/* Contact */}
                <section id="contacts" className="scroll-mt-32 text-center py-8 space-y-4">
                    <h2 className="primary-font font-bold tracking-tight
                     text-[clamp(1.375rem,3vw,2rem)]">
                        # Contact & Suggestions
                    </h2>
                    <p className="secondary-font text-[clamp(0.95rem,1.8vw,1.25rem)] opacity-80 mx-auto">
                        Have a suggestion, feature request, or found an edge-case bug? Reach out on our community platform.
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <a href="mailto:favdexsupport@gmail.com"
                            className="primary-font inline-flex items-center gap-2
                        text-[clamp(0.85rem,1.4vw,1rem)]
                        bg-(--bg-overlay) text-(--text-primary) hover:border-(--accent) hover:text-(--accent)
                        border border-(--border) font-semibold px-4 py-2 rounded-full shadow-md
                        transition-all hover:-translate-y-0.5">
                            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                            Email
                        </a>
                        <a href="https://github.com/Bijay-Codes" target="_blank"
                            className="primary-font inline-flex items-center gap-2
                             text-[clamp(0.85rem,1.4vw,1rem)]
                             px-4 py-2 bg-[#1f2328] hover:bg-[#2c3137] text-white
                             font-semibold rounded-md border border-white/10
                             shadow-sm transition-colors">
                            <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="currentColor">
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