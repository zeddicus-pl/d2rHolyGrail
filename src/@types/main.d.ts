import * as d2s from '@dschu012/d2s';

export type SaveFileStats = {
  [filename: string]: number | null,
}

export type ItemsInSaves = {
  [itemName: string]: {
    item: d2s.types.IItem,
    saveName: string[],
  }
}

export type FileReaderResponse = {
  items: ItemsInSaves,
  stats: SaveFileStats,
}

export type SilospenItem = {
  name: string,
  area: string,
  chance: string,
}
