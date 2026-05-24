import { RenderHome } from "./Components/Home.jsx";
import { RenderFavdex } from "./Components/Otherpages/Favouraites.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import RenderAbout from "./Components/Otherpages/About.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <div className=""
            style={{ background: 'var(--gradient-page)' }}>
                <Routes>
                    <Route path="/" element={<RenderHome />} />
                    <Route path="/favdex" element={<RenderFavdex />} />
                    <Route path="/about" element={<RenderAbout />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}