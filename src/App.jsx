import { RenderHome } from "./Components/Home.jsx";
import { RenderFavdex } from "./Components/Otherpages/Favouraites.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './app.css';
import RenderAbout from "./Components/Otherpages/About.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RenderHome />} />
                <Route path="/favdex" element={<RenderFavdex />} />
                <Route path="/about" element={<RenderAbout />} />
            </Routes>
        </BrowserRouter>
    )
}