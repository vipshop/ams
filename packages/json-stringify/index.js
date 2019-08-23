module.exports = function stringify(data, opts) {
    if (!opts) opts = {};
    let cycles = (typeof opts.cycles === 'boolean') ? opts.cycles : false;

    let seen = [];
    return (function stringify(node) {
        if (node && node.toJSON && typeof node.toJSON === 'function') {
            node = node.toJSON();
        }

        if (typeof node === 'undefined') return;
        if (typeof node === 'number') return isFinite(node) ? String(node) : 'null';
        if (typeof node === 'function') return node.toString().replace(/^(async\s*)?[\w]+\s*\(([^)]*)\)\s*{(.*)$/m, '$1function($2){$3');
        if (typeof node !== 'object') return JSON.stringify(node);

        let i; let
            out;
        if (Array.isArray(node)) {
            out = '[';
            for (i = 0; i < node.length; i++) {
                if (i) out += ',';
                out += stringify(node[i]) || 'null';
            }
            return out + ']';
        }

        if (node === null) return 'null';

        if (seen.indexOf(node) !== -1) {
            if (cycles) return JSON.stringify('__cycle__');
            throw new TypeError('Converting circular structure to JSON');
        }

        let seenIndex = seen.push(node) - 1;
        // var keys = Object.keys(node).sort(cmp && cmp(node));
        let keys = Object.keys(node);
        out = '';
        for (i = 0; i < keys.length; i++) {
            let key = keys[i];
            let value = stringify(node[key]);

            if (!value) continue;
            if (out) out += ',';
            out += JSON.stringify(key) + ':' + value;
        }
        seen.splice(seenIndex, 1);
        return '{' + out + '}';
    })(data);
};
