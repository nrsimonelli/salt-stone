import { useState } from 'react'
import { usePlayerDataContext } from './components/player-data-context'
import { Button } from './components/ui/button'
import { STARTER_ENEMIES } from './constants'
import { calculateHitChance, cn } from './lib/utils'

const generateRandomEnemy = () => {
  const hp = Math.round(Math.max(Math.random() * 10, 1))

  return {
    ...STARTER_ENEMIES.RED_GOBLIN,
    stats: {
      hp: hp,
      attack: Math.round(Math.max(Math.random() * 10, 1)),
      crit: Math.round(Math.max(Math.random() * 10, 1)),
      speed: Math.round(Math.max(Math.random() * 10, 1)),
      accuracy: Math.round(Math.max(Math.random() * 100, 1)),
      evade: Math.round(Math.max(Math.random() * 100, 1)),
      defense: Math.round(Math.max(Math.random() * 10, 1)),
      guard: Math.round(Math.max(Math.random() * 100, 1)),
    },
    maxHp: hp,
  }
}

export const MockBattle = () => {
  const { playerData } = usePlayerDataContext()

  const initialPlayerState = { ...playerData, maxHp: playerData.stats.hp }
  const initialEnemyState = [
    generateRandomEnemy(),
    generateRandomEnemy(),
    generateRandomEnemy(),
  ]

  const [playerState, setPlayerState] = useState(initialPlayerState)
  const [enemyState, setEnemyState] = useState(() => initialEnemyState)

  const [currentTurn, setCurrentTurn] = useState<'player' | 'enemy'>('player')
  const [selectedAbility, setSelectedAbility] = useState<number | null>(null)
  const [selectedEnemy, setSelectedEnemy] = useState<number | null>(null)

  const handleReset = () => {
    setPlayerState(initialPlayerState)
    setEnemyState(initialEnemyState)
  }

  const handleAbilityClick = (abilityIndex: number) => {
    console.log(abilityIndex)
    setSelectedAbility(abilityIndex)
  }

  const handleEnemySelect = (enemyIndex: number) => {
    setSelectedEnemy(enemyIndex)
  }

  const handleTurnAction = () => {
    // will need to actually roll for hit, crit, guard, and then deal corresponding damage.
  }

  return (
    <div className='w-full flex justify-center flex-col items-center'>
      <p>Mock Battle</p>
      <pre>
        {JSON.stringify(
          selectedAbility !== null
            ? playerState.abilities[selectedAbility]
            : null,
          undefined,
          2
        )}
      </pre>
      <pre>
        {JSON.stringify(
          selectedEnemy !== null ? enemyState[selectedEnemy].stats : null,
          undefined,
          2
        )}
      </pre>
      <div className='border flex-row flex-wrap border-red-500 flex w-full p-12'>
        <div className='w-full'>
          <p>
            hit chance:{' '}
            {calculateHitChance(
              playerState.stats.accuracy,
              enemyState[selectedEnemy ?? 0].stats.evade,
              playerState.abilities[selectedAbility ?? 0].accuracy
            )}
            %
          </p>
          <p>estimated damage: WIP</p>
        </div>
        <div className='flex justify-center items-center flex-1 flex-col space-y-1 border border-blue-500'>
          <p className='text-center'>
            {playerState.stats.hp} / {playerState.maxHp}
          </p>
          <div
            className={cn('rounded-full h-16 w-16', playerState.color)}
          ></div>
        </div>
        <div className='flex items-center flex-1 flex-col space-y-2 border border-blue-500'>
          {enemyState.map((enemy, index) => (
            <div key={`${enemy.name}-${index}`} className='space-y-1'>
              <p className='text-center'>
                {enemy.stats.hp} / {enemy.maxHp}
              </p>
              <div
                className={cn(
                  'rounded-full h-16 w-16',
                  enemy.color,
                  index === selectedEnemy && 'ring'
                )}
                onClick={() => handleEnemySelect(index)}
              ></div>
            </div>
          ))}
        </div>

        <div className='w-full flex flex-col'>
          <p>Abilities</p>
          {playerState.abilities.map((ability, index) => (
            <div
              key={`${ability.name}-${index}`}
              className='inline-flex space-x-2'
            >
              <Button
                disabled={currentTurn !== 'player'}
                onClick={() => handleAbilityClick(index)}
              >
                {ability.name}
              </Button>
              <div>
                <p>
                  {ability.potency} / {ability.hits}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Button
          disabled={selectedAbility === null || selectedEnemy === null}
          onClick={handleTurnAction}
        >
          Confirm
        </Button>
      </div>
      <Button onClick={handleReset}>Reset</Button>
    </div>
  )
}
