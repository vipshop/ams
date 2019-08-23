
let test = require('tape');
let stringify = require('../');

test('toJSON function', function (t) {
    t.plan(1);
    let obj = { one: 1, two: 2, toJSON: function() { return { one: 1 } } };
    t.equal(stringify(obj), '{"one":1}');
});

test('toJSON returns string', function (t) {
    t.plan(1);
    let obj = { one: 1, two: 2, toJSON: function() { return 'one' } };
    t.equal(stringify(obj), '"one"');
});

test('toJSON returns array', function (t) {
    t.plan(1);
    let obj = { one: 1, two: 2, toJSON: function() { return ['one'] } };
    t.equal(stringify(obj), '["one"]');
});
