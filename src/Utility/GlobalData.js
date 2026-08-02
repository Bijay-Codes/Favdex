export const GlobalData = {
    apiUrl: 'https://pokeapi.co/api/v2/pokemon',
    apiLimit: 9,
    types: [
        'normal', 'fighting', 'flying', 'poison',
        'ground', 'rock', 'bug', 'ghost',
        'steel', 'fire', 'water', 'grass',
        'electric', 'psychic', 'ice', 'dragon',
        'dark', 'fairy'],
    pokemonNature: {
        authorsChoice: [
            63, 359, 334, 979, 37, 37, 38, 79, 87, 143,
            144, 162, 183, 200, 202, 249, 258, 321, 355, 363,
            365, 373, 376, 382, 395, 417, 447, 448, 456, 470,
            643, 503, 570, 571, 572, 587, 595, 596, 609, 637,
            666, 671, 677, 678, 678, 693, 706, 715, 719, 730,
            746, 752, 778, 807, 815, 823, 873, 922, 959, 937
        ],
        labrat: [151],
        manmade: [351, 386, 649, 772, 773, 100, 101, 622, 623],
        digital: [137, 233, 474, 479, 10008, 10009, 10010, 10011, 10012, 81, 82, 462],
    },
    pokedexKey: 'pokedex-scroll',
    imgStyleKey: 'img-style',
    formsStart: 10000,
    searchSuggestions: 6,
    favdex: {
        cooldown: 1,
        expiry: 2,
        favdexKey: 'favdex-storage',
        berryDaily: 10,
        randomPoints: {
            min: 2,
            max: 6
        },
        favdexLimit: 60,
        milestones: [25, 50, 75, 90, 100]
    }

}