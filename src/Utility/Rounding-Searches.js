export function genKeyWords(list) {
    const keywords = list.map(poke => poke.name);
    return keywords;
}