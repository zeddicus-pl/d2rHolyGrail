import { Rune } from "./runesMapping";

export const runesMappingPl: { [name: string]: Partial<Rune> } = {
    r01: {
        name: 'El',
        effect: {
            weapon: '+50 do skuteczności ataku, +1 do promienia światła',
            armorhelmshield: '+1 do promienia światła, +15 do obrony'
        }, level: 11
    },
    r02: {
        name: 'Eld',
        effect: {
            weapon: '+75% do obrażeń zadanych nieumarłym, +50 do skuteczności ataku względem nieumarłych',
            armorhelm: 'Wytrzymałość maleje o 15% wolniej',
            shield: '+7% do szansy na blok'
        }, level: 11
    },
    r03: {
        name: 'Tir',
        effect: {
            weapon: '+2 do Many za każdego zabitego przeciwnika',
            armorhelmshield: '+2 do Many za każdego zabitego przeciwnika'
        }, level: 13
    },
    r04: {
        name: 'Nef',
        effect: {
            weapon: 'Odrzucanie',
            armorhelmshield: '+30 do obrony przeciw pociskom'
        }, level: 13
    },
    r05: {
        name: 'Eth',
        effect: {
            weapon: '-25% do obrony przeciwnika',
            armorhelmshield: '+15% do regeneracji Many'
        }, level: 15
    },
    r06: {
        name: 'Ith',
        effect: {
            weapon: '+9 do maksymalnych obrażeń',
            armorhelmshield: '+15% otrzymanych obrażeń przechodzi na Manę'
        }, level: 15
    },
    r07: {
        name: 'Tal',
        effect: {
            weapon: '+75 obrażeń od trucizny w ciągu 5 sek.',
            armorhelm: '+30% do odporności na trucizny',
            shield: '+35% do odporności na trucizny'
        }, level: 17
    },
    r08: {
        name: 'Ral',
        effect: {
            weapon: 'Dodaje 5-30 obrażeń od ognia',
            armorhelm: '+30% do odporności na ogień',
            shield: '+35% do odporności na ogień'
        }, level: 19
    },
    r09: {
        name: 'Ort',
        effect: {
            weapon: 'Dodaje 1-50 obrażeń od błyskawic',
            armorhelm: '+30% do odporności na błyskawice',
            shield: '+35% do odporności na błyskawice'
        }, level: 21
    },
    r10: {
        name: 'Thul',
        effect: {
            weapon: 'Dodaje 3-14 obrażeń od zimna',
            armorhelm: '+30% do odporności na zimno',
            shield: '+35% do odporności na zimno'
        }, level: 23
    },
    r11: {
        name: 'Amn',
        effect: {
            weapon: '7% zdrowia wykradzione za każde trafienie',
            armorhelmshield: 'Atakujący otrzymują 14 pkt. obrażeń'
        }, level: 25
    },
    r12: {
        name: 'Sol',
        effect: {
            weapon: '+9 do minimalnych obrażeń',
            armorhelmshield: 'Zmniejsza otrzymywane obrażenia o 7 pkt.'
        }, level: 27
    },
    r13: {
        name: 'Shael',
        effect: {
            weapon: '+20% do szybkości ataku',
            armorhelm: '+20% do szybkości odzyskiwania równowagi',
            shield: '+20% do szybkości blokowania'
        }, level: 29
    },
    r14: {
        name: 'Dol',
        effect: {
            weapon: '+25% szansy na zmuszenie potwora do ucieczki',
            armorhelmshield: '+7 do przywracania zdrowia'
        }, level: 31
    },
    r15: {
        name: 'Hel',
        effect: {
            weapon: 'Wymagania -20%',
            armorhelmshield: 'Wymagania -15%'
        }, level: null,
    },
    r16: {
        name: 'Io',
        effect: {
            weapon: '+10 do żywotności',
            armorhelmshield: '+10 do żywotności'
        }, level: 35
    },
    r17: {
        name: 'Lum',
        effect: {
            weapon: '+10 do energii',
            armorhelmshield: '+10 do energii'
        }, level: 37
    },
    r18: {
        name: 'Ko',
        effect: {
            weapon: '+10 do zręczności',
            armorhelmshield: '+10 do zręczności'
        }, level: 39
    },
    r19: {
        name: 'Fal',
        effect: {
            weapon: '+10 do siły',
            armorhelmshield: '+10 do siły'
        }, level: 41
    },
    r20: {
        name: 'Lem',
        effect: {
            weapon: '+75% dodatkowego złota od potworów',
            armorhelmshield: '+50% dodatkowego złota od potworów'
        }, level: 43
    },
    r21: {
        name: 'Pul',
        effect: {
            weapon: '+75% do obrażeń zadanych demonom, +100 do skuteczności ataku względem demonów',
            armorhelmshield: '+30% do obrony'
        }, level: 45
    },
    r22: {
        name: 'Um',
        effect: {
            weapon: '25% szansy na otwarcie rany',
            armorhelm: '+15 do wszystkich odporności',
            shield: '+22 do wszystkich odporności'
        }, level: 47
    },
    r23: {
        name: 'Mal',
        effect: {
            weapon: 'Uniemożliwia leczenie się potworów',
            armorhelmshield: 'Zmniejsza otrzymywane obrażenia od magii o 7 pkt.'
        }, level: 49
    },
    r24: {
        name: 'Ist',
        effect: {
            weapon: '+30% do szansy na zdobycie magicznych przedmiotów',
            armorhelmshield: '+25% do szansy na zdobycie magicznych przedmiotów'
        }, level: 51
    },
    r25: {
        name: 'Gul',
        effect: {
            weapon: '+20% premii do skuteczności ataku',
            armorhelmshield: '+5% do maksymalnej odporności na trucizny'
        }, level: 53
    },
    r26: {
        name: 'Vex',
        effect: {
            weapon: '7% Many wykradzione za każde trafienie',
            armorhelmshield: '+5% do maksymalnej odporności na ogień'
        }, level: 55
    },
    r27: {
        name: 'Ohm',
        effect: {
            weapon: '+50% do obrażeń',
            armorhelmshield: '+5% do maksymalnej odporności na zimno'
        }, level: 57
    },
    r28: {
        name: 'Lo',
        effect: {
            weapon: '20% szansy na zabójcze uderzenie',
            armorhelmshield: '+5% do maksymalnej odporności na błyskawice'
        }, level: 59
    },
    r29: {
        name: 'Sur',
        effect: {
            weapon: 'Trafienie oślepia cel',
            armorhelm: '+5% do maksymalnej wartości punktów Many',
            shield: '+50 do Many'
        }, level: 61
    },
    r30: {
        name: 'Ber',
        effect: {
            weapon: '+20% do szansy na druzgocące uderzenie',
            armorhelmshield: 'Zmniejsza obrażenia o 8%'
        }, level: 63
    },
    r31: {
        name: 'Jah',
        effect: {
            weapon: 'Ignoruje obronę celu',
            armorhelm: '+5% do maksymalnej wartości punktów zdrowia',
            shield: '+50 do zdrowia'
        }, level: 65
    },
    r32: {
        name: 'Cham',
        effect: {
            weapon: 'Zamraża cel +3',
            armorhelmshield: 'Odporność na zamrożenie'
        }, level: 67
    },
    r33: {
        name: 'Zod',
        effect: {
            weapon: 'Przedmiot niezniszczalny',
            armorhelmshield: 'Przedmiot niezniszczalny'
        }, level: 69
    }
};
