import { IHolyGrailData } from 'd2-holy-grail/client/src/common/definitions/union/IHolyGrailData';

export type SaveFileStats = {
  [filename: string]: number | null,
}

export type Item = {
  name: string,
  type: string,
  inSaves: {[saveName: string]: ItemDetails[]},
}

export type ItemDetails = {
  ethereal: boolean,
  ilevel: number | null,
  socketed: boolean,
}

export type ItemsInSaves = {
  [itemName: string]: Item,
}

export type SavesHistory = {
  [saveName: string]: {
    items: ItemsInSaves,
  },
}

export type FileReaderResponse = {
  items: ItemsInSaves,
  ethItems: ItemsInSaves,
  stats: SaveFileStats,
  availableRunes: AvailableRunes,
}

export type RuneType = "r01" | "r02" | "r03" | "r04" | "r05" | "r06" | "r07" | "r08" | "r09" | "r10" |
  "r11" | "r12" | "r13" | "r14" | "r15" | "r16" | "r17" | "r18" | "r19" | "r20" |
  "r21" | "r22" | "r23" | "r24" | "r25" | "r26" | "r27" | "r28" | "r29" | "r30" |
  "r31" | "r32" | "r33";

export type AvailableRunes = {[runeId: string]: Item};

export type ParsedFileReaderResponse = {
  items: ItemsInSaves,
  ethItems: ItemsInSaves,
  stats: SaveFileStats,
  availableRunes: AvailableRunes
}

export type SilospenItem = {
  name: string,
  area: string,
  chance: string,
}

export type AllSilospenItems = {
  [itemName: string]: SilospenItem[],
}

/* eslint-disable no-unused-vars */
export enum GameMode {
  Both = 'both',
  Softcore = 'softcore',
  Hardcore = 'hardcore',
  Manual = 'manual',
}

export enum GrailType {
  Normal = 'normal',
  Ethereal = 'ethereal',
  Both = 'both',
  Each = 'each',
}

export enum GameVersion {
  Resurrected = 'Resurrected',
  Classic = 'Classic',
}
/* eslint-enable no-unused-vars */

export type Settings = {
  saveDir: string,
  lang: string,
  gameMode: GameMode,
  magicFind: Number,
  playersNumber: Number,
  grailType: GrailType,
  grailRunes: boolean,
  grailRunewords: boolean,
  gameVersion: GameVersion,
  onlyMissing: boolean,
  enableSounds: boolean,
}

export type HolyGrailSeed = IHolyGrailData & {
  runes?: Record<RuneType, string>,
  runewords?: {[runewordId: string]: string},
}

export type HolyGrailStats = {
  normal: SubStats,
  ethereal: SubStats,
  runes: Stats,
  runewords: Stats,
}

export type Stats = {
  exists: number,
  owned: number,
  remaining: number,
  percent: number,
}

export type SubStats = {
  armor: Stats,
  weapon: Stats,
  other: Stats,
  sets: Stats,
  total: Stats,
}

export type ItemNotes = {[itemName: string]: string};

export type RuneRecipe = {
  steps: RuneRecipeStep[];
}

export type RuneRecipeStep = {
  targetRune: RuneType,
  sourceRune: RuneType,
  inSaves: string[],
}