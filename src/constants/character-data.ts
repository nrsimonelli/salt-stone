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

      defense: 2,
      guard: 5,
    },
    abilities: [
      {
        name: 'basic slash',
        description: 'a basic attack',
        potency: 100,
        accuracy: 100,
        hits: 1,
      },
      {
        name: 'double hit',
        description: 'hits twice',
        potency: 60,
        accuracy: 100,
        hits: 2,
      },
    ],
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

      defense: 4,
      guard: 35,
    },
    abilities: [
      {
        name: 'double hit',
        description: 'hits twice',
        potency: 60,
        accuracy: 100,
        hits: 2,
      },
    ],
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

      defense: 3,
      guard: 20,
    },
    abilities: [
      {
        name: 'double hit',
        description: 'hits twice',
        potency: 60,
        accuracy: 100,
        hits: 2,
      },
    ],
  },
}

export const STARTER_ENEMIES = {
  RED_GOBLIN: {
    name: 'RED_GOBLIN',
    displayName: 'The Red Goblin',
    color: 'bg-red-500',

    stats: {
      hp: 3,
      attack: 3,

      crit: 5,
      speed: 4,

      accuracy: 100,
      evade: 30,

      defense: 2,
      guard: 15,
    },
    abilities: [
      {
        name: 'basic slash',
        description: 'a basic attack',
        potency: 100,
        accuracy: 100,
        hits: 1,
      },
      {
        name: 'double hit',
        description: 'hits twice',
        potency: 60,
        accuracy: 100,
        hits: 2,
      },
    ],
  },
}

export const STAT_KEYS = [
  'hp',
  'attack',
  'crit',
  'speed',
  'accuracy',
  'evade',
  'defense',
  'guard',
] as const
