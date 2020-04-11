const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(tech => tech.trim()); // o trim remove espaçamento antes e depois de uma stringtechs.split(',').map(tech => tech.trim()); // o trim remove espaçamento antes e depois de uma string
}