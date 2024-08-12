import { Button } from './components/ui/button'
import { useScreenContext } from './components/screen-state-context'
import { SCREEN_STATE } from './constants'

export const StartScreen = () => {
  const { screen, setScreen } = useScreenContext()

  return (
    <div className='space-y-8'>
      <p>{screen}</p>
      <div className='flex flex-col space-y-4'>
        <Button onClick={() => setScreen(SCREEN_STATE.CHARACTER)}>Start</Button>
      </div>
    </div>
  )
}
