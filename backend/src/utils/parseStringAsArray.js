module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(passion => passion.trim());
}