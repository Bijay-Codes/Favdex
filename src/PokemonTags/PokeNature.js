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
        hasType(poke.types, 'dark') &&
        !hasType(poke.types, ['fighting', 'fairy', 'ground', 'rock']) &&
        (poke.habitat === 'cave' || poke.habitat === 'forest') &&
        poke.capture_rate < 110
    ) return "The Dusk Dwellers";
}

function checkLightningBlitz(poke) {
    if (
        hasType(poke.types, 'electric') &&
        !hasType(poke.types, ['water', 'bug']) &&
        poke.stats.speed >= 90 &&
        poke.capture_rate < 150
    ) return "--Lightning Blitz";
}


function checkFrostborn(poke) {
    if (
        hasType(poke.types, 'ice') &&
        !hasType(poke.types, ['rock', 'water']) &&
        (poke.habitat === 'cave' || poke.habitat === null) &&
        poke.capture_rate < 100
    ) return "The Frostborns";
}


function checkNaturesRelic(poke) {
    if (
        (hasType(poke.types, 'grass') || hasType(poke.types, 'bug')) &&
        !hasType(poke.types, ['fighting', 'rock'])
    ) return "Nature's Relics";
}

function checkRisingTalon(poke) {
    if (
        hasType(poke.types, 'flying') &&
        !hasType(poke.types, ['fairy', 'grass', 'bug', 'water', 'fire', 'electric']) &&
        poke.capture_rate < 150
    ) return "Rising Talons";
}


function checkDepthStrider(poke) {
    if (
        hasType(poke.types, 'water') &&
        !hasType(poke.types, ['fighting', 'rock']) &&
        poke.habitat === 'sea' &&
        (poke.capture_rate < 150 || poke.speed >= 90)
    ) return "The Depth Striders";
}


function checkGuardian(poke) {
    if (
        hasType(poke.types, ['steel', 'rock', 'ground']) &&
        !hasType(poke.types, ['fighting', 'psychic']) &&
        poke.stats.defense >= 80 &&
        poke.capture_rate < 100
    ) return "The Guardians";
}

function checkObserver(poke) {
    if (
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
        hasType(poke.types, 'fire') &&
        !poke.is_legendary &&
        !poke.is_mythical &&
        poke.base_experience >= 150
    ) return "Pyro Hazards";
}

function checkPrimalFang(poke) {
    if (
        hasType(poke.types, ['normal', 'ground', 'stell', 'dark']) &&
        !hasType(poke.types, ['dragon', 'flying', 'fairy']) &&
        poke.stats.attack >= 100 &&
        poke.capture_rate < 150
    ) return "The Primal Fang";
}


function checkStonebound(poke) {
    if (
        hasType(poke.types, ['ground', 'rock']) &&
        (poke.habitat === 'cave' || poke.habitat === 'mountain') &&
        (poke.defense <= 55 || poke.sp_def <= 55) &&
        poke.capture_rate < 120
    ) return "Stonebounds";
}

function checkBiohazard(poke) {
    if (
        hasType(poke.types, 'poison') &&
        !hasType(poke.types, ['fairy', 'grass']) &&
        poke.capture_rate < 120
    ) return "Biohazard";
}


function checkVanguard(poke) {
    if (
        hasType(poke.types, 'fighting') &&
        poke.stats.attack >= 90 &&
        poke.capture_rate < 100
    ) return "The Vanguard";
}


function checkVelvetGrace(poke) {
    if (
        hasType(poke.types, 'fairy') &&
        !hasType(poke.types, 'normal') &&
        poke.capture_rate < 100 &&
        !poke.egg_groups.includes('undiscovered')
    ) return "Velvet Grace";
}


function checkAscendant(poke) {
    if (
        hasType(poke.types, 'dragon') &&
        (poke.is_legendary || poke.egg_groups.includes('undiscovered') || poke.capture_rate < 50)
    ) return "The Ascendant";
}