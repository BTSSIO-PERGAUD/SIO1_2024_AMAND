/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
import toString from "isto/to/string";
import toObject from "isto/to/object";
import isObject from "isto/is/object";
import isString from "isto/is/string";
import toArray from "isto/to/array";
import isNumber from "isto/is/number";
import toNumber from "isto/to/number";
import isArray from "isto/is/array";

/*
HAS:

has("/", "key")
has("/", "a", "b")
has("key")
has("a", "b")

GET:

get("/", "key")
get("/", "a", "b")
get("key")
get("a", "b")

SET:

set("/", "value", "key")
set("/", "value", "a", "b")
set("value", "key")
set("value", "a", "b")

DEL:

del("/", "key")
del("/", "a", "b")
del("key")
del("a", "b")
*/

function has (keys, lastHas, lastValue) {
    const key = keys[0];
    if ([lastValue instanceof Map, lastValue instanceof Mapper].some(function (instance) {
        return instance == true
    }) == true) return (keys.length > 0 ? has(keys.slice(1), lastValue.has(key) == true, lastValue.get(key)) : lastHas == true)
    else {
        const value = toObject(lastValue, {
            default: false
        });
        return (keys.length > 0 ? (isObject(value) == true ? has(keys.slice(1), Object.keys(value).some(function (objKey) {
            return objKey == key
        }) == true, value[key]) : lastHas == true) : lastHas == true)
    }
};
function get (keys, lastValue) {
    const key = keys[0];
    if ([lastValue instanceof Map, lastValue instanceof Mapper].some(function (instance) {
        return instance == true
    }) == true) return (keys.length > 0 ? get(keys.slice(1), lastValue.get(key)) : lastValue)
    else {
        const value = toObject(lastValue, {
            default: false
        });
        return (keys.length > 0 ? (isObject(value) == true ? get(keys.slice(1), value[key]) : lastValue) : (isObject(value) == true ? value : lastValue))
    }
};
function set (keys, lastHas, lastValue) {
    const key = keys[0];
    if ([lastValue instanceof Map, lastValue instanceof Mapper].some(function (instance) {
        return instance == true
    }) == true) return (keys.length > 0 ? set(keys.slice(1), lastValue.has(key) == true, lastValue.get(key)) : lastValue)
    else {
        const value = toObject(lastValue, {
            default: false
        });
        return (keys.length > 0 ? (isObject(value) == true ? set(keys.slice(1), Object.keys(value).some(function (objKey) {
            return objKey == key
        }) == true, value[key]) : lastValue) : (isObject(value) == true ? value : lastValue))
    }
};
/**
 * @module mapper
 * @name mapper
 * @description Mapper!!!
 * @license MPL-2.0
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @class
 * @extends Map
 * @example
 * // ECMAScript
 * import Mapper from "mapper";
 * // CommonJS
 * const Mapper = require("mapper");
 * // Declarations
 * const map = new Mapper()
 */
export default class Mapper extends Map {
    constructor (separator) {
        super();
        separator = toString(separator, {
            default: false
        });
        if (isString(separator) == true) this.separator = separator
        this.has = (separator, ...keys) => {
            let versatileSeparator = toArray(separator, {
                default: false
            });
            if (Array.isArray(versatileSeparator) == true && typeof (this?.separator) != "string") return (versatileSeparator.length == 1 ? super.has(versatileSeparator[0]) : versatileSeparator.map(key => {
                return super.has(key)
            }))
            else {
                if (Array.isArray(versatileSeparator) == true) {
                    keys = versatileSeparator;
                    versatileSeparator = undefined
                } else versatileSeparator = toString(separator, {
                    default: false
                })
                if (isString(versatileSeparator) != true && typeof (this?.separator) == "string") versatileSeparator = this.separator
                if (isString(versatileSeparator) == true) {
                    if (keys.length > 0) {
                        if (keys.length == 1) {
                            let query = keys[0].replace(/\[([^\[\]]*)\]/g, `${versatileSeparator}$1${versatileSeparator}`).split(versatileSeparator).filter(function (t) {
                                return t != ""
                            });
                            const end = (query.length - 1);
                            return query.reduce(function (xs, x, i) {
                                if (([xs instanceof Map, xs instanceof Mapper].some(function (instance) {
                                    return instance == true
                                }) == true ? xs.has(x) == true : false) == true) return i == end ? true : xs.get(x)
                                else {
                                    let versatileXS = toObject(xs, {
                                        default: false
                                    });
                                    if ((isObject(versatileXS) == true ? Object.keys(versatileXS).some(function (key) {
                                        return key == x
                                    }) == true : false) == true) return i == end ? true : versatileXS[x]
                                    else {
                                        versatileXS = toArray(xs, {
                                            default: false
                                        }), x = toNumber(x, {
                                            default: false
                                        });
                                        if (isArray(versatileXS) == true && isNumber(x) == true) return i == end ? true : versatileXS[x]
                                        else {
                                            query = [];
                                            return false
                                        }
                                    }
                                }
                            }, this)
                        } else return keys.map(query => {
                            query = query.replace(/\[([^\[\]]*)\]/g, `${versatileSeparator}$1${versatileSeparator}`).split(versatileSeparator).filter(function (t) {
                                return t != ""
                            });
                            const end = (query.length - 1);
                            return query.reduce(function (xs, x, i) {
                                if (([xs instanceof Map, xs instanceof Mapper].some(function (instance) {
                                    return instance == true
                                }) == true ? xs.has(x) == true : false) == true) return i == end ? true : xs.get(x)
                                else {
                                    let versatileXS = toObject(xs, {
                                        default: false
                                    });
                                    if ((isObject(versatileXS) == true ? Object.keys(versatileXS).some(function (key) {
                                        return key == x
                                    }) == true : false) == true) return i == end ? true : versatileXS[x]
                                    else {
                                        versatileXS = toArray(xs, {
                                            default: false
                                        }), x = toNumber(x, {
                                            default: false
                                        });
                                        if (isArray(versatileXS) == true && isNumber(x) == true) return i == end ? true : versatileXS[x]
                                        else {
                                            query = [];
                                            return false
                                        }
                                    }
                                }
                            }, this)
                        })
                    } else return super.has(versatileSeparator)
                } else return super.has(separator)
            }
        };
        this.get = (separator, ...keys) => {
            let versatileSeparator = toArray(separator, {
                default: false
            });
            if (Array.isArray(versatileSeparator) == true && typeof (this?.separator) != "string") return (versatileSeparator.length == 1 ? super.get(versatileSeparator[0]) : versatileSeparator.map(key => {
                return super.get(key)
            }))
            else {
                if (Array.isArray(versatileSeparator) == true) {
                    keys = versatileSeparator;
                    versatileSeparator = undefined
                } else versatileSeparator = toString(separator, {
                    default: false
                })
                if (isString(versatileSeparator) != true && typeof (this?.separator) == "string") versatileSeparator = this.separator
                if (isString(versatileSeparator) == true) {
                    if (keys.length > 0) {
                        if (keys.length == 1) {
                            let query = keys[0].replace(/\[([^\[\]]*)\]/g, `${versatileSeparator}$1${versatileSeparator}`).split(versatileSeparator).filter(function (t) {
                                return t != ""
                            });
                            return query.reduce(function (xs, x) {
                                if (([xs instanceof Map, xs instanceof Mapper].some(function (instance) {
                                    return instance == true
                                }) == true ? xs.has(x) == true : false) == true) return xs.get(x)
                                else {
                                    let versatileXS = toObject(xs, {
                                        default: false
                                    });
                                    if ((isObject(versatileXS) == true ? Object.keys(versatileXS).some(function (key) {
                                        return key == x
                                    }) == true : false) == true) return versatileXS[x]
                                    else {
                                        versatileXS = toArray(xs, {
                                            default: false
                                        }), x = toNumber(x, {
                                            default: false
                                        });
                                        if (isArray(versatileXS) == true && isNumber(x) == true) return versatileXS[x]
                                        else {
                                            query = [];
                                            return undefined
                                        }
                                    }
                                }
                            }, this)
                        } else return keys.map(query => {
                            query = query.replace(/\[([^\[\]]*)\]/g, `${versatileSeparator}$1${versatileSeparator}`).split(versatileSeparator).filter(function (t) {
                                return t != ""
                            });
                            return query.reduce(function (xs, x) {
                                if (([xs instanceof Map, xs instanceof Mapper].some(function (instance) {
                                    return instance == true
                                }) == true ? xs.has(x) == true : false) == true) return xs.get(x)
                                else {
                                    let versatileXS = toObject(xs, {
                                        default: false
                                    });
                                    if ((isObject(versatileXS) == true ? Object.keys(versatileXS).some(function (key) {
                                        return key == x
                                    }) == true : false) == true) return versatileXS[x]
                                    else {
                                        versatileXS = toArray(xs, {
                                            default: false
                                        }), x = toNumber(x, {
                                            default: false
                                        });
                                        if (isArray(versatileXS) == true && isNumber(x) == true) return versatileXS[x]
                                        else {
                                            query = [];
                                            return undefined
                                        }
                                    }
                                }
                            }, this)
                        })
                    } else return super.get(versatileSeparator)
                } else return super.get(separator)
            }
        };
        this.set = (separator, value, ...keys) => {
            let versatileSeparator = toArray(separator, {
                default: false
            });
            if (Array.isArray(versatileSeparator) == true && typeof (this?.separator) != "string") {
                if (versatileSeparator.length == 1) return super.set(versatileSeparator[0], value)
                else {
                    for (const key of versatileSeparator) {
                        super.set(key, value)
                    };
                    return this
                }
            } else {
                console.log("separator:", separator);
                versatileSeparator = (Array.isArray(versatileSeparator) != true ? toString(separator, {
                    default: false
                }) : undefined);
                console.log("keys:", keys, versatileSeparator);
                if (isString(versatileSeparator) != true) {
                    if (typeof (this?.separator) == "string") versatileSeparator = this.separator
                    if (keys.length < 1) {
                        let versatileValue = toArray(value, {
                            default: false
                        });
                        console.log("versatileValue:", versatileValue, value);
                        keys = (Array.isArray(versatileValue) == true ? versatileValue : [value]);
                        value = separator
                    }
                } else if (keys.length < 1 && typeof (this?.separator) == "string") console.log("WUT!!!!!!!!!!!!!!!!!!!!!!!")
                if (separator == "bruh") {
                    console.log("BRUH !!!!!!! versatileSeparator:", versatileSeparator);
                    console.log("keys:", keys);
                    console.log("value:", value)
                };
                console.log("new keys:", keys);
                if (isString(versatileSeparator) == true) {
                    if (keys.length > 0) {
                        if (keys.length == 1) {
                            let query = keys[0].replace(/\[([^\[\]]*)\]/g, `${versatileSeparator}$1${versatileSeparator}`).split(versatileSeparator).filter(function (t) {
                                return t != ""
                            });
                            const end = (query.length - 1);
                            query.reduce(function (xs, x, i) {
                                if (([xs instanceof Map, xs instanceof Mapper].some(function (instance) {
                                    return instance == true
                                }) == true ? xs.has(x) == true : false) == true) {
                                    if (i == end) {
                                        xs.set(x, value);
                                        return value
                                    } else return xs.get(x)
                                } else if ((isObject(xs) == true ? Object.keys(xs).some(function (key) {
                                    return key == x
                                }) == true : false) == true) return i == end ? (xs[x] = value) : xs[x]
                                else {
                                    if ([xs instanceof Map, xs instanceof Mapper].some(function (instance) {
                                        return instance == true
                                    }) == true) {
                                        if (i == end) {
                                            xs.set(x, value);
                                            return xs.get(x)
                                        } else if ([xs.get(x) instanceof Map, xs.get(x) instanceof Mapper].some(function (instance) {
                                            return instance == true
                                        }) == true || isObject(xs.get(x)) == true) return xs.get(x)
                                        else {
                                            // !WARNING! ?QUESTIONNABLE (possible???)? XS IS REMPLACED BY AN ARRAY IF X IS A NUMBER
                                            if (isNumber(x) == true) {
                                                console.log("Warning:", x);
                                                if (isArray(xs) != true) xs = []
                                                return xs[toNumber(x)] = {}
                                            } else {
                                                xs.set(x, {});
                                                return xs.get(x)
                                            }
                                        }
                                    } else if (isObject(xs, {
                                        notEmpty: false
                                    }) == true) {
                                        if (i == end) return xs[x] = value
                                        else if ([xs[x] instanceof Map, xs[x] instanceof Mapper].some(function (instance) {
                                            return instance == true
                                        }) == true || isObject(xs[x]) == true) return xs[x]
                                        else {
                                            // !WARNING! XS IS REMPLACED BY AN ARRAY IF X IS A NUMBER
                                            if (isNumber(x) == true) {
                                                if (isArray(xs) != true) xs = []
                                                return xs[toNumber(x)] = {}
                                            } else return xs[x] = {}
                                        }
                                    } else {
                                        query = [];
                                        return undefined
                                    }
                                }
                            }, this);
                            return this
                        } else return keys.map(query => {
                            query = query.replace(/\[([^\[\]]*)\]/g, `${versatileSeparator}$1${versatileSeparator}`).split(versatileSeparator).filter(function (t) {
                                return t != ""
                            });
                            const end = (query.length - 1);
                            query.reduce(function (xs, x, i) {
                                if (([xs instanceof Map, xs instanceof Mapper].some(function (instance) {
                                    return instance == true
                                }) == true ? xs.has(x) == true : false) == true) {
                                    if (i == end) {
                                        xs.set(x, value);
                                        return value
                                    } else return xs.get(x)
                                } else if ((isObject(xs) == true ? Object.keys(xs).some(function (key) {
                                    return key == x
                                }) == true : false) == true) return i == end ? xs[x] = value : xs[x]
                                else {
                                    if ([xs instanceof Map, xs instanceof Mapper].some(function (instance) {
                                        return instance == true
                                    }) == true) {
                                        if (i == end) {
                                            xs.set(x, value);
                                            return value
                                        } else if ([xs.get(x) instanceof Map, xs.get(x) instanceof Mapper].some(function (instance) {
                                            return instance == true
                                        }) == true || isObject(xs.get(x)) == true) return xs.get(x)
                                        else {
                                            // !WARNING! ?QUESTIONNABLE (possible???)? XS IS REMPLACED BY AN ARRAY IF X IS A NUMBER
                                            if (isNumber(x) == true) {
                                                if (isArray(xs) != true) xs = []
                                                return xs[toNumber(x)] = {}
                                            } else {
                                                xs.set(x, {});
                                                return xs.get(x)
                                            }
                                        }
                                    } else if (isObject(xs, {
                                        notEmpty: false
                                    }) == true) {
                                        if (i == end) return xs[x] = value
                                        else if ([xs[x] instanceof Map, xs[x] instanceof Mapper].some(function (instance) {
                                            return instance == true
                                        }) == true || isObject(xs[x]) == true) return xs[x]
                                        else {
                                            // !WARNING! XS IS REMPLACED BY AN ARRAY IF X IS A NUMBER
                                            if (isNumber(x) == true) {
                                                if (isArray(xs) != true) xs = []
                                                return xs[toNumber(x)] = {}
                                            } else return xs[x] = {}
                                        }
                                    } else {
                                        query = [];
                                        return undefined
                                    }
                                }
                            }, this);
                            return this
                        })
                    } else return super.set(versatileSeparator, value)
                } else return super.set(separator, value)
            }
        };
        this.delete = (separator, ...keys) => {
            let versatileSeparator = toArray(separator, {
                default: false
            });
            if (Array.isArray(versatileSeparator) == true && typeof (this?.separator) != "string") return (versatileSeparator.length == 1 ? super.delete(versatileSeparator[0]) : versatileSeparator.map(key => {
                return super.delete(key)
            }))
            else {
                if (Array.isArray(versatileSeparator) == true) {
                    keys = versatileSeparator;
                    versatileSeparator = undefined
                } else versatileSeparator = toString(separator, {
                    default: false
                })
                if (isString(versatileSeparator) != true && typeof (this?.separator) == "string") versatileSeparator = this.separator
                if (isString(versatileSeparator) == true) {
                    if (keys.length > 0) {
                        if (keys.length == 1) {
                            let query = keys[0].replace(/\[([^\[\]]*)\]/g, `${versatileSeparator}$1${versatileSeparator}`).split(versatileSeparator).filter(function (t) {
                                return t != ""
                            });
                            const end = (query.length - 1);
                            return query.reduce(function (xs, x, i) {
                                if (([xs instanceof Map, xs instanceof Mapper].some(function (instance) {
                                    return instance == true
                                }) == true ? xs.has(x) == true : false) == true) return i == end ? xs.delete(x) : xs.get(x)
                                else {
                                    let versatileXS = toObject(xs, {
                                        default: false
                                    });
                                    if ((isObject(versatileXS) == true ? Object.keys(versatileXS).some(function (key) {
                                        return key == x
                                    }) == true : false) == true) return i == end ? delete versatileXS[x] : versatileXS[x]
                                    else {
                                        versatileXS = toArray(xs, {
                                            default: false
                                        }), x = toNumber(x, {
                                            default: false
                                        });
                                        if (isArray(versatileXS) == true && isNumber(x) == true) return i == end ? delete versatileXS[x] : versatileXS[x]
                                        else {
                                            query = [];
                                            return false
                                        }
                                    }
                                }
                            }, this)
                        } else return keys.map(query => {
                            query = query.replace(/\[([^\[\]]*)\]/g, `${versatileSeparator}$1${versatileSeparator}`).split(versatileSeparator).filter(function (t) {
                                return t != ""
                            });
                            const end = (query.length - 1);
                            return query.reduce(function (xs, x, i) {
                                if (([xs instanceof Map, xs instanceof Mapper].some(function (instance) {
                                    return instance == true
                                }) == true ? xs.has(x) == true : false) == true) return i == end ? xs.delete(x) : xs.get(x)
                                else {
                                    let versatileXS = toObject(xs, {
                                        default: false
                                    });
                                    if ((isObject(versatileXS) == true ? Object.keys(versatileXS).some(function (key) {
                                        return key == x
                                    }) == true : false) == true) return i == end ? delete versatileXS[x] : versatileXS[x]
                                    else {
                                        versatileXS = toArray(xs, {
                                            default: false
                                        }), x = toNumber(x, {
                                            default: false
                                        });
                                        if (isArray(versatileXS) == true && isNumber(x) == true) return i == end ? delete versatileXS[x] : versatileXS[x]
                                        else {
                                            query = [];
                                            return false
                                        }
                                    }
                                }
                            }, this)
                        })
                    } else return super.delete(versatileSeparator)
                } else return super.delete(separator)
            }
        }
    }
}