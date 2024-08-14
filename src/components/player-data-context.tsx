import { createContext, FC, ReactNode, useContext, useState } from 'react'

import { PlayerData } from '@/constants'

export interface PlayerDataContext {
  playerData: PlayerData
  setPlayerData: (screen: PlayerData) => void
}

export const defaultPlayerData: PlayerData = {
  startingCharacter: '',
  displayName: '',
  stats: {
    hp: 0,
    attack: 0,
    crit: 0,
    speed: 0,
    accuracy: 0,
    evade: 0,
    defense: 0,
    guard: 0,
  },
  abilities: [],
  skills: [],
  color: '',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isPlayerData = (storedData: any): storedData is PlayerData => {
  return (
    typeof storedData === 'object' &&
    typeof storedData.startingCharacter === 'string' &&
    typeof storedData.displayName === 'string' &&
    typeof storedData.stats === 'object' &&
    typeof storedData.abilities === 'object' &&
    typeof storedData.skills === 'object'
  )
}

const getPlayerData = () => {
  const storedData = localStorage.getItem('playerData')

  if (!storedData) {
    return defaultPlayerData
  }

  const parsedData = JSON.parse(storedData)

  if (isPlayerData(parsedData)) {
    return parsedData
  }
  return defaultPlayerData
}

export const PlayerDataContext = createContext<PlayerDataContext>({
  playerData: defaultPlayerData,
  setPlayerData: () => {},
})

export const usePlayerDataContext = () => useContext(PlayerDataContext)

export const PlayerDataProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [playerData, setPlayerData] = useState<PlayerData>(() =>
    getPlayerData()
  )

  return (
    <PlayerDataContext.Provider
      value={{
        playerData,
        setPlayerData,
      }}
    >
      {children}
    </PlayerDataContext.Provider>
  )
}
