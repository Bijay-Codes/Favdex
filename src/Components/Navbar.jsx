import { NavLink } from "react-router-dom"
export function RenderNav({homeview=true}) {
    return (
        <nav
            className={` grid-[nav] ${homeview?'nav-favdex':''} text-white"`}>
            <h1>
                FavDex, Where Pokèmon come Alive
            </h1>
            <div
                className="flex gap-2 ">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/favdex'>Favdex</NavLink>
                <NavLink to='/about'>About</NavLink>
            </div>
        </nav>
    )
}