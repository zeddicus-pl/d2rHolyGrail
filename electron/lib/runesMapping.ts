import { RuneType } from "../../src/@types/main";

export type Rune = {
    name: string,
    effect: Partial<Record<'weapon' | 'armorhelmshield' | 'armorhelm' | 'armorshield' | 'shield', string>>, level: number | null,
}
export type RuneList = Record<RuneType, Rune>;

export const runesMapping: RuneList = {
    r01: {
        name: 'El',
        effect: {
            weapon: '+50 AR, +1 Light Radius',
            armorhelmshield: '+1 Light Radius, +15 Defense'
        }, level: 11
    },
    r02: {
        name: 'Eld',
        effect: {
            weapon: '+75% Damage vs. Undead, +50 Attack Rating vs. Undead',
            armorhelm: 'Lowers Stamina drain by 15%',
            shield: '+7% Blocking'
        }, level: 11
    },
    r03: {
        name: 'Tir',
        effect: {
            weapon: '+2 Mana Per Kill',
            armorhelmshield: '+2 Mana Per Kill'
        }, level: 13
    },
    r04: {
        name: 'Nef',
        effect: {
            weapon: 'Knockback',
            armorhelmshield: '+30 Defense vs. Missile'
        }, level: 13
    },
    r05: {
        name: 'Eth',
        effect: {
            weapon: '-25% Target Defense',
            armorhelmshield: 'Regenerate Mana 15%'
        }, level: 15
    },
    r06: {
        name: 'Ith',
        effect: {
            weapon: '+9 to Maximum Damage',
            armorhelmshield: '15% Damage Taken Goes to Mana'
        }, level: 15
    },
    r07: {
        name: 'Tal',
        effect: {
            weapon: '75 Poison damage over 5 seconds',
            armorhelm: '+30% Poison Resistance',
            shield: '+35% Poison Resistance'
        }, level: 17
    },
    r08: {
        name: 'Ral',
        effect: {
            weapon: '+5-30 Fire Damage',
            armorhelm: '+30% Fire Resistance',
            shield: '+35% Fire Resistance'
        }, level: 19
    },
    r09: {
        name: 'Ort',
        effect: {
            weapon: '+1-50 Lightning Damage',
            armorhelm: '+30% Lightning Resistance',
            shield: '+35% Lightning Resistance'
        }, level: 21
    },
    r10: {
        name: 'Thul',
        effect: {
            weapon: '+3-14 Cold Damage (Cold Length 3 seconds)',
            armorhelm: '+30% Cold Resistance',
            shield: '+35% Cold Resistance'
        }, level: 23
    },
    r11: {
        name: 'Amn',
        effect: {
            weapon: '7% Life Stolen Per Hit',
            armorhelmshield: 'Attacker takes 14 damage'
        }, level: 25
    },
    r12: {
        name: 'Sol',
        effect: {
            weapon: '+9 to Minimum Damage',
            armorhelmshield: '-7 Damage Taken'
        }, level: 27
    },
    r13: {
        name: 'Shael',
        effect: {
            weapon: 'Faster Attack Rate (+20)',
            armorhelm: 'Faster Hit Recovery (+20)',
            shield: 'Faster Block Rate (+20)'
        }, level: 29
    },
    r14: {
        name: 'Dol',
        effect: {
            weapon: '25% Chance that Hit Causes Monster to Flee',
            armorhelmshield: '+7 Replenish Life'
        }, level: 31
    },
    r15: {
        name: 'Hel',
        effect: {
            weapon: '-20% Requirements',
            armorhelmshield: '-15% Requirements'
        }, level: null,
    },
    r16: {
        name: 'Io',
        effect: {
            weapon: '+10 Vitality',
            armorhelmshield: '+10 Vitality'
        }, level: 35
    },
    r17: {
        name: 'Lum',
        effect: {
            weapon: '+10 Energy',
            armorhelmshield: '+10 Energy'
        }, level: 37
    },
    r18: {
        name: 'Ko',
        effect: {
            weapon: '+10 Dexterity',
            armorhelmshield: '+10 Dexterity'
        }, level: 39
    },
    r19: {
        name: 'Fal',
        effect: {
            weapon: '+10 Strength',
            armorhelmshield: '+10 Strength'
        }, level: 41
    },
    r20: {
        name: 'Lem',
        effect: {
            weapon: '+75% Extra Gold from Monsters',
            armorhelmshield: '+50% Extra Gold from Monsters'
        }, level: 43
    },
    r21: {
        name: 'Pul',
        effect: {
            weapon: '+75% Damage to Demons, +100 AR against Demons',
            armorhelmshield: '+30% Defense'
        }, level: 45
    },
    r22: {
        name: 'Um',
        effect: {
            weapon: '25% Chance of Open Wounds',
            armorhelm: '+15% Resist All',
            shield: '+22% Resist All'
        }, level: 47
    },
    r23: {
        name: 'Mal',
        effect: {
            weapon: 'Prevent Monster Healing',
            armorhelmshield: 'Reduce Magic Damage by 7'
        }, level: 49
    },
    r24: {
        name: 'Ist',
        effect: {
            weapon: '+30% Better Chance of Finding Magical Items',
            armorhelmshield: '+25% Better Chance of Finding Magical Items'
        }, level: 51
    },
    r25: {
        name: 'Gul',
        effect: {
            weapon: '+20% AR',
            armorhelmshield: '+5 to Max Resist Poison'
        }, level: 53
    },
    r26: {
        name: 'Vex',
        effect: {
            weapon: '7% Mana Leech',
            armorhelmshield: '+5 to Max Fire Resist'
        }, level: 55
    },
    r27: {
        name: 'Ohm',
        effect: {
            weapon: '+50% Damage',
            armorhelmshield: '+5 to Max. Resist Cold'
        }, level: 57
    },
    r28: {
        name: 'Lo',
        effect: {
            weapon: '20% Chance of Deadly Strike',
            armorhelmshield: '+5 to Max. Resist Lightning'
        }, level: 59
    },
    r29: {
        name: 'Sur',
        effect: {
            weapon: '20% Chance of Hit Blinds Target',
            armorhelm: '+5% total Mana',
            shield: '+50 Mana'
        }, level: 61
    },
    r30: {
        name: 'Ber',
        effect: {
            weapon: '20% Chance of Crushing Blow',
            armorhelmshield: 'Damage Reduced by 8%'
        }, level: 63
    },
    r31: {
        name: 'Jah',
        effect: {
            weapon: 'Ignores Target Defense',
            armorhelm: '+5% of total Hit Points',
            shield: '+50 Hit Points'
        }, level: 65
    },
    r32: {
        name: 'Cham',
        effect: {
            weapon: '32% Chance of Hit Freezing Target for 3 seconds',
            armorhelmshield: 'Cannot be Frozen'
        }, level: 67
    },
    r33: {
        name: 'Zod',
        effect: {
            weapon: 'Indestructible',
            armorhelmshield: 'Indestructible'
        }, level: 69
    }
};

export const reverseRunesMap: Record<string, RuneType> = {
    "el": "r01",
    "eld": "r02",
    "tir": "r03",
    "nef": "r04",
    "eth": "r05",
    "ith": "r06",
    "tal": "r07",
    "ral": "r08",
    "ort": "r09",
    "thul": "r10",
    "amn": "r11",
    "sol": "r12",
    "shael": "r13",
    "dol": "r14",
    "hel": "r15",
    "io": "r16",
    "lum": "r17",
    "ko": "r18",
    "fal": "r19",
    "lem": "r20",
    "pul": "r21",
    "um": "r22",
    "mal": "r23",
    "ist": "r24",
    "gul": "r25",
    "vex": "r26",
    "ohm": "r27",
    "lo": "r28",
    "sur": "r29",
    "ber": "r30",
    "jah": "r31",
    "cham": "r32",
    "zod": "r33",
}