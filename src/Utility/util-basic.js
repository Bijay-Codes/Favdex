export function capitalize(str) {
    const cleanStr = str.trim();
    return cleanStr[0].toUpperCase() + cleanStr.slice(1, cleanStr.length);
};

export function genRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function hasType(list, type) {
    if (Array.isArray(type)) {
        return type.some(t => list.includes(t));
    }
    return list.includes(type);
}



export function filterByType(list, type) {
    if (!type) return list;
    return list.filter(data => {
        return data.types[0] === type || data.types?.[1] === type;
    })
}
