import { useState } from 'react'
import { Button } from './components/ui/button'

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
    <div className='flex flex-col items-center justify-center space-y-8 '>
      <p>SALT STONE</p>
      {screen === SCREEN_STATE.START && (
        <div className='space-y-8'>
          <p>start screen</p>
          <div className='flex flex-col space-y-4'>
            <Button onClick={() => setScreen(SCREEN_STATE.CHARACTER)}>
              Start
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
