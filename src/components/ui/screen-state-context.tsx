import { ScreenState } from '@/constants'
import { createContext, useContext } from 'react'

export interface ScreenContext {
  screen: ScreenState
  setScreen: (screen: ScreenState) => void
}

export const ScreenStateContext = createContext<ScreenContext>({
  screen: 'start',
  setScreen: () => {},
})

export const useScreenContext = () => useContext(ScreenStateContext)
