import { SCREEN_STATE, ScreenState } from '@/constants'
import { createContext, FC, ReactNode, useContext, useState } from 'react'

export interface ScreenContext {
  screen: ScreenState
  setScreen: (screen: ScreenState) => void
}

export const ScreenStateContext = createContext<ScreenContext>({
  screen: 'start',
  setScreen: () => {},
})

export const useScreenContext = () => useContext(ScreenStateContext)

export const ScreenStateProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [screen, setScreen] = useState<ScreenState>(() => SCREEN_STATE.START)

  return (
    <ScreenStateContext.Provider value={{ screen, setScreen }}>
      {children}
    </ScreenStateContext.Provider>
  )
}
