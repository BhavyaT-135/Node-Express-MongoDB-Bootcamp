// console.log(arguments);
// console.log(require('module').wrapper);

//module.exports
//Since it's our own module, we have to use './' to access the module.
const Calc = require('./test-module-1.js');
const calc1 = new Calc();

console.log(calc1.add(1, 2));

//exports
// const calc2 = require('./test-module-2.js');
const {add, multiply, divide} = require('./test-module-2.js');
console.log(multiply(5, 2));

//caching
require('./test-module-3.js')();
require('./test-module-3.js')();
require('./test-module-3.js')();