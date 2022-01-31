import * as d2s from '@dschu012/d2s';

export type ItemsInSaves = {
  [itemName: string]: {
    item: d2s.types.IItem,
    saveName: string[],
  };
};
