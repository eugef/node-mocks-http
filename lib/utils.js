module.exports.convertKeysToLowerCase = function (map) {
    const newMap = {};
    for (const key in map) {
        newMap[key.toLowerCase()] = map[key];
    }
    return newMap;
};
