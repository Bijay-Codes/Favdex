import { NavLink } from "react-router-dom"

export function RenderNav({ homeview = true }) {
    const link = `text-(--text-secondary)`;
    const activeLink = `text-(--text-primary)
     underline decoration-(--accent) decoration-3 underline-offset-2
     `;
    return (
        <nav className={`nav-bar ${homeview ? '' : ''} flex gap-6 mr-6`}>
            <span className="text-(--accent) text-2xl">Favdex</span>
            <div className="ml-auto flex justify-evenly gap-4 text-md">
                <NavLink to='/' className={({ isActive }) => isActive ? activeLink : link}>Home</NavLink>
                <NavLink to='/favdex' className={({ isActive }) => isActive ? activeLink : link}>Favdex</NavLink>
                <NavLink to='/about' className={({ isActive }) => isActive ? activeLink : link}>About</NavLink>
            </div>
        </nav>
    )
}