import { useState } from 'react'

import { StartScreen } from './start-screen'
import { ScreenStateContext } from './components/ui/screen-state-context'
import { SCREEN_STATE, ScreenState } from './constants'

function App() {
  const [screen, setScreen] = useState<ScreenState>(SCREEN_STATE.START)

  return (
    <ScreenStateContext.Provider value={{ screen, setScreen }}>
      <div className='flex flex-col items-center justify-center space-y-8 '>
        <p>SALT STONE</p>
        <p>SCREEN: {screen}</p>
        {screen === SCREEN_STATE.START && <StartScreen />}
        {screen === SCREEN_STATE.CHARACTER && <StartScreen />}
        {screen === SCREEN_STATE.PLANNING && <StartScreen />}
        {screen === SCREEN_STATE.BATTLE && <StartScreen />}
        {screen === SCREEN_STATE.VICTORY && <StartScreen />}
        {screen === SCREEN_STATE.DEFEAT && <StartScreen />}
      </div>
    </ScreenStateContext.Provider>
  )
}

export default App
