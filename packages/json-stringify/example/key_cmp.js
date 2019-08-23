let stringify = require('../');

let obj = { c: 8, b: [{ z: 6, y: 5, x: 4 }, 7], a: 3 };
let s = stringify(obj, function (a, b) {
    return a.key < b.key ? 1 : -1;
});
console.log(s);
