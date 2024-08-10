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
