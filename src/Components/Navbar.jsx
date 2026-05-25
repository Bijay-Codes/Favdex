import { NavLink } from "react-router-dom"

export function RenderNav() {
    const link = `text-(--text-secondary) lg:text-3xl`;
    const activeLink = `text-(--text-primary) lg:text-3xl
     underline decoration-(--accent) decoration-3 underline-offset-2
     `;
    return (
        <nav className={`header-part [grid-area:nav]
             flex gap-2 justify-center items-center
             bg-(--bg-overlay) lg:text-3xl
             w-full md:gap-6 md:pr-5 pb-2 pr-2`}>
            <span className="text-(--accent) text-2xl lg:text-5xl">Favdex</span>
            <div className="ml-auto flex justify-evenly gap-4 text-md lg:text-4xl">
                <NavLink to='/' className={({ isActive }) => isActive ? activeLink : link}>Home</NavLink>
                <NavLink to='/favdex' className={({ isActive }) => isActive ? activeLink : link}>Favdex</NavLink>
                <NavLink to='/about' className={({ isActive }) => isActive ? activeLink : link}>About</NavLink>
            </div>
        </nav>
    )
}