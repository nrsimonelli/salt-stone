export const SCREEN_STATE = {
  START: 'start',
  SETTINGS: 'settings',
  CHARACTER: 'character',
  PLANNING: 'planning',
  BATTLE: 'battle',
  VICTORY: 'victory',
  DEFEAT: 'defeat',
} as const

export type ScreenState = (typeof SCREEN_STATE)[keyof typeof SCREEN_STATE]

export const STAT_KEYS = [
  'hp',
  'attack',
  'crit',
  'speed',
  'accuracy',
  'evade',
  'protection',
  'guard',
] as const

export const STARTER_CHARACTERS = {
  GREEN: {
    name: 'GREEN',
    displayName: 'The Green Knight',
    color: 'bg-green-500',
    stats: {
      hp: 5,
      attack: 4,

      crit: 7,
      speed: 6,

      accuracy: 105,
      evade: 55,

      protection: 5,
      guard: 5,
    },
  },
  BLUE: {
    name: 'BLUE',
    displayName: 'The Blue Knight',
    color: 'bg-blue-500',

    stats: {
      hp: 7,
      attack: 5,

      crit: 5,
      speed: 2,

      accuracy: 95,
      evade: 20,

      protection: 20,
      guard: 35,
    },
  },
  RED: {
    name: 'RED',
    displayName: 'The Red Knight',
    color: 'bg-red-500',

    stats: {
      hp: 5,
      attack: 6,

      crit: 5,
      speed: 4,

      accuracy: 100,
      evade: 40,

      protection: 15,
      guard: 20,
    },
  },
}
