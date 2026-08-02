import { NavLink } from "react-router-dom"

export function RenderNav() {
    const link = `text-(--text-secondary) secondary-font lg:text-2xl`;
    const activeLink = `text-(--text-primary) lg:text-2xl
     underline decoration-(--accent) decoration-5 underline-offset-6 primary-font
     `;
    return (
        <nav className={`header-part [grid-area:nav]
             flex gap-2 justify-center items-center
             bg-(--bg-overlay)
             w-full md:gap-6 md:pr-5 pb-2 pr-2
             `}>
            <span className="text-(--accent) text-xl lg:text-3xl font-extrabold brand-font">Favdex</span>
            <div className="ml-auto flex justify-evenly gap-4">
                <NavLink to='/' className={({ isActive }) => isActive ? activeLink : link}>Home</NavLink>
                <NavLink to='/favdex' className={({ isActive }) => isActive ? activeLink : link}>Favdex</NavLink>
                <NavLink to='/about' className={({ isActive }) => isActive ? activeLink : link}>About</NavLink>
            </div>
        </nav>
    )
}