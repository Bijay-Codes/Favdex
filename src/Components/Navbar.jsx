import { NavLink } from "react-router-dom"

export function RenderNav({ homeview = true }) {
    return (
        <nav className={`nav-bar ${homeview ? 'nav-favdex' : ''}`}>
            <span className="nav-brand">FavDex</span>
            <div className="nav-links">
                <NavLink to='/' className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
                <NavLink to='/favdex' className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Favdex</NavLink>
                <NavLink to='/about' className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
            </div>
        </nav>
    )
}