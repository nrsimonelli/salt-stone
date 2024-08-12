import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Layout } from './layout.tsx'
import './index.css'
import { PlayerDataProvider } from './components/player-data-context.tsx'
import { ScreenStateProvider } from './components/screen-state-context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout>
      <PlayerDataProvider>
        <ScreenStateProvider>
          <App />
        </ScreenStateProvider>
      </PlayerDataProvider>
    </Layout>
  </StrictMode>
)
