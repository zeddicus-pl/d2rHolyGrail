import { Runeword } from "./runewordsMapping";

export const runewordsMappingPl: {[runewordName: string]: Partial<Runeword>} = {
    "Delirium": {
        "name": "Delirium",
        "attributes": [
            "1% szansy rzucenia 50-poziomowego zaklęcia DELIRIUM przy otrzymaniu trafienia",
            "6% szansy rzucenia 14-poziomowego zaklęcia UDERZENIE UMYSŁU przy otrzymaniu trafienia",
            "14% szansy rzucenia 13-poziomowego zaklęcia GROZA przy otrzymaniu trafienia",
            "11% szansy rzucenia 18-poziomowego zaklęcia ZAMĘT, gdy atak dosięga celu",
            "+2 do wszystkich umiejętności",
            "+261 do obrony",
            "+10 do żywotności",
            "50% dodatkowego złota od potworów",
            "25% do szansy na zdobycie magicznych przedmiotów",
            "Fascynacja: Poziom 17 (60 ładunków)"
        ],
    },
    "Dream": {
        "name": "Sen",
        "attributes": [
            "10% szansy rzucenia 15-poziomowego zaklęcia ZAMĘT przy otrzymaniu trafienia",
            "Po wyposażeniu zapewnia aurę ŚWIĘTY WSTRZĄS na poziomie 15",
            "+20-30% do szybkości odzyskiwania równowagi (wartość losowa)",
            "+30% do obrony",
            "+150-220 do obrony (wartość losowa)",
            "+10 do żywotności",
            "+(0.625*Clvl) do Many (zależy od poziomu postaci)",
            "+5-20 do wszystkich odporności (wartość losowa)",
            "12-25% do szansy na zdobycie magicznych przedmiotów (wartość losowa)",
            "# HEŁMY",
            "5% do maksymalnej wartości punktów zdrowia",
            "# TARCZE",
            "+50 do zdrowia"
        ],
    },
    "Flickering Flame": {
        "name": "Gasnący Płomień",
        "attributes": [
            "Po wyposażeniu zapewnia aurę ODPORNOŚCI NA OGIEŃ na poziomie 4-8 (wartość losowa)",
            "+3 do umiejętności ognia",
            "-10-15% do odporności wroga na ogień (wartość losowa)",
            "+30% do obrony",
            "+30 do obrony przeciw pociskom",
            "+50-75 do Many (wartość losowa)",
            "+5% do maksymalnej odporności na ogień",
            "Skraca czas działania zamrożenia o połowę",
            "Skraca czas działania trucizny o 50%"
        ],
    },
    "Lore": {
        "name": "Wiedza",
        "attributes": [
            "+1 do wszystkich umiejętności",
            "+10 do energii",
            "+30% do odporności na błyskawice",
            "Zmniejsza otrzymywane obrażenia o 7 pkt.",
            "+2 do Many za każdego zabitego przeciwnika",
            "+2 do promienia światła"
        ],
    },
    "Nadir": {
        "name": "Nadir",
        "attributes": [
            "+50% do obrony",
            "+10 do obrony",
            "+30 do obrony przeciw pociskom",
            "+5 do siły",
            "+2 do Many za każdego zabitego przeciwnika",
            "-33% dodatkowego złota od potworów",
            "-3 do promienia światła",
            "Płaszcz Cieni: Poziom 13 (9 ładunków)"
        ],
    },
    "Radiance": {
        "name": "Blask",
        "attributes": [
            "+75% do obrony",
            "+30 do obrony przeciw pociskom",
            "+10 do żywotności",
            "+10 do energii",
            "+33 do Many",
            "Zmniejsza otrzymywane obrażenia o 7 pkt.",
            "Zmniejsza otrzymywane obrażenia od magii o 3 pkt.",
            "+15% otrzymanych obrażeń przechodzi na Manę",
            "+5 do promienia światła"
        ],
    },
    "Wisdom": {
        "name": "Mądrość",
        "attributes": [
            "33% do szansy na przeszywający atak",
            "+15-25% premii do skuteczności ataku (wartość losowa)",
            "4-8% Many wykradzione za każde trafienie (wartość losowa)",
            "+30% do obrony",
            "+10 do energii",
            "Wytrzymałość maleje o 15% wolniej",
            "Odporność na zamrożenie",
            "+5 do Many za każdego zabitego przeciwnika",
            "+15% otrzymanych obrażeń przechodzi na Manę"
        ],
    },
    "Bone": {
        "name": "Kość",
        "attributes": [
            "15% szansy rzucenia 10-poziomowego zaklęcia ZBROJA Z KOŚCI przy otrzymaniu trafienia",
            "15% szansy rzucenia 10-poziomowego zaklęcia WŁÓCZNIA Z KOŚCI, gdy atak dosięga celu",
            "+2 do umiejętności Nekromanty",
            "+100-150 do Many (wartość losowa)",
            "+30 do wszystkich odporności",
            "Zmniejsza otrzymywane obrażenia o 7 pkt."
        ],
    },
    "Bramble": {
        "name": "Kolec",
        "attributes": [
            "Po wyposażeniu zapewnia aurę CIERNIE na poziomie 15-21 (wartość losowa)",
            "+50% do szybkości odzyskiwania równowagi",
            "+25-50% do umiejętności zadających obrażenia od Trucizny (wartość losowa)",
            "+300 do obrony",
            "5% do maksymalnej wartości punktów Many",
            "15% do regeneracji Many",
            "+5% do maksymalnej odporności na zimno",
            "+30% do odporności na ogień",
            "+100% do odporności na trucizny",
            "+13 do życia za każdego zabitego przeciwnika",
            "Duch Kolców: Poziom 13 (33 ładunki)"
        ],
    },
    "Chains of Honor": {
        "name": "Okowy Honoru",
        "attributes": [
            "+2 do wszystkich umiejętności",
            "+200% do obrażeń zadanych demonom",
            "+100% do obrażeń zadanych nieumarłym",
            "8% zdrowia wykradzione za każde trafienie",
            "+70% do obrony",
            "+20 do siły",
            "+7 do przywracania zdrowia",
            "+65 do wszystkich odporności",
            "Zmniejsza obrażenia o 8%",
            "+25% do szansy na zdobycie magicznych przedmiotów"
        ],
    },
    "Dragon": {
        "name": "Smok",
        "attributes": [
            "20% szansy rzucenia 18-poziomowego zaklęcia JAD przy otrzymaniu trafienia",
            "12% szansy rzucenia 15-poziomowego zaklęcia HYDRA, gdy atak dosięga celu",
            "Po wyposażeniu zapewnia aurę ŚWIĘTY OGIEŃ na poziomie 14",
            "+360 do obrony",
            "+230 do obrony przeciw pociskom",
            "+3-5 do wszystkich atrybutów (wartość losowa)",
            "+(0.375*Clvl) do siły (zależy od poziomu postaci)",
            "+5% do maksymalnej odporności na błyskawice",
            "Zmniejsza otrzymywane obrażenia o 7 pkt.",
            "# ZBROJE",
            "+5% do maksymalnej wartości punktów Many",
            "# TARCZE",
            "+50 do Many"
        ],
    },
    "Duress": {
        "name": "Przymus",
        "attributes": [
            "+40% do szybkości odzyskiwania równowagi",
            "+10-20% do obrażeń (wartość losowa)",
            "Dodaje 37-133 obrażeń od zimna",
            "+15% do szansy na druzgocące uderzenie",
            "+33% do szansy na otwarcie rany",
            "+150-200% do obrony (wartość losowa)",
            "Wytrzymałość maleje o -20% wolniej",
            "+45% do odporności na zimno",
            "+15% do odporności na błyskawice",
            "+15% do odporności na ogień",
            "+15% do odporności na trucizny%"
        ],
    },
    "Enigma": {
        "name": "Enigma",
        "attributes": [
            "+2 do wszystkich umiejętności",
            "+45% do szybkości poruszania się",
            "+1 do umiejętności TELEPORT",
            "+750-775 do obrony (wartość losowa)",
            "+(0.75*Clvl) do siły (zależy od poziomu postaci)",
            "+5% do maksymalnej wartości punktów zdrowia",
            "Zmniejsza obrażenia o 8%",
            "+14 zdrowia za każdego zabitego przeciwnika",
            "+15% otrzymanych obrażeń przechodzi na Manę",
            "+(1*Clvl)% do szansy na zdobycie magicznych przedmiotów (zależy od poziomu postaci)"
        ],
    },
    "Enlightenment": {
        "name": "Oświecenie",
        "attributes": [
            "5% szansy rzucenia 15-poziomowego zaklęcia POŻOGA przy otrzymaniu trafienia",
            "5% szansy rzucenia 15-poziomowego zaklęcia KULA OGNIA, gdy atak dosięga celu",
            "+2 do umiejętności czarodziejki",
            "+1 do umiejętności CIEPŁO",
            "+30% do obrony",
            "+30% do odporności na ogień",
            "Zmniejsza otrzymywanie obrażenia o 7 pkt."
        ],
    },
    "Fortitude": {
        "name": "Hart",
        "attributes": [
            "20% szansy rzucenia 15-poziomowego zaklęcia ZAMRAŻAJĄCA ZBROJA przy otrzymaniu trafienia",
            "+25% do szybkości rzucania czarów",
            "+300% do obrażeń",
            "+200% do obrony",
            "+((8-12)*0.125*Clvl) do zdrowia (zależy od poziomu postaci) (wartość losowa)",
            "+25-30 do wszystkich odporności (wartość losowa)",
            "12% otrzymanych obrażeń przechodzi na Manę",
            "+1 do promienia światła",
            "# BRONIE",
            "+9 do minimalnych obrażeń",
            "+50 do skuteczności ataku",
            "20% do szansy na druzgocące uderzenie",
            "+25% szansy na zmuszenie potwora do ucieczki",
            "# ZBROJE",
            "+15 do obrony",
            "+7 do przywracania zdrowia",
            "+5% do maksymalnej odporności na błyskawice",
            "Zmniejsza otrzymywane obrażenia o 7 pkt."
        ],
    },
    "Gloom": {
        "name": "Mrok",
        "attributes": [
            "15% szansy rzucenia 3-poziomowego zaklęcia ZAMROCZENIE przy otrzymaniu trafienia",
            "+10% do szybkości odzyskiwania równowagi",
            "+200-260% do obrony (wartość losowa)",
            "+10 do siły",
            "+45 do wszystkich odporności",
            "Skraca czas działania zamrożenia o połowę",
            "5% otrzymanych obrażeń przechodzi na Manę",
            "-3 do promienia światła"
        ],
    },
    "Lionheart": {
        "name": "Lwie Serce",
        "attributes": [
            "+20% do obrażeń",
            "+25 do siły",
            "+15 do zręczności",
            "+20 do żywotności",
            "+10 do energii",
            "+50 do zdrowia",
            "+30 do wszystkich odporności",
            "Wymagania -15%"
        ],
    },
    "Myth": {
        "name": "Mit",
        "attributes": [
            "3% szansy rzucenia 1-poziomowego zaklęcia SKOWYT przy otrzymaniu trafienia",
            "10% szansy rzucenia 1-poziomowego zaklęcia DRWINA, gdy atak dosięga celu",
            "+2 do umiejętności barbarzyńcy",
            "+30 do obrony przeciw pociskom",
            "+10 do przywracania zdrowia",
            "Atakujący otrzymują 14 pkt. obrażeń",
            "Wymagania -15%"
        ],
    },
    "Peace": {
        "name": "Pokój",
        "attributes": [
            "4% szansy rzucenia 5-poziomowego zaklęcia SPOWOLNIENIE POCISKÓW przy otrzymaniu trafienia",
            "2% szansy rzucenia 15-poziomowego zaklęcia WALKIRIA, gdy atak dosięga celu",
            "+2 do umiejętności amazonki",
            "+20% do szybkości odzyskiwania równowagi",
            "+2 do umiejętności UDERZENIE KRYTYCZNE",
            "+30% do odporności na zimno",
            "Atakujący otrzymują 14 pkt. obrażeń"
        ],
    },
    "Principle": {
        "name": "Zasada",
        "attributes": [
            "100% szansy rzucenia 5-poziomowego zaklęcia ŚWIĘTY POCISK, gdy atak dosięga celu",
            "+2 do umiejętności paladyna",
            "+50% do obrażeń zadanych nieumarłym",
            "+100-150 do żywotności (wartość losowa)",
            "Wytrzymałość maleje o 15% wolniej",
            "+5% do maksymalnej odporności na trucizny",
            "+30% do odporności na ogień"
        ],
    },
    "Prudence": {
        "name": "Rozwaga",
        "attributes": [
            "+25% do szybkości odzyskiwania równowagi",
            "+140-170% do obrony (wartość losowa)",
            "+25-35 do wszystkich odporności (wartość losowa)",
            "Zmniejsza otrzymywane obrażenia o 3 pkt.",
            "Zmniejsza otrzymywane obrażenia od magii o 17 pkt.",
            "+2 do Many za każdego zabitego przeciwnika",
            "+1 do promienia światła",
            "Przywraca 1 pkt. trwałości na 4 sek."
        ],
    },
    "Rain": {
        "name": "Deszcz",
        "attributes": [
            "5% szansy rzucenia 15-poziomowego zaklęcia ZBROJA CYKLONU przy otrzymaniu trafienia",
            "5% szansy rzucenia 15-poziomowego zaklęcia WIR, gdy atak dosięga celu",
            "+2 do umiejętności druida",
            "+100-150 do Many (wartość losowa)",
            "+30% do odporności na błyskawice",
            "Zmniejsza otrzymywane obrażenia od magii o 7 pkt.",
            "15% otrzymanych obrażeń przechodzi na Manę"
        ],
    },
    "Smoke": {
        "name": "Dym",
        "attributes": [
            "+20% do szybkości odzyskiwania równowagi",
            "+75% do obrony",
            "+280 do obrony przeciw pociskom",
            "+10 do energii",
            "+50 do wszystkich odporności",
            "-1 do promienia światła",
            "Osłabienie: Poziom 6 (18 ładunków)"
        ],
    },
    "Stealth": {
        "name": "Skradanie",
        "attributes": [
            "Zmniejsza otrzymywane obrażenia od magii o 3 pkt.",
            "+6 do zręczności",
            "+15 do maksymalnej wartości wytrzymałości",
            "+30% do odporności na trucizny",
            "+15% do regeneracji Many",
            "+25% do szybkości poruszania się",
            "+25% do szybkości rzucania czarów",
            "+25% do szybkości odzyskiwania równowagi"
        ],
    },
    "Stone": {
        "name": "Kamień",
        "attributes": [
            "+60% do szybkości odzyskiwania równowagi",
            "+250-290% do obrony (wartość losowa)",
            "+300 do obrony przeciw pociskom",
            "+16 do siły",
            "+16 do żywotności",
            "+10 do energii",
            "+15 do wszystkich odporności",
            "Kula Magmy: Poziom 16 (80 ładunków)",
            "Gliniany Golem: Poziom 16 (16 ładunków)"
        ],
    },
    "Treachery": {
        "name": "Zdrada",
        "attributes": [
            "5% szansy rzucenia 15-poziomowego zaklęcia ZNIKNIĘCIE przy otrzymaniu trafienia",
            "25% szansy rzucenia 15-poziomowego zaklęcia JAD, gdy atak dosięga celu",
            "+2 do umiejętności zabójczyni",
            "+45% do szybkości ataku",
            "+20% do szybkości odzyskiwania równowagi",
            "+30% do odporności na zimno",
            "+50% dodatkowego złota od potworów"
        ],
    },
    "Wealth": {
        "name": "Bogactwo",
        "attributes": [
            "+10 do zręczności",
            "+2 do Many za każdego zabitego przeciwnika",
            "300% dodatkowego złota od potworów",
            "100% do szansy na zdobycie magicznych przedmiotów"
        ],
    },
    "Beast": {
        "name": "Bestia",
        "attributes": [
            "Po wyposażeniu zapewnia aurę FANATYZM na poziomie 9",
            "+40% do szybkości ataku",
            "+240-270% do obrażeń (wartość losowa)",
            "20% szansy na druzgocące uderzenie",
            "25% szansy na otwarcie rany",
            "+3 do umiejętności NIEDŹWIEDZIOŁAK",
            "+3 do umiejętności LIKANTROPIA",
            "Uniemożliwia leczenie się potworów",
            "+25-40 do siły (wartość losowa)",
            "+10 do energii",
            "+2 do Many za każdego zabitego przeciwnika",
            "Przywołanie Grizzly: Poziom 13 (5 ładunków)"
        ],
    },
    "Black": {
        "name": "Czerń",
        "attributes": [
            "+15% do szybkości ataku",
            "+120% do obrażeń",
            "+200 do skuteczności ataku",
            "Dodaje 3-14 obrażeń od zimna",
            "40% szansy na druzgocące uderzenie",
            "Odrzucanie",
            "+10 do żywotności",
            "Zmniejsza otrzymywane obrażenia od magii o 2 pkt.",
            "Wybuch Zwłok: Poziom 4 (12 ładunków)"
        ],
    },
    "Brand": {
        "name": "Piętno",
        "attributes": [
            "35% szansy rzucenia 14-poziomowego zaklęcia ZWIĘKSZENIE OBRAŻEŃ przy otrzymaniu trafienia",
            "100% szansy rzucenia 18-poziomowego zaklęcia WŁÓCZNIA Z KOŚCI, gdy atak dosięga celu",
            "Wystrzeliwuje eksplodujące strzały lub bełty",
            "+260-340% do obrażeń (wartość losowa)",
            "Ignoruje obronę celu",
            "20% premii do skuteczności ataku",
            "+280-330% do obrażeń zadanych demonom",
            "20% szansy na druzgocące uderzenie",
            "Uniemożliwia leczenie się potworów",
            "Odrzucanie"
        ],
    },
    "Breath of the Dying": {
        "name": "Ostatni Oddech",
        "attributes": [
            "50% szansy na rzucenie 20-poziomowego zaklęcia TRUJĄCA NOVA kiedy zabijasz wroga",
            "Przedmiot niezniszczalny",
            "+60% do szybkości ataku",
            "+350-400% do obrażeń (wartość losowa)",
            "-25% do obrony przeciwnika",
            "+50 do skuteczności ataku",
            "+200% do obrażeń zadanych nieumarłym",
            "+50 do skuteczności ataku względem nieumarłych",
            "7% Many wykradzione za każde trafienie",
            "12-15% zdrowia wykradzione za każde trafienie",
            "Uniemożliwia leczenie się potworów",
            "+30 do wszystkich atrybutów",
            "+1 do promienia światła",
            "Wymagania -20%"
        ],
    },
    "Call to Arms": {
        "name": "Wezwanie Do Broni",
        "attributes": [
            "+1 do wszystkich umiejętności",
            "+40% do szybkości ataku",
            "+240-290% do obrażeń (wartość losowa)",
            "Dodaje 5-30 obrażeń od ognia",
            "7% zdrowia wykradzione za każde trafienie",
            "+2-6 do umiejętności DOWODZENIE (wartość losowa)",
            "+1-6 do umiejętności ROZKAZY (wartość losowa)",
            "+1-4 do umiejętności OKRZYK BOJOWY (wartość losowa)",
            "Uniemożliwia leczenie się potworów",
            "+12 do przywracania zdrowia",
            "+30% do szansy na zdobycie magicznych przedmiotów"
        ],
    },
    "Chaos": {
        "name": "Chaos",
        "attributes": [
            "9% szansy rzucenia 11-poziomowego zaklęcia ZAMARZNIĘTA KULA, gdy atak dosięga celu",
            "11% szansy rzucenia 9-poziomowego zaklęcia WIĄZKI BŁYSKAWIC, gdy atak dosięga celu",
            "+35% do szybkości ataku",
            "+290-340% do obrażeń (wartość losowa)",
            "Dodaje 216-471 obrażeń od magii",
            "25% szansy na otwarcie rany",
            "+1 do umiejętności TRĄBA POWIETRZNA",
            "+10 do siły",
            "+15 zdrowia za każdego zabitego demona"
        ],
    },
    "Crescent Moon": {
        "name": "Sierp Księżyca",
        "attributes": [
            "10% szansy rzucenia 17-poziomowego zaklęcia SERYJNE BŁYSKAWICE, gdy atak dosięga celu",
            "7% szansy rzucenia 13-poziomowego zaklęcia POLE STATYCZNE, gdy atak dosięga celu",
            "+20% do szybkości ataku",
            "+180-220% do obrażeń (wartość losowa)",
            "Ignoruje obronę celu",
            "-35% do odporności wroga na błyskawice",
            "25% szansy na otwarcie rany",
            "+9-11 do absorpcji magii (wartość losowa)",
            "+2 do Many za każdego zabitego przeciwnika",
            "Przywołanie Ducha Wilka: Poziom 18 (30 ładunków)"
        ],
    },
    "Death": {
        "name": "Śmierć",
        "attributes": [
            "Przedmiot niezniszczalny",
            "100% szansy na rzucenie 44-poziomowego zaklęcia SERYJNE BŁYSKAWICE kiedy giniesz",
            "25% szansy rzucenia 18-poziomowego zaklęcia LODOWCOWY GROT podczas atakowania",
            "+300-385% do obrażeń (wartość losowa)",
            "20% premii do skuteczności ataku",
            "+50 do skuteczności ataku",
            "Dodaje 1-50 obrażeń od błyskawic",
            "7% Many wykradzione za każde trafienie",
            "+50% do szansy na druzgocące uderzenie",
            "+(0.5*Clvl)% do szansy na druzgocące uderzenie (zależy od poziomu postaci)",
            "+1 do promienia światła",
            "Krwawy Golem: Poziom 22 (15 ładunków)",
            "Wymagania -20%"
        ],
    },
    "Destruction": {
        "name": "Zniszczenie",
        "attributes": [
            "23% szansy rzucenia 12-poziomowego zaklęcia WULKAN, gdy atak dosięga celu",
            "5% szansy rzucenia 23-poziomowego zaklęcia KULA MAGMY, gdy atak dosięga celu",
            "100% szansy na rzucenie 45-poziomowego zaklęcia METEOR kiedy giniesz",
            "15% szansy rzucenia 22-poziomowego zaklęcia NOVA podczas atakowania",
            "+350% do obrażeń",
            "Ignoruje obronę celu",
            "Dodaje 100-180 obrażeń od magii",
            "7% Many wykradzione za każde trafienie",
            "20% szansy na otwarcie rany",
            "20% szansy na druzgocące uderzenie",
            "Uniemożliwia leczenie się potworów",
            "+10 do zręczności"
        ],
    },
    "Doom": {
        "name": "Zagłada",
        "attributes": [
            "5% szansy rzucenia 18-poziomowego zaklęcia WULKAN podczas atakowania",
            "Po wyposażeniu zapewnia aurę ŚWIĘTY CHŁÓD na poziomie 12",
            "+2 do wszystkich umiejętności",
            "+45% do szybkości ataku",
            "+330-370% do obrażeń (wartość losowa)",
            "-40-60% do odporności wroga na zimno (wartość losowa)",
            "20% szansy na druzgocące uderzenie",
            "25% szansy na otwarcie rany",
            "Uniemożliwia leczenie się potworów",
            "Zamraża cel +3",
            "Wymagania -20%"
        ],
    },
    "Edge": {
        "name": "Ostrze",
        "attributes": [
            "Po wyposażeniu zapewnia aurę CIERNIE na poziomie 15",
            "+35% do szybkości ataku",
            "+320-380% do obrażeń zadanych demonom (wartość losowa)",
            "+280% do obrażeń zadanych nieumarłym",
            "+75 obrażeń od trucizny w ciągu 5 sek.",
            "7% zdrowia wykradzione za każde trafienie",
            "Uniemożliwia leczenie się potworów",
            "+5-10 do wszystkich atrybutów (wartość losowa)",
            "+2 do Many za każdego zabitego przeciwnika",
            "Obniża ceny u wszystkich kupców o 15%"
        ],
    },
    "Eternity": {
        "name": "Wieczność",
        "attributes": [
            "Przedmiot niezniszczalny",
            "+260-310% do obrażeń (wartość losowa)",
            "+9 do minimalnych obrażeń",
            "7% zdrowia wykradzione za każde trafienie",
            "20% szansy na druzgocące uderzenie",
            "Trafienie oślepia cel",
            "Spowalnia cel o 33%",
            "16% do regeneracji Many",
            "Odporność na zamrożenie",
            "30% do szansy na zdobycie magicznych przedmiotów",
            "Ożywienie: Poziom 8 (88 ładunków)"
        ],
    },
    "Faith": {
        "name": "Wiara",
        "attributes": [
            "Po wyposażeniu zapewnia aurę FANATYZM na poziomie 12-15 (wartość losowa)",
            "+1-2 do wszystkich umiejętności (wartość losowa)",
            "+330% do obrażeń",
            "Ignoruje obronę celu",
            "300% premii do skuteczności ataku",
            "+75% do obrażeń zadanych nieumarłym",
            "+50 do skuteczności ataku względem nieumarłych",
            "Dodaje 120 obrażeń od ognia",
            "+15 do wszystkich odporności",
            "10% szans na ożywienie wroga jako Przywrócony",
            "75% dodatkowego złota od potworów"
        ],
    },
    "Famine": {
        "name": "Klęska Głodu",
        "attributes": [
            "+30% do szybkości ataku",
            "+320-370% do obrażeń (wartość losowa)",
            "Ignoruje obronę celu",
            "Dodaje 180-200 obrażeń od magii",
            "Dodaje 50-200 obrażeń od ognia",
            "Dodaje 51-250 obrażeń od błyskawic",
            "Dodaje 50-200 obrażeń od zimna",
            "12% zdrowia wykradzione za każde trafienie",
            "Uniemożliwia leczenie się potworów",
            "+10 do siły"
        ],
    },
    "Fury": {
        "name": "Furia",
        "attributes": [
            "40% do szybkości ataku",
            "+209% do obrażeń",
            "Ignoruje obronę celu",
            "-25% do obrony przeciwnika",
            "20% premii do skuteczności ataku",
            "6% zdrowia wykradzione za każde trafienie",
            "33% szansy na druzgocące uderzenie",
            "66% szansy na otwarcie rany",
            "+5 do umiejętności SZAŁ BITEWNY (tylko dla barbarzyńcy)",
            "Uniemożliwia leczenie się potworów"
        ],
    },
    "Grief": {
        "name": "Żal",
        "attributes": [
            "35% szansy rzucenia 15-poziomowego zaklęcia JAD, gdy atak dosięga celu",
            "+30-40% do szybkości ataku (wartość losowa)",
            "+340-400 do obrażeń (wartość losowa)",
            "Ignoruje obronę celu",
            "-25% do obrony przeciwnika",
            "+(1.875*Clvl)% do obrażeń zadanych demonom (zależy od poziomu postaci)",
            "Dodaje 5-30 obrażeń od ognia",
            "-20-25% do odporności wroga na truciznę (wartość losowa)",
            "20% szansy za druzgocące uderzenie",
            "Uniemożliwia leczenie się potworów",
            "+2 do Many za każdego zabitego przeciwnika",
            "+10-15 zdrowia za każdego zabitego przeciwnika (wartość losowa)"
        ],
    },
    "Hand of Justice": {
        "name": "Ręka Sprawiedliwości",
        "attributes": [
            "100% szansy na rzucenie 36-poziomowego zaklęcia POŻOGA kiedy awansujesz",
            "100% szansy na rzucenie 48-poziomowego zaklęcia METEOR kiedy giniesz",
            "Po wyposażeniu zapewnia aurę ŚWIĘTY OGIEŃ na poziomie 16",
            "+33% do szybkości ataku",
            "+280-330% do obrażeń (wartość losowa)",
            "Ignoruje obronę celu",
            "-20% do odporności wroga na ogień",
            "7% zdrowia wykradzione za każde trafienie",
            "20% do szansy za zabójcze uderzenie",
            "Trafienie oślepia cel",
            "Zamraża cel +3"
        ],
    },
    "Harmony": {
        "name": "Harmonia",
        "attributes": [
            "Po wyposażeniu zapewnia aurę WIGOR na poziomie 10",
            "+200-275% do obrażeń (wartość losowa)",
            "+9 do minimalnych obrażeń",
            "+9 do maksymalnych obrażeń",
            "Dodaje 55-160 obrażeń od ognia",
            "Dodaje 55-160 obrażeń od błyskawic",
            "Dodaje 55-160 obrażeń od zimna",
            "+2-6 do umiejętności WALKIRIA (wartość losowa)",
            "+10 do zręczności",
            "+20% do regeneracji Many",
            "+2 do Many za każdego zabitego przeciwnika",
            "+2 do promienia światła",
            "Ożywienie: Poziom 20 (25 ładunków)"
        ],
    },
    "Heart of the Oak": {
        "name": "Serce Dębu",
        "attributes": [
            "+3 do wszystkich umiejętności",
            "+40% do szybkości rzucania czarów",
            "+75% do obrażeń zadanych demonom",
            "+100 do skuteczności ataku względem demonów",
            "Dodaje 3-14 obrażeń od zimna",
            "7% Many wykradzione za każde trafienie",
            "+10 do zręczności",
            "+20 do przywracania zdrowia",
            "+15% do maksymalnej wartości punktów Many",
            "+30-40 do wszystkich odporności (wartość losowa)",
            "Dębowy Mędrzec: Poziom 4 (25 ładunków)",
            "Kruk: Poziom 14 (60 ładunków)"
        ],
    },
    "Holy Thunder": {
        "name": "Święty Grom",
        "attributes": [
            "+60% do obrażeń",
            "+10 do maksymalnych obrażeń",
            "-25% do obrony przeciwnika",
            "Dodaje 5-30 obrażeń od ognia",
            "Dodaje 21-110 obrażeń od błyskawic",
            "+75 obrażeń od trucizny w ciągu 5 sek.",
            "+3 do umiejętności ŚWIĘTY WSTRZĄS (tylko dla paladyna)",
            "+5% do maksymalnej odporności na błyskawice",
            "+60% do odporności na błyskawice",
            "Seryjne Błyskawice: Poziom 7 (60 ładunków)"
        ],
    },
    "Honor": {
        "name": "Honor",
        "attributes": [
            "+1 do wszystkich umiejętności",
            "+160% do obrażeń",
            "+9 do minimalnych obrażeń",
            "+9 do maksymalnych obrażeń",
            "+250 do skuteczności ataku",
            "7% zdrowia wykradzione za każde trafienie",
            "25% szansy za druzgocące uderzenie",
            "+10 do siły",
            "+10 do przywracania zdrowia",
            "+2 do Many za każdego zabitego przeciwnika",
            "+1 do promienia światła"
        ],
    },
    "Ice": {
        "name": "Lód",
        "attributes": [
            "100% szansy rzucenia 40-poziomowego zaklęcia ZAMIEĆ kiedy awansujesz",
            "25% szansy rzucenia 22-poziomowego zaklęcia NOVA MROZU, gdy atak dosięga celu",
            "Po wyposażeniu zapewnia aurę ŚWIĘTY CHŁÓD na poziomie 18",
            "+20% do szybkości ataku",
            "+140-210% do obrażeń (wartość losowa)",
            "Ignoruje obronę celu",
            "+25-30% do obrażeń od umiejętności zimna (wartość losowa)",
            "7% zdrowia wykradzione za każde trafienie",
            "-20% do odporności wroga na zimno",
            "20% szansy za druzgocące uderzenie",
            "(3.125*Clvl)% dodatkowego złota od potworów (zależy od poziomu postaci)"
        ],
    },
    "Infinity": {
        "name": "Nieskończoność",
        "attributes": [
            "50% szansy na rzucenie 20-poziomowego zaklęcia SERYJNE BŁYSKAWICE kiedy zabijasz wroga",
            "Po wyposażeniu zapewnia aurę PRZEKONANIE na poziomie 12",
            "+35% do szybkości poruszania się",
            "+255-325% do obrażeń (wartość losowa)",
            "-45-55% do odporności wroga na błyskawice (wartość losowa)",
            "40% szansy na druzgocące uderzenie",
            "Uniemożliwia leczenie się potworów",
            "+(0.5*Clvl) żywotności (zależy od poziomu postaci)",
            "30% do szansy na zdobycie magicznych przedmiotów",
            "Zbroja Cyklonu: Poziom 21 (30 ładunków)"
        ],
    },
    "Insight": {
        "name": "Olśnienie",
        "attributes": [
            "Po wyposażeniu zapewnia aurę MEDYTACJA na poziomie 15",
            "+35% do szybkości rzucania czarów",
            "+200-260% do obrażeń (wartość losowa)",
            "+9 do minimalnych obrażeń",
            "180-250% premii do skuteczności ataku (wartość losowa)",
            "Dodaje 5-30 obrażeń od ognia",
            "+75 obrażeń od trucizny w ciągu 5 sek.",
            "+1-6 do umiejętności UDERZENIE KRYTYCZNE (wartość losowa)",
            "+5 do wszystkich atrybutów",
            "+2 do Many za każdego zabitego przeciwnika",
            "23% do szansy na zdobycie magicznych przedmiotów"
        ],
    },
    "King's Grace": {
        "name": "Królewska Łaska",
        "attributes": [
            "+100% do obrażeń",
            "+150 do skuteczności ataku",
            "+100% do obrażeń zadanych demonom",
            "+100 do skuteczności ataku względem demonów",
            "+50% do obrażeń zadanych nieumarłym",
            "+100 do skuteczności ataku względem nieumarłych",
            "Dodaje 5-30 obrażeń od ognia",
            "Dodaje 3-14 obrażeń od zimna",
            "7% zdrowia wykradzione za każde trafienie"
        ],
    },
    "Kingslayer": {
        "name": "Zabójca Królów",
        "attributes": [
            "+30% do szybkości ataku",
            "+230-270% do obrażeń (wartość losowa)",
            "-25% do obrony przeciwnika",
            "20% premii do skuteczności ataku",
            "33% szansy na druzgocące uderzenie",
            "50% szansy na otwarcie rany",
            "+1 do umiejętności ZEMSTA",
            "Uniemożliwia leczenie się potworów",
            "+10 do siły",
            "40% dodatkowego złota od potworów"
        ],
    },
    "Last Wish": {
        "name": "Ostatnie Życzenie",
        "attributes": [
            "6% szansy rzucenia 11-poziomowego zaklęcia ZNIKNIĘCIE przy otrzymaniu trafienia",
            "10% szansy rzucenia 18-poziomowego zaklęcia WYSSANIE ŻYCIA, gdy atak dosięga celu",
            "20% szansy rzucenia 20-poziomowego zaklęcia WIĄZKI BŁYSKAWIC, podczas atakowania",
            "Po wyposażeniu zapewnia aurę MOC na poziomie 17",
            "+330-375% do obrażeń (wartość losowa)",
            "Ignoruje obronę celu",
            "60-70% do szansy na druzgocące uderzenie (wartość losowa)",
            "Uniemożliwia leczenie się potworów",
            "Trafienie oślepia cel",
            "(0.5*Clvl)% do szansy na zdobycie magicznych przedmiotów (zależy od poziomu postaci)"
        ],
    },
    "Lawbringer": {
        "name": "Łamiący Prawo",
        "attributes": [
            "20% szansy na rzucenie 15-poziomowego zaklęcia ZNIEDOŁĘŻNIENIE podczas atakowania",
            "Po wyposażeniu zapewnia aurę SANKTUARIUM na poziomie 16-18 (wartość losowa)",
            "-50% do obrony przeciwnika",
            "Dodaje 150-210 obrażeń od ognia",
            "Dodaje 130-180 obrażeń od zimna",
            "7% zdrowia wykradzione za każde trafienie",
            "Zabite potwory spoczywają w pokoju",
            "+200-250 do obrony przeciw pociskom (wartość losowa)",
            "+10 do zręczności",
            "75% dodatkowego złota od potworów"
        ],
    },
    "Leaf": {
        "name": "Liść",
        "attributes": [
            "+3 do umiejętności ognia",
            "Dodaje 5-30 obrażeń od ognia",
            "+3 do umiejętności INFERNO (czarodziejka)",
            "+3 do umiejętności CIEPŁO (czarodziejka)",
            "+3 do umiejętności OGNISTY PIORUN (czarodziejka)",
            "+(2*Clvl) do obrony (zależy od poziomu postaci)",
            "+33% do odporności na zimno",
            "+2 do Many za każdego zabitego przeciwnika"
        ],
    },
    "Malice": {
        "name": "Złośliwość",
        "attributes": [
            "+33% do obrażeń",
            "+9 do maksymalnych obrażeń",
            "-25% do obrony przeciwnika",
            "+50 do skuteczności ataku",
            "100% szansy na otwarcie rany",
            "Uniemożliwia leczenie się potworów",
            "-100 do obrony przeciwnika na trafienie",
            "Wyssanie życia -5"
        ],
    },
    "Melody": {
        "name": "Melodia",
        "attributes": [
            "+3 do umiejętności ŁUKU I KUSZY (Amazonka)",
            "+20% do szybkości ataku",
            "+50% do obrażeń",
            "+300% do obrażeń zadanych nieumarłym",
            "+3 do umiejętności SPOWOLNIENIE POCISKÓW (Amazonka)",
            "+3 do umiejętności UNIK (Amazonka)",
            "+3 do umiejętności UDERZENIE KRYTYCZNE (Amazonka)",
            "Odrzucanie",
            "+10 do zręczności"
        ],
    },
    "Memory": {
        "name": "Pamięć",
        "attributes": [
            "+3 do umiejętności czarodziejki",
            "+33% do szybkości rzucania czarów",
            "+9 do minimalnych obrażeń",
            "-25% do obrony przeciwnika",
            "+3 do umiejętności TARCZA ENERGETYCZNA (Czarodziejka)",
            "+2 do umiejętności POLE STATYCZNE (Czarodziejka)",
            "+50% do obrony",
            "+10 do żywotności",
            "+10 do energii",
            "20% do maksymalnej wartości punktów Many",
            "Zmniejsza otrzymywane obrażenia od magii o 7 pkt."
        ],
    },
    "Mist": {
        "name": "Mgła",
        "attributes": [
            "Po wyposażeniu zapewnia aurę KONCENTRACJA na poziomie 8-12 (wartość losowa)",
            "+3 do wszystkich umiejętności",
            "+20% do szybkości ataku",
            "+100% do szansy na przeszywający atak",
            "+325-375% do obrażeń (wartość losowa)",
            "+9 do maksymalnych obrażeń",
            "20% premii do skuteczności ataku",
            "Dodaje 3-14 obrażeń od zimna",
            "Zamraża cel +3",
            "+24 do żywotności",
            "+40 do wszystkich odporności"
        ],
    },
    "Oath": {
        "name": "Przysięga",
        "attributes": [
            "Przedmiot niezniszczalny",
            "30% szansy rzucenia 20-poziomowego zaklęcia DUCH KOŚCI, gdy atak dosięga celu",
            "+50% do szybkości ataku",
            "+210-340% do obrażeń (wartość losowa)",
            "+75% do obrażeń zadanych demonom",
            "+100 do skuteczności ataku względem demonów",
            "Uniemożliwia leczenie się potworów",
            "+10 do energii",
            "+10-15 do absorpcji magii (wartość losowa)",
            "Serce Rosomaka: Poziom 16 (20 ładunków)",
            "Żelazny Golem: Poziom 17 (14 ładunków)"
        ],
    },
    "Obedience": {
        "name": "Posłuszeństwo",
        "attributes": [
            "30% szansy na rzucenie 21-poziomowego zaklęcia ZAKLINANIE kiedy zabijasz wroga",
            "+40% do szybkości odzyskiwania równowagi",
            "+370% do obrażeń",
            "-25% do obrony przeciwnika",
            "Dodaje 3-14 obrażeń od zimna",
            "-25% do odporności wroga na ogień",
            "40% do szansy na druzgocące uderzenie",
            "+200-300 do obrony (wartość losowa)",
            "+10 do siły",
            "+10 do zręczności",
            "+20-30 do wszystkich odporności (wartość losowa)",
            "Wymagania -20%"
        ],
    },
    "Obsession": {
        "name": "Obsesja",
        "attributes": [
            "Przedmiot niezniszczalny",
            "24% szansy na rzucenie 10-poziomowego zaklęcia OSŁABIENIE przy otrzymaniu trafienia",
            "+4 do wszystkich umiejętności",
            "+65% do szybkości rzucania czarów",
            "+60% do szybkości odzyskiwania równowagi",
            "Odrzucanie",
            "+10 do żywotności",
            "+10 do energii",
            "+15-25% do maksymalnej wartości punktów zdrowia (wartość losowa)",
            "+15-30% do regeneracji Many (wartość losowa)",
            "+60-70 do wszystkich odporności (wartość losowa)",
            "75% dodatkowego złota od potworów",
            "+30% do szansy na zdobycie magicznych przedmiotów"
        ],
    },
    "Passion": {
        "name": "Pasja",
        "attributes": [
            "+25% do szybkości ataku",
            "+160-210% do obrażeń (wartość losowa)",
            "50-80% premii do skuteczności ataku (wartość losowa)",
            "+75% do obrażeń zadanych nieumarłym",
            "+50 do skuteczności ataku względem nieumarłych",
            "Dodaje 1-50 obrażeń od błyskawic",
            "+1 do umiejętności BERSERKER",
            "+1 do umiejętności ZAPAŁ",
            "Trafienie oślepia cel +10",
            "25% szansy na zmuszenie potwora do ucieczki",
            "75% dodatkowego złota od potworów",
            "Serce Rosomaka: Poziom 3 (12 ładunków)"
        ],
    },
    "Pattern": {
        "name": "Wzorzec",
        "attributes": [
            "+30% do szybkości blokowania",
            "+40-80% do obrażeń (wartość losowa)",
            "10% premii do skuteczności ataku",
            "Dodaje 17-62 obrażeń od ognia",
            "Dodaje 1-50 obrażeń od błyskawic",
            "Dodaje 3-14 obrażeń od zimna",
            "+75 obrażeń od trucizny w ciągu 5 sek.",
            "+6 do siły",
            "+6 do zręczności",
            "+15 do wszystkich odporności"
        ],
    },
    "Phoenix": {
        "name": "Feniks",
        "attributes": [
            "100% szansy rzucenia 40-poziomowego zaklęcia POŻOGA kiedy awansujesz",
            "40% szansy na rzucenie 22-poziomowego zaklęcia BURZA OGNIA podczas atakowania",
            "Po wyposażeniu zapewnia aurę ODKUPIENIE na poziomie 10-15 (wartość losowa)",
            "+350-400% do obrażeń (wartość losowa)",
            "-28% do odporności wroga na ogień",
            "+350-400 do obrony przeciw pociskom (wartość losowa)",
            "+15-21 do absorpcji ognia (wartość losowa)",
            "# BRONIE",
            "Ignoruje obronę celu",
            "14% Many wykradzione za każde trafienie",
            "20% do szansy na druzgocące uderzenie",
            "# TARCZE",
            "+50 do życia",
            "+5% do maksymalnej odporności na błyskawice",
            "+10% do maksymalnej odporności na ogień"
        ],
    },
    "Plague": {
        "name": "Plaga",
        "attributes": [
            "25% szansy na rzucenie 15-poziomowego zaklęcia NOVA TRUCIZNY przy otrzymaniu trafienia",
            "20% szansy na rzucenie 12-poziomowego zaklęcia ZMNIEJSZENIE ODPORNOŚCI przy otrzymaniu trafienia",
            "Po wyposażeniu zapewnia aurę OCZYSZCZENIE na poziomie 13-17 (wartość losowa)",
            "+1-2 do wszystkich umiejętności",
            "+20% do szybkości ataku",
            "+220-320% do obrażeń (wartość losowa)",
            "-23% do odporności wroga na truciznę",
            "0.3% (0-29.7) do szansy na druzgocące uderzenie (zależy od poziomu postaci)",
            "25% do szansy na otwarcie rany",
            "Zamraża cel +3"
        ],
    },
    "Pride": {
        "name": "Duma",
        "attributes": [
            "25% szansy rzucenia 17-poziomowego zaklęcia ŚCIANA OGNIA przy otrzymaniu trafienia",
            "Po wyposażeniu zapewnia aurę KONCENTRACJA na poziomie 16-20 (wartość losowa)",
            "260-300% premii do skuteczności ataku (wartość losowa)",
            "+(1*Clvl)% do obrażeń zadanych demonom (zależy od poziomu postaci)",
            "Dodaje 50-280 obrażeń od błyskawic",
            "20% do szansy na zabójcze uderzenie",
            "Trafienie oślepia cel",
            "Zamraża cel +3",
            "+10 do żywotności",
            "+8 do przywracania zdrowia",
            "(1.875*Clvl)% dodatkowego złota od potworów (zależy od poziomu postaci)"
        ],
    },
    "Rift": {
        "name": "Szczelina",
        "attributes": [
            "20% szansy rzucenia 16-poziomowego zaklęcia TORNADO, gdy atak dosięga celu",
            "16% szansy na rzucenie 21-poziomowego zaklęcia ZAMARZNIĘTA KULA podczas atakowania",
            "20% premii do skuteczności ataku",
            "Dodaje 160-250 obrażeń od magii",
            "Dodaje 60-180 obrażeń od ognia",
            "+5-10 do wszystkich atrybutów (wartość losowa)",
            "+10 do zręczności",
            "38% otrzymanych obrażeń przechodzi na Manę",
            "75% dodatkowego złota od potworów",
            "Żelazna Dziewica: Poziom 15 (40 ładunków)",
            "Wymagania -20%"
        ],
    },
    "Silence": {
        "name": "Cisza",
        "attributes": [
            "+2 do wszystkich umiejętności",
            "+20% do szybkości ataku",
            "+20% do szybszego odzyskiwania równowagi",
            "+200% do obrażeń",
            "+75% do obrażeń zadanych nieumarłym",
            "+50 do skuteczności ataku względem nieumarłych",
            "11% Many wykradzione za każde trafienie",
            "Trafienie oślepia cel +33",
            "25% szansy na zmuszenie potwora do ucieczki",
            "+75 do wszystkich odporności",
            "+2 do Many za każdego zabitego przeciwnika",
            "+30% do szansy na zdobycie magicznych przedmiotów",
            "Wymagania -20%"
        ],
    },
    "Spirit": {
        "name": "Duch",
        "attributes": [
            "+2 do wszystkich umiejętności",
            "+25-35% do szybkości rzucania czarów (wartość losowa)",
            "+55% do szybkości odzyskiwania równowagi",
            "+250 do obrony przeciw pociskom",
            "+22 do żywotności",
            "+89-112 do Many (wartość losowa)",
            "+3-8 do absorpcji magii (wartość losowa)",
            "# TARCZE",
            "+35% do odporności na zimno",
            "+35% do odporności na błyskawice",
            "+35% do odporności na trucizny",
            "Atakujący otrzymują 14 pkt. obrażeń",
            "# MIECZE",
            "Dodaje 1-50 obrażeń od błyskawic",
            "Dodaje 3-14 obrażeń od zimna",
            "+75 obrażeń od trucizny w ciągu 5 sek.",
            "7% zdrowia wykradzione za każde trafienie"
        ],
    },
    "Steel": {
        "name": "Stal",
        "attributes": [
            "+25% do szybkości ataku",
            "+20% do obrażeń",
            "+3 do minimalnych obrażeń",
            "+3 do maksymalnych obrażeń",
            "+50 do skuteczności ataku",
            "50% do szansy na otwarcie rany",
            "+2 do Many za każdego zabitego przeciwnika",
            "+1 do promienia światła"
        ],
    },
    "Strength": {
        "name": "Siła",
        "attributes": [
            "+35% do obrażeń",
            "7% zdrowia wykradzione za każde trafienie",
            "25% do szansy na druzgocące uderzenie",
            "+20 do siły",
            "+10 żywotności",
            "+2 do Many za każdego zabitego przeciwnika"
        ],
    },
    "Unbending Will": {
        "name": "Nieugięta Wola",
        "attributes": [
            "18% szansy na rzucenie 18-poziomowego zaklęcia DRWINA, gdy atak dosięga celu",
            "+3 do Zdolności Bojowych (Barbarzyńca)",
            "+20-30% do szybkości ataku (wartość losowa)",
            "+300-350% do obrażeń",
            "+9 do maksymalnych obrażeń",
            "+50 do skuteczności ataku",
            "+75 do obrażeń zadanych nieumarłych",
            "+50 do skuteczności ataku względem nieumarłych",
            "8-10% zdrowia wykradzione za każde trafienie (wartość losowa)",
            "Uniemożliwia leczenie się potworów",
            "+10 do siły",
            "+10 do żywotności",
            "Zmniejsza otrzymywane obrażenia o 8 pkt.",
            "+1 do promienia światła",
            "Wymagania -20%"
        ],
    },
    "Venom": {
        "name": "Jad",
        "attributes": [
            "Ignoruje obronę celu",
            "+273 obrażeń od trucizny w ciągu 6 sek.",
            "7% Many wykradzione za każde trafienie",
            "Uniemożliwia leczenie się potworów",
            "+25% szansy na zmuszenie potwora do ucieczki",
            "Trująca Nova: Poziom 13 (11 ładunków)",
            "Eksplozja Trucizny: Poziom 15 (27 ładunków)"
        ],
    },
    "Voice of Reason": {
        "name": "Głos Rozsądku",
        "attributes": [
            "15% szansy rzucenia 13-poziomowego zaklęcia ZAMARZNIĘTA KULA, gdy atak dosięga celu",
            "18% szansy rzucenia 20-poziomowego zaklęcia LODOWE UDERZENIE, gdy atak dosięga celu",
            "+50 do skuteczności ataku",
            "+220-350% do obrażeń zadanych demonom (wartość losowa)",
            "+355-375% do obrażeń zadanych nieumarłym (wartość losowa)",
            "+50 do skuteczności ataku względem nieumarłych",
            "Dodaje 100-220 obrażeń od zimna",
            "-24% do odporności wroga na zimno",
            "+10 do zręczności",
            "Odporność na zamrożenie",
            "+75% dodatkowego złota od potworów",
            "+1 do promienia światła"
        ],
    },
    "White": {
        "name": "Biel",
        "attributes": [
            "+3 do umiejętności TRUCIZN I KOŚCI (Nekromanta)",
            "+20% do szybkości rzucania czarów",
            "+2 do umiejętności WŁÓCZNIA Z KOŚCI (Nekromanta)",
            "+4 do umiejętności MISTRZOSTWO WE WŁADANIU SZKIELETAMI (Nekromanta)",
            "+3 do umiejętności ZBROJA Z KOŚCI (Nekromanta)",
            "25% szansy na zmuszenie potwora do ucieczki",
            "+10 do żywotności",
            "+13 do Many",
            "Zmniejsza otrzymywane obrażenia od magii o 4 pkt."
        ],
    },
    "Wind": {
        "name": "Wiatr",
        "attributes": [
            "10% szansa na rzucenie 9-poziomowego zaklęcia TORNADO podczas atakowania",
            "+20% do szybkości poruszania się",
            "+40% do szybkości ataku",
            "+15% do szybkości odzyskiwania równowagi",
            "+120-160% do obrażeń (wartość losowa)",
            "-50% do obrony przeciwnika",
            "+50 do skuteczności ataku",
            "Trafienie oślepia cel",
            "+1 do promienia światła",
            "Wir: Poziom 13 (127 ładunków)"
        ],
    },
    "Wrath": {
        "name": "Gniew",
        "attributes": [
            "30% szansy rzucenia 1-poziomowego zaklęcia ZNIEDOŁĘŻNIENIE podczas atakowania",
            "5% szansa na rzucenie 10-poziomowego zaklęcia WYSSANIE ŻYCIA podczas atakowania",
            "+375% do obrażeń zadanych demonom",
            "+100 do skuteczności ataku względem demonów",
            "+250-300% do obrażeń zadanych demonom (wartość losowa)",
            "Dodaje 85-120 obrażeń od magii",
            "Dodaje 41-240 obrażeń od błyskawic",
            "20% do szansy na druzgocące uderzenie",
            "Uniemożliwia leczenie się potworów",
            "+10 do energii",
            "Odporność na zamrożenie"
        ],
    },
    "Zephyr": {
        "name": "Zefir",
        "attributes": [
            "7% szansa na rzucenie 1-poziomowego zaklęcia WIR przy otrzymaniu trafienia",
            "+25% do szybkości poruszania się",
            "+25% do szybkości ataku",
            "+33% do obrażeń",
            "-25% do obrony przeciwnika",
            "+66 do skuteczności ataku",
            "Dodaje 1-50 obrażeń od błyskawic",
            "+25 do obrony"
        ],
    },
    "Ancient's Pledge": {
        "name": "Przysięga Starożytnych",
        "attributes": [
            "+50% do obrony",
            "+43% do odporności na zimno",
            "+48% do odporności na błyskawice",
            "+48% do odporności na ogień",
            "+48% do odporności na trucizny",
            "10% otrzymanych obrażeń przechodzi na Manę"
        ],
    },
    "Exile": {
        "name": "Wygnanie",
        "attributes": [
            "15% szansy rzucenia 5-poziomowego zaklęcia WYSSANIE ŻYCIA, gdy atak dosięga celu",
            "Po wyposażeniu zapewnia aurę ŚMIAŁOŚĆ na poziomie 15",
            "+2 do umiejętności AUR OFENSYWNYCH (Paladyn)",
            "+30% do szybkości blokowania",
            "Zamraża cel",
            "+220-260% do obrony (wartość losowa)",
            "+7 do przywracania zdrowia",
            "+5% do maksymalnej odporności na zimno",
            "+5% do maksymalnej odporności na ogień",
            "+25% do szansy na zdobycie magicznych przedmiotów",
            "Przywraca 1 pkt. trwałości na 4 sek."
        ],
    },
    "Rhyme": {
        "name": "Rym",
        "attributes": [
            "+40% do szybkości blokowania",
            "+20% do szansy na blok",
            "+15% do regeneracji Many",
            "+25 do wszystkich odporności",
            "Odporność na zamrożenie",
            "+50% dodatkowego złota od potworów",
            "+25% do szansy na zdobycie magicznych przedmiotów"
        ],
    },
    "Sanctuary": {
        "name": "Sanktuarium",
        "attributes": [
            "+20% do szybkości odzyskiwania równowagi",
            "+20% do szybkości blokowania",
            "+20% do szansy na blok",
            "+130-160% do obrony (wartość losowa)",
            "+250 do obrony przeciw pociskom",
            "+20 do zręczności",
            "+50-70 do wszystkich odporności (wartość losowa)",
            "Zmniejsza otrzymywane obrażenia od magii o 7 pkt.",
            "Spowolnienie Pocisków: Poziom 12 (60 ładunków)"
        ],
    },
    "Splendor": {
        "name": "Splendor",
        "attributes": [
            "+1 do wszystkich umiejętności",
            "+10% do szybkości rzucania czarów",
            "+20% do szybkości blokowania",
            "+60-100% do obrony (wartość losowa)",
            "+10 do energii",
            "15% do regeneracji Many",
            "+50% dodatkowego złota od potworów",
            "+20% do szansy na zdobycie magicznych przedmiotów",
            "+3 do promienia światła"
        ],
    },
    "Bulwark": {
      "level": 35,
      "name": "Szaniec",
      "runes": [
          "shael",
          "io",
          "sol"
      ],
      "bases": [
        "helm"
      ],
      "attributes": [
          "+20% do szybkości odzyskiwania równowagi",
          "+4–6% zdrowia wykradzionego za każde trafienie",
          "+75–100% do obrony",
          "+10 do żywotności",
          "+5% do maksymalnej wartości punktów zdrowia",
          "+30 do przywracania zdrowia",
          "Zmniejsza otrzymywane obrażenia o 7",
          "Otrzymywane obrażenia fizyczne są zmniejszone o 10–15%"
      ],
      "ladder": true,
      "tier": 2,
      "patch": 2.6,
      "wiki": "https://d2runewizard.com/runewords/Bulwark"
    },
    "Cure": {
      "level": 35,
      "name": "Remedium",
      "runes": [
          "shael",
          "io",
          "tal"
      ],
      "bases": [
        "helm"
      ],
      "attributes": [
          "+20% do szybkości odzyskiwania równowagi",
          "+75–100% do obrony",
          "+10 do żywotności",
          "+5% do maksymalnej wartości punktów zdrowia",
          "+40–60% do odporności na trucizny",
          "Skraca czas działania trucizny o 75%"
      ],
      "ladder": true,
      "tier": 2,
      "patch": 2.6,
      "wiki": "https://d2runewizard.com/runewords/Cure"
    },
    "Ground": {
      "level": 35,
      "name": "Grunt",
      "runes": [
          "shael",
          "io",
          "ort"
      ],
      "bases": [
        "helm"
      ],
      "attributes": [
          "+20% do szybkości odzyskiwania równowagi",
          "+75–100% do obrony",
          "+10 do żywotności",
          "+5% do maksymalnej wartości punktów zdrowia",
          "+40–60% do odporności na błyskawice",
          "+10–15% do absorpcji błyskawic"
      ],
      "ladder": true,
      "tier": 2,
      "patch": 2.6,
      "wiki": "https://d2runewizard.com/runewords/Ground"
    },
    "Hearth": {
      "level": 35,
      "name": "Palenisko",
      "runes": [
          "shael",
          "io",
          "thul"
      ],
      "bases": [
        "helm"
      ],
      "attributes": [
        "+20% do szybkości odzyskiwania równowagi",
        "+75–100% do obrony",
        "+10 do żywotności",
        "+5% do maksymalnej wartości punktów zdrowia",
        "+40–60% do odporności na zimno",
        "+10–15% do absorpcji zimna",
        "Odporność na zamrożenie"
      ],
      "ladder": true,
      "tier": 2,
      "patch": 2.6,
      "wiki": "https://d2runewizard.com/runewords/Hearth"
    },
    "Temper": {
      "level": 35,
      "name": "Charakter",
      "runes": [
          "shael",
          "io",
          "ral"
      ],
      "bases": [
        "helm"
      ],
      "attributes": [
          "+20% do szybkości odzyskiwania równowagi",
          "+75–100% do obrony",
          "+10 do żywotności",
          "+5% do maksymalnej wartości punktów zdrowia",
          "+40–60% do odporności na ogień",
          "+10–15% do absorpcji ognia"
      ],
      "ladder": true,
      "tier": 2,
      "patch": 2.6,
      "wiki": "https://d2runewizard.com/runewords/Temper"
    },
    "Hustle": {
      "level": 3,
      "name": "Zgiełk",
      "runes": [
          "shael",
          "ko",
          "eld"
      ],
      "bases": [
        "weapon",
        "body armor"
      ],
      "attributes": [
          "# Broń",
          "5% szansy na rzucenie 9-poziomowego zaklęcia Zwiększona Szybkość przy trafieniu",
          "+30% do szybkości ataku",
          "+130–150% do obrażeń",
          "+75% do obrażeń zadawanych nieumarłym",
          "+50 do skuteczności ataku względem nieumarłych",
          "+10 do zręczności",
          "# Pancerz",
          "+50% szybszy bieg/chód",
          "+20% do szybkości ataku",
          "+20% do szybkości odzyskiwania równowagi",
          "+10 do zręczności",
          "Wytrzymałość maleje o 50% wolniej",
      ],
      "ladder": true,
      "tier": 2,
      "patch": 2.6,
      "wiki": "https://d2runewizard.com/runewords/Hustle"
    },
    "Mosaic": {
      "level": 53,
      "name": "Mozaika",
      "runes": [
          "mal",
          "gul",
          "amn"
      ],
      "bases": [
        "claw"
      ],
      "attributes": [
          "+25% do szansy na niewykorzystanie ładunków przez kończące uderzenia",
          "+2 do umiejętności Sztuk Walki (tylko zabójczyni)",
          "+20% do szybkości ataku",
          "+200–250% do obrażeń",
          "+20% do premii do skuteczności ataku",
          "+3–14 pkt. obrażeń od zimna",
          "Uniemożliwia leczenie się potworów"
      ],
      "ladder": true,
      "tier": 3,
      "patch": 2.6,
      "wiki": "https://d2runewizard.com/runewords/Mosaic"
    },
    "Metamorphosis": {
      "level": 67,
      "name": "Metamorfoza",
      "runes": [
          "io",
          "cham",
          "fal"
      ],
      "bases": [
        "helm"
      ],
      "attributes": [
          "Ataki wilkołaka zapewniają naznaczenie na 180 sek.",
          "Znak Wilka:",
          "+20% do premii do skuteczności ataku",
          "+40% do maksymalnej wartości punktów zdrowia",
          "Ataki niedźwiedziołaka zapewniają naznaczenie na 180 sek.",
          "Znak Niedźwiedzia:",
          "+25% do szybkości ataku",
          "+25% do szansy na druzgocące uderzenie",
          "Otrzymywane obrażenia fizyczne są zmniejszone o 20%",
          "+5 do umiejętności Zmiany Kształtu (tylko druid)",
          "+50–80% do obrony",
          "+10 do siły",
          "+10 do żywotności",
          "+10 do wszystkich odporności",
          "Odporność na zamrożenie"
      ],
      "ladder": true,
      "tier": 3,
      "patch": 2.6,
      "wiki": "https://d2runewizard.com/runewords/Metamorphosis"
    }
};
