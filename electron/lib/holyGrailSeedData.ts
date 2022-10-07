import { holyGrailSeedData as original } from 'd2-holy-grail/client/src/common/seeds/HolyGrailSeedData';
import { ethGrailSeedData } from 'd2-holy-grail/client/src/common/seeds/EthGrailSeedData';
import { GrailType, HolyGrailSeed, RuneType, Settings } from '../../src/@types/main';
import { simplifyItemName } from '../../src/utils/objects';
import { runesMapping } from './runesMapping';
import { runewordsMapping } from './runewordsMapping';
import { IEthGrailData } from 'd2-holy-grail/client/src/common/definitions/union/IEthGrailData';

export let runesSeed: Record<string, string> = {};
Object.keys(runesMapping).forEach((runeId: string) => {
  runesSeed[runesMapping[runeId as RuneType].name.toLowerCase()] = runeId;
})

export const runewordsSeed: {[runewordId: string]: string} = {};
Object.keys(runewordsMapping).forEach(runewordName => {
  runewordsSeed['runeword' + simplifyItemName(runewordName)] = runewordName;
})

export function getHolyGrailSeedData(settings: Settings | null, ethereal: false): HolyGrailSeed;
export function getHolyGrailSeedData(settings: Settings | null, ethereal: true): IEthGrailData;
export function getHolyGrailSeedData(settings: Settings | null, ethereal: boolean): HolyGrailSeed | IEthGrailData {
  if (ethereal === true) {
    return ethGrailSeedData;
  }
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
  if (settings && (settings.grailType === GrailType.Each || settings.grailType === GrailType.Normal)) {
    holyGrailSeedData.uniques.weapons.throwing.elite && delete(holyGrailSeedData.uniques.weapons.throwing.elite['Wraith Flight']);
    holyGrailSeedData.uniques.weapons['axe (2-h)'].elite && delete(holyGrailSeedData.uniques.weapons['axe (2-h)'].elite['Ethereal Edge']);
    holyGrailSeedData.uniques.weapons.dagger.elite && delete(holyGrailSeedData.uniques.weapons.dagger.elite['Ghostflame']);
    holyGrailSeedData.uniques.other.classes.assasin && delete(holyGrailSeedData.uniques.other.classes.assasin['Shadow Killer']);
  }
  if (settings && settings.grailRunes) {
    holyGrailSeedData['runes'] = runesSeed;
  }
  if (settings && settings.grailRunewords) {
    holyGrailSeedData['runewords'] = runewordsSeed;
  }
  return holyGrailSeedData;
}
