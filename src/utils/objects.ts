import { ItemsInSaves } from '../@types/main.d';
import { IUniqueArmors, IUniqueWeapons, IUniqueOther, ISetItems, IHolyGrailData } from 'd2-holy-grail/client/src/common/definitions/union/IHolyGrailData';

export type Stats = {
  exists: number,
  owned: number,
  remaining: number,
  percent: number,
}

export const simplifyItemName = (name: string): string => name.replace(/[^a-z0-9]/gi, '').toLowerCase();

export const flattenObject = (object: any, flat: any) => {
  Object.keys(object).forEach((key: any) => {
    if (typeof object[key] === 'object' && Object.keys(object[key]).length > 0) {
      flattenObject(object[key], flat);
    } else {
      flat[simplifyItemName(key)] = {};
    }
  });
}

const countItems = (object: any, items: ItemsInSaves): { exists: number, owned: number } => {
  let exists = 0;
  let owned = 0;
  Object.keys(object).forEach((key: any) => {
    exists = exists + 1;
    if (items[key]) {
      owned = owned + 1;
    }
  });
  return { exists, owned };
}

export const computeStats = (
  items: ItemsInSaves,
  template: IUniqueArmors | IUniqueWeapons | IUniqueOther | ISetItems | IHolyGrailData
): Stats => {
  const flat = {};
  flattenObject(template, flat);
  const { exists, owned } = countItems(flat, items);
  const percent = (owned / exists) * 100;
  return {
    exists,
    owned,
    remaining: exists - owned,
    percent: percent > 99.5 && percent < 100 ? 99 : Math.round((owned / exists) * 100),
  }
}
