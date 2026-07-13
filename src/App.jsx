import { RenderHome } from "./Components/Home.jsx";
import { RenderFavdex } from "./Components/Otherpages/Favorites.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import RenderAbout from "./Components/Otherpages/About.jsx";
import { Navigate } from "react-router-dom";
export default function App() {
    return (
        <BrowserRouter>
            <div className="w-full m-auto h-screen"
                style={{ background: 'var(--gradient-page)' }}>
                <Routes>
                    <Route path="/" element={<RenderHome />} />
                    <Route path="/favdex" element={<RenderFavdex />} />
                    <Route path="/about" element={<RenderAbout />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}