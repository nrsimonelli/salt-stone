import { createContext, useContext } from 'react'

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
    protection: 0,
    guard: 0,
  },
  abilities: [],
  skills: [],
}

export const PlayerDataContext = createContext<PlayerDataContext>({
  playerData: defaultPlayerData,
  setPlayerData: () => {},
})

export const usePlayerDataContext = () => useContext(PlayerDataContext)
