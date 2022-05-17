import { ISetItems, IUniqueArmors, IUniqueOther, IUniqueWeapons } from 'd2-holy-grail/client/src/common/definitions/union/IHolyGrailData';
import { runewordsMapping } from '../../electron/lib/runewordsMapping';
import { GameVersion, GrailType, HolyGrailSeed, HolyGrailStats, ItemsInSaves, Settings, Stats, SubStats } from '../@types/main.d';

export const simplifyItemName = (name: string): string => name.replace(/[^a-z0-9]/gi, '').toLowerCase();

export const flattenObject = (object: any, flat: {[itemId: string]: {}}) => {
  Object.keys(object).forEach((key: any) => {
    if (typeof object[key] === 'object' && Object.keys(object[key]).length > 0) {
      flattenObject(object[key], flat);
    } else {
      flat[simplifyItemName(key)] = {};
    }
  });
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
): StatsColl => {
  const flat: {[itemId: string]: {}} = {};
  flattenObject(template, flat);

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
    if (item.type && item.type.match(/^r[0-3][0-9]$/) && settings.grailRunes && !runesFound[itemId]) {
      runesCount++;
      runesFound[item.name] = true;
      return;
    }

    // runewords
    if (
      item.type === 'runeword' &&
      !runewordsFound[itemId] &&
      !(settings.gameVersion == GameVersion.Classic && settings.grailRunewords && runewordsMapping[item.name].patch === 2.4)
    ) {
      runewordsCount++;
      runewordsFound[item.name] = true;
      return;
    }

    // items
    if ((settings.grailType === GrailType.Ethereal || settings.grailType === GrailType.Each) && !etherealFound[itemId]) {
      etherealCount++;
      etherealFound[itemId] = true;
    } else if (!normalFound[itemId]) {
      normalCount++;
      normalFound[itemId] = true;
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

  const runesPercent = (runesCount / runesExists) * 100;
  const runewordsPercent = (runewordsCount / runewordsExists) * 100;
  const normalPercent = (normalCount / normalExists) * 100;
  const etherealPercent = (etherealCount / etherealExists) * 100;

  return {
    normal: {
      exists: normalExists,
      owned: normalCount,
      percent: normalPercent > 99.5 && normalPercent < 100 ? 99 : Math.round((normalCount / normalExists) * 100),
      remaining: normalExists - normalCount,
    },
    ethereal: {
      exists: etherealExists,
      owned: 0,
      percent: etherealPercent > 99.5 && etherealPercent < 100 ? 99 : Math.round((etherealCount / etherealExists) * 100),
      remaining: etherealExists - etherealCount,
    },
    runes: {
      exists: runesExists,
      owned: 0,
      percent: runesPercent > 99.5 && runesPercent < 100 ? 99 : Math.round((runesCount / runesExists) * 100),
      remaining: runesExists - runesCount,
    },
    runewords: {
      exists: runewordsExists,
      owned: 0,
      percent: runewordsPercent > 99.5 && runewordsPercent < 100 ? 99 : Math.round((runewordsCount / runewordsExists) * 100),
      remaining: runewordsExists - runewordsCount,
    },
  };
}

export const computeStats = (
  items: ItemsInSaves,
  template: HolyGrailSeed,
  settings: Settings
): HolyGrailStats => {
  const runesStats = computeSubStats(items, template.runes || {}, settings);
  const runewordsStats = computeSubStats(items, template.runewords || {}, settings);
  const armorStats = computeSubStats(items, template.uniques.armor, settings);
  const weaponStats = computeSubStats(items, template.uniques.weapons, settings);
  const otherStats = computeSubStats(items, template.uniques.other, settings);
  const setsStats = computeSubStats(items, template.sets, settings);
  const normalExists = armorStats.normal.exists + weaponStats.normal.exists + otherStats.normal.exists + setsStats.normal.exists;
  const etherealExists = armorStats.ethereal.exists + weaponStats.ethereal.exists + otherStats.ethereal.exists + setsStats.ethereal.exists;
  const normalOwned = armorStats.normal.owned + weaponStats.normal.owned + otherStats.normal.owned + setsStats.normal.owned;
  const etherealOwned = armorStats.ethereal.owned + weaponStats.ethereal.owned + otherStats.ethereal.owned + setsStats.ethereal.owned;
  const normalPercent = (normalOwned / normalExists) * 100;
  const etherealPercent = (etherealOwned / etherealExists) * 100;
  return {
    normal: {
      armor: armorStats.normal,
      weapon: weaponStats.normal,
      other: otherStats.normal,
      sets: setsStats.normal,
      total: {
        exists: normalExists,
        owned: normalOwned,
        percent: normalPercent > 99.5 && normalPercent < 100 ? 99 : Math.round((normalOwned / normalExists) * 100),
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
        percent: etherealPercent > 99.5 && etherealPercent < 100 ? 99 : Math.round((etherealOwned / etherealExists) * 100),
        remaining: etherealExists - etherealOwned,
      }
    },
    runes: runesStats.runes,
    runewords: runewordsStats.runewords,
  };
}

