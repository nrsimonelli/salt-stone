import { StartScreen } from './start-screen'
import { SCREEN_STATE } from './constants'
import { CharacterSelect } from './character-select'
import { usePlayerDataContext } from './components/player-data-context'
import { useScreenContext } from './components/screen-state-context'
import { MockBattle } from './mock-battle'

function App() {
  // TEMP for debugging
  const { playerData } = usePlayerDataContext()
  const { screen } = useScreenContext()

  return (
    <div className='flex flex-col items-center justify-center space-y-8 '>
      <p>SALT STONE</p>
      <p>SCREEN: {screen}</p>
      {screen === SCREEN_STATE.START && <StartScreen />}
      {screen === SCREEN_STATE.CHARACTER && <CharacterSelect />}
      {screen === SCREEN_STATE.PLANNING && <MockBattle />}
      {screen === SCREEN_STATE.BATTLE && <StartScreen />}
      {screen === SCREEN_STATE.VICTORY && <StartScreen />}
      {screen === SCREEN_STATE.DEFEAT && <StartScreen />}

      {/* TEMP for debugging */}
      <div>
        <pre>{JSON.stringify(playerData, undefined, 2)}</pre>
      </div>
      {/* End TEMP */}
    </div>
  )
}

export default App
