import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SCREEN_STATE, STARTER_CHARACTERS } from '@/constants'
import { cn } from '@/lib/utils'
import { useScreenContext } from './components/ui/screen-state-context'

type CharacterKey = keyof typeof STARTER_CHARACTERS

export const CharacterSelect = () => {
  const { setScreen } = useScreenContext()
  const [currentSelection, setCurrentSelection] = useState<
    (typeof STARTER_CHARACTERS)[CharacterKey] | null
  >(null)

  const starterCharacterKeys = Object.keys(STARTER_CHARACTERS) as CharacterKey[]

  return (
    <div>
      {/* list of characters */}
      <div className='inline-flex'>
        {starterCharacterKeys.map((key) => {
          const { displayName, color } = STARTER_CHARACTERS[key]
          return (
            <div
              key={key}
              onClick={() => setCurrentSelection(STARTER_CHARACTERS[key])}
            >
              <div className={cn('h-20 w-20 rounded-full', color)}></div>
              <p>{displayName}</p>
            </div>
          )
        })}
      </div>

      {/* display of stats and attributes */}
      <div>STATS</div>
      {/* confirmation button */}
      <Button
        disabled={!currentSelection}
        onClick={() => setScreen(SCREEN_STATE.PLANNING)}
      >
        Select {currentSelection?.displayName ?? ''}
      </Button>
    </div>
  )
}
