export function capitalize(str){
    const cleanStr = str.trim();
    return cleanStr[0].toUpperCase()+cleanStr.slice(1,cleanStr.length);
};