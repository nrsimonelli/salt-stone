import { useState } from 'react'

const SCREEN_STATE = {
  START: 'start',
  SETTINGS: 'settings',
  CHARACTER: 'character',
  PLANNING: 'planning',
  BATTLE: 'battle',
  VICTORY: 'victory',
  DEFEAT: 'defeat',
} as const

type ScreenState = (typeof SCREEN_STATE)[keyof typeof SCREEN_STATE]

function App() {
  const [screen, setScreen] = useState<ScreenState>(SCREEN_STATE.START)

  return (
    <div className='flex flex-col items-center justify-center min-h-screen space-y-8 bg-foreground text-background'>
      <p>SALT STONE</p>
      {screen === SCREEN_STATE.START && (
        <div className='space-y-8'>
          <p>start screen</p>
          <div className='flex flex-col space-y-4'>
            <button onClick={() => setScreen(SCREEN_STATE.CHARACTER)}>
              Start
            </button>
            <button onClick={() => setScreen(SCREEN_STATE.CHARACTER)}>
              Start
            </button>
            <button onClick={() => setScreen(SCREEN_STATE.CHARACTER)}>
              Start
            </button>
            <button onClick={() => setScreen(SCREEN_STATE.CHARACTER)}>
              Start
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
