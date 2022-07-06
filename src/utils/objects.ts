import { IItem } from '@dschu012/d2s/lib/d2/types';
import { ISetItems, IUniqueArmors, IUniqueOther, IUniqueWeapons } from 'd2-holy-grail/client/src/common/definitions/union/IHolyGrailData';
import { runewordsMapping } from '../../electron/lib/runewordsMapping';
import { GameVersion, GrailType, HolyGrailSeed, HolyGrailStats, Item, ItemsInSaves, Settings, Stats, SubStats } from '../@types/main.d';

export const simplifyItemName = (name: string): string => name.replace(/[^a-z0-9]/gi, '').toLowerCase();
export const isRune = (item: Item | IItem): boolean => !!item.type && !!item.type.match(/^r[0-3][0-9]$/);

export type ItemNames = {[itemId: string]: {}};
type FlatItemsCache = {
  runes: ItemNames,
  runewords: ItemNames,
  armor: ItemNames,
  weapon: ItemNames,
  other: ItemNames,
  sets: ItemNames,
  all: ItemNames,
}
const flatItemsCache: FlatItemsCache = {
  runes: {},
  runewords: {},
  armor: {},
  weapon: {},
  other: {},
  sets: {},
  all: {},
};

// Flattens an object recursively, taking only the key names
export const flattenObject = (
  object: any,
  cacheKey: keyof FlatItemsCache | null = null
): ItemNames => {

  const _flattenObject = (object: any, flat: ItemNames) => {
    Object.keys(object).forEach((key: any) => {
      if (typeof object[key] === 'object' && Object.keys(object[key]).length > 0) {
        _flattenObject(object[key], flat);
      } else {
        flat[simplifyItemName(key)] = {};
      }
    });
  }

  if (!cacheKey || !flatItemsCache[cacheKey] || Object.keys(flatItemsCache[cacheKey]).length === 0) {
    const flat: {[itemId: string]: {}} = {};
    _flattenObject(object, flat);
    if (cacheKey) {
      flatItemsCache[cacheKey] = flat;
      return flatItemsCache[cacheKey];
    }
    return flat;
  }

  return flatItemsCache[cacheKey];
}

type StatsColl = {
  normal: Stats,
  ethereal: Stats,
  runes: Stats,
  runewords: Stats,
}

export const computeSubStats = (
  items: ItemsInSaves,
  template: {[itemId: string]: {}} | IUniqueArmors | IUniqueWeapons | IUniqueOther | ISetItems,
  settings: Settings,
  cacheKey: keyof FlatItemsCache | null,
): StatsColl => {
  const flat = flattenObject(template, cacheKey);

  let runesCount = 0;
  const runesFound: {[runeId: string]: boolean} = {};
  let runewordsCount = 0;
  const runewordsFound: {[runewordId: string]: boolean} = {};
  let normalCount = 0;
  const normalFound: {[itemId: string]: boolean} = {};
  let etherealCount = 0;
  const etherealFound: {[itemId: string]: boolean} = {};

  Object.keys(flat).forEach(itemId => {
    const item = items[itemId];
    if (!item) {
      return;
    }

    // runes
    if (item.type && isRune(item) && settings.grailRunes && !runesFound[itemId]) {
      runesCount++;
      runesFound[item.name] = true;
      return;
    }

    // runewords
    if (
      settings.grailRunewords &&
      item.type === 'runeword' &&
      !runewordsFound[itemId] &&
      !(settings.gameVersion == GameVersion.Classic && runewordsMapping[item.name].patch === 2.4)
    ) {
      runewordsCount++;
      runewordsFound[item.name] = true;
      return;
    }

    // items
    let isEthereal = false;
    let isNormal = false;

    for (const saveName in item.inSaves) {
      const saveItems = item.inSaves[saveName];
      for (const itemInSave of saveItems) {
        if (itemInSave.ethereal) {
          isEthereal = true;
        } else {
          isNormal = true;
        }
      }
    }

    if (settings.grailType === GrailType.Both && !normalFound[itemId]) {
      normalCount++;
      normalFound[itemId] = true;
    } else {
      if (isEthereal && (settings.grailType === GrailType.Ethereal || settings.grailType === GrailType.Each) && !etherealFound[itemId]) {
        etherealCount++;
        etherealFound[itemId] = true;
      }
      if (isNormal && (settings.grailType === GrailType.Normal || settings.grailType === GrailType.Each) && !normalFound[itemId]) {
        normalCount++;
        normalFound[itemId] = true;
      } 
    }
  });

  const runesExists = settings.grailRunes ? 33 : 0;
  const runewordsExists = settings.grailRunewords
    ? settings.gameVersion === GameVersion.Resurrected ? 85 : 78
    : 0;
  const normalExists = settings.grailType !== GrailType.Ethereal ? Object.keys(flat).length : 0;
  const etherealExists = settings.grailType === GrailType.Ethereal || settings.grailType === GrailType.Each
    ? Object.keys(flat).length
    : 0;

  const runesPercent = !runesExists ? 0 : (runesCount / runesExists) * 100;
  const runewordsPercent = !runewordsExists ? 0 : (runewordsCount / runewordsExists) * 100;
  const normalPercent = !normalExists ? 0 : (normalCount / normalExists) * 100;
  const etherealPercent = !etherealExists ? 0 : (etherealCount / etherealExists) * 100;

  return {
    normal: {
      exists: normalExists,
      owned: normalCount,
      percent: normalPercent > 99.5 && normalPercent < 100 ? 99 : Math.round(normalPercent),
      remaining: normalExists - normalCount,
    },
    ethereal: {
      exists: etherealExists,
      owned: etherealCount,
      percent: etherealPercent > 99.5 && etherealPercent < 100 ? 99 : Math.round(etherealPercent),
      remaining: etherealExists - etherealCount,
    },
    runes: {
      exists: runesExists,
      owned: runesCount,
      percent: runesPercent > 99.5 && runesPercent < 100 ? 99 : Math.round(runesPercent),
      remaining: runesExists - runesCount,
    },
    runewords: {
      exists: runewordsExists,
      owned: runewordsCount,
      percent: runewordsPercent > 99.5 && runewordsPercent < 100 ? 99 : Math.round(runewordsPercent),
      remaining: runewordsExists - runewordsCount,
    },
  };
}

export const computeStats = (
  items: ItemsInSaves,
  template: HolyGrailSeed,
  settings: Settings
): HolyGrailStats => {
  const runesStats = computeSubStats(items, template.runes || {}, settings, 'runes');
  const runewordsStats = computeSubStats(items, template.runewords || {}, settings, 'runewords');
  const armorStats = computeSubStats(items, template.uniques.armor, settings, 'armor');
  const weaponStats = computeSubStats(items, template.uniques.weapons, settings, 'weapon');
  const otherStats = computeSubStats(items, template.uniques.other, settings, 'other');
  const setsStats = computeSubStats(items, template.sets, settings, 'sets');
  const normalExists = armorStats.normal.exists + weaponStats.normal.exists + otherStats.normal.exists + setsStats.normal.exists;
  const etherealExists = armorStats.ethereal.exists + weaponStats.ethereal.exists + otherStats.ethereal.exists + setsStats.ethereal.exists;
  const normalOwned = armorStats.normal.owned + weaponStats.normal.owned + otherStats.normal.owned + setsStats.normal.owned;
  const etherealOwned = armorStats.ethereal.owned + weaponStats.ethereal.owned + otherStats.ethereal.owned + setsStats.ethereal.owned;
  const normalPercent = !normalExists ? 0 : (normalOwned / normalExists) * 100;
  const etherealPercent = !etherealExists ? 0 : (etherealOwned / etherealExists) * 100;
  return {
    normal: {
      armor: armorStats.normal,
      weapon: weaponStats.normal,
      other: otherStats.normal,
      sets: setsStats.normal,
      total: {
        exists: normalExists,
        owned: normalOwned,
        percent: normalPercent > 99.5 && normalPercent < 100 ? 99 : Math.round(normalPercent),
        remaining: normalExists - normalOwned,
      }
    },
    ethereal: {
      armor: armorStats.ethereal,
      weapon: weaponStats.ethereal,
      other: otherStats.ethereal,
      sets: setsStats.ethereal,
      total: {
        exists: etherealExists,
        owned: etherealOwned,
        percent: etherealPercent > 99.5 && etherealPercent < 100 ? 99 : Math.round(etherealPercent),
        remaining: etherealExists - etherealOwned,
      }
    },
    runes: runesStats.runes,
    runewords: runewordsStats.runewords,
  };
}

