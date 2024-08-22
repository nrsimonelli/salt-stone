import { SCREEN_STATE } from '@/constants/phase-management'

interface AbilityData {
  name: string
  description: string
  potency: number
  accuracy: number
  hits: number
}

export interface PlayerData {
  startingCharacter: string
  displayName: string
  stats: {
    hp: number
    attack: number
    crit: number
    speed: number
    accuracy: number
    evade: number
    defense: number
    guard: number
  }
  abilities: AbilityData[]
  skills: string[]
  color: string
}

export type ScreenState = (typeof SCREEN_STATE)[keyof typeof SCREEN_STATE]
