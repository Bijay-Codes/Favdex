import { createRoot } from 'react-dom/client'
import './index.css'
import PokedexGrid from './App.jsx'
import { PokeProvider } from './Components/Hooks/PokedexContext.jsx'
createRoot(document.getElementById('root')).render(
    <PokeProvider>
        <PokedexGrid />
    </PokeProvider>
)