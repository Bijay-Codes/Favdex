import { GlobalData } from "../Utility/GlobalData";
import { hasType } from "../Utility/util-basic";
export function analyzeNature(pokemon) {
    const hardcoded = checkHardcoded(pokemon);
    if (hardcoded) {
        return hardcoded;
    } else {
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
            checkAscendant(pokemon)
        )
    }

}
function checkHardcoded(pokemon) {
    const { authorsChoice, labrat, manmade, digital } = GlobalData.pokemonNature;
    const { id } = pokemon;
    let tag = null;
    if (labrat.includes(id)) tag = 'Lab Rat';
    else if (manmade.includes(id)) tag = 'Forged';
    else if (digital.includes(id)) tag = 'Glitchborn';
    if (authorsChoice.includes(id)) tag = tag ? tag + " · Author's Fav" : "Author's Fav";
    return tag;
}

function checkDriftingPhantom(poke) {
    if (hasType(poke.types, 'ghost') && !hasType(poke.types, 'grass')) {
        return "Drifting Phantoms";
    }
}

function checkDuskDweller(poke) {
    if (hasType(poke.types, 'dark') && !hasType(poke.types, ['fighting', 'fairy', 'ground', 'rock']))
        return "Dusk Dwellers";
}

function checkLightningBlitz(poke) {
    if (hasType(poke.types, 'electric') && !hasType(poke.types, ['water', 'bug']))
        return "Lightning Blitz";
}

function checkFrostborn(poke) {
    if (hasType(poke.types, 'ice') && !hasType(poke.types, ['rock', 'water']))
        return "Frostborn";
}

function checkNaturesRelic(poke) {
    if (hasType(poke.types, ['grass', 'bug']) && !hasType(poke.types, ['fighting', 'rock']))
        return "Nature's Relics";
}

function checkRisingTalon(poke) {
    if (hasType(poke.types, 'flying') && !hasType(poke.types, ['fairy', 'grass', 'bug', 'water']))
        return "Rising Talons";
}

function checkDepthStrider(poke) {
    if (hasType(poke.types, 'water') && !hasType(poke.types, ['fighting', 'rock']))
        return "Depth Striders";
}

function checkGuardian(poke) {
    if (hasType(poke.types, 'steel') && !hasType(poke.types, ['fighting', 'psychic']))
        return "The Guardians";
}

function checkObserver(poke) {
    if (hasType(poke.types, 'psychic') && !hasType(poke.types, ['ice', 'fighting', 'water']))
        return "The Observers";
}

function checkPyroHazard(poke) {
    if (hasType(poke.types, 'fire'))
        return "Pyro Hazard";
}

function checkPrimalFang(poke) {
    if (hasType(poke.types, ['normal', 'dragon']))
        return "Primal Fang";
}

function checkStonebound(poke) {
    if (hasType(poke.types, ['ground', 'rock']))
        return "Stonebound";
}

function checkBiohazard(poke) {
    if (hasType(poke.types, 'poison'))
        return "The Biohazards";
}

function checkVanguard(poke) {
    if (hasType(poke.types, 'fighting'))
        return "The Vanguard";
}

function checkVelvetGrace(poke) {
    if (hasType(poke.types, 'fairy'))
        return "Velvet Grace";
}

function checkAscendant(poke) {
    if (hasType(poke.types, 'dragon'))
        return "The Ascendants";
}