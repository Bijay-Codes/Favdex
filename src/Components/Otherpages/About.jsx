import { RenderNav } from "../Navbar";
import { useState } from "react"
import '../../ComponentCSS/Favdex.css'
import { GlobalData } from "../../Utility/GlobalData";
import { clearStorage } from "../../Utility/storagehelper";
const POKEDEX_KEY = GlobalData.pokedexKey;
const FAVDEX_KEY = GlobalData.favdex.favdexKey;

export default function RenderAbout() {
    const [showConfirm, setShowConfirm] = useState(false)
    const [message, setMessage] = useState("");

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
        setShowConfirm(false);
        showMessage("FavDex data cleared.");
    }

    return (
        <div
            className="text-white">
            <RenderNav homeview={false} />
            {message && <div>{message}</div>}
            <section>
                <h2>About FavDex</h2>
                <p>YOUR DESCRIPTION</p>
                <p>Built with React and PokéAPI.</p>
            </section>

            <section>
                <h2>How it Works</h2>
                <ul>
                    <li>Search any Pokémon</li>
                    <li>Add them to your FavDex</li>
                    <li>Track progress and earn berries</li>
                </ul>
            </section>

            <section>
                <h2>Your Data</h2>
                <p>Everything is stored locally on your device. Nothing is sent anywhere.</p>

                <div>
                    <h3>Clear Pokédex Cache</h3>
                    <p>Refreshes Pokémon data from the API. Your FavDex is not affected.</p>
                    <button onClick={clearPokedexCache}>Clear Cache</button>
                </div>

                <div>
                    <h3>Clear FavDex Data</h3>
                    <p>Permanently deletes your favorites, berries, and progress.</p>
                    <button onClick={() => setShowConfirm(true)}>Clear FavDex</button>
                </div>
            </section>

            <section>
                <h2>Contact & Suggestions</h2>
                <p>Got a suggestion or found a bug?</p>
                <a href="YOUR_DISCORD_LINK" target="_blank" rel="noreferrer">Discord</a>
            </section>

            {showConfirm && (
                <div>
                    <p>This will delete all your FavDex data. This cannot be undone.</p>
                    <button onClick={() => setShowConfirm(false)}>Cancel</button>
                    <button onClick={clearFavdexData}>Yes, Delete Everything</button>
                </div>
            )}

        </div>
    )
}