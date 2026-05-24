import { GlobalData } from "../Utility/GlobalData";
import { hasType } from "../Utility/util-basic";

export function analyzeNature(pokemon) {
    return checkHardcoded(pokemon) || checkNature(pokemon) || null;
}

// --- HARDCODED ---
function checkHardcoded(pokemon) {
    const { authorsChoice, labrat, manmade, digital } = GlobalData.pokemonNature;
    const { id } = pokemon;
    let tag = null;
    if (labrat.includes(id)) tag = 'Lab Rat';
    else if (manmade.includes(id)) tag = 'Forged';
    else if (digital.includes(id)) tag = 'Glitchborn';
    return tag;
}
function checkNature(pokemon) {
    return (
        checkDriftingPhantom(pokemon) ||
        checkDuskDweller(pokemon) ||
        checkLightningBlitz(pokemon) ||
        checkFrostborn(pokemon) ||
        checkNaturesRelic(pokemon) ||
        checkRisingTalon(pokemon) ||
        checkDepthStrider(pokemon) ||
        checkGuardian(pokemon) ||
        checkObserver(pokemon) ||
        checkPyroHazard(pokemon) ||
        checkPrimalFang(pokemon) ||
        checkStonebound(pokemon) ||
        checkBiohazard(pokemon) ||
        checkVanguard(pokemon) ||
        checkVelvetGrace(pokemon) ||
        checkAscendant(pokemon) ||
        null
    )
}
function checkDriftingPhantom(poke) {
    if (
        !poke.is_baby &&
        hasType(poke.types, 'ghost') &&
        !hasType(poke.types, 'grass') &&
        !poke.is_legendary &&
        !poke.is_mythical &&
        (poke.habitat === 'cave' || poke.habitat === 'urban') &&
        Number(poke.weight) <= 5
    ) return "The Drifting Phantoms";
}

function checkDuskDweller(poke) {
    if (
        !poke.is_baby &&
        hasType(poke.types, 'dark') &&
        !hasType(poke.types, ['fighting', 'fairy', 'ground', 'rock']) &&
        (poke.habitat === 'cave' || poke.habitat === 'forest') &&
        poke.capture_rate < 110 &&
        poke.base_happiness <= 50
    ) return "The Dusk Dwellers";
}

function checkLightningBlitz(poke) {
    if (
        !poke.is_baby &&
        hasType(poke.types, 'electric') &&
        !hasType(poke.types, ['water', 'bug']) &&
        poke.stats.speed >= 90 &&
        poke.capture_rate < 150
    ) return "Lightning Blitz";
}

function checkFrostborn(poke) {
    if (
        !poke.is_baby &&
        hasType(poke.types, 'ice') &&
        !hasType(poke.types, ['rock', 'water']) &&
        (poke.habitat === 'cave' || poke.habitat === null) &&
        poke.capture_rate < 100
    ) return "The Frostborns";
}

function checkNaturesRelic(poke) {
    if (
        !poke.is_baby &&
        (hasType(poke.types, 'grass') || hasType(poke.types, 'bug')) &&
        !hasType(poke.types, ['fighting', 'rock']) &&
        (poke.growth_rate === 'slow' || poke.capture_rate < 120)
    ) return "Nature's Relics";
}

function checkRisingTalon(poke) {
    if (
        !poke.is_baby &&
        hasType(poke.types, 'flying') &&
        !hasType(poke.types, ['fairy', 'grass', 'bug', 'water', 'fire', 'electric']) &&
        poke.capture_rate < 150
    ) return "Rising Talons";
}

function checkDepthStrider(poke) {
    if (
        !poke.is_baby &&
        hasType(poke.types, 'water') &&
        !hasType(poke.types, ['fighting', 'rock']) &&
        poke.habitat === 'sea' &&
        (poke.capture_rate < 150 || poke.stats.speed >= 90)
    ) return "The Depth Striders";
}

function checkGuardian(poke) {
    if (
        !poke.is_baby &&
        hasType(poke.types, ['steel', 'rock', 'ground']) &&
        !hasType(poke.types, ['fighting', 'psychic']) &&
        poke.stats.defense >= 80 &&
        poke.capture_rate < 100 &&
        Number(poke.height) >= 1.0
    ) return "The Guardians";
}

function checkObserver(poke) {
    if (
        !poke.is_baby &&
        hasType(poke.types, 'psychic') &&
        !hasType(poke.types, ['ice', 'fighting', 'water']) &&
        !poke.is_legendary &&
        !poke.is_mythical &&
        (poke.stats.sp_atk >= 90 || poke.stats.sp_def >= 90) &&
        poke.capture_rate < 100
    ) return "The Observers";
}

function checkPyroHazard(poke) {
    if (
        !poke.is_baby &&
        hasType(poke.types, 'fire') &&
        !poke.is_legendary &&
        !poke.is_mythical &&
        poke.base_experience >= 150 &&
        poke.base_happiness<=50
    ) return "Pyro Hazards";
}

function checkPrimalFang(poke) {
    if (
        !poke.is_baby &&
        hasType(poke.types, ['normal', 'ground', 'steel', 'dark']) &&
        !hasType(poke.types, ['dragon', 'flying', 'fairy']) &&
        poke.stats.attack >= 100 &&
        poke.capture_rate < 150
    ) return "The Primal Fang";
}

function checkStonebound(poke) {
    if (
        !poke.is_baby &&
        hasType(poke.types, ['ground', 'rock']) &&
        (poke.habitat === 'cave' || poke.habitat === 'mountain') &&
        (poke.stats.defense <= 55 || poke.stats.sp_def <= 55) &&
        poke.capture_rate < 120
    ) return "Stonebounds";
}

function checkBiohazard(poke) {
    if (
        !poke.is_baby &&
        hasType(poke.types, 'poison') &&
        !hasType(poke.types, ['fairy', 'grass']) &&
        poke.capture_rate < 120 &&
        poke.base_happiness <= 50
    ) return "Biohazard";
}

function checkVanguard(poke) {
    if (
        !poke.is_baby &&
        hasType(poke.types, 'fighting') &&
        poke.stats.attack >= 90 &&
        poke.capture_rate < 100
    ) return "The Vanguard";
}

function checkVelvetGrace(poke) {
    if (
        !poke.is_baby &&
        hasType(poke.types, 'fairy') &&
        !hasType(poke.types, 'normal') &&
        poke.capture_rate < 100 &&
        poke.base_happiness >= 70 &&
        !poke.egg_groups.includes('undiscovered')
    ) return "Velvet Grace";
}

function checkAscendant(poke) {
    if (
        !poke.is_baby &&
        hasType(poke.types, 'dragon') &&
        poke.growth_rate === 'slow' &&
        (poke.is_legendary || poke.egg_groups.includes('undiscovered') || poke.capture_rate < 50)
    ) return "The Ascendant";
}