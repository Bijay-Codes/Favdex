import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { PokeProvider } from './Components/Hooks/PokedexContext.jsx';
import { Analytics } from '@vercel/analytics/react'
createRoot(document.getElementById('root')).render(
    <PokeProvider>
        <App />
        <Analytics />
    </PokeProvider>
);

