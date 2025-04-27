/**
 * This file implements the Web API Headers interface
 * (https://developer.mozilla.org/en-US/docs/Web/API/Headers)
 * while maintaining compatibility with Express.js style header access.
 */

/**
 * Creates a Headers object that implements both Express.js style access
 * and the Web API Headers interface
 *
 * @param {Object} headers - Initial headers object
 * @returns {HeaderWebAPI} - A proxy that implements the HeaderWebAPI interface
 */
function createHeaders(headers = {}) {
    return new Proxy(headers, {
        get(target, prop) {
            // Direct property access for Express.js style
            if (typeof prop === 'string' && prop in target) {
                return target[prop];
            }

            // Handle Headers interface methods
            switch (prop) {
                case 'get':
                    return (name) => {
                        const lowerName = name.toLowerCase();
                        // Special case for referer/referrer
                        if (lowerName === 'referer' || lowerName === 'referrer') {
                            return target.referrer || target.referer;
                        }
                        return target[lowerName];
                    };
                case 'getAll':
                    return (name) => {
                        const value = target[name.toLowerCase()];
                        if (!value) {
                            return [];
                        }
                        return Array.isArray(value) ? value : [value];
                    };
                case 'has':
                    return (name) => name.toLowerCase() in target;
                case 'set':
                    return (name, value) => {
                        // eslint-disable-next-line no-param-reassign
                        target[name.toLowerCase()] = value;
                    };
                case 'append':
                    return (name, value) => {
                        const lowerName = name.toLowerCase();
                        if (lowerName in target) {
                            const existingValue = target[lowerName];
                            if (Array.isArray(existingValue)) {
                                existingValue.push(value);
                            } else {
                                // eslint-disable-next-line no-param-reassign
                                target[lowerName] = [existingValue, value];
                            }
                        } else {
                            // eslint-disable-next-line no-param-reassign
                            target[lowerName] = value;
                        }
                    };
                case 'delete':
                    return (name) => {
                        // eslint-disable-next-line no-param-reassign
                        delete target[name.toLowerCase()];
                    };
                case 'forEach':
                    return (callback, thisArg) => {
                        Object.entries(target).forEach(([key, value]) => {
                            callback.call(thisArg, value, key, target);
                        });
                    };
                case 'entries':
                    return () => Object.entries(target)[Symbol.iterator]();
                case 'keys':
                    return () => Object.keys(target)[Symbol.iterator]();
                case 'values':
                    return () => Object.values(target)[Symbol.iterator]();
                case Symbol.iterator:
                    return (
                        target[Symbol.iterator] ||
                        function* iterator() {
                            yield* Object.entries(target);
                        }
                    );
                default:
                    return target[prop];
            }
        },
        set(target, prop, value) {
            if (typeof prop === 'string') {
                // eslint-disable-next-line no-param-reassign
                target[prop.toLowerCase()] = value;
                return true;
            }
            return false;
        },
        has(target, prop) {
            if (typeof prop === 'string') {
                return prop.toLowerCase() in target;
            }
            return prop in target;
        },
        deleteProperty(target, prop) {
            if (typeof prop === 'string') {
                // eslint-disable-next-line no-param-reassign
                delete target[prop.toLowerCase()];
                return true;
            }
            // eslint-disable-next-line no-param-reassign
            return delete target[prop];
        },
        ownKeys(target) {
            return Object.keys(target);
        },
        getOwnPropertyDescriptor(target, prop) {
            return Object.getOwnPropertyDescriptor(target, prop);
        }
    });
}

module.exports = { createHeaders };
