export function genKeyWords(list) {
    const actualApiNames = [
        // Generation 1
        "abra", "vulpix", "slowpoke", "dewgong", "snorlax", "articuno", "zapdos", "lapras", "mew",
        "farfetchd", "mr-mime", "gyarados", "exeggcute", "exeggutor", "gastly", "victreebel", "rattata",

        // Generation 2
        "furret", "marill", "misdreavus", "wobbuffet", "lugia", "suicune",
        "ho-oh", "feraligatr", "sudowoodo", "unown", "qwilfish", "phanpy",

        // Generation 3
        "mudkip", "azurill", "wailord", "duskull", "chimecho", "spheal", "walrein",
        "salamence", "metagross", "latios", "kyogre", "kyogre-primal", "groudon",
        "groudon-primal", "absol", "altaria",
        "ninjask", "gorebyss", "rayquaza", "regice", "jirachi", "deoxys",

        // Generation 4
        "chimchar", "empoleon", "pachirisu", "riolu", "lucario", "mega-lucario",
        "finneon", "leafeon", "rotom", "dialga", "dialga-origin",
        "heatran", "giratina", "arceus",
        "mime-jr", "bonsly", "lumineon", "abomasnow", "regigigas",

        // Generation 5
        "emboar", "samurott", "samurott-hisui", "woobat", "audino", "mega-audino",
        "scolipede", "cottonee", "zorua", "zorua-hisui", "zoroark", "zoroark-hisui",
        "minccino", "cinccino", "deerling-spring", "deerling-summer", "sawsbuck-spring",
        "sawsbuck-winter", "emolga", "joltik", "galvantula", "eelektross", "litwick",
        "chandelure", "cubchoo", "golett", "golurk", "volcarona", "reshiram", "zekrom",
        "kyurem", "kyurem-white", "alomomola",
        "reuniclus", "ferrothorn", "hydreigon", "landorus-incarnate", "meloetta-aria",

        // Generation 6
        "chespin", "chesnaught", "delphox", "bunnelby", "talonflame", "vivillon",
        "vivillon-fancy", "vivillon-pokeball", "floette-eternal", "florges", "pancham", "pangoro",
        "espurr", "meowstic-male", "meowstic-female", "swirlix", "clawitzer", "tyrantrum", "carbink",
        "goomy", "goodra", "avalugg", "noibat", "noivern", "zygarde", "zygarde-50", "diancie", "mega-diancie",
        "flabebe", "aegislash", "slurpuff", "binacle", "dragalge", "yveltal", "volcanion",

        // Generation 7
        "incineroar", "popplio", "brionne", "primarina", "crabominable", "rockruff", "wishiwashi-school",
        "araquanid", "fomantis", "lurantis", "salandit", "stufful", "bewear", "bounsweet",
        "tsareena", "comfey", "golisopod", "type-null", "minior-red-meteor", "komala",
        "togedemaru", "mimikyu", "drampa", "cosmog", "solgaleo", "buzzwole", "guzzlord", "necrozma",
        "zeraora", "nihilego", "blacephalon",
        "jangmo-o", "hakamo-o", "kommo-o", "decidueye", "bruxish", "xurkitree", "celesteela", "stakataka",

        // Generation 8
        "grookey", "cinderace", "cinderace-gmax", "inteleon", "inteleon-gmax", "skwovet",
        "greedent", "corviknight", "eldegoss", "wooloo", "toxtricity-amped", "toxtricity-amped-gmax",
        "centiskorch", "centiskorch-gmax", "milcery", "frosmoth", "zacian-crowned", "zamazenta-crowned",
        "eternatus", "kubfu", "braviary", "braviary-hisui", "mr-rime", "sirfetchd", "runerigus",
        "cofagrigus", "basculegion-red-striped", "overqwil", "regieleki", "regidrago", "glastrier",
        "spectrier", "calyrex", "enamorus-incarnate", "zarude",

        // Generation 9
        "pawmi", "tandemaus", "tinkaton", "flutter-mane", "chien-pao", "miraidon", "ceruledge",
        "grafaiai", "fezandipiti", "squawkabilly", "scovillain", "rabsca", "garganacl", "tinkatuff",
        "revavroom", "orthworm", "cetoddle", "veluza", "dondozo", "tatsugiri", "clodsire", "farigiraf",
        "gholdengo", "pecharunt", "great-tusk", "scream-tail", "brute-bonnet", "slither-wing",
        "sandy-shocks", "iron-treads", "iron-bundle", "iron-hands", "iron-jugulis", "iron-moth",
        "iron-thorns", "roaring-moon", "iron-valiant", "walking-wake", "iron-leaves", "gouging-fire",
        "raging-bolt", "iron-boulder", "iron-crown", "wo-chien", "ting-lu", "chi-yu",


        // ===== Regional Forms - Alolan =====
        "rattata-alola", "raticate-alola", "raichu-alola", "sandshrew-alola", "sandslash-alola", "vulpix-alola",
        "ninetales-alola", "diglett-alola", "dugtrio-alola", "meowth-alola", "persian-alola",
        "geodude-alola", "graveler-alola", "golem-alola", "grimer-alola", "muk-alola", "exeggutor-alola",
        "marowak-alola",

        // ===== Regional Forms - Galarian =====
        "meowth-galar", "ponyta-galar", "rapidash-galar", "slowpoke-galar", "slowbro-galar", "farfetchd-galar", "weezing-galar",
        "mr-mime-galar", "articuno-galar", "zapdos-galar", "moltres-galar", "slowking-galar", "corsola-galar",
        "zigzagoon-galar", "linoone-galar", "darumaka-galar", "darmanitan-galar-standard", "darmanitan-galar-zen",
        "yamask-galar", "stunfisk-galar",

        // ===== Regional Forms - Hisuian =====
        "growlithe-hisui", "arcanine-hisui", "voltorb-hisui", "electrode-hisui", "typhlosion-hisui",
        "qwilfish-hisui", "sneasel-hisui", "samurott-hisui", "lilligant-hisui", "zorua-hisui", "zoroark-hisui",
        "braviary-hisui", "sliggoo-hisui", "goodra-hisui", "avalugg-hisui", "decidueye-hisui",

        // ===== Regional Forms - Paldean =====
        "tauros-paldea-combat-breed",
        "tauros-paldea-blaze-breed",
        "tauros-paldea-aqua-breed",
        "wooper-paldea",

        // ===== Cosmetic / Cap Pikachu & Eevee forms (no stat differences, just skins) =====
        "pikachu-original-cap", "pikachu-hoenn-cap",
        "pikachu-sinnoh-cap", "pikachu-unova-cap", "pikachu-kalos-cap", "pikachu-alola-cap",
        "pikachu-partner-cap", "pikachu-starter", "pikachu-world-cap", "pikachu-rock-star", "pikachu-belle",
        "pikachu-pop-star", "pikachu-phd", "pikachu-libre", "pikachu-cosplay",
        "eevee-starter",

        // ===== Mega Evolutions (PokeAPI splits these as separate pokemon entries) =====
        "venusaur-mega", "charizard-mega-x", "charizard-mega-y",
        "blastoise-mega", "alakazam-mega", "gengar-mega", "kangaskhan-mega", "pinsir-mega",
        "gyarados-mega", "aerodactyl-mega", "mewtwo-mega-x", "mewtwo-mega-y",
        "ampharos-mega", "scizor-mega", "heracross-mega", "houndoom-mega", "tyranitar-mega", "blaziken-mega",
        "gardevoir-mega", "mawile-mega", "aggron-mega", "medicham-mega", "manectric-mega",
        "banette-mega", "absol-mega", "garchomp-mega", "lucario-mega", "abomasnow-mega",
        "latias-mega", "latios-mega", "swampert-mega", "sceptile-mega", "sableye-mega", "altaria-mega",
        "gallade-mega", "audino-mega", "sharpedo-mega", "slowbro-mega", "steelix-mega", "pidgeot-mega", "glalie-mega",
        "diancie-mega", "metagross-mega", "kyogre-primal", "groudon-primal", "rayquaza-mega", "camerupt-mega",
        "lopunny-mega", "salamence-mega", "beedrill-mega",

        // ===== Gigantamax Forms (PokeAPI splits these as separate pokemon entries) =====
        "venusaur-gmax", "charizard-gmax", "blastoise-gmax", "butterfree-gmax", "pikachu-gmax",
        "meowth-gmax", "machamp-gmax",
        "gengar-gmax", "kingler-gmax", "lapras-gmax", "eevee-gmax", "snorlax-gmax",
        "garbodor-gmax", "melmetal-gmax", "rillaboom-gmax", "cinderace-gmax", "inteleon-gmax", "corviknight-gmax",
        "orbeetle-gmax", "drednaw-gmax", "coalossal-gmax", "flapple-gmax", "appletun-gmax", "sandaconda-gmax",
        "toxtricity-amped-gmax", "centiskorch-gmax", "hatterene-gmax", "grimmsnarl-gmax", "alcremie-gmax",
        "copperajah-gmax", "duraludon-gmax", "urshifu-single-strike-gmax", "urshifu-rapid-strike-gmax",
        "toxtricity-low-key-gmax"


    ];
    const keywords = list.map(poke => poke.name);
    const allKeywords = [...new Set([...keywords, ...actualApiNames])];
    return allKeywords;
}