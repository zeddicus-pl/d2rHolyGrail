import { holyGrailSeedData as original } from 'd2-holy-grail/client/src/common/seeds/HolyGrailSeedData';
import { HolyGrailSeed, Settings } from '../../src/@types/main';
import { simplifyItemName } from '../../src/utils/objects';
import { runesMapping } from './runesMapping';
import { runewordsMapping } from './runewordsMapping';

export const runesSeed: {[runeId: string]: string} = {};
Object.keys(runesMapping).forEach(runeId => {
  runesSeed[runesMapping[runeId].name.toLowerCase()] = runeId;
})

export const runewordsSeed: {[runewordId: string]: string} = {};
Object.keys(runewordsMapping).forEach(runewordName => {
  runewordsSeed['runeword' + simplifyItemName(runewordName)] = runewordName;
})

export const getHolyGrailSeedData = (settings: Settings | null): HolyGrailSeed => {
  const holyGrailSeedData: HolyGrailSeed = {
    ...original,
    uniques: {
      ...original.uniques,
      other: {
        ...original.uniques.other,
        jewelry: {
          ...original.uniques.other.jewelry,
          rings: {
            Nagelring: {},
            "Manald Heal": {},
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
    },
  }
  if (settings && settings.grailRunes) {
    holyGrailSeedData['runes'] = runesSeed;
  }
  if (settings && settings.grailRunewords) {
    holyGrailSeedData['runewords'] = runewordsSeed;
  }
  return holyGrailSeedData;
}
