import { RenderHome } from "./Components/Home.jsx";
import { RenderNav } from "./Components/Navbar.jsx";
import { RenderFavdex } from "./Components/Otherpages/Favouraites.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './app.css';

export default function App() {
    return (
        <BrowserRouter>
            <RenderNav />
            <Routes>
                <Route path="/" element={<RenderHome />}/>
                <Route path="/favdex" element={<RenderFavdex />}/>
                <Route path="/about" element={<div>hey</div>}/>
            </Routes>
        </BrowserRouter>
    )
}