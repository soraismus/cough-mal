var createMalBoolean, createMalCorePureFunction, createMalIdentifier, createMalIndex, createMalNumber, createMalString, extractJsValue, fromArray, getEnvironment, jsNaN_question_, jsNumber_question_, jsString_question_, lift, malNil, reduce, setCoreFnsOnJsValues_bang_, toArray,
  __hasProp = {}.hasOwnProperty,
  __slice = [].slice;

createMalBoolean = require('./type-utilities').createMalBoolean;

createMalCorePureFunction = require('./type-utilities').createMalCorePureFunction;

createMalIdentifier = require('./type-utilities').createMalIdentifier;

createMalIndex = require('./type-utilities').createMalIndex;

createMalNumber = require('./type-utilities').createMalNumber;

createMalString = require('./type-utilities').createMalString;

extractJsValue = require('./type-utilities').extractJsValue;

fromArray = require('./linked-list').fromArray;

jsNaN_question_ = require('./js-utilities').jsNaN_question_;

jsNumber_question_ = require('./js-utilities').jsNumber_question_;

jsString_question_ = require('./js-utilities').jsString_question_;

malNil = require('./type-utilities').malNil;

reduce = require('./linked-list').reduce;

toArray = require('./linked-list').toArray;

lift = function(fnOnJsValues) {
  return function(malValueList) {
    return fnOnJsValues.apply(null, (toArray(malValueList)).map(extractJsValue));
  };
};

setCoreFnsOnJsValues_bang_ = function(env, fns) {
  var fn, fnName, _results;
  _results = [];
  for (fnName in fns) {
    if (!__hasProp.call(fns, fnName)) continue;
    fn = fns[fnName];
    _results.push(env[fnName] = createMalCorePureFunction(lift(fn)));
  }
  return _results;
};

getEnvironment = function(config) {
  var add, assoc, contains_question_, dissoc, divide, environment, exponentiate, functionsOnJsValues, get, greaterThan, greaterThanOrEqual, index, keys, length, lessThan, lessThanOrEqual, mod, multiply, negate, parseNumber, subtract, vals;
  environment = config.environment;
  add = function() {
    var nbrs;
    nbrs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return createMalNumber(nbrs.reduce(function(x, nbr) {
      return x += nbr;
    }));
  };
  assoc = function() {
    var args, copy, i, index, k, key, value, _i, _len;
    index = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    copy = {};
    for (key in index) {
      if (!__hasProp.call(index, key)) continue;
      value = index[key];
      copy[key] = value;
    }
    for (i = _i = 0, _len = args.length; _i < _len; i = ++_i) {
      k = args[i];
      if (i % 2 === 0) {
        copy[k] = args[i + 1];
      }
    }
    return createMalIndex(copy);
  };
  contains_question_ = function(index, key) {
    return createMalBoolean(key in index);
  };
  dissoc = function() {
    var copy, index, key, keys, value, _i, _len;
    index = arguments[0], keys = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    copy = {};
    for (key in index) {
      if (!__hasProp.call(index, key)) continue;
      value = index[key];
      copy[key] = value;
    }
    for (_i = 0, _len = keys.length; _i < _len; _i++) {
      key = keys[_i];
      delete copy[key];
    }
    return createMalIndex(copy);
  };
  divide = function() {
    var nbrs;
    nbrs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return createMalNumber(nbrs.reduce(function(x, nbr) {
      return x /= nbr;
    }));
  };
  exponentiate = function() {
    var nbrs;
    nbrs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return createMalNumber(nbrs.reduce(function(x, nbr) {
      return Math.pow(x, nbr);
    }));
  };
  get = function(jsIndex, jsKey) {
    return jsIndex[jsKey];
  };
  greaterThanOrEqual = function() {
    var nbrs;
    nbrs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return createMalBoolean(nbrs[0] >= nbrs[1]);
  };
  greaterThan = function() {
    var nbrs;
    nbrs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return createMalBoolean(nbrs[0] > nbrs[1]);
  };
  index = function() {
    var args, i, k, _i, _len;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    index = {};
    for (i = _i = 0, _len = args.length; _i < _len; i = ++_i) {
      k = args[i];
      if (i % 2 === 0) {
        index[k] = args[i + 1];
      }
    }
    return createMalIndex(index);
  };
  keys = function(index) {
    var jsNbr, key, value, _keys;
    _keys = [];
    for (key in index) {
      if (!__hasProp.call(index, key)) continue;
      value = index[key];
      _keys.push(jsNaN_question_(jsNbr = parseFloat(key, 10)) ? (key[0] === ':' ? createMalIdentifier : createMalString)(key) : createMalNumber(jsNbr));
    }
    return fromArray(_keys);
  };
  length = function(jsVal) {
    if (!jsString_question_(jsVal)) {
      return malNil;
    }
    return createMalNumber(jsVal.length - 2);
  };
  lessThan = function() {
    var nbrs;
    nbrs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return createMalBoolean(nbrs[0] < nbrs[1]);
  };
  lessThanOrEqual = function() {
    var nbrs;
    nbrs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return createMalBoolean(nbrs[0] <= nbrs[1]);
  };
  mod = function(nbr0, nbr1) {
    return createMalNumber(nbr0 % nbr1);
  };
  multiply = function() {
    var nbrs;
    nbrs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return createMalNumber(nbrs.reduce(function(x, nbr) {
      return x *= nbr;
    }));
  };
  negate = function(nbr) {
    return createMalNumber(-1 * nbr);
  };
  parseNumber = function(jsVal) {
    var jsNbr;
    if (jsNumber_question_(jsVal)) {
      return jsVal;
    }
    if (!jsString_question_(jsVal)) {
      return malNil;
    }
    jsNbr = parseFloat(stripQuotes(jsVal), 10);
    if (jsNaN_question_(jsNbr)) {
      return malNil;
    } else {
      return createMalNumber(jsNbr);
    }
  };
  subtract = function() {
    var nbrs;
    nbrs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return createMalNumber(nbrs.reduce(function(x, nbr) {
      return x -= nbr;
    }));
  };
  vals = function(index) {
    var key, value, values;
    values = [];
    for (key in index) {
      if (!__hasProp.call(index, key)) continue;
      value = index[key];
      values.push(value);
    }
    return fromArray(values);
  };
  functionsOnJsValues = {
    '+': add,
    'assoc': assoc,
    'contains?': contains_question_,
    'dissoc': dissoc,
    '/': divide,
    '**': exponentiate,
    'get': get,
    '>': greaterThan,
    '>=': greaterThanOrEqual,
    'index': index,
    'keys': keys,
    'length': length,
    '<': lessThan,
    '<=': lessThanOrEqual,
    '%': mod,
    '*': multiply,
    'negate': negate,
    'parse-number': parseNumber,
    '-': subtract,
    'vals': vals
  };
  setCoreFnsOnJsValues_bang_(environment, functionsOnJsValues);
  return environment;
};

module.exports = getEnvironment;
