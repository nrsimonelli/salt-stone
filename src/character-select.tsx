import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SCREEN_STATE, STARTER_CHARACTERS, STAT_KEYS } from '@/constants'
import { cn } from '@/lib/utils'
import { useScreenContext } from './components/screen-state-context'
import { usePlayerDataContext } from './components/player-data-context'

type CharacterKey = keyof typeof STARTER_CHARACTERS
const starterCharacterKeys = Object.keys(STARTER_CHARACTERS) as CharacterKey[]

export const CharacterSelect = () => {
  const { setScreen } = useScreenContext()
  const { playerData, setPlayerData } = usePlayerDataContext()

  const [currentSelection, setCurrentSelection] = useState<
    (typeof STARTER_CHARACTERS)[CharacterKey] | null
  >(null)

  const handleCharacterSelect = (
    character: (typeof STARTER_CHARACTERS)[CharacterKey]
  ) => {
    setPlayerData({
      ...playerData,
      ...character,
    })
    setScreen(SCREEN_STATE.PLANNING)
  }

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
      {/* confirmation button */}
      <div className='space-y-1 py-4'>
        <div>STATS {currentSelection?.displayName ?? ''}</div>
        {STAT_KEYS.map((stat) => (
          <div>
            <p>
              {stat}: {currentSelection?.stats[stat] ?? 0}
            </p>
          </div>
        ))}
      </div>
      <Button
        disabled={!currentSelection}
        onClick={() => {
          if (currentSelection) handleCharacterSelect(currentSelection)
        }}
      >
        Select {currentSelection?.displayName ?? ''}
      </Button>
    </div>
  )
}
