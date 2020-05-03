System.register([], function (exports_1, context_1) {
    "use strict";
    var pop, push, reverse, shift, sort, splice, unshift;
    var __moduleName = context_1 && context_1.id;
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
    exports_1("cleanup", cleanup);
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
    return {
        setters: [],
        execute: function () {
            // aurelia-binding array observer
            pop = Array.prototype.pop;
            push = Array.prototype.push;
            reverse = Array.prototype.reverse;
            shift = Array.prototype.shift;
            sort = Array.prototype.sort;
            splice = Array.prototype.splice;
            unshift = Array.prototype.unshift;
            ;
        }
    };
});
