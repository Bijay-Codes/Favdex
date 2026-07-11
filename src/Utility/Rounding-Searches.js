export function genKeyWords(list) {
    const actualApiNames = [
        // Generation 1
        "abra", "vulpix", "slowpoke", "dewgong", "snorlax", "articuno", "zapdos", "lapras", "mew",
        "farfetchd", "mr-mime", "gyarados", "exeggcute", "exeggutor", "gastly", "victreebel", "rattata",

        // Generation 2
        "furret", "marill", "misdreavus", "wobbuffet", "lugia", "suicune",
        "ho-oh", "feraligatr", "sudowoodo", "unown", "qwilfish", "phanpy",

        // Generation 3
        "mudkip", "azurill", "wailord", "duskull", "chimecho", "spheal", "walrein", "salamence", "metagross", "latios", "kyogre", "kyogre-primal", "groudon", "groudon-primal", "absol", "altaria",
        "ninjask", "gorebyss", "rayquaza", "regice", "jirachi", "deoxys",

        // Generation 4
        "chimchar", "empoleon", "pachirisu", "riolu", "lucario", "lucario-mega", "finneon", "leafeon", "rotom", "dialga", "dialga-origin", "heatran", "giratina", "arceus",
        "mime-jr", "bonsly", "lumineon", "abomasnow", "regigigas",

        // Generation 5
        "emboar", "samurott", "samurott-hisui", "woobat", "audino", "audino-mega", "scolipede", "cottonee", "zorua", "zorua-hisui", "zoroark", "zoroark-hisui", "minccino", "cinccino", "deerling-spring", "deerling-summer", "sawsbuck-spring", "sawsbuck-winter", "emolga", "joltik", "galvantula", "eelektross", "litwick", "chandelure", "cubchoo", "golett", "golurk", "volcarona", "reshiram", "zekrom", "kyurem", "kyurem-white", "alomomola",
        "reuniclus", "ferrothorn", "hydreigon", "landorus-incarnate", "meloetta-aria",

        // Generation 6
        "chespin", "chesnaught", "delphox", "bunnelby", "talonflame", "vivillon", "vivillon-fancy", "vivillon-pokeball", "floette-eternal", "florges", "pancham", "pangoro", "espurr", "meowstic-male", "meowstic-female", "swirlix", "clawitzer", "tyrantrum", "carbink", "goomy", "goodra", "avalugg", "noibat", "noivern", "zygarde", "zygarde-50", "diancie", "diancie-mega",
        "flabebe", "aegislash", "slurpuff", "binacle", "dragalge", "yveltal", "volcanion",

        // Generation 7
        "incineroar", "popplio", "brionne", "primarina", "crabominable", "rockruff", "wishiwashi-school", "araquanid", "fomantis", "lurantis", "salandit", "stufful", "bewear", "bounsweet", "tsareena", "comfey", "golisopod", "type-null", "minior-red-meteor", "komala", "togedemaru", "mimikyu", "drampa", "cosmog", "solgaleo", "buzzwole", "guzzlord", "necrozma", "zeraora", "nihilego", "blacephalon",
        "jangmo-o", "hakamo-o", "kommo-o", "decidueye", "bruxish", "xurkitree", "celesteela", "stakataka",

        // Generation 8
        "grookey", "cinderace", "cinderace-gmax", "inteleon", "inteleon-gmax", "skwovet", "greedent", "corviknight", "eldegoss", "wooloo", "toxtricity-amped", "toxtricity-amped-gmax", "centiskorch", "centiskorch-gmax", "milcery", "frosmoth", "zacian-crowned", "zamazenta-crowned", "eternatus", "kubfu", "braviary", "braviary-hisui", "mr-rime", "sirfetchd", "runerigus", "cofagrigus", "basculegion-red-striped", "overqwil", "regieleki", "regidrago", "glastrier", "spectrier", "calyrex", "enamorus-incarnate", "zarude",

        // Generation 9
        "pawmi", "tandemaus", "tinkaton", "flutter-mane", "chien-pao", "miraidon", "ceruledge", "grafaiai", "fezandipiti", "squawkabilly", "scovillain", "rabsca", "garganacl", "tinkatuff", "revavroom", "orthworm", "cetoddle", "veluza", "dondozo", "tatsugiri", "clodsire", "farigiraf", "gholdengo", "pecharunt", "great-tusk", "scream-tail", "brute-bonnet", "slither-wing", "sandy-shocks", "iron-treads", "iron-bundle", "iron-hands", "iron-jugulis", "iron-moth", "iron-thorns", "roaring-moon", "iron-valiant", "walking-wake", "iron-leaves", "gouging-fire", "raging-bolt", "iron-boulder", "iron-crown", "wo-chien", "ting-lu", "chi-yu"
    ];
    const keywords = list.map(poke => poke.name);
    const allKeywords = [...new Set([...keywords, ...actualApiNames])];
    return allKeywords;
}