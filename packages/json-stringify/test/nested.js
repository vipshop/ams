
let test = require('tape');
let stringify = require('../');

test('nested', function (t) {
    t.plan(1);
    let obj = { c: 8, b: [{ z: 6, y: 5, x: 4 }, 7], a: 3 };
    t.equal(stringify(obj), '{"a":3,"b":[{"x":4,"y":5,"z":6},7],"c":8}');
});

test('cyclic (default)', function (t) {
    t.plan(1);
    let one = { a: 1 };
    let two = { a: 2, one: one };
    one.two = two;
    try {
        stringify(one);
    } catch (ex) {
        t.equal(ex.toString(), 'TypeError: Converting circular structure to JSON');
    }
});

test('cyclic (specifically allowed)', function (t) {
    t.plan(1);
    let one = { a: 1 };
    let two = { a: 2, one: one };
    one.two = two;
    t.equal(stringify(one, { cycles: true }), '{"a":1,"two":{"a":2,"one":"__cycle__"}}');
});

test('repeated non-cyclic value', function(t) {
    t.plan(1);
    let one = { x: 1 };
    let two = { a: one, b: one };
    t.equal(stringify(two), '{"a":{"x":1},"b":{"x":1}}');
});

test('acyclic but with reused obj-property pointers', function (t) {
    t.plan(1);
    let x = { a: 1 };
    let y = { b: x, c: x };
    t.equal(stringify(y), '{"b":{"a":1},"c":{"a":1}}');
});
