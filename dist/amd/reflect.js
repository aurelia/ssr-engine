/* tslint:disable */
if (typeof FEATURE_NO_ES2015 === 'undefined') {
    var bind_1 = Function.prototype.bind;
    if (typeof Reflect.defineProperty !== 'function') {
        Reflect.defineProperty = function (target, propertyKey, descriptor) {
            if (typeof target === 'object' ? target === null : typeof target !== 'function') {
                throw new TypeError('Reflect.defineProperty called on non-object');
            }
            try {
                Object.defineProperty(target, propertyKey, descriptor);
                return true;
            }
            catch (e) {
                return false;
            }
        };
    }
    if (typeof Reflect.construct !== 'function') {
        Reflect.construct = function (Target, args) {
            if (args) {
                switch (args.length) {
                    case 0: return new Target();
                    case 1: return new Target(args[0]);
                    case 2: return new Target(args[0], args[1]);
                    case 3: return new Target(args[0], args[1], args[2]);
                    case 4: return new Target(args[0], args[1], args[2], args[3]);
                }
            }
            var a = [null];
            a.push.apply(a, args);
            return new (bind_1.apply(Target, a));
        };
    }
    if (typeof Reflect.ownKeys !== 'function') {
        Reflect.ownKeys = function (o) { return (Object.getOwnPropertyNames(o).concat(Object.getOwnPropertySymbols(o))); };
    }
} // endif FEATURE_NO_ES2015
if (typeof FEATURE_NO_ESNEXT === 'undefined') {
    var emptyMetadata_1 = Object.freeze({});
    var metadataContainerKey_1 = '__metadata__';
    if (typeof Reflect.getOwnMetadata !== 'function') {
        Reflect.getOwnMetadata = function (metadataKey, target, targetKey) {
            if (target.hasOwnProperty(metadataContainerKey_1)) {
                return (target[metadataContainerKey_1][targetKey] || emptyMetadata_1)[metadataKey];
            }
        };
    }
    if (typeof Reflect.defineMetadata !== 'function') {
        Reflect.defineMetadata = function (metadataKey, metadataValue, target, targetKey) {
            var metadataContainer = target.hasOwnProperty(metadataContainerKey_1) ? target[metadataContainerKey_1] : (target[metadataContainerKey_1] = {});
            var targetContainer = metadataContainer[targetKey] || (metadataContainer[targetKey] = {});
            targetContainer[metadataKey] = metadataValue;
        };
    }
    if (typeof Reflect.metadata !== 'function') {
        Reflect.metadata = function (metadataKey, metadataValue) {
            return function (target, targetKey) {
                Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
            };
        };
    }
} // endif FEATURE_NO_ESNEXT
