import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateHitChance(
  acc: number,
  evade: number,
  skillAcc: number
) {
  const hitChance = Math.round((Math.max(acc - evade, 1) / skillAcc) * 100)
  // returns a hit chance between 1 and 100, representing % chance to hit
  return Math.min(hitChance, 100)
}

export function calculateCritChance(crit: number, modifiers: number[]) {
  const critChance = crit + modifiers.reduce((acc, mod) => acc + mod, 0)
  // returns a crit chance between 0 and 100, representing % chance to crit
  return Math.round(Math.min(critChance, 100))
}

export function calculateAttackDamage(
  atk: number,
  def: number,
  skillPotency: number,
  atkModifiers: number[],
  defModifiers: number[]
) {
  // tbd modifiers
  const modifiedAtk = atk + atkModifiers.reduce((acc, mod) => acc + mod, 0)
  const modifiedDef = def + defModifiers.reduce((acc, mod) => acc + mod, 0)
  const damage = (modifiedAtk - modifiedDef) / skillPotency
  return Math.round(damage)
}

// Critical damage = x2-3?
// Guard = 50% damage reduction
