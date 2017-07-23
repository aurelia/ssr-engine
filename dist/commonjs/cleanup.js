"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// aurelia-binding array observer
var pop = Array.prototype.pop;
var push = Array.prototype.push;
var reverse = Array.prototype.reverse;
var shift = Array.prototype.shift;
var sort = Array.prototype.sort;
var splice = Array.prototype.splice;
var unshift = Array.prototype.unshift;
function cleanup(options) {
    // aurelia-binding's array observer overrides the prototype of Array
    // which causes the Array global to have references to the app
    // and nodejs won't gc the app because of this
    Array.prototype.pop = pop;
    Array.prototype.push = push;
    Array.prototype.reverse = reverse;
    Array.prototype.shift = shift;
    Array.prototype.sort = sort;
    Array.prototype.splice = splice;
    Array.prototype.unshift = unshift;
    // delete the server bundle from cache
    if (process.mainModule) {
        rdelete(process.mainModule, options.bundlePath);
    }
}
exports.cleanup = cleanup;
/**
 * Recursively go over all node modules and delete a specific module
 * so it can be garbage collected
 * @param m
 * @param key
 */
function rdelete(m, key) {
    if (m.parent && m.parent.filename === require.resolve(key)) {
        delete m.parent;
    }
    for (var i = m.children.length - 1; i >= 0; i--) {
        if (m.children[i].filename === require.resolve(key)) {
            m.children.splice(i, 1);
        }
        else {
            rdelete(m.children[i], key);
        }
    }
}
;
