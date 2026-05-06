import { RenderSearchbar } from "./Seachbar.jsx"
import { RenderFilterStrip } from "./FilterStrip.jsx"
import { GlobalData } from "../Utility/GlobalData.js";
import { RenderBerry } from "./FeedingStrip.jsx";
import { favdexStorage } from "../Utility/Favdex.js";
import { getItem } from "../Utility/storagehelper.js";
export function RenderHeader() {
    const { favdexKey } = GlobalData.favdex
    const berries = getItem(favdexKey)?.berries ?? favdexStorage.berries;
    return (
        <header className="grid">
            <RenderSearchbar />
            <RenderBerry count={berries} />
            <RenderFilterStrip array={GlobalData.types} />
        </header>
    )
}