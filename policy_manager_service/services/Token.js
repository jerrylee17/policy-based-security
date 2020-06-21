// create token
const { v4: uuidv4 } = require('uuid');

module.exports.createToken = ()=> {
    return uuidv4();
}

