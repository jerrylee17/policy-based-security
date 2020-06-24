// create token
const { v4: uuidv4 } = require('uuid');


var start = new Date().getTime();
for (i = 0; i < 10000; ++i) {
    createToken()
    }

    var end = new Date().getTime();
    var time = end - start;

console.log("Call to doSomething took " + time + " milliseconds.")

function createToken(){
    return uuidv4();
}
module.exports.createToken = ()=> {
    return uuidv4();
}

