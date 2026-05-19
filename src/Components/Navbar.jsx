import { NavLink } from "react-router-dom"
export function RenderNav() {
    return (
        <nav
        className="bg-gray-700 text-white">
            <h1>
                FavDex, Where pokemon come Alive
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