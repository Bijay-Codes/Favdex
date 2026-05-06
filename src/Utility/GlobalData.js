export const GlobalData = {
    apiUrl: 'https://pokeapi.co/api/v2/pokemon',
    apiLimit: 20,
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
        labrat: [151, 152, 132],
        manmade: [351, 386, 649, 772, 773, 100, 101, 622, 623],
        digital: [137, 233, 474, 479, 10008, 10009, 10010, 10011, 10012, 81, 82, 462],
        baseStats: {
            speed: { low: 50, mid: 89, high: 90 },
            ATKandDEF: { low: 50, mid: 84, high: 85 },
            hp: { low: 50, mid: 84, high: 85 },
            total: { low: 400, mid: 499, high: 500 },
            catchRate: { low: 45, mid: 149, high: 150 },
            height: { low: 2.3, mid: 5.3, high: 8.2 },
            weight: { low: 1, mid: 10, high: 50 },
            BMI: { low: 15, mid: 30, high: 31 }
        }
    },
    pokedexKey: 'pokedex-scroll',
    favdex: {
        cooldown: 1,
        expiry: 2,
        favdexKey: 'favdex-storage',
        berryDaily: 1000,
        randomPoints: {
            min: 2,
            max: 6
        },
        streakBonus: 1,
        maxStreak: 10,
        favdexLimit: 60,
        milestones: [25, 50, 75, 90, 100]
    }

}