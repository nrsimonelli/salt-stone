import { useState } from 'react'
import { Button } from './components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select'
import {
  calculateCritChance,
  calculateHitChance,
  cn,
  getRandomInt,
} from './lib/utils'

const sampleAbilities = [
  {
    name: 'heal',
    description: 'a moderate heal',
    physicalPotency: 0,
    magicalPotency: 50,
    accuracy: 100,
    hits: 1,
    traits: [],
    target: 'self',
  },
  {
    name: 'double hit',
    description: 'hits twice',
    physicalPotency: 75,
    magicalPotency: 0,
    accuracy: 100,
    hits: 2,
    traits: [],
    target: 'single',
  },
  {
    name: 'magic missile',
    description: 'single target magic attack',
    physicalPotency: 0,
    magicalPotency: 100,
    accuracy: 100,
    hits: 1,
    traits: [],
    target: 'single',
  },
  {
    name: 'heart seeker',
    description: 'swift attack that never misses',
    physicalPotency: 80,
    magicalPotency: 0,
    accuracy: true,
    hits: 1,
    traits: [],
    target: 'single',
  },
  {
    name: 'piercing strike',
    description: 'a percise strike that cannot be guarded',
    physicalPotency: 100,
    magicalPotency: 0,
    accuracy: 100,
    hits: 1,
    traits: ['unguardable'],
    target: 'single',
  },
  {
    name: 'crushing blade',
    description: 'heavy strike that ignores 50% of defense',
    physicalPotency: 150,
    magicalPotency: 0,
    accuracy: 90,
    hits: 1,
    traits: [],
    target: 'single',
  },
]

// todo: standardize this and move to constants...
// [HP, P.ATK, M.ATK, CRIT, SPD, ACC, EVA, P.DEF, M.DEF, GUARD]
// { key: 'HP', label: 'HP', 'full': 'Health points'}

export const Demo = () => {
  const [debug, setDebug] = useState(false)
  const [demoData, setDemoData] = useState({
    player: {
      stats: {
        hp: 100,
        pAtk: Math.round(Math.max(Math.random() * 79, 1)),
        mAtk: Math.round(Math.max(Math.random() * 63, 1)),
        crit: Math.round(Math.max(Math.random() * 40, 1)),
        speed: Math.round(Math.max(Math.random() * 54, 1)),
        accuracy: Math.round(Math.max(Math.random() * 182, 1)),
        evade: Math.round(Math.max(Math.random() * 102, 1)),
        pDef: Math.round(Math.max(Math.random() * 57, 1)),
        mDef: Math.round(Math.max(Math.random() * 70, 1)),
        guard: Math.round(Math.max(Math.random() * 40, 1)),
      },
      abilities: sampleAbilities,
    },
    enemy: {
      stats: {
        hp: 100,
        pAtk: Math.round(Math.max(Math.random() * 79, 1)),
        mAtk: Math.round(Math.max(Math.random() * 63, 1)),
        crit: Math.round(Math.max(Math.random() * 40, 1)),
        speed: Math.round(Math.max(Math.random() * 54, 1)),
        accuracy: Math.round(Math.max(Math.random() * 182, 1)),
        evade: Math.round(Math.max(Math.random() * 102, 1)),
        pDef: Math.round(Math.max(Math.random() * 57, 1)),
        mDef: Math.round(Math.max(Math.random() * 70, 1)),
        guard: Math.round(Math.max(Math.random() * 40, 1)),
      },
      abilities: sampleAbilities,
    },
  })

  const [playerHp, setPlayerHp] = useState(demoData.player.stats.hp)
  const [enemyHp, setEnemyHp] = useState(demoData.enemy.stats.hp)
  const [moveHistory, setMoveHistory] = useState<
    {
      character: 'player' | 'enemy'
      ability: string
      chance: {
        hitChance: number
        critChance: number
        guardChance: number
      }
      result: {
        hit: boolean
        crit: boolean
        guard: boolean
        damage: number
      }
    }[]
  >([])
  const [currentTurn, setCurrentTurn] = useState<'player' | 'enemy'>('player')
  const [playerSelectedAbility, setPlayerSelectedAbility] = useState<
    string | null
  >(null)
  const [enemySelectedAbility, setEnemySelectedAbility] = useState<
    string | null
  >(null)

  const handleReset = () => {
    setDemoData({
      player: {
        stats: {
          hp: 100,
          pAtk: Math.round(Math.max(Math.random() * 79, 1)),
          mAtk: Math.round(Math.max(Math.random() * 63, 1)),
          crit: Math.round(Math.max(Math.random() * 40, 1)),
          speed: Math.round(Math.max(Math.random() * 54, 1)),
          accuracy: Math.round(Math.max(Math.random() * 182, 1)),
          evade: Math.round(Math.max(Math.random() * 102, 1)),
          pDef: Math.round(Math.max(Math.random() * 57, 1)),
          mDef: Math.round(Math.max(Math.random() * 70, 1)),
          guard: Math.round(Math.max(Math.random() * 40, 1)),
        },
        abilities: sampleAbilities,
      },
      enemy: {
        stats: {
          hp: 100,
          pAtk: Math.round(Math.max(Math.random() * 79, 1)),
          mAtk: Math.round(Math.max(Math.random() * 63, 1)),
          crit: Math.round(Math.max(Math.random() * 40, 1)),
          speed: Math.round(Math.max(Math.random() * 54, 1)),
          accuracy: Math.round(Math.max(Math.random() * 182, 1)),
          evade: Math.round(Math.max(Math.random() * 102, 1)),
          pDef: Math.round(Math.max(Math.random() * 57, 1)),
          mDef: Math.round(Math.max(Math.random() * 70, 1)),
          guard: Math.round(Math.max(Math.random() * 40, 1)),
        },
        abilities: sampleAbilities,
      },
    })
    setPlayerHp(100)
    setEnemyHp(100)
    setMoveHistory([])
    setCurrentTurn('player')
    setPlayerSelectedAbility(null)
    setEnemySelectedAbility(null)
  }

  const handleMove = () => {
    const activeAbility =
      currentTurn === 'player' ? playerSelectedAbility : enemySelectedAbility
    const moveTakerStats =
      currentTurn === 'player' ? demoData.player.stats : demoData.enemy.stats
    const moveTargetStats =
      currentTurn === 'player' ? demoData.enemy.stats : demoData.player.stats
    const activeAbilityStats = sampleAbilities.find(
      (ability) => ability.name === activeAbility
    )

    if (!activeAbilityStats) {
      return console.error('no ability stats found')
    }

    const hitChance =
      typeof activeAbilityStats?.accuracy === 'number'
        ? calculateHitChance(
            moveTakerStats.accuracy,
            moveTargetStats.evade,
            activeAbilityStats?.accuracy
          )
        : 100
    const critChance = calculateCritChance(moveTakerStats.crit, [0])
    const guardChance = moveTargetStats.guard

    const hit = getRandomInt() <= hitChance
    const crit = getRandomInt() <= critChance
    const guard = getRandomInt() <= guardChance

    const calculateDamage = () => {
      if (!hit) {
        return 0
      }

      const physicalDamage =
        activeAbilityStats.physicalPotency === 0
          ? 0
          : moveTakerStats.pAtk * (activeAbilityStats.physicalPotency / 100) -
            moveTargetStats.pDef
      const magicalDamage =
        activeAbilityStats?.magicalPotency === 0
          ? 0
          : moveTakerStats.mAtk * (activeAbilityStats.magicalPotency / 100) -
            moveTargetStats.mDef

      const damage =
        Math.round(physicalDamage + magicalDamage) *
        (crit ? 3 : 1) *
        (guard ? 0.5 : 1)
      return damage
    }

    const move = {
      character: currentTurn,
      ability: activeAbility ?? '',
      chance: {
        hitChance,
        critChance,
        guardChance,
      },
      result: {
        hit,
        crit,
        guard,
        damage: calculateDamage(),
      },
    }

    if (currentTurn === 'player') {
      setEnemyHp(enemyHp - move.result.damage)
    } else {
      setPlayerHp(playerHp - move.result.damage)
    }

    setMoveHistory((prev) => [...prev, move])
    setCurrentTurn(currentTurn === 'player' ? 'enemy' : 'player')
  }

  const shouldDisableMoveConfirmation =
    (currentTurn === 'enemy' && !enemySelectedAbility) ||
    (currentTurn === 'player' && !playerSelectedAbility)

  return (
    <div className='border border-black flex-col flex items-center w-full *-[div]:border *-[div]:border-blue-400 space-y-2'>
      <p>Mock Battle</p>

      <div className='flex flex-row flex-wrap w-full max-w-[1040px]'>
        <div className='flex flex-1 flex-col bg-blue-500 p-8'>
          <p className='font-bold self-center'>
            PLAYER: {playerHp} / {demoData.player.stats.hp}
          </p>
          <div className='flex-row flex space-x-2'>
            <div className='flex-col flex flex-1'>
              {Object.entries(demoData.player.stats).map(([key, value]) => (
                <div className='inline-flex justify-between w-32'>
                  <p>{key}:</p>
                  <p className='w-8'>{value}</p>
                </div>
              ))}
            </div>
            <div className='flex-col flex flex-1'>
              <div>
                <Select
                  disabled={currentTurn !== 'player'}
                  onValueChange={(value) => setPlayerSelectedAbility(value)}
                >
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Select an ability...' />
                  </SelectTrigger>
                  <SelectContent>
                    {demoData.player.abilities.map((ability) => (
                      <SelectItem
                        className='capitalize'
                        key={ability.name}
                        value={ability.name}
                      >
                        {ability.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-1 flex-col items-end bg-red-500 p-8'>
          <p className='font-bold self-center'>
            ENEMY: {enemyHp} / {demoData.enemy.stats.hp}
          </p>
          <div className='flex-row flex space-x-2'>
            <div className='flex-col flex'>
              {Object.entries(demoData.enemy.stats).map(([key, value]) => (
                <div className='inline-flex justify-between w-32'>
                  <p>{key}:</p>
                  <p className='w-8'>{value}</p>
                </div>
              ))}
            </div>
            <div className='flex-col flex flex-1'>
              <div>
                <Select
                  disabled={currentTurn !== 'enemy'}
                  onValueChange={(value) => setEnemySelectedAbility(value)}
                >
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Select an ability...' />
                  </SelectTrigger>
                  <SelectContent>
                    {demoData.enemy.abilities.map((ability) => (
                      <SelectItem
                        className='capitalize'
                        key={ability.name}
                        value={ability.name}
                      >
                        {ability.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full text-center py-2'>
          <Button disabled={shouldDisableMoveConfirmation} onClick={handleMove}>
            Confirm
          </Button>
        </div>
      </div>

      <div>
        <p>move history</p>
        <div className='flex flex-col space-y-2'>
          {moveHistory.map((move, index) => (
            <div
              key={index}
              className={cn(
                'flex flex-col',
                move.character === 'player' ? 'bg-blue-500' : 'bg-red-500'
              )}
            >
              <p>
                <span className='font-bold'>{move.ability} </span>
                {!move.result.hit
                  ? 'missed'
                  : move.result.crit
                  ? 'crit'
                  : 'hit'}{' '}
                for {move.result.damage}{' '}
                {move.result.guard ? 'guarded damage.' : 'damage.'}
              </p>

              <p className='font-bold'>{move.result.crit ? 'crit' : ''}</p>
              <p className='font-bold'>{move.result.guard ? 'guard' : ''}</p>
              <p className='italics'>hit Chance: {move.chance.hitChance}%</p>
              <p className='italics'>crit Chance: {move.chance.critChance}%</p>
              <p className='italics'>
                guard Chance: {move.chance.guardChance}%
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='space-x-2'>
        <Button variant={'outline'} onClick={() => setDebug(!debug)}>
          Debug
        </Button>
        <Button onClick={handleReset}>Reset</Button>
        <div>
          {debug && <pre>{JSON.stringify(demoData, undefined, 2)}</pre>}
        </div>
      </div>
    </div>
  )
}
