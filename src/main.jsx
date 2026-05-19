import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PokeContext, PokeProvider } from './Components/Hooks/PokedexContext.jsx'
import { useContext } from 'react'

createRoot(document.getElementById('root')).render(
    <PokeProvider>
        <App />
    </PokeProvider>
);

