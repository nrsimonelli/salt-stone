import { useState } from 'react'

import { StartScreen } from './start-screen'
import { ScreenStateContext } from './components/screen-state-context'
import { SCREEN_STATE, ScreenState } from './constants'
import { CharacterSelect } from './character-select'
import {
  defaultPlayerData,
  PlayerDataContext,
} from './components/player-data-context'

function App() {
  const [screen, setScreen] = useState<ScreenState>(SCREEN_STATE.START)
  const [playerData, setPlayerData] = useState(defaultPlayerData)

  return (
    <ScreenStateContext.Provider value={{ screen, setScreen }}>
      <PlayerDataContext.Provider value={{ playerData, setPlayerData }}>
        <div className='flex flex-col items-center justify-center space-y-8 '>
          <p>SALT STONE</p>
          <p>SCREEN: {screen}</p>
          {screen === SCREEN_STATE.START && <StartScreen />}
          {screen === SCREEN_STATE.CHARACTER && <CharacterSelect />}
          {screen === SCREEN_STATE.PLANNING && <StartScreen />}
          {screen === SCREEN_STATE.BATTLE && <StartScreen />}
          {screen === SCREEN_STATE.VICTORY && <StartScreen />}
          {screen === SCREEN_STATE.DEFEAT && <StartScreen />}

          <div>
            <pre>{JSON.stringify(playerData, undefined, 2)}</pre>
          </div>
        </div>
      </PlayerDataContext.Provider>
    </ScreenStateContext.Provider>
  )
}

export default App
