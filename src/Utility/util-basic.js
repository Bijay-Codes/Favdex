export function capitalize(str) {
    const cleanStr = str.trim();
    return cleanStr[0].toUpperCase() + cleanStr.slice(1, cleanStr.length);
};

export function genRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function hasType(list,type){
    if(Array.isArray(type)){
        return type.some(t=> list.includes(t));
    }
    return list.includes(type);
}



