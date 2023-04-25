export type Runeword = {
    name: string,
    runes: string[],
    bases: string[],
    attributes: string[],
    ladder: boolean,
    tier: number,
    patch: number,
    wiki: string,
    level: number,
}
export type RunewordsMapping = {[runewordName: string]: Runeword};

export const runewordsMapping: RunewordsMapping = {
    "Delirium": {
        "level": 51,
        "name": "Delirium",
        "runes": [
            "lem",
            "ist",
            "io"
        ],
        "bases": [
            "helm"
        ],
        "attributes": [
            "1% Chance To Cast level 50 Delirium When Struck",
            "6% Chance To Cast level 14 Mind Blast When Struck",
            "14% Chance To Cast level 13 Terror When Struck",
            "11% Chance To Cast level 18 Confuse On Striking",
            "+2 To All Skills",
            "+261 Defense",
            "+10 To Vitality",
            "50% Extra Gold From Monsters",
            "25% Better Chance of Getting Magic Items",
            "Level 17 Attract (60 Charges)"
        ],
        "ladder": false,
        "tier": 2,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Delirium"
    },
    "Dream": {
        "level": 65,
        "name": "Dream",
        "runes": [
            "io",
            "jah",
            "pul"
        ],
        "bases": [
            "helm",
            "shield"
        ],
        "attributes": [
            "10% Chance To Cast Level 15 Confuse When Struck",
            "Level 15 Holy Shock Aura When Equipped",
            "+20-30% Faster Hit Recovery (varies)",
            "+30% Enhanced Defense",
            "+150-220 Defense (varies)",
            "+10 To Vitality",
            "+(0.625*Clvl) To Mana (Based On Character Level)",
            "All Resistances +5-20 (varies)",
            "12-25% Better Chance of Getting Magic Items (varies)",
            "# Headgear",
            "Increase Maximum Life 5%",
            "# Shields",
            "+50 To Life"
        ],
        "ladder": true,
        "tier": 2,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Dream"
    },
    "Flickering Flame": {
        "level": 55,
        "name": "Flickering Flame",
        "runes": [
            "nef",
            "pul",
            "vex"
        ],
        "bases": [
            "helm"
        ],
        "attributes": [
            "Level 4-8 Resist Fire Aura When Equipped (varies)",
            "+3 to Fire Skills",
            "-10-15% to Enemy Fire Resistance (varies)",
            "+30% Enhanced Defense",
            "+30 Defense vs. Missile",
            "Adds 3-14 Cold Damage",
            "+50-75 to Mana (varies)",
            "+5% to Maximum Fire Resist",
            "Half Freeze Duration",
            "Poison Length Reduced by 50% "
        ],
        "ladder": true,
        "tier": 3,
        "patch": 2.4,
        "wiki": "https://d2runewizard.com/runewords/Flickering%20Flame"
    },
    "Lore": {
        "level": 27,
        "name": "Lore",
        "runes": [
            "ort",
            "sol"
        ],
        "bases": [
            "helm"
        ],
        "attributes": [
            "+1 to All Skills",
            "+10 to Energy",
            "Lightning Resist +30%",
            "Damage Reduced by 7",
            "+2 to Mana after each Kill",
            "+2 to Light Radius"
        ],
        "ladder": false,
        "tier": 2,
        "patch": 1,
        "wiki": "https://d2runewizard.com/runewords/Lore"
    },
    "Nadir": {
        "level": 13,
        "name": "Nadir",
        "runes": [
            "nef",
            "tir"
        ],
        "bases": [
            "helm"
        ],
        "attributes": [
            "+50% Enhanced Defense",
            "+10 Defense",
            "+30 Defense vs. Missile",
            "+5 to Strength",
            "+2 to Mana after each Kill",
            "-33% Extra Gold from Monsters",
            "-3 to Light Radius",
            "Level 13 Cloak of Shadows (9 charges)"
        ],
        "ladder": false,
        "tier": 3,
        "patch": 1,
        "wiki": "https://d2runewizard.com/runewords/Nadir"
    },
    "Radiance": {
        "level": 27,
        "name": "Radiance",
        "runes": [
            "nef",
            "sol",
            "ith"
        ],
        "bases": [
            "helm"
        ],
        "attributes": [
            "+75% Enhanced Defense",
            "+30 Defense vs. Missile",
            "+10 to Vitality",
            "+10 to Energy",
            "+33 to Mana",
            "Damage Reduced by 7",
            "Magic Damage Reduced by 3",
            "15% Damage Taken Goes to Mana",
            "+5 to Light Radius"
        ],
        "ladder": false,
        "tier": 4,
        "patch": 1,
        "wiki": "https://d2runewizard.com/runewords/Radiance"
    },
    "Wisdom": {
        "level": 45,
        "name": "Wisdom",
        "runes": [
            "pul",
            "ith",
            "eld"
        ],
        "bases": [
            "helm"
        ],
        "attributes": [
            "33% Piercing Attack",
            "+15-25% Bonus to Attack Rating (varies)",
            "4-8% mana stolen per hit (varies)",
            "+30% Enhanced Defense",
            "+10 Energy",
            "Lowers Stamina drain by 15%",
            "Cannot Be Frozen",
            "+5 mana after each kill",
            "15% damage taken goes to mana"
        ],
        "ladder": true,
        "tier": 3,
        "patch": 2.4,
        "wiki": "https://d2runewizard.com/runewords/Wisdom"
    },
    "Bone": {
        "level": 47,
        "name": "Bone",
        "runes": [
            "sol",
            "um",
            "um"
        ],
        "bases": [
            "body armor"
        ],
        "attributes": [
            "15% Chance To Cast level 10 Bone Armor When Struck",
            "15% Chance To Cast level 10 Bone Spear On Striking",
            "+2 To Necromancer Skill Levels",
            "+100-150 To Mana (varies)",
            "All Resistances +30",
            "Damage Reduced By 7"
        ],
        "ladder": false,
        "tier": 4,
        "patch": 1.11,
        "wiki": "https://d2runewizard.com/runewords/Bone"
    },
    "Bramble": {
        "level": 61,
        "name": "Bramble",
        "runes": [
            "ral",
            "ohm",
            "sur",
            "eth"
        ],
        "bases": [
            "body armor"
        ],
        "attributes": [
            "Level 15-21 Thorns Aura When Equipped (varies)",
            "+50% Faster Hit Recovery",
            "+25-50% To Poison Skill Damage (varies)",
            "+300 Defense",
            "Increase Maximum Mana 5%",
            "Regenerate Mana 15%",
            "+5% To Maximum Cold Resist",
            "Fire Resist +30%",
            "Poison Resist +100%",
            "+13 Life After Each Kill",
            "Level 13 Spirit of Barbs (33 Charges)"
        ],
        "ladder": false,
        "tier": 3,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Bramble"
    },
    "Chains of Honor": {
        "level": 63,
        "name": "Chains of Honor",
        "runes": [
            "dol",
            "um",
            "ber",
            "ist"
        ],
        "bases": [
            "body armor"
        ],
        "attributes": [
            "+2 To All Skills",
            "+200% Damage To Demons",
            "+100% Damage To Undead",
            "8% Life Stolen Per Hit",
            "+70% Enhanced Defense",
            "+20 To Strength",
            "Replenish Life +7",
            "All Resistances +65",
            "Damage Reduced By 8%",
            "25% Better Chance of Getting Magic Items"
        ],
        "ladder": false,
        "tier": 1,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Chains%20of%20Honor"
    },
    "Dragon": {
        "level": 61,
        "name": "Dragon",
        "runes": [
            "sur",
            "lo",
            "sol"
        ],
        "bases": [
            "body armor",
            "shield"
        ],
        "attributes": [
            "20% Chance to Cast Level 18 Venom When Struck",
            "12% Chance To Cast Level 15 Hydra On Striking",
            "Level 14 Holy Fire Aura When Equipped",
            "+360 Defense",
            "+230 Defense Vs. Missile",
            "+3-5 To All Attributes (varies)",
            "+(0.375*Clvl) To Strength (Based on Character Level)",
            "+5% To Maximum Lightning Resist",
            "Damage Reduced by 7",
            "# Armor",
            "Increase Maximum Mana 5%",
            "# Shields",
            "+50 To Mana"
        ],
        "ladder": true,
        "tier": 3,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Dragon"
    },
    "Duress": {
        "level": 47,
        "name": "Duress",
        "runes": [
            "shael",
            "um",
            "thul"
        ],
        "bases": [
            "body armor"
        ],
        "attributes": [
            "+40% faster hit Recovery",
            "+10-20% Enhanced Damage (varies)",
            "Adds 37-133 Cold Damage",
            "15% Chance of Crushing Blow",
            "33% Chance of Open Wounds",
            "+150-200% Enhanced Defense (varies)",
            "-20% Slower Stamina Drain",
            "Cold Resist +45%",
            "Lightning Resist +15%",
            "Fire Resist +15%",
            "Poison Resist +15%"
        ],
        "ladder": false,
        "tier": 2,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Duress"
    },
    "Enigma": {
        "level": 65,
        "name": "Enigma",
        "runes": [
            "jah",
            "ith",
            "ber"
        ],
        "bases": [
            "body armor"
        ],
        "attributes": [
            "+2 To All Skills",
            "+45% Faster Run/Walk",
            "+1 To Teleport",
            "+750-775 Defense (varies)",
            "+(0.75*Clvl) To Strength (Based On Character Level)",
            "Increase Maximum Life 5%",
            "Damage Reduced By 8%",
            "+14 Life After Each Kill",
            "15% Damage Taken Goes To Mana",
            "(1*Clvl)% Better Chance of Getting Magic Items (Based On Character Level)"
        ],
        "ladder": false,
        "tier": 1,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Enigma"
    },
    "Enlightenment": {
        "level": 45,
        "name": "Enlightenment",
        "runes": [
            "pul",
            "ral",
            "sol"
        ],
        "bases": [
            "body armor"
        ],
        "attributes": [
            "5% Chance To Cast Level 15 Blaze When Struck",
            "5% Chance To Cast level 15 Fire Ball On Striking",
            "+2 To Sorceress Skill Levels",
            "+1 To Warmth",
            "+30% Enhanced Defense",
            "Fire Resist +30%",
            "Damage Reduced By 7"
        ],
        "ladder": false,
        "tier": 4,
        "patch": 1.11,
        "wiki": "https://d2runewizard.com/runewords/Enlightenment"
    },
    "Fortitude": {
        "level": 59,
        "name": "Fortitude",
        "runes": [
            "el",
            "sol",
            "dol",
            "lo"
        ],
        "bases": [
            "weapon",
            "body armor"
        ],
        "attributes": [
            "20% Chance To Cast Level 15 Chilling Armor when Struck",
            "+25% Faster Cast Rate",
            "+300% Enhanced Damage",
            "+200% Enhanced Defense",
            "+((8-12)*0.125*Clvl) To Life (Based on Character Level) (varies)",
            "All Resistances +25-30 (varies)",
            "12% Damage Taken Goes To Mana",
            "+1 To Light Radius",
            "# Weapons",
            "+9 To Minimum Damage",
            "+50 To Attack Rating",
            "20% Deadly Strike",
            "Hit Causes Monster To Flee 25%",
            "# Armor",
            "+15 Defense",
            "Replenish Life +7",
            "+5% To Maximum Lightning Resist",
            "Damage Reduced By 7"
        ],
        "ladder": true,
        "tier": 1,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Fortitude"
    },
    "Gloom": {
        "level": 47,
        "name": "Gloom",
        "runes": [
            "fal",
            "um",
            "pul"
        ],
        "bases": [
            "body armor"
        ],
        "attributes": [
            "15% Chance To Cast Level 3 Dim Vision When Struck",
            "+10% Faster Hit Recovery",
            "+200-260% Enhanced Defense (varies)",
            "+10 To Strength",
            "All Resistances +45",
            "Half Freeze Duration",
            "5% Damage Taken Goes To Mana",
            "-3 To Light Radius"
        ],
        "ladder": false,
        "tier": 4,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Gloom"
    },
    "Lionheart": {
        "level": 41,
        "name": "Lionheart",
        "runes": [
            "hel",
            "lum",
            "fal"
        ],
        "bases": [
            "body armor"
        ],
        "attributes": [
            "+20% Enhanced Damage",
            "+25 To Strength",
            "+15 To Dexterity",
            "+20 To Vitality",
            "+10 To Energy",
            "+50 To Life",
            "All Resistances +30",
            "Requirements -15%"
        ],
        "ladder": false,
        "tier": 3,
        "patch": 1,
        "wiki": "https://d2runewizard.com/runewords/Lionheart"
    },
    "Myth": {
        "level": 33,
        "name": "Myth",
        "runes": [
            "hel",
            "amn",
            "nef"
        ],
        "bases": [
            "body armor"
        ],
        "attributes": [
            "3% Chance To Cast Level 1 Howl When Struck",
            "10% Chance To Cast Level 1 Taunt On Striking",
            "+2 To Barbarian Skill Levels",
            "+30 Defense Vs. Missile",
            "Replenish Life +10",
            "Attacker Takes Damage of 14",
            "Requirements -15%"
        ],
        "ladder": false,
        "tier": 5,
        "patch": 1.11,
        "wiki": "https://d2runewizard.com/runewords/Myth"
    },
    "Peace": {
        "level": 29,
        "name": "Peace",
        "runes": [
            "shael",
            "thul",
            "amn"
        ],
        "bases": [
            "body armor"
        ],
        "attributes": [
            "4% Chance To Cast Level 5 Slow Missiles When Struck",
            "2% Chance To Cast level 15 Valkyrie On Striking",
            "+2 To Amazon Skill Levels",
            "+20% Faster Hit Recovery",
            "+2 To Critical Strike",
            "Cold Resist +30%",
            "Attacker Takes Damage of 14"
        ],
        "ladder": false,
        "tier": 3,
        "patch": 1.11,
        "wiki": "https://d2runewizard.com/runewords/Peace"
    },
    "Principle": {
        "level": 53,
        "name": "Principle",
        "runes": [
            "ral",
            "gul",
            "eld"
        ],
        "bases": [
            "body armor"
        ],
        "attributes": [
            "100% Chance To Cast Level 5 Holy Bolt On Striking",
            "+2 To Paladin Skill Levels",
            "+50% Damage to Undead",
            "+100-150 to Life (varies)",
            "15% Slower Stamina Drain",
            "+5% To Maximum Poison Resist",
            "Fire Resist +30%"
        ],
        "ladder": false,
        "tier": 4,
        "patch": 1.11,
        "wiki": "https://d2runewizard.com/runewords/Principle"
    },
    "Prudence": {
        "level": 49,
        "name": "Prudence",
        "runes": [
            "mal",
            "tir"
        ],
        "bases": [
            "body armor"
        ],
        "attributes": [
            "+25% Faster Hit Recovery",
            "+140-170% Enhanced Defense (varies)",
            "All Resistances +25-35 (varies)",
            "Damage Reduced by 3",
            "Magic Damage Reduced by 17",
            "+2 To Mana After Each Kill",
            "+1 To Light Radius",
            "Repairs 1 Durability every 4 seconds"
        ],
        "ladder": false,
        "tier": 3,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Prudence"
    },
    "Rain": {
        "level": 49,
        "name": "Rain",
        "runes": [
            "ort",
            "mal",
            "ith"
        ],
        "bases": [
            "body armor"
        ],
        "attributes": [
            "5% Chance To Cast Level 15 Cyclone Armor When Struck",
            "5% Chance To Cast Level 15 Twister On Striking",
            "+2 To Druid Skills",
            "+100-150 To Mana (varies)",
            "Lightning Resist +30%",
            "Magic Damage Reduced By 7",
            "15% Damage Taken Goes to Mana"
        ],
        "ladder": false,
        "tier": 4,
        "patch": 1.11,
        "wiki": "https://d2runewizard.com/runewords/Rain"
    },
    "Smoke": {
        "level": 37,
        "name": "Smoke",
        "runes": [
            "nef",
            "lum"
        ],
        "bases": [
            "body armor"
        ],
        "attributes": [
            "+20% Faster Hit Recovery",
            "+75% Enhanced Defense",
            "+280 Defense vs. Missile",
            "+10 to Energy",
            "All Resistances +50",
            "-1 to Light Radius",
            "Level 6 Weaken (18 charges)"
        ],
        "ladder": false,
        "tier": 2,
        "patch": 1,
        "wiki": "https://d2runewizard.com/runewords/Smoke"
    },
    "Stealth": {
        "level": 17,
        "name": "Stealth",
        "runes": [
            "tal",
            "eth"
        ],
        "bases": [
            "body armor"
        ],
        "attributes": [
            "Magic Damage Reduced By 3",
            "+6 To Dexterity",
            "+15 To Maximum Stamina",
            "Poison Resist +30%",
            "Regenerate Mana 15%",
            "25% Faster Run/Walk",
            "+25% Faster Cast Rate",
            "+25% Faster Hit Recovery"
        ],
        "ladder": false,
        "tier": 1,
        "patch": 1,
        "wiki": "https://d2runewizard.com/runewords/Stealth"
    },
    "Stone": {
        "level": 47,
        "name": "Stone",
        "runes": [
            "shael",
            "um",
            "pul",
            "lum"
        ],
        "bases": [
            "body armor"
        ],
        "attributes": [
            "+60% Faster Hit Recovery",
            "+250-290% Enhanced Defense (varies)",
            "+300 Defense Vs. Missile",
            "+16 To Strength",
            "+16 To Vitality",
            "+10 To Energy",
            "All Resistances +15",
            "Level 16 Molten Boulder (80 Charges)",
            "Level 16 Clay Golem (16 Charges)"
        ],
        "ladder": false,
        "tier": 3,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Stone"
    },
    "Treachery": {
        "level": 43,
        "name": "Treachery",
        "runes": [
            "shael",
            "thul",
            "lem"
        ],
        "bases": [
            "body armor"
        ],
        "attributes": [
            "5% Chance To Cast Level 15 Fade When Struck",
            "25% Chance To Cast level 15 Venom On Striking",
            "+2 To Assassin Skills",
            "+45% Increased Attack Speed",
            "+20% Faster Hit Recovery",
            "Cold Resist +30%",
            "50% Extra Gold From Monsters"
        ],
        "ladder": false,
        "tier": 1,
        "patch": 1.11,
        "wiki": "https://d2runewizard.com/runewords/Treachery"
    },
    "Wealth": {
        "level": 43,
        "name": "Wealth",
        "runes": [
            "lem",
            "ko",
            "tir"
        ],
        "bases": [
            "body armor"
        ],
        "attributes": [
            "+10 to Dexterity",
            "+2 to Mana After Each Kill",
            "300% Extra Gold From Monsters",
            "100% Better Chance of Getting Magic Items"
        ],
        "ladder": false,
        "tier": 3,
        "patch": 1,
        "wiki": "https://d2runewizard.com/runewords/Wealth"
    },
    "Beast": {
        "level": 63,
        "name": "Beast",
        "runes": [
            "ber",
            "tir",
            "um",
            "mal",
            "lum"
        ],
        "bases": [
            "axe",
            "hammer",
            "scepter"
        ],
        "attributes": [
            "Level 9 Fanaticism Aura When Equipped",
            "+40% Increased Attack Speed",
            "+240-270% Enhanced Damage (varies)",
            "20% Chance of Crushing Blow",
            "25% Chance of Open Wounds",
            "+3 To Werebear",
            "+3 To Lycanthropy",
            "Prevent Monster Heal",
            "+25-40 To Strength (varies)",
            "+10 To Energy",
            "+2 To Mana After Each Kill",
            "Level 13 Summon Grizzly (5 Charges)"
        ],
        "ladder": false,
        "tier": 2,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Beast"
    },
    "Black": {
        "level": 35,
        "name": "Black",
        "runes": [
            "thul",
            "io",
            "nef"
        ],
        "bases": [
            "club",
            "hammer",
            "mace"
        ],
        "attributes": [
            "+15% Increased Attack Speed",
            "+120% Enhanced Damage",
            "+200 to Attack Rating",
            "Adds 3-14 Cold Damage",
            "40% Chance of Crushing Blow",
            "Knockback",
            "+10 to Vitality",
            "Magic Damage Reduced By 2",
            "Level 4 Corpse Explosion (12 Charges)"
        ],
        "ladder": false,
        "tier": 2,
        "patch": 1,
        "wiki": "https://d2runewizard.com/runewords/Black"
    },
    "Brand": {
        "level": 65,
        "name": "Brand",
        "runes": [
            "jah",
            "lo",
            "mal",
            "gul"
        ],
        "bases": [
            "missile weapon"
        ],
        "attributes": [
            "35% Chance To Cast Level 14 Amplify Damage When Struck",
            "100% Chance To Cast Level 18 Bone Spear On Striking",
            "Fires Explosive Arrows or Bolts (15)",
            "+260-340% Enhanced Damage (varies)",
            "Ignore Target's Defense",
            "20% Bonus to Attack Rating",
            "+280-330% Damage To Demons (varies)",
            "20% Deadly Strike",
            "Prevent Monster Heal",
            "Knockback"
        ],
        "ladder": true,
        "tier": 3,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Brand"
    },
    "Breath of the Dying": {
        "level": 69,
        "name": "Breath of the Dying",
        "runes": [
            "vex",
            "hel",
            "el",
            "eld",
            "zod",
            "eth"
        ],
        "bases": [
            "weapon"
        ],
        "attributes": [
            "50% Chance To Cast Level 20 Poison Nova When You Kill An Enemy",
            "Indestructible",
            "+60% Increased Attack Speed",
            "+350-400% Enhanced Damage (varies)",
            "-25% Target Defense",
            "+50 To Attack Rating",
            "+200% Damage To Undead",
            "+50 To Attack Rating Against Undead",
            "7% Mana Stolen Per Hit",
            "12-15% Life Stolen Per Hit (varies)",
            "Prevent Monster Heal",
            "+30 To All Attributes",
            "+1 To Light Radius",
            "Requirements -20%"
        ],
        "ladder": false,
        "tier": 1,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Breath%20of%20the%20Dying"
    },
    "Call to Arms": {
        "level": 57,
        "name": "Call to Arms",
        "runes": [
            "amn",
            "ral",
            "mal",
            "ist",
            "ohm"
        ],
        "bases": [
            "weapon"
        ],
        "attributes": [
            "+1 To All Skills",
            "+40% Increased Attack Speed",
            "+240-290% Enhanced Damage (varies)",
            "Adds 5-30 Fire Damage",
            "7% Life Stolen Per Hit",
            "+2-6 To Battle Command (varies)",
            "+1-6 To Battle Orders (varies)",
            "+1-4 To Battle Cry (varies)",
            "Prevent Monster Heal",
            "Replenish Life +12",
            "30% Better Chance of Getting Magic Items"
        ],
        "ladder": false,
        "tier": 1,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Call%20to%20Arms"
    },
    "Chaos": {
        "level": 57,
        "name": "Chaos",
        "runes": [
            "fal",
            "ohm",
            "um"
        ],
        "bases": [
            "claw"
        ],
        "attributes": [
            "9% Chance To Cast Level 11 Frozen Orb On Striking",
            "11% Chance To Cast Level 9 Charged Bolt On Striking",
            "+35% Increased Attacked Speed",
            "+290-340% Enhanced Damage (varies)",
            "Adds 216-471 Magic Damage",
            "25% Chance of Open Wounds",
            "+1 To Whirlwind",
            "+10 To Strength",
            "+15 Life After Each Demon Kill"
        ],
        "ladder": false,
        "tier": 2,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Chaos"
    },
    "Crescent Moon": {
        "level": 47,
        "name": "Crescent Moon",
        "runes": [
            "shael",
            "um",
            "tir"
        ],
        "bases": [
            "axe",
            "polearm",
            "sword"
        ],
        "attributes": [
            "10% Chance To Cast Level 17 Chain Lightning On Striking",
            "7% Chance To Cast Level 13 Static Field On Striking",
            "+20% Increased Attack Speed",
            "+180-220% Enhanced Damage (varies)",
            "Ignore Target's Defense",
            "-35% To Enemy Lightning Resistance",
            "25% Chance of Open Wounds",
            "+9-11 Magic Absorb (varies)",
            "+2 To Mana After Each Kill",
            "Level 18 Summon Spirit Wolf (30 Charges)"
        ],
        "ladder": false,
        "tier": 3,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Crescent%20Moon"
    },
    "Death": {
        "level": 55,
        "name": "Death",
        "runes": [
            "hel",
            "el",
            "vex",
            "ort",
            "gul"
        ],
        "bases": [
            "sword",
            "axe"
        ],
        "attributes": [
            "Indestructible",
            "100% Chance To Cast Level 44 Chain Lightning When You Die",
            "25% Chance To Cast Level 18 Glacial Spike On Attack",
            "+300-385% Enhanced Damage (varies)",
            "20% Bonus To Attack Rating",
            "+50 To Attack Rating",
            "Adds 1-50 Lightning Damage",
            "7% Mana Stolen Per Hit",
            "50% Chance of Crushing Blow",
            "(0.5*Clvl)% Deadly Strike (Based on Character Level)",
            "+1 To Light Radius",
            "Level 22 Blood Golem (15 Charges)",
            "Requirements -20%"
        ],
        "ladder": true,
        "tier": 2,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Death"
    },
    "Destruction": {
        "level": 65,
        "name": "Destruction",
        "runes": [
            "vex",
            "lo",
            "ber",
            "jah",
            "ko"
        ],
        "bases": [
            "polearm",
            "sword"
        ],
        "attributes": [
            "23% Chance To Cast Level 12 Volcano On Striking",
            "5% Chance To Cast Level 23 Molten Boulder On Striking",
            "100% Chance To Cast level 45 Meteor When You Die",
            "15% Chance To Cast Level 22 Nova On Attack",
            "+350% Enhanced Damage",
            "Ignore Target's Defense",
            "Adds 100-180 Magic Damage",
            "7% Mana Stolen Per Hit",
            "20% Chance Of Crushing Blow",
            "20% Deadly Strike",
            "Prevent Monster Heal",
            "+10 To Dexterity"
        ],
        "ladder": true,
        "tier": 4,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Destruction"
    },
    "Doom": {
        "level": 67,
        "name": "Doom",
        "runes": [
            "hel",
            "ohm",
            "um",
            "lo",
            "cham"
        ],
        "bases": [
            "axe",
            "hammer",
            "polearm"
        ],
        "attributes": [
            "5% Chance To Cast Level 18 Volcano On Striking",
            "Level 12 Holy Freeze Aura When Equipped",
            "+2 To All Skills",
            "+45% Increased Attack Speed",
            "+330-370% Enhanced Damage (varies)",
            "-40-60% To Enemy Cold Resistance (varies)",
            "20% Deadly Strike",
            "25% Chance of Open Wounds",
            "Prevent Monster Heal",
            "Freezes Target +3",
            "Requirements -20%"
        ],
        "ladder": false,
        "tier": 2,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Doom"
    },
    "Edge": {
        "level": 25,
        "name": "Edge",
        "runes": [
            "tir",
            "tal",
            "amn"
        ],
        "bases": [
            "missile weapon"
        ],
        "attributes": [
            "Level 15 Thorns Aura When Equipped",
            "+35% Increased Attack Speed",
            "+320-380% Damage To Demons (varies)",
            "+280% Damage To Undead",
            "+75 Poison Damage Over 5 Seconds",
            "7% Life Stolen Per Hit",
            "Prevent Monster Heal",
            "+5-10 To All Attributes (varies)",
            "+2 To Mana After Each Kill",
            "Reduces All Vendor Prices 15%"
        ],
        "ladder": true,
        "tier": 3,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Edge"
    },
    "Eternity": {
        "level": 63,
        "name": "Eternity",
        "runes": [
            "amn",
            "ber",
            "ist",
            "sol",
            "sur"
        ],
        "bases": [
            "melee weapon"
        ],
        "attributes": [
            "Indestructible",
            "+260-310% Enhanced Damage (varies)",
            "+9 To Minimum Damage",
            "7% Life Stolen Per Hit",
            "20% Chance of Crushing Blow",
            "Hit Blinds Target",
            "Slows Target By 33%",
            "Replenish Mana 16%",
            "Cannot Be Frozen",
            "30% Better Chance Of Getting Magic Items",
            "Level 8 Revive (88 Charges)"
        ],
        "ladder": false,
        "tier": 4,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Eternity"
    },
    "Faith": {
        "level": 65,
        "name": "Faith",
        "runes": [
            "ohm",
            "jah",
            "lem",
            "eld"
        ],
        "bases": [
            "missile weapon"
        ],
        "attributes": [
            "Level 12-15 Fanaticism Aura When Equipped (varies)",
            "+1-2 To All Skills (varies)",
            "+330% Enhanced Damage",
            "Ignore Target's Defense",
            "300% Bonus To Attack Rating",
            "+75% Damage To Undead",
            "+50 To Attack Rating Against Undead",
            "+120 Fire Damage",
            "All Resistances +15",
            "10% Reanimate As: Returned",
            "75% Extra Gold From Monsters"
        ],
        "ladder": true,
        "tier": 1,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Faith"
    },
    "Famine": {
        "level": 65,
        "name": "Famine",
        "runes": [
            "fal",
            "ohm",
            "ort",
            "jah"
        ],
        "bases": [
            "axe",
            "hammer"
        ],
        "attributes": [
            "+30% Increased Attack Speed",
            "+320-370% Enhanced Damage (varies)",
            "Ignore Target's Defense",
            "Adds 180-200 Magic Damage",
            "Adds 50-200 Fire Damage",
            "Adds 51-250 Lightning Damage",
            "Adds 50-200 Cold Damage",
            "12% Life Stolen Per Hit",
            "Prevent Monster Heal",
            "+10 To Strength"
        ],
        "ladder": false,
        "tier": 2,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Famine"
    },
    "Fury": {
        "level": 65,
        "name": "Fury",
        "runes": [
            "jah",
            "gul",
            "eth"
        ],
        "bases": [
            "melee weapon"
        ],
        "attributes": [
            "40% Increased Attack Speed",
            "+209% Enhanced Damage",
            "Ignore Target's Defense",
            "-25% Target Defense",
            "20% Bonus to Attack Rating",
            "6% Life Stolen Per Hit",
            "33% Chance Of Deadly Strike",
            "66% Chance Of Open Wounds",
            "+5 To Frenzy (Barbarian Only)",
            "Prevent Monster Heal"
        ],
        "ladder": false,
        "tier": 3,
        "patch": 1,
        "wiki": "https://d2runewizard.com/runewords/Fury"
    },
    "Grief": {
        "level": 59,
        "name": "Grief",
        "runes": [
            "eth",
            "tir",
            "lo",
            "mal",
            "ral"
        ],
        "bases": [
            "sword",
            "axe"
        ],
        "attributes": [
            "35% Chance To Cast Level 15 Venom On Striking",
            "+30-40% Increased Attack Speed (varies)",
            "Damage +340-400 (varies)",
            "Ignore Target's Defense",
            "-25% Target Defense",
            "+(1.875*Clvl)% Damage To Demons (Based on Character Level)",
            "Adds 5-30 Fire Damage",
            "-20-25% To Enemy Poison Resistance (varies)",
            "20% Deadly Strike",
            "Prevent Monster Heal",
            "+2 To Mana After Each Kill",
            "+10-15 Life After Each Kill (varies)"
        ],
        "ladder": true,
        "tier": 1,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Grief"
    },
    "Hand of Justice": {
        "level": 67,
        "name": "Hand of Justice",
        "runes": [
            "sur",
            "cham",
            "amn",
            "lo"
        ],
        "bases": [
            "weapon"
        ],
        "attributes": [
            "100% Chance To Cast Level 36 Blaze When You Level-Up",
            "100% Chance To Cast Level 48 Meteor When You Die",
            "Level 16 Holy Fire Aura When Equipped",
            "+33% Increased Attack Speed",
            "+280-330% Enhanced Damage (varies)",
            "Ignore Target's Defense",
            "-20% To Enemy Fire Resistance",
            "7% Life Stolen Per Hit",
            "20% Deadly Strike",
            "Hit Blinds Target",
            "Freezes Target +3"
        ],
        "ladder": false,
        "tier": 3,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Hand%20of%20Justice"
    },
    "Harmony": {
        "level": 39,
        "name": "Harmony",
        "runes": [
            "tir",
            "ith",
            "sol",
            "ko"
        ],
        "bases": [
            "missile weapon"
        ],
        "attributes": [
            "Level 10 Vigor Aura When Equipped",
            "+200-275% Enhanced Damage (varies)",
            "+9 To Minimum Damage",
            "+9 To Maximum Damage",
            "Adds 55-160 Fire Damage",
            "Adds 55-160 Lightning Damage",
            "Adds 55-160 Cold Damage",
            "+2-6 To Valkyrie (varies)",
            "+10 To Dexterity",
            "Regenerate Mana 20%",
            "+2 To Mana After Each Kill",
            "+2 To Light Radius",
            "Level 20 Revive (25 Charges)"
        ],
        "ladder": true,
        "tier": 4,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Harmony"
    },
    "Heart of the Oak": {
        "level": 55,
        "name": "Heart of the Oak",
        "runes": [
            "ko",
            "vex",
            "pul",
            "thul"
        ],
        "bases": [
            "staff",
            "mace"
        ],
        "attributes": [
            "+3 To All Skills",
            "+40% Faster Cast Rate",
            "+75% Damage To Demons",
            "+100 To Attack Rating Against Demons",
            "Adds 3-14 Cold Damage",
            "7% Mana Stolen Per Hit",
            "+10 To Dexterity",
            "Replenish Life +20",
            "Increase Maximum Mana 15%",
            "All Resistances +30-40 (varies)",
            "Level 4 Oak Sage (25 Charges)",
            "Level 14 Raven (60 Charges)"
        ],
        "ladder": false,
        "tier": 1,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Heart%20of%20the%20Oak"
    },
    "Holy Thunder": {
        "level": 21,
        "name": "Holy Thunder",
        "runes": [
            "eth",
            "ral",
            "ort",
            "tal"
        ],
        "bases": [
            "scepter"
        ],
        "attributes": [
            "+60% Enhanced Damage",
            "+10 to Maximum Damage",
            "-25% Target Defense",
            "Adds 5-30 Fire Damage",
            "Adds 21-110 Lightning Damage",
            "+75 Poison Damage over 5 seconds",
            "+3 to Holy Shock (Paladin Only)",
            "+5% to Maximum Lightning Resist",
            "Lightning Resist +60%",
            "Level 7 Chain Lightning (60 charges)"
        ],
        "ladder": false,
        "tier": 3,
        "patch": 1,
        "wiki": "https://d2runewizard.com/runewords/Holy%20Thunder"
    },
    "Honor": {
        "level": 27,
        "name": "Honor",
        "runes": [
            "amn",
            "el",
            "ith",
            "tir",
            "sol"
        ],
        "bases": [
            "melee weapon"
        ],
        "attributes": [
            "+1 to all skills",
            "+160% Enhanced Damage",
            "+9 to Minimum Damage",
            "+9 to Maximum Damage",
            "+250 to Attack Rating",
            "7% Life Stolen per Hit",
            "25% Deadly Strike",
            "+10 to Strength",
            "Replenish life +10",
            "+2 to Mana after each Kill",
            "+1 to Light Radius"
        ],
        "ladder": false,
        "tier": 2,
        "patch": 1,
        "wiki": "https://d2runewizard.com/runewords/Honor"
    },
    "Ice": {
        "level": 65,
        "name": "Ice",
        "runes": [
            "amn",
            "shael",
            "jah",
            "lo"
        ],
        "bases": [
            "missile weapon"
        ],
        "attributes": [
            "100% Chance To Cast Level 40 Blizzard When You Level-up",
            "25% Chance To Cast Level 22 Frost Nova On Striking",
            "Level 18 Holy Freeze Aura When Equipped",
            "+20% Increased Attack Speed",
            "+140-210% Enhanced Damage (varies)",
            "Ignore Target's Defense",
            "+25-30% To Cold Skill Damage (varies)",
            "7% Life Stolen Per Hit",
            "-20% To Enemy Cold Resistance",
            "20% Deadly Strike",
            "(3.125*Clvl)% Extra Gold From Monsters (Based on Character Level)"
        ],
        "ladder": true,
        "tier": 2,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Ice"
    },
    "Infinity": {
        "level": 63,
        "name": "Infinity",
        "runes": [
            "ber",
            "mal",
            "ber",
            "ist"
        ],
        "bases": [
            "polearm",
            "spear"
        ],
        "attributes": [
            "50% Chance To Cast Level 20 Chain Lightning When You Kill An Enemy",
            "Level 12 Conviction Aura When Equipped",
            "+35% Faster Run/Walk",
            "+255-325% Enhanced Damage (varies)",
            "-45-55% To Enemy Lightning Resistance (varies)",
            "40% Chance of Crushing Blow",
            "Prevent Monster Heal",
            "+(0.5*Clvl) To Vitality (Based on Character Level)",
            "30% Better Chance of Getting Magic Items",
            "Level 21 Cyclone Armor (30 Charges)"
        ],
        "ladder": true,
        "tier": 1,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Infinity"
    },
    "Insight": {
        "level": 27,
        "name": "Insight",
        "runes": [
            "ral",
            "tir",
            "tal",
            "sol"
        ],
        "bases": [
            "polearm",
            "staff",
            "missile weapon"
        ],
        "attributes": [
            "Level 12-17 Meditation Aura When Equipped (varies)",
            "+35% Faster Cast Rate",
            "+200-260% Enhanced Damage (varies)",
            "+9 To Minimum Damage",
            "180-250% Bonus to Attack Rating (varies)",
            "Adds 5-30 Fire Damage",
            "+75 Poison Damage Over 5 Seconds",
            "+1-6 To Critical Strike (varies)",
            "+5 To All Attributes",
            "+2 To Mana After Each Kill",
            "23% Better Chance of Getting Magic Items"
        ],
        "ladder": true,
        "tier": 1,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Insight"
    },
    "King's Grace": {
        "level": 25,
        "name": "King's Grace",
        "runes": [
            "amn",
            "ral",
            "thul"
        ],
        "bases": [
            "sword",
            "scepter"
        ],
        "attributes": [
            "+100% Enhanced Damage",
            "+150 to Attack Rating",
            "+100% Damage to Demons",
            "+100 to Attack Rating against Demons",
            "+50% Damage to Undead",
            "+100 to Attack Rating against Undead",
            "Adds 5-30 Fire Damage",
            "Adds 3-14 Cold damage",
            "7% Life stolen per hit"
        ],
        "ladder": false,
        "tier": 3,
        "patch": 1,
        "wiki": "https://d2runewizard.com/runewords/King's%20Grace"
    },
    "Kingslayer": {
        "level": 53,
        "name": "Kingslayer",
        "runes": [
            "mal",
            "um",
            "gul",
            "fal"
        ],
        "bases": [
            "sword",
            "axe"
        ],
        "attributes": [
            "+30% Increased Attack Speed",
            "+230-270% Enhanced Damage (varies)",
            "-25% Target Defense",
            "20% Bonus To Attack Rating",
            "33% Chance of Crushing Blow",
            "50% Chance of Open Wounds",
            "+1 To Vengeance",
            "Prevent Monster Heal",
            "+10 To Strength",
            "40% Extra Gold From Monsters"
        ],
        "ladder": false,
        "tier": 2,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Kingslayer"
    },
    "Last Wish": {
        "level": 65,
        "name": "Last Wish",
        "runes": [
            "jah",
            "mal",
            "jah",
            "sur",
            "jah",
            "ber"
        ],
        "bases": [
            "axe",
            "hammer",
            "sword"
        ],
        "attributes": [
            "6% Chance To Cast Level 11 Fade When Struck",
            "10% Chance To Cast Level 18 Life Tap On Striking",
            "20% Chance To Cast Level 20 Charged Bolt On Attack",
            "Level 17 Might Aura When Equipped",
            "+330-375% Enhanced Damage (varies)",
            "Ignore Target's Defense",
            "60-70% Chance of Crushing Blow (varies)",
            "Prevent Monster Heal",
            "Hit Blinds Target",
            "(0.5*Clvl)% Chance of Getting Magic Items (Based on Character Level)"
        ],
        "ladder": true,
        "tier": 1,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Last%20Wish"
    },
    "Lawbringer": {
        "level": 43,
        "name": "Lawbringer",
        "runes": [
            "amn",
            "lem",
            "ko"
        ],
        "bases": [
            "hammer",
            "scepter",
            "sword"
        ],
        "attributes": [
            "20% Chance To Cast Level 15 Decrepify On Striking",
            "Level 16-18 Sanctuary Aura When Equipped (varies)",
            "-50% Target Defense",
            "Adds 150-210 Fire Damage",
            "Adds 130-180 Cold Damage",
            "7% Life Stolen Per Hit",
            "Slain Monsters Rest In Peace",
            "+200-250 Defense Vs. Missile (varies)",
            "+10 To Dexterity",
            "75% Extra Gold From Monsters"
        ],
        "ladder": true,
        "tier": 3,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Lawbringer"
    },
    "Leaf": {
        "level": 19,
        "name": "Leaf",
        "runes": [
            "tir",
            "ral"
        ],
        "bases": [
            "staff"
        ],
        "attributes": [
            "+3 to Fire Skills",
            "Adds 5-30 Fire Damage",
            "+3 to Inferno (Sorceress Only)",
            "+3 to Warmth (Sorceress Only)",
            "+3 to Fire Bolt (Sorceress Only)",
            "+(2*Clvl) Defense (Based on Character Level)",
            "Cold Resist +33%",
            "+2 to Mana after each Kill"
        ],
        "ladder": false,
        "tier": 2,
        "patch": 1,
        "wiki": "https://d2runewizard.com/runewords/Leaf"
    },
    "Malice": {
        "level": 15,
        "name": "Malice",
        "runes": [
            "ith",
            "el",
            "eth"
        ],
        "bases": [
            "melee weapon"
        ],
        "attributes": [
            "+33% Enhanced Damage",
            "+9 to Maximum Damage",
            "-25% Target Defense",
            "+50 to Attack Rating",
            "100% Chance of Open wounds",
            "Prevent Monster Heal",
            "-100 to Monster Defense Per Hit",
            "Drain Life -5"
        ],
        "ladder": false,
        "tier": 3,
        "patch": 1,
        "wiki": "https://d2runewizard.com/runewords/Malice"
    },
    "Melody": {
        "level": 39,
        "name": "Melody",
        "runes": [
            "shael",
            "ko",
            "nef"
        ],
        "bases": [
            "missile weapon"
        ],
        "attributes": [
            "+3 To Bow and Crossbow Skills (Amazon Only)",
            "+20% Increased Attack Speed",
            "+50% Enhanced Damage",
            "+300% Damage To Undead",
            "+3 To Slow Missiles (Amazon Only)",
            "+3 To Dodge (Amazon Only)",
            "+3 To Critical Strike (Amazon Only)",
            "Knockback",
            "+10 To Dexterity"
        ],
        "ladder": false,
        "tier": 3,
        "patch": 1,
        "wiki": "https://d2runewizard.com/runewords/Melody"
    },
    "Memory": {
        "level": 37,
        "name": "Memory",
        "runes": [
            "lum",
            "io",
            "sol",
            "eth"
        ],
        "bases": [
            "staff"
        ],
        "attributes": [
            "+3 To Sorceress Skill Levels",
            "+33% Faster Cast Rate",
            "+9 To Minimum Damage",
            "-25% Target Defense",
            "+3 To Energy Shield (Sorceress Only)",
            "+2 To Static Field (Sorceress Only)",
            "+50% Enhanced Defense",
            "+10 to Vitality",
            "+10 to Energy",
            "Increase Maximum Mana 20%",
            "Magic Damage Reduced By 7"
        ],
        "ladder": false,
        "tier": 2,
        "patch": 1,
        "wiki": "https://d2runewizard.com/runewords/Memory"
    },
    "Mist": {
        "level": 67,
        "name": "Mist",
        "runes": [
            "cham",
            "shael",
            "gul",
            "thul",
            "ith"
        ],
        "bases": [
            "missile weapon"
        ],
        "attributes": [
            "Level 8-12 Concentration Aura When Equipped (varies)",
            "+3 to All Skills",
            "+20% Increased Attack Speed",
            "+100% Piercing Attack",
            "+325-375% Enhanced Damage (varies)",
            "+9 to Maximum Damage",
            "20% Bonus to Attack Rating",
            "Adds 3-14 Cold Damage",
            "Freezes Target +3",
            "+24 to Vitality",
            "All Resistances +40"
        ],
        "ladder": true,
        "tier": 3,
        "patch": 2.4,
        "wiki": "https://d2runewizard.com/runewords/Mist"
    },
    "Oath": {
        "level": 49,
        "name": "Oath",
        "runes": [
            "shael",
            "pul",
            "mal",
            "lum"
        ],
        "bases": [
            "axe",
            "mace",
            "sword"
        ],
        "attributes": [
            "Indestructible",
            "30% Chance To Cast Level 20 Bone Spirit On Striking",
            "+50% Increased Attack Speed",
            "+210-340% Enhanced Damage (varies)",
            "+75% Damage To Demons",
            "+100 To Attack Rating Against Demons",
            "Prevent Monster Heal",
            "+10 To Energy",
            "+10-15 Magic Absorb (varies)",
            "Level 16 Heart of Wolverine (20 Charges)",
            "Level 17 Iron Golem (14 Charges)"
        ],
        "ladder": true,
        "tier": 2,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Oath"
    },
    "Obedience": {
        "level": 41,
        "name": "Obedience",
        "runes": [
            "hel",
            "ko",
            "thul",
            "eth",
            "fal"
        ],
        "bases": [
            "polearm",
            "spear"
        ],
        "attributes": [
            "30% Chance To Cast Level 21 Enchant When You Kill An Enemy",
            "+40% Faster Hit Recovery",
            "+370% Enhanced Damage",
            "-25% Target Defense",
            "Adds 3-14 Cold Damage",
            "-25% To Enemy Fire Resistance",
            "40% Chance of Crushing Blow",
            "+200-300 Defense (varies)",
            "+10 To Strength",
            "+10 To Dexterity",
            "All Resistances +20-30 (varies)",
            "Requirements -20%"
        ],
        "ladder": true,
        "tier": 1,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Obedience"
    },
    "Obsession": {
        "level": 69,
        "name": "Obsession",
        "runes": [
            "zod",
            "ist",
            "lem",
            "lum",
            "io",
            "nef"
        ],
        "bases": [
            "staff"
        ],
        "attributes": [
            "Indestructible",
            "24% Chance to cast level 10 Weaken when struck",
            "+4 To All Skills",
            "+65% Faster Cast Rate",
            "+60% Faster Hit Recovery",
            "Knockback",
            "+10 To Vitality",
            "+10 To Energy",
            "Increase Maximum Life 15-25% (varies)",
            "Regenerate Mana 15-30% (varies)",
            "All Resistances +60-70 (varies)",
            "75% Extra Gold from Monsters",
            "30% Better Chance of Getting Magic Items"
        ],
        "ladder": true,
        "tier": 3,
        "patch": 2.4,
        "wiki": "https://d2runewizard.com/runewords/Obsession"
    },
    "Passion": {
        "level": 43,
        "name": "Passion",
        "runes": [
            "dol",
            "ort",
            "eld",
            "lem"
        ],
        "bases": [
            "weapon"
        ],
        "attributes": [
            "+25% Increased Attack Speed",
            "+160-210% Enhanced Damage (varies)",
            "50-80% Bonus To Attack Rating (varies)",
            "+75% Damage To Undead",
            "+50 To Attack Rating Against Undead",
            "Adds 1-50 Lightning Damage",
            "+1 To Berserk",
            "+1 To Zeal",
            "Hit Blinds Target +10",
            "Hit Causes Monster To Flee 25%",
            "75% Extra Gold From Monsters",
            "Level 3 Heart of Wolverine (12 Charges)"
        ],
        "ladder": false,
        "tier": 3,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Passion"
    },
    "Pattern": {
        "level": 23,
        "name": "Pattern",
        "runes": [
            "tal",
            "ort",
            "thul"
        ],
        "bases": [
            "claw"
        ],
        "attributes": [
            "+30% Faster Bock Rate",
            "+40-80% Enhanced damage (varies)",
            "10% Bonus to Attack Rating",
            "Adds 17-62 Fire Damage",
            "Adds 1-50 Lightning Damage",
            "Adds 3-14 Cold Damage",
            "+75 Poison Damage over 5 seconds",
            "+6 to Strength",
            "+6 to Dexterity",
            "All Resistances +15"
        ],
        "ladder": true,
        "tier": 3,
        "patch": 2.4,
        "wiki": "https://d2runewizard.com/runewords/Pattern"
    },
    "Phoenix": {
        "level": 65,
        "name": "Phoenix",
        "runes": [
            "vex",
            "vex",
            "lo",
            "jah"
        ],
        "bases": [
            "weapon",
            "shield"
        ],
        "attributes": [
            "100% Chance To Cast level 40 Blaze When You Level-up",
            "40% Chance To Cast Level 22 Firestorm On Striking",
            "Level 10-15 Redemption Aura When Equipped (varies)",
            "+350-400% Enhanced Damage (varies)",
            "-28% To Enemy Fire Resistance",
            "+350-400 Defense Vs. Missile (varies)",
            "+15-21 Fire Absorb (varies)",
            "# Weapons",
            "Ignore Target's Defense",
            "14% Mana Stolen Per Hit",
            "20% Deadly Strike",
            "# Shields",
            "+50 To Life",
            "+5% To Maximum Lightning Resist",
            "+10% To Maximum Fire Resist"
        ],
        "ladder": true,
        "tier": 2,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Phoenix"
    },
    "Plague": {
        "level": 67,
        "name": "Plague",
        "runes": [
            "cham",
            "shael",
            "um"
        ],
        "bases": [
            "sword",
            "claw",
            "dagger"
        ],
        "attributes": [
            "25% Chance to Cast Level 15 Poison Nova On Striking",
            "20% Chance to Cast Level 12 Lower Resist When Struck",
            "Level 13-17 Cleansing Aura When Equipped (varies)",
            "+1-2 All Skills",
            "+20% Increased Attack Speed",
            "+220-320% Enhanced Damage (varies)",
            "-23% To Enemy Poison Resistance",
            "0.3% (0-29.7) Deadly Strike (Based on Character Level)",
            "25% Chance of Open Wounds",
            "Freezes Target +3"
        ],
        "ladder": true,
        "tier": 3,
        "patch": 2.4,
        "wiki": "https://d2runewizard.com/runewords/Plague"
    },
    "Pride": {
        "level": 67,
        "name": "Pride",
        "runes": [
            "cham",
            "sur",
            "io",
            "lo"
        ],
        "bases": [
            "polearm",
            "spear"
        ],
        "attributes": [
            "25% Chance To Cast Level 17 Fire Wall When Struck",
            "Level 16-20 Concentration Aura When Equipped (varies)",
            "260-300% Bonus To Attack Rating (varies)",
            "+(1*Clvl)% Damage To Demons (Based on Character Level)",
            "Adds 50-280 Lightning Damage",
            "20% Deadly Strike",
            "Hit Blinds Target",
            "Freezes Target +3",
            "+10 To Vitality",
            "Replenish Life +8",
            "(1.875*Clvl)% Extra Gold From Monsters (Based on Character Level)"
        ],
        "ladder": true,
        "tier": 2,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Pride"
    },
    "Rift": {
        "level": 53,
        "name": "Rift",
        "runes": [
            "hel",
            "ko",
            "lem",
            "gul"
        ],
        "bases": [
            "polearm",
            "scepter"
        ],
        "attributes": [
            "20% Chance To Cast Level 16 Tornado On Striking",
            "16% Chance To Cast Level 21 Frozen Orb On Attack",
            "20% Bonus To Attack Rating",
            "Adds 160-250 Magic Damage",
            "Adds 60-180 Fire Damage",
            "+5-10 To All Attributes (varies)",
            "+10 To Dexterity",
            "38% Damage Taken Goes To Mana",
            "75% Extra Gold From Monsters",
            "Level 15 Iron Maiden (40 Charges)",
            "Requirements -20%"
        ],
        "ladder": true,
        "tier": 3,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Rift"
    },
    "Silence": {
        "level": 55,
        "name": "Silence",
        "runes": [
            "dol",
            "eld",
            "hel",
            "ist",
            "tir",
            "vex"
        ],
        "bases": [
            "weapon"
        ],
        "attributes": [
            "+2 to All Skills",
            "+20% Increased Attack Speed",
            "+20% Faster Hit Recovery",
            "+200% Enhanced Damage",
            "+75% Damage To Undead",
            "+50 to Attack Rating Against Undead",
            "11% Mana Stolen Per Hit",
            "Hit Blinds Target +33",
            "Hit Causes Monster to Flee 25%",
            "All Resistances +75",
            "+2 to Mana After Each Kill",
            "30% Better Chance of Getting Magic Items",
            "Requirements -20%"
        ],
        "ladder": false,
        "tier": 3,
        "patch": 1,
        "wiki": "https://d2runewizard.com/runewords/Silence"
    },
    "Spirit": {
        "level": 25,
        "name": "Spirit",
        "runes": [
            "tal",
            "thul",
            "ort",
            "amn"
        ],
        "bases": [
            "shield",
            "sword"
        ],
        "attributes": [
            "+2 To All Skills",
            "+25-35% Faster Cast Rate (varies)",
            "+55% Faster Hit Recovery",
            "+250 Defense Vs. Missile",
            "+22 To Vitality",
            "+89-112 To Mana (varies)",
            "+3-8 Magic Absorb (varies)",
            "# Shields",
            "Cold Resist +35%",
            "Lightning Resist +35%",
            "Poison Resist +35%",
            "Attacker Takes Damage of 14",
            "# Swords",
            "Adds 1-50 Lightning Damage",
            "Adds 3-14 Cold Damage",
            "+75 Poison Damage Over 5 Seconds",
            "7% Life Stolen Per Hit"
        ],
        "ladder": true,
        "tier": 1,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Spirit"
    },
    "Steel": {
        "level": 13,
        "name": "Steel",
        "runes": [
            "tir",
            "el"
        ],
        "bases": [
            "sword",
            "axe",
            "mace"
        ],
        "attributes": [
            "+25% Increased Attack Speed",
            "+20% Enhanced Damage",
            "+3 to Minimum Damage",
            "+3 to Maximum Damage",
            "+50 to Attack Rating",
            "50% Chance of Open Wounds",
            "+2 to Mana after each Kill",
            "+1 to Light Radius"
        ],
        "ladder": false,
        "tier": 3,
        "patch": 1,
        "wiki": "https://d2runewizard.com/runewords/Steel"
    },
    "Strength": {
        "level": 25,
        "name": "Strength",
        "runes": [
            "amn",
            "tir"
        ],
        "bases": [
            "melee weapon"
        ],
        "attributes": [
            "+35% Enhanced Damage",
            "7% Life stolen per hit",
            "25% Chance of Crushing Blow",
            "+20 to Strength",
            "+10 to Vitality",
            "+2 to Mana after each Kill"
        ],
        "ladder": false,
        "tier": 3,
        "patch": 1,
        "wiki": "https://d2runewizard.com/runewords/Strength"
    },
    "Unbending Will": {
        "level": 41,
        "name": "Unbending Will",
        "runes": [
            "fal",
            "io",
            "ith",
            "eld",
            "el",
            "hel"
        ],
        "bases": [
            "sword"
        ],
        "attributes": [
            "18% Chance To Cast Level 18 Taunt On Striking",
            "+3 to Combat Skills (Barbarian Only)",
            "+20-30% Increased Attack Speed (varies)",
            "+300-350% Enhanced Damage",
            "+9 to Maximum Damage",
            "+50 to Attack Rating",
            "+75 Damage to Undead",
            "+50 to Attack Rating Against Undead",
            "8-10% Life Stolen Per Hit (varies)",
            "Prevent Monster Heal",
            "+10 to Strength",
            "+10 to Vitality",
            "Damage Reduced By 8",
            "+1 to Light Radius",
            "Requirements -20%"
        ],
        "ladder": true,
        "tier": 3,
        "patch": 2.4,
        "wiki": "https://d2runewizard.com/runewords/Unbending%20Will"
    },
    "Venom": {
        "level": 49,
        "name": "Venom",
        "runes": [
            "tal",
            "dol",
            "mal"
        ],
        "bases": [
            "weapon"
        ],
        "attributes": [
            "Ignore Target's Defense",
            "+273 Poison Damage Over 6 Seconds",
            "7% Mana Stolen Per Hit",
            "Prevent Monster Heal",
            "Hit Causes Monster To Flee 25%",
            "Level 13 Poison Nova (11 Charges)",
            "Level 15 Poison Explosion (27 Charges)"
        ],
        "ladder": false,
        "tier": 5,
        "patch": 1,
        "wiki": "https://d2runewizard.com/runewords/Venom"
    },
    "Voice of Reason": {
        "level": 43,
        "name": "Voice of Reason",
        "runes": [
            "lem",
            "ko",
            "el",
            "eld"
        ],
        "bases": [
            "mace",
            "sword"
        ],
        "attributes": [
            "15% Chance To Cast Level 13 Frozen Orb On Striking",
            "18% Chance To Cast Level 20 Ice Blast On Striking",
            "+50 To Attack Rating",
            "+220-350% Damage To Demons (varies)",
            "+355-375% Damage To Undead (varies)",
            "+50 To Attack Rating Against Undead",
            "Adds 100-220 Cold Damage",
            "-24% To Enemy Cold Resistance",
            "+10 To Dexterity",
            "Cannot Be Frozen",
            "75% Extra Gold From Monsters",
            "+1 To Light Radius"
        ],
        "ladder": true,
        "tier": 4,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Voice%20of%20Reason"
    },
    "White": {
        "level": 35,
        "name": "White",
        "runes": [
            "dol",
            "io"
        ],
        "bases": [
            "wand"
        ],
        "attributes": [
            "+3 to Poison and Bone Skills (Necromancer Only)",
            "+20% Faster Cast Rate",
            "+2 to Bone Spear (Necromancer Only)",
            "+4 to Skeleton Mastery (Necromancer Only)",
            "+3 to Bone Armor (Necromancer Only)",
            "Hit causes monster to flee 25%",
            "+10 to vitality",
            "+13 to mana",
            "Magic Damage Reduced by 4"
        ],
        "ladder": false,
        "tier": 2,
        "patch": 1,
        "wiki": "https://d2runewizard.com/runewords/White"
    },
    "Wind": {
        "level": 61,
        "name": "Wind",
        "runes": [
            "sur",
            "el"
        ],
        "bases": [
            "melee weapon"
        ],
        "attributes": [
            "10% Chance To Cast Level 9 Tornado On Striking",
            "+20% Faster Run/Walk",
            "+40% Increased Attack Speed",
            "+15% Faster Hit Recovery",
            "+120-160% Enhanced Damage (varies)",
            "-50% Target Defense",
            "+50 To Attack Rating",
            "Hit Blinds Target",
            "+1 To Light Radius",
            "Level 13 Twister (127 Charges)"
        ],
        "ladder": false,
        "tier": 5,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Wind"
    },
    "Wrath": {
        "level": 63,
        "name": "Wrath",
        "runes": [
            "pul",
            "lum",
            "ber",
            "mal"
        ],
        "bases": [
            "missile weapon"
        ],
        "attributes": [
            "30% Chance To Cast Level 1 Decrepify On Striking",
            "5% Chance To Cast Level 10 Life Tap On Striking",
            "+375% Damage To Demons",
            "+100 To Attack Rating Against Demons",
            "+250-300% Damage To Undead (varies)",
            "Adds 85-120 Magic Damage",
            "Adds 41-240 Lightning Damage",
            "20% Chance of Crushing Blow",
            "Prevent Monster Heal",
            "+10 To Energy",
            "Cannot Be Frozen"
        ],
        "ladder": true,
        "tier": 4,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Wrath"
    },
    "Zephyr": {
        "level": 21,
        "name": "Zephyr",
        "runes": [
            "ort",
            "eth"
        ],
        "bases": [
            "missile weapon"
        ],
        "attributes": [
            "7% Chance to Cast Level 1 Twister When Struck",
            "+25% Faster Run/Walk",
            "+25% Increased Attack Speed",
            "+33% Enhanced Damage",
            "-25% Target Defense",
            "+66 to Attack Rating",
            "Adds 1-50 lightning damage",
            "+25 Defense"
        ],
        "ladder": false,
        "tier": 3,
        "patch": 1,
        "wiki": "https://d2runewizard.com/runewords/Zephyr"
    },
    "Ancient's Pledge": {
        "level": 21,
        "name": "Ancient's Pledge",
        "runes": [
            "ral",
            "ort",
            "tal"
        ],
        "bases": [
            "shield"
        ],
        "attributes": [
            "+50% Enhanced Defense",
            "Cold Resist +43%",
            "Lightning Resist +48%",
            "Fire Resist +48%",
            "Poison Resist +48%",
            "10% Damage Taken Goes to Mana"
        ],
        "ladder": false,
        "tier": 1,
        "patch": 1,
        "wiki": "https://d2runewizard.com/runewords/Ancient's%20Pledge"
    },
    "Exile": {
        "level": 57,
        "name": "Exile",
        "runes": [
            "vex",
            "ohm",
            "ist",
            "dol"
        ],
        "bases": [
            "paladin shield"
        ],
        "attributes": [
            "15% Chance To Cast Level 5 Life Tap On Striking",
            "Level 13-16 Defiance Aura When Equipped (varies)",
            "+2 To Offensive Auras (Paladin Only)",
            "+30% Faster Block Rate",
            "Freezes Target",
            "+220-260% Enhanced Defense (varies)",
            "Replenish Life +7",
            "+5% To Maximum Cold Resist",
            "+5% To Maximum Fire Resist",
            "25% Better Chance Of Getting Magic Items",
            "Repairs 1 Durability every 4 seconds"
        ],
        "ladder": false,
        "tier": 1,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Exile"
    },
    "Rhyme": {
        "level": 29,
        "name": "Rhyme",
        "runes": [
            "shael",
            "eth"
        ],
        "bases": [
            "shield"
        ],
        "attributes": [
            "+40% Faster Block Rate",
            "20% Increased Chance of Blocking",
            "Regenerate Mana 15%",
            "All Resistances +25",
            "Cannot be Frozen",
            "50% Extra Gold from Monsters",
            "25% Better Chance of Getting Magic Items"
        ],
        "ladder": false,
        "tier": 2,
        "patch": 1,
        "wiki": "https://d2runewizard.com/runewords/Rhyme"
    },
    "Sanctuary": {
        "level": 49,
        "name": "Sanctuary",
        "runes": [
            "ko",
            "ko",
            "mal"
        ],
        "bases": [
            "shield"
        ],
        "attributes": [
            "+20% Faster Hit Recovery",
            "+20% Faster Block Rate",
            "20% Increased Chance of Blocking",
            "+130-160% Enhanced Defense (varies)",
            "+250 Defense vs. Missile",
            "+20 To Dexterity",
            "All Resistances +50-70 (varies)",
            "Magic Damage Reduced By 7",
            "Level 12 Slow Missiles (60 Charges)"
        ],
        "ladder": false,
        "tier": 2,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Sanctuary"
    },
    "Splendor": {
        "level": 37,
        "name": "Splendor",
        "runes": [
            "eth",
            "lum"
        ],
        "bases": [
            "shield"
        ],
        "attributes": [
            "+1 To All Skills",
            "+10% Faster Cast Rate",
            "+20% Faster Block Rate",
            "+60-100% Enhanced Defense (varies)",
            "+10 To Energy",
            "Regenerate Mana 15%",
            "50% Extra Gold From Monsters",
            "20% Better Chance of Getting Magic Items",
            "+3 To Light Radius"
        ],
        "ladder": false,
        "tier": 3,
        "patch": 1.1,
        "wiki": "https://d2runewizard.com/runewords/Splendor"
    },
    "Bulwark": {
      "level": 35,
      "name": "Bulwark",
      "runes": [
          "shael",
          "io",
          "sol"
      ],
      "bases": [
        "helm"
      ],
      "attributes": [
          "+20% Faster Hit Recovery",
          "+4-6% Life stolen per hit",
          "+75-100% Enhanced Defense",
          "+10 to Vitality",
          "Increase Maximum Life 5%",
          "Replenish Life +30",
          "Damage Reduced by 7",
          "Physical Damage Received Reduced by 10-15%"
      ],
      "ladder": true,
      "tier": 2,
      "patch": 2.6,
      "wiki": "https://d2runewizard.com/runewords/Bulwark"
    },
    "Cure": {
      "level": 35,
      "name": "Cure",
      "runes": [
          "shael",
          "io",
          "tal"
      ],
      "bases": [
        "helm"
      ],
      "attributes": [
          "Level 1 Cleansing Aura when Equipped",
          "+20% Faster Hit Recovery",
          "+75-100% Enhanced Defense",
          "+10 to Vitality",
          "Increase Maximum Life 5%",
          "Poison Resist +40-60%",
          "Poison Length Reduced by 50%"
      ],
      "ladder": true,
      "tier": 2,
      "patch": 2.6,
      "wiki": "https://d2runewizard.com/runewords/Cure"
    },
    "Ground": {
      "level": 35,
      "name": "Ground",
      "runes": [
          "shael",
          "io",
          "ort"
      ],
      "bases": [
        "helm"
      ],
      "attributes": [
          "+20% Faster Hit Recovery",
          "+75-100% Enhanced Defense",
          "+10 to Vitality",
          "Increase Maximum Life 5%",
          "Lightning Resist +40-60%",
          "Lightning Absorb +10-15%"
      ],
      "ladder": true,
      "tier": 2,
      "patch": 2.6,
      "wiki": "https://d2runewizard.com/runewords/Ground"
    },
    "Hearth": {
      "level": 35,
      "name": "Hearth",
      "runes": [
          "shael",
          "io",
          "thul"
      ],
      "bases": [
        "helm"
      ],
      "attributes": [
          "+20% Faster Hit Recovery",
          "+75-100% Enhanced Defense",
          "+10 to Vitality",
          "Increase Maximum Life 5%",
          "Cold Resist +40-60%",
          "Cold Absorb +10-15%",
          "Cannot be Frozen"
      ],
      "ladder": true,
      "tier": 2,
      "patch": 2.6,
      "wiki": "https://d2runewizard.com/runewords/Hearth"
    },
    "Temper": {
      "level": 35,
      "name": "Temper",
      "runes": [
          "shael",
          "io",
          "ral"
      ],
      "bases": [
        "helm"
      ],
      "attributes": [
          "+20% Faster Hit Recovery",
          "+75-100% Enhanced Defense",
          "+10 to Vitality",
          "Increase Maximum Life 5%",
          "Fire Resist +40-60%",
          "Fire Absorb +10-15%"
      ],
      "ladder": true,
      "tier": 2,
      "patch": 2.6,
      "wiki": "https://d2runewizard.com/runewords/Temper"
    },
    "Hustle": {
      "level": 3,
      "name": "Hustle",
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
          "+10 to Dexterity",
          "# Weapon",
          "5% Chance to cast level 1 Burst of Speed on striking",
          "Level 1 Fanaticism Aura",
          "+30% Increased Attack Speed",
          "+180-200% Enhanced Damage",
          "+75% Damage to Undead",
          "+50 to Attack Rating against Undead",
          "# Armor",
          "65% Faster Run/Walk",
          "+40% Increased Attack Speed",
          "+20% Faster Hit Recovery",
          "+6 to Evade",
          "+10 to Dexterity",
          "50% Slower Stamina Drain",
          "+All Resistances +10"
      ],
      "ladder": true,
      "tier": 2,
      "patch": 2.6,
      "wiki": "https://d2runewizard.com/runewords/Hustle"
    },
    "Mosaic": {
      "level": 53,
      "name": "Mosaic",
      "runes": [
          "mal",
          "gul",
          "amn"
      ],
      "bases": [
        "claw"
      ],
      "attributes": [
          "+50% chance for finishing moves to not consume charges",
          "When a finisher is executed in this way it now refreshes the expiration timer of the stack",
          "+2 to Martial Arts (Assassin only)",
          "+20% Attack Speed",
          "+200-250% Enhanced Damage",
          "+20% Bonus to Attack Rating",
          "7% Life Steal",
          "+8-15% to Cold Skill Damage",
          "+8-15% to Lightning Skill Damage",
          "+8-15% to Fire Skill Damage",
          "Prevent Monster Heal"
      ],
      "ladder": true,
      "tier": 3,
      "patch": 2.6,
      "wiki": "https://d2runewizard.com/runewords/Mosaic"
    },
    "Metamorphosis": {
      "level": 67,
      "name": "Metamorphosis",
      "runes": [
          "io",
          "cham",
          "fal"
      ],
      "bases": [
        "helm"
      ],
      "attributes": [
          "Werewolf strikes grant Mark for 180 seconds",
          "Mark of the wolf:",
          "+30% Bonus to Attack Rating",
          "Increase Maximum Life 40%",
          "Werebear strikes grant Mark for 180 seconds",
          "Mark of the Bear:",
          "+25% Attack Speed",
          "Physical Damage Received Reduced by 20%",
          "+5 to Shape Shifting Skills (Druid only)",
          "+25% Chance of Crushing Blow",
          "+50-80% Enhanced Defense",
          "+10 to Strength",
          "+10 to Vitality",
          "All Resistances +10",
          "Cannot be Frozen"
      ],
      "ladder": true,
      "tier": 3,
      "patch": 2.6,
      "wiki": "https://d2runewizard.com/runewords/Metamorphosis"
    }
};

export const quickRunewordMap: {[runes: string]: string} = {
    "lem,ist,io":"Delirium",
    "io,jah,pul":"Dream",
    "nef,pul,vex":"Flickering Flame",
    "ort,sol":"Lore",
    "nef,tir":"Nadir",
    "nef,sol,ith":"Radiance",
    "pul,ith,eld":"Wisdom",
    "sol,um,um":"Bone",
    "ral,ohm,sur,eth":"Bramble",
    "dol,um,ber,ist":"Chains of Honor",
    "sur,lo,sol":"Dragon",
    "shael,um,thul":"Duress",
    "jah,ith,ber":"Enigma",
    "pul,ral,sol":"Enlightenment",
    "el,sol,dol,lo":"Fortitude",
    "fal,um,pul":"Gloom",
    "hel,lum,fal":"Lionheart",
    "hel,amn,nef":"Myth",
    "shael,thul,amn":"Peace",
    "ral,gul,eld":"Principle",
    "mal,tir":"Prudence",
    "ort,mal,ith":"Rain",
    "nef,lum":"Smoke",
    "tal,eth":"Stealth",
    "shael,um,pul,lum":"Stone",
    "shael,thul,lem":"Treachery",
    "lem,ko,tir":"Wealth",
    "ber,tir,um,mal,lum":"Beast",
    "thul,io,nef":"Black",
    "jah,lo,mal,gul":"Brand",
    "vex,hel,el,eld,zod,eth":"Breath of the Dying",
    "amn,ral,mal,ist,ohm":"Call to Arms",
    "fal,ohm,um":"Chaos",
    "shael,um,tir":"Crescent Moon",
    "hel,el,vex,ort,gul":"Death",
    "vex,lo,ber,jah,ko":"Destruction",
    "hel,ohm,um,lo,cham":"Doom",
    "tir,tal,amn":"Edge",
    "amn,ber,ist,sol,sur":"Eternity",
    "ohm,jah,lem,eld":"Faith",
    "fal,ohm,ort,jah":"Famine",
    "jah,gul,eth":"Fury",
    "eth,tir,lo,mal,ral":"Grief",
    "sur,cham,amn,lo":"Hand of Justice",
    "tir,ith,sol,ko":"Harmony",
    "ko,vex,pul,thul":"Heart of the Oak",
    "eth,ral,ort,tal":"Holy Thunder",
    "amn,el,ith,tir,sol":"Honor",
    "amn,shael,jah,lo":"Ice",
    "ber,mal,ber,ist":"Infinity",
    "ral,tir,tal,sol":"Insight",
    "amn,ral,thul":"King's Grace",
    "mal,um,gul,fal":"Kingslayer",
    "jah,mal,jah,sur,jah,ber":"Last Wish",
    "amn,lem,ko":"Lawbringer",
    "tir,ral":"Leaf",
    "ith,el,eth":"Malice",
    "shael,ko,nef":"Melody",
    "lum,io,sol,eth":"Memory",
    "cham,shael,gul,thul,ith":"Mist",
    "shael,pul,mal,lum":"Oath",
    "hel,ko,thul,eth,fal":"Obedience",
    "zod,ist,lem,lum,io,nef":"Obsession",
    "dol,ort,eld,lem":"Passion",
    "tal,ort,thul":"Pattern",
    "vex,vex,lo,jah":"Phoenix",
    "cham,shael,um":"Plague",
    "cham,sur,io,lo":"Pride",
    "hel,ko,lem,gul":"Rift",
    "dol,eld,hel,ist,tir,vex":"Silence",
    "tal,thul,ort,amn":"Spirit",
    "tir,el":"Steel",
    "amn,tir":"Strength",
    "fal,io,ith,eld,el,hel":"Unbending Will",
    "tal,dol,mal":"Venom",
    "lem,ko,el,eld":"Voice of Reason",
    "dol,io":"White",
    "sur,el":"Wind",
    "pul,lum,ber,mal":"Wrath",
    "ort,eth":"Zephyr",
    "ral,ort,tal":"Ancient's Pledge",
    "vex,ohm,ist,dol":"Exile",
    "shael,eth":"Rhyme",
    "ko,ko,mal":"Sanctuary",
    "eth,lum":"Splendor",
    "shael,io,sol":"Bulwark",
    "shael,io,tal":"Cure",
    "shael,io,ort":"Ground",
    "shael,io,thul":"Hearth",
    "shael,io,ral":"Temper",
    "shael,ko,eld":"Hustle",
    "mal,gul,amn":"Mosaic",
    "io,cham,fal":"Metamorphosis"
};