export function saveToStorage(data, key) {
    localStorage.setItem(key,JSON.stringify(data));
};

export function getItem(key) {
    return JSON.parse(localStorage.getItem(key));
};

export function clearStorage(key) {
    if (key === 'all') {
        localStorage.clear();
    } else {
        localStorage.clear(key);
    }
}