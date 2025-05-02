/**
 * This file implements the Web API Headers interface
 * (https://developer.mozilla.org/en-US/docs/Web/API/Headers)
 * while maintaining compatibility with Express.js style header access.
 */
const utils = require('./utils');

const REFERER_HEADER_NAMES = ['referer', 'referrer'];

/**
 * Get a header value from the headers object.
 * Because headers can be set in multiple ways, their names can be uppercased and lowercased.
 *
 * @param {Object} headers
 * @param {string} name
 * @returns
 */
function getHeaderValue(headers, name) {
    const lowerName = name.toLowerCase();

    return headers[
        Object.keys(headers).find((key) => {
            const lowerKey = key.toLowerCase();
            return (
                lowerKey === lowerName ||
                (REFERER_HEADER_NAMES.includes(lowerKey) && REFERER_HEADER_NAMES.includes(lowerName))
            );
        })
    ];
}

/**
 * Creates a Headers object that implements both Express.js style access
 * and the Web API Headers interface
 *
 * @param {Object} headers - Initial headers object
 * @returns {HeaderWebAPI} - A proxy that implements the HeaderWebAPI interface
 */
function createHeaders(headers = {}) {
    return new Proxy(utils.convertKeysToLowerCase(headers), {
        get(target, prop) {
            // Handle Headers interface methods
            switch (prop) {
                case 'get':
                    return (name) => getHeaderValue(target, name);
                case 'getAll':
                    return (name) => {
                        const value = getHeaderValue(target, name);
                        if (!value) {
                            return [];
                        }
                        return Array.isArray(value) ? value : [value];
                    };
                case 'has':
                    return (name) => getHeaderValue(target, name) !== undefined;
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
                    return typeof prop === 'string' ? getHeaderValue(target, prop) : target[prop];
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

module.exports = { createHeaders, getHeaderValue };
