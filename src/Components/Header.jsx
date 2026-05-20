import { RenderSearchbar } from "./Seachbar.jsx"
import { RenderFilterStrip } from "./FilterStrip.jsx"
import { GlobalData } from "../Utility/GlobalData.js";
import { RenderBerry } from "./FeedingStrip.jsx";
import { favdexStorage } from "../Utility/Favdex.js";
import { getItem } from "../Utility/storagehelper.js";
import { RenderNav } from "./Navbar.jsx";
import '../ComponentCSS/Header.css'
export function RenderHeader() {
    const { favdexKey } = GlobalData.favdex
    const berries = getItem(favdexKey)?.berries ?? favdexStorage.berries;
    return (
        <header className="header-grid mb-1">
            <RenderNav />
            <RenderSearchbar />
            <RenderBerry count={berries} />
            <RenderFilterStrip array={GlobalData.types} />
        </header>
    )
}