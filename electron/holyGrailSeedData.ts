import { IHolyGrailData } from 'd2-holy-grail/client/src/common/definitions/union/IHolyGrailData';
import { holyGrailSeedData as original } from 'd2-holy-grail/client/src/common/seeds/HolyGrailSeedData';

export const holyGrailSeedData: IHolyGrailData = {
  ...original,
  uniques: {
    ...original.uniques,
    other: {
      ...original.uniques.other,
      jewelry: {
        ...original.uniques.other.jewelry,
        rings: {
          "The Stone of Jordan": {},
          "Dwarf Star": {},
          "Raven Frost": {},
          "Bul-Kathos' Wedding Band": {},
          "Carrion Wind": {},
          "Nature's Peace": {},
          "Wisp Projector": {}
        },
      },
      "rainbow facet (jewel)": {
        "level up": {
          "Rainbow Facet: Cold Level-up": {},
          "Rainbow Facet: Fire Level-up": {},
          "Rainbow Facet: Lightning Level-up": {},
          "Rainbow Facet: Poison Level-up": {},
        },
        die: {
          "Rainbow Facet: Cold Death": {},
          "Rainbow Facet: Fire Death": {},
          "Rainbow Facet: Lightning Death": {},
          "Rainbow Facet: Poison Death": {},
        }
      },
    }
  } 
}
