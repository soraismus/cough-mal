(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.JsConsole = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){

},{}],2:[function(_dereq_,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],3:[function(_dereq_,module,exports){
var commentSignal, evaluate, _process;

commentSignal = _dereq_('./commentSignal');

evaluate = _dereq_('./evaluate');

_process = function(transform) {
  return function(envs) {
    return function(sourceCode) {
      var addResult, result, results, value;
      results = [];
      addResult = function(result) {
        return results.push(result);
      };
      value = evaluate(envs, addResult)(transform(sourceCode));
      result = value === commentSignal ? {
        effect: {
          type: 'comment'
        }
      } : {
        effect: false,
        value: value
      };
      addResult(result);
      return results;
    };
  };
};

module.exports = _process;


},{"./commentSignal":4,"./evaluate":10}],4:[function(_dereq_,module,exports){
var comment;

comment = {};

module.exports = comment;


},{}],5:[function(_dereq_,module,exports){
var addEnv, getLast, lookup, set, setMainEnv, unset, unsetMainEnv;

addEnv = function(envStack, newEnv) {
  var copy;
  copy = envStack.slice(0);
  copy.unshift(newEnv);
  return copy;
};

getLast = function(array) {
  return array[array.length - 1];
};

lookup = function(envStack, key) {
  var copy, env, value;
  copy = envStack.slice(0);
  while (copy.length !== 0) {
    env = copy[0];
    value = env[key];
    if (value != null) {
      return value;
    }
    copy.shift();
  }
  throw "VALUE CORRESPONDING TO \"" + key + "\" DOES NOT EXIST IN ENV-STACK";
};

set = function(env, key, value) {
  env[key] = value;
  return value;
};

setMainEnv = function(envStack, key, value) {
  return set(getLast(envStack), key, value);
};

unset = function(env, key) {
  var value;
  value = env[key];
  delete env[key];
  return value;
};

unsetMainEnv = function(envStack, key) {
  return unset(getLast(envStack), key);
};

module.exports = {
  addEnv: addEnv,
  lookup: lookup,
  setMainEnv: setMainEnv,
  unsetMainEnv: unsetMainEnv
};


},{}],6:[function(_dereq_,module,exports){
var add, assoc, contains_question_, createMalBoolean, createMalCorePureFunction, createMalIdentifier, createMalIndex, createMalNumber, createMalString, dissoc, divide, exponentiate, extractJsValue, fromArray, functionsOnJsValues, get, getEnvironment, greaterThan, greaterThanOrEqual, index, jsNaN_question_, jsNumber_question_, jsString_question_, keys, length, lessThan, lessThanOrEqual, lift, malNil, mod, multiply, negate, parseNumber, reduce, setCoreFnsOnJsValues_bang_, subtract, toArray, vals,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty;

createMalBoolean = _dereq_('./type-utilities').createMalBoolean;

createMalCorePureFunction = _dereq_('./type-utilities').createMalCorePureFunction;

createMalIdentifier = _dereq_('./type-utilities').createMalIdentifier;

createMalIndex = _dereq_('./type-utilities').createMalIndex;

createMalNumber = _dereq_('./type-utilities').createMalNumber;

createMalString = _dereq_('./type-utilities').createMalString;

extractJsValue = _dereq_('./type-utilities').extractJsValue;

fromArray = _dereq_('./linked-list').fromArray;

jsNaN_question_ = _dereq_('./js-utilities').jsNaN_question_;

jsNumber_question_ = _dereq_('./js-utilities').jsNumber_question_;

jsString_question_ = _dereq_('./js-utilities').jsString_question_;

malNil = _dereq_('./type-utilities').malNil;

reduce = _dereq_('./linked-list').reduce;

toArray = _dereq_('./linked-list').toArray;

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

getEnvironment = function(config) {
  var environment;
  environment = config.environment;
  setCoreFnsOnJsValues_bang_(environment, functionsOnJsValues);
  return environment;
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

lift = function(fnOnJsValues) {
  return function(malValueList) {
    return fnOnJsValues.apply(null, (toArray(malValueList)).map(extractJsValue));
  };
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

module.exports = getEnvironment;


},{"./js-utilities":14,"./linked-list":16,"./type-utilities":22}],7:[function(_dereq_,module,exports){
(function (process){
var append, areEqual, atom, atom_question_, boolean_question_, car, cdr, circumpendQuotes, concat, cons, coreFn_question_, count, createMalAtom, createMalBoolean, createMalCoreEffectfulFunction, createMalCorePureFunction, createMalList, createMalNumber, createMalString, createMalSymbol, createPredicate, deref, drop, empty_question_, equal_question_, extractJsValue, false_question_, first, fromArray, function_question_, functionsOnMalValues, getEnvironment, ignoreIfTrue, ignoreUnlessTrue, ignore_bang_, interpret, last, list, list_question_, macro_question_, malAtom_question_, malBoolean_question_, malCorePureFunction_question_, malFalse, malFalse_question_, malIgnore, malIndex_question_, malList_question_, malMacro_question_, malNil, malNil_question_, malNumber_question_, malString_question_, malSymbol_question_, malTrue, malTrue_question_, malUserPureFunction_question_, meta, next, nil_question_, nth, number_question_, prStr, prepend, read, reduce, reset, rest, reverse, serialize, set, setCoreFnsOnMalValues_bang_, slurp, str, string_question_, stripQuotes, symbol, symbol_question_, take, time_hyphen_ms, toArray, toPartialArray, true_question_, typeOf, userFn_question_, withMeta, write, _car, _cdr, _concat, _drop, _empty_question_, _interpret, _last, _not, _prStr, _quit_, _ref, _reverse, _take, _throw,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty;

car = _dereq_('./linked-list').car;

cdr = _dereq_('./linked-list').cdr;

circumpendQuotes = _dereq_('./js-utilities').circumpendQuotes;

concat = _dereq_('./linked-list').concat;

createMalAtom = _dereq_('./type-utilities').createMalAtom;

createMalBoolean = _dereq_('./type-utilities').createMalBoolean;

createMalCoreEffectfulFunction = _dereq_('./type-utilities').createMalCoreEffectfulFunction;

createMalCorePureFunction = _dereq_('./type-utilities').createMalCorePureFunction;

createMalList = _dereq_('./type-utilities').createMalList;

createMalNumber = _dereq_('./type-utilities').createMalNumber;

createMalString = _dereq_('./type-utilities').createMalString;

createMalSymbol = _dereq_('./type-utilities').createMalSymbol;

drop = _dereq_('./linked-list').drop;

empty_question_ = _dereq_('./linked-list').empty_question_;

equal_question_ = _dereq_('./linked-list').equal_question_;

extractJsValue = _dereq_('./type-utilities').extractJsValue;

fromArray = _dereq_('./linked-list').fromArray;

interpret = _dereq_('./interpret');

last = _dereq_('./linked-list').last;

malAtom_question_ = _dereq_('./type-utilities').malAtom_question_;

malCorePureFunction_question_ = _dereq_('./type-utilities').malCorePureFunction_question_;

malBoolean_question_ = _dereq_('./type-utilities').malBoolean_question_;

malFalse = _dereq_('./type-utilities').malFalse;

malFalse_question_ = _dereq_('./type-utilities').malFalse_question_;

malIgnore = _dereq_('./type-utilities').malIgnore;

malIndex_question_ = _dereq_('./type-utilities').malIndex_question_;

malList_question_ = _dereq_('./type-utilities').malList_question_;

malMacro_question_ = _dereq_('./type-utilities').malMacro_question_;

malNil = _dereq_('./type-utilities').malNil;

malNil_question_ = _dereq_('./type-utilities').malNil_question_;

malNumber_question_ = _dereq_('./type-utilities').malNumber_question_;

malString_question_ = _dereq_('./type-utilities').malString_question_;

malSymbol_question_ = _dereq_('./type-utilities').malSymbol_question_;

malTrue = _dereq_('./type-utilities').malTrue;

malTrue_question_ = _dereq_('./type-utilities').malTrue_question_;

malUserPureFunction_question_ = _dereq_('./type-utilities').malUserPureFunction_question_;

next = _dereq_('./linked-list').next;

reduce = _dereq_('./linked-list').reduce;

reverse = _dereq_('./linked-list').reverse;

serialize = _dereq_('./serialize');

take = _dereq_('./linked-list').take;

toArray = _dereq_('./linked-list').toArray;

toPartialArray = _dereq_('./linked-list').toPartialArray;

append = function(malArgs) {
  var malList, malValues, _ref;
  _ref = toArray(malArgs), malList = _ref[0], malValues = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
  return concat(malList, fromArray(malValues));
};

areEqual = function(malArgs) {
  var malValue0, malValue1, _areEqual, _ref;
  _ref = toPartialArray(2, malArgs), malValue0 = _ref[0], malValue1 = _ref[1];
  _areEqual = function(malValue0, malValue1) {
    var jsIndex0, jsIndex1;
    if (malList_question_(malValue0) && malList_question_(malValue1)) {
      return equal_question_(malValue0, malValue1, _areEqual);
    } else if (malIndex_question_(malValue0) && malIndex_question_(malValue1)) {
      jsIndex0 = malValue0.jsValue;
      jsIndex1 = malValue1.jsValue;
      return (_areEqual(keys(jsIndex0), keys(jsIndex1))) && (_areEqual(vals(jsIndex0), vals(jsIndex1)));
    } else {
      return malValue0.jsValue === malValue1.jsValue;
    }
  };
  return createMalBoolean(_areEqual(malValue0, malValue1));
};

atom = function(malArgs) {
  return createMalAtom(car(malArgs));
};

_car = function(malArgs) {
  var arg;
  arg = car(malArgs);
  if (malList_question_(arg)) {
    return car(arg);
  } else {
    return malNil;
  }
};

_cdr = function(malArgs) {
  var arg;
  arg = car(malArgs);
  if (malList_question_(arg)) {
    return cdr(arg);
  } else {
    return malNil;
  }
};

_concat = function(malArgs) {
  var malLists;
  malLists = toArray(malArgs);
  return concat.apply(null, malLists);
};

cons = function(malArgs) {
  return createMalList(car(malArgs), next(malArgs));
};

count = function(malArgs) {
  var malList, _reduce;
  malList = car(malArgs);
  if (!malList_question_(malList)) {
    return malNil;
  }
  _reduce = function(sum, value) {
    return sum + 1;
  };
  return createMalNumber(reduce(0, _reduce, car(malArgs)));
};

createPredicate = function(pred) {
  return function(jsList) {
    var malValue;
    malValue = jsList.value;
    return createMalBoolean(pred(malValue));
  };
};

deref = function(malArgs) {
  return (car(malArgs)).malValue;
};

_drop = function(malArgs) {
  var malList, malNumber, _ref;
  _ref = toPartialArray(2, malArgs), malNumber = _ref[0], malList = _ref[1];
  return drop(extractJsValue(malNumber), malList);
};

_empty_question_ = function(malArgs) {
  if (empty_question_(malArgs)) {
    return malFalse;
  } else {
    if (empty_question_(car(malArgs))) {
      return malTrue;
    } else {
      return malFalse;
    }
  }
};

first = function(malArgs) {
  return car(car(malArgs));
};

function_question_ = function(jsList) {
  var malValue;
  malValue = jsList.value;
  return createMalBoolean(malCorePureFunction_question_(malValue) || malUserPureFunction_question_(malValue));
};

getEnvironment = function(config) {
  var environment;
  environment = config.environment;
  setCoreFnsOnMalValues_bang_(environment, functionsOnMalValues);
  return environment;
};

ignore_bang_ = function(malArgs) {
  return malIgnore;
};

ignoreIfTrue = function(malArgs) {
  var malBool, malValue, _ref;
  _ref = toPartialArray(2, malArgs), malBool = _ref[0], malValue = _ref[1];
  if (extractJsValue(malBool)) {
    return malIgnore;
  } else {
    return malValue;
  }
};

ignoreUnlessTrue = function(malArgs) {
  var malBool, malValue, _ref;
  _ref = toPartialArray(2, malArgs), malBool = _ref[0], malValue = _ref[1];
  if (extractJsValue(malBool)) {
    return malValue;
  } else {
    return malIgnore;
  }
};

_interpret = function(malArgs) {
  return interpret(stripQuotes(extractJsValue(car(malArgs))));
};

_last = function(malArgs) {
  var arg;
  arg = car(malArgs);
  if (malList_question_(arg)) {
    return last(arg);
  } else {
    return malNil;
  }
};

list = function(malArgs) {
  return malArgs;
};

meta = function(malArgs) {
  var malMeta;
  malMeta = (car(malArgs)).meta;
  if (malMeta != null) {
    return malMeta;
  } else {
    return malNil;
  }
};

_not = function(malArgs) {
  var malVal;
  malVal = car(malArgs);
  if (malNil_question_(malVal) || malFalse_question_(malVal)) {
    return malTrue;
  } else {
    return malFalse;
  }
};

nth = function(malArgs) {
  var i, malList, malNumber, _i, _ref, _ref1;
  _ref = toPartialArray(2, malArgs), malNumber = _ref[0], malList = _ref[1];
  for (i = _i = 0, _ref1 = extractJsValue(malNumber); 0 <= _ref1 ? _i < _ref1 : _i > _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
    malList = cdr(malList);
  }
  return car(malList);
};

prepend = function(malArgs) {
  var malList, malValues, _reduce, _ref;
  _ref = toArray(malArgs), malList = _ref[0], malValues = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
  _reduce = function(list, val) {
    return createMalList(val, list);
  };
  return malValues.reduce(_reduce, malList);
};

_prStr = function(malArgs, printReadably_question_) {
  return (toArray(malArgs)).map(function(malArg) {
    return serialize(malArg, printReadably_question_);
  });
};

prStr = function(malArgs) {
  return createMalString('"' + (_prStr(malArgs, true)).join('') + '"');
};

_quit_ = function() {
  return process.exit(0);
};

read = function(jsList) {
  var _read;
  _read = function(malArgs) {
    var jsFileName;
    jsFileName = stripQuotes(extractJsValue(car(malArgs)));
    return _dereq_('fs').readFileSync(jsFileName).toString();
  };
  return createMalString(_read(jsList));
};

reset = function(malArgs) {
  var value, _ref;
  _ref = toPartialArray(2, malArgs), atom = _ref[0], value = _ref[1];
  atom.malValue = value;
  return atom;
};

rest = function(malArgs) {
  var arg;
  arg = car(malArgs);
  if (malList_question_(arg)) {
    return cdr(arg);
  } else {
    return malNil;
  }
};

_reverse = function(malArgs) {
  var arg;
  arg = car(malArgs);
  if (malList_question_(arg)) {
    return reverse(arg);
  } else {
    return malNil;
  }
};

set = function(malArgs) {
  var index, key, val, _ref;
  _ref = toPartialArray(3, malArgs), index = _ref[0], key = _ref[1], val = _ref[2];
  (extractJsValue(index))[extractJsValue(key)] = val;
  return index;
};

setCoreFnsOnMalValues_bang_ = function(env, fns) {
  var fn, fnName, _results;
  _results = [];
  for (fnName in fns) {
    if (!__hasProp.call(fns, fnName)) continue;
    fn = fns[fnName];
    _results.push(env[fnName] = createMalCorePureFunction(fn));
  }
  return _results;
};

slurp = function(malArgs) {
  var jsFileName;
  jsFileName = stripQuotes(extractJsValue(car(malArgs)));
  return createMalString(circumpendQuotes(_dereq_('fs').readFileSync(jsFileName).toString()));
};

str = function(malArgs) {
  return createMalString('"' + (_prStr(malArgs, false)).join('') + '"');
};

stripQuotes = function(jsString) {
  return jsString.slice(1, -1);
};

symbol = function(malArgs) {
  var jsStr, malValue;
  malValue = car(malArgs);
  if (malString_question_(malValue)) {
    jsStr = extractJsValue(malValue);
    return createMalSymbol(jsStr.slice(1, -1));
  } else {
    return malNil;
  }
};

_take = function(malArgs) {
  var malList, malNumber, _ref;
  _ref = toPartialArray(2, malArgs), malNumber = _ref[0], malList = _ref[1];
  return take(extractJsValue(malNumber), malList);
};

typeOf = function(malArgs) {
  var malValue;
  malValue = car(malArgs);
  return createMalString(circumpendQuotes(malValue.type));
};

_throw = function(malArgs) {
  throw car(malArgs);
};

time_hyphen_ms = function() {
  return createMalNumber(new Date().getTime());
};

withMeta = function(malArgs) {
  var jsValue, malMeta, malVal, malValue, type, _ref;
  _ref = toPartialArray(2, malArgs), malVal = _ref[0], malMeta = _ref[1];
  if (malAtom_question_(malVal)) {
    malValue = malVal.malValue, type = malVal.type;
    return {
      malValue: malValue,
      type: type,
      meta: malMeta
    };
  } else {
    jsValue = malVal.jsValue, type = malVal.type;
    return {
      jsValue: jsValue,
      type: type,
      meta: malMeta
    };
  }
};

write = function(malArgs) {
  return createMalString(serialize(car(malArgs)));
};

_ref = [malAtom_question_, malBoolean_question_, malCorePureFunction_question_, malFalse_question_, malList_question_, malMacro_question_, malNil_question_, malNumber_question_, malSymbol_question_, malString_question_, malUserPureFunction_question_, malTrue_question_].map(createPredicate), atom_question_ = _ref[0], boolean_question_ = _ref[1], coreFn_question_ = _ref[2], false_question_ = _ref[3], list_question_ = _ref[4], macro_question_ = _ref[5], nil_question_ = _ref[6], number_question_ = _ref[7], symbol_question_ = _ref[8], string_question_ = _ref[9], userFn_question_ = _ref[10], true_question_ = _ref[11];

functionsOnMalValues = {
  '=': areEqual,
  'append': append,
  'atom': atom,
  'atom?': atom_question_,
  'boolean?': boolean_question_,
  'car': _car,
  'cdr': _cdr,
  'cons': cons,
  'concat': _concat,
  'core-fn?': coreFn_question_,
  'count': count,
  'deref': deref,
  'drop': _drop,
  'empty?': _empty_question_,
  'first': _car,
  'false?': false_question_,
  'function?': function_question_,
  'ignore!': ignore_bang_,
  'ignoreIfTrue': ignoreIfTrue,
  'ignoreUnlessTrue': ignoreUnlessTrue,
  'last': _last,
  'list': list,
  'list?': list_question_,
  'macro?': macro_question_,
  'meta': meta,
  'nil?': nil_question_,
  'not': _not,
  'nth': nth,
  'number?': number_question_,
  'parse': _interpret,
  'prepend': prepend,
  'pr-str': prStr,
  'rest': _cdr,
  'reverse': _reverse,
  'str': str,
  'string?': string_question_,
  'symbol': symbol,
  'symbol?': symbol_question_,
  'take': _take,
  'throw': _throw,
  'true?': true_question_,
  'typeof': typeOf,
  'user-fn?': userFn_question_,
  '-quit-': _quit_,
  'read': read,
  'reset!': reset,
  'set!': set,
  'slurp': slurp,
  'time-ms': time_hyphen_ms,
  'with-meta': withMeta,
  'write': write
};

module.exports = getEnvironment;


}).call(this,_dereq_('_process'))
},{"./interpret":13,"./js-utilities":14,"./linked-list":16,"./serialize":18,"./type-utilities":22,"_process":2,"fs":1}],8:[function(_dereq_,module,exports){
var createMalCoreEffectfulFunction, displayEffectsOnMalValues, getEnvironment, serialize, setCoreEffectfulFnsOnMalValues_bang_, toArray, _prStr,
  __hasProp = {}.hasOwnProperty;

createMalCoreEffectfulFunction = _dereq_('./type-utilities').createMalCoreEffectfulFunction;

serialize = _dereq_('./serialize');

toArray = _dereq_('./linked-list').toArray;

getEnvironment = function(config) {
  var display, environment;
  display = config.display, environment = config.environment;
  setCoreEffectfulFnsOnMalValues_bang_(display)(environment, displayEffectsOnMalValues);
  return environment;
};

_prStr = function(malArgs, printReadably_question_) {
  return ((toArray(malArgs)).map(function(malArg) {
    return serialize(malArg, printReadably_question_);
  })).join('');
};

setCoreEffectfulFnsOnMalValues_bang_ = function(represent) {
  return function(env, fns) {
    var fn, fnName, _results;
    _results = [];
    for (fnName in fns) {
      if (!__hasProp.call(fns, fnName)) continue;
      fn = fns[fnName];
      _results.push(env[fnName] = createMalCoreEffectfulFunction(function(malArgs) {
        return represent(fn(malArgs));
      }));
    }
    return _results;
  };
};

displayEffectsOnMalValues = {
  'prn': function(malArgs) {
    return _prStr(malArgs, true);
  },
  'println': function(malArgs) {
    return _prStr(malArgs, false);
  }
};

module.exports = getEnvironment;


},{"./linked-list":16,"./serialize":18,"./type-utilities":22}],9:[function(_dereq_,module,exports){
var car, createMalCorePureFunction, createMalList, createMalSymbol, extractJsValue, fromArray, fromMalIndex, getEnvironment, identity, malList_question_, setCoreFnsOnMalValues_bang_, stripQuotes, toArray, toPartialArray, tokenizeAndParse, _process, _process_,
  __hasProp = {}.hasOwnProperty;

car = _dereq_('./linked-list').car;

createMalCorePureFunction = _dereq_('./type-utilities').createMalCorePureFunction;

createMalList = _dereq_('./type-utilities').createMalList;

createMalSymbol = _dereq_('./type-utilities').createMalSymbol;

extractJsValue = _dereq_('./type-utilities').extractJsValue;

fromArray = _dereq_('./linked-list').fromArray;

fromMalIndex = _dereq_('./index-utilities').fromMalIndex;

malList_question_ = _dereq_('./type-utilities').malList_question_;

_process = _dereq_('./_process');

toArray = _dereq_('./linked-list').toArray;

tokenizeAndParse = _dereq_('./tokenizeAndParse');

toPartialArray = _dereq_('./linked-list').toPartialArray;

getEnvironment = function(config) {
  var apply, call, environment, evalString, evalWithBareEnv, evalWithEnv, functionsOnMalValues, _eval, _evalListHead;
  environment = config.environment;
  apply = function(malArgs) {
    var malArgList, malFn, _ref;
    _ref = toArray(malArgs), malFn = _ref[0], malArgList = _ref[1];
    return _eval(createMalList(malFn, malArgList));
  };
  call = function(malArgs) {
    return _eval(malArgs);
  };
  _eval = function(malVal) {
    return _process_([environment])(malVal);
  };
  _evalListHead = function(malArgs) {
    return _eval(car(malArgs));
  };
  evalString = function(malArgs) {
    return (function(__i) {
      return _eval(tokenizeAndParse(stripQuotes(extractJsValue(car(__i)))));
    })(malArgs);
  };
  evalWithBareEnv = function(malArgs) {
    var expr, localEnv, _ref;
    _ref = toPartialArray(2, malArgs), expr = _ref[0], localEnv = _ref[1];
    return _process_([fromMalIndex(localEnv)])(expr);
  };
  evalWithEnv = function(malArgs) {
    var expr, localEnv, _ref;
    _ref = toPartialArray(2, malArgs), expr = _ref[0], localEnv = _ref[1];
    return _process_([fromMalIndex(localEnv), environment])(expr);
  };
  functionsOnMalValues = {
    'apply': apply,
    'call': call,
    'eval': _evalListHead,
    'eval-string': evalString,
    'eval-with-bare-env': evalWithBareEnv,
    'eval-with-env': evalWithEnv
  };
  setCoreFnsOnMalValues_bang_(environment, functionsOnMalValues);
  return environment;
};

identity = function(malVal) {
  return malVal;
};

_process_ = function(envs) {
  return function(malVal) {
    return _process(identity)(envs)(malVal);
  };
};

setCoreFnsOnMalValues_bang_ = function(env, fns) {
  var fn, fnName, _results;
  _results = [];
  for (fnName in fns) {
    if (!__hasProp.call(fns, fnName)) continue;
    fn = fns[fnName];
    _results.push(env[fnName] = createMalCorePureFunction(fn));
  }
  return _results;
};

stripQuotes = function(jsString) {
  return jsString.slice(1, -1);
};

module.exports = getEnvironment;


},{"./_process":3,"./index-utilities":12,"./linked-list":16,"./tokenizeAndParse":21,"./type-utilities":22}],10:[function(_dereq_,module,exports){
var addEnv, car, catch_asterisk_, cdr, circumpendQuotes, commentSignal, createFn, createLocalEnv, createMacro, createMalIndex, createMalKeyword, createMalList, createMalMacro, createMalNumber, createMalString, createMalSymbol, createMalUserPureFunction, def_bang_, defineNewValue, empty_question_, evalQuasiquotedExpr, evaluate, expandMacro, expand_hyphen_macro, extractJsValue, filter, fn_asterisk_, forEach, fromArray, fromJsObjects, ignorable_question_, jsString_question_, keyword_question_, let_asterisk_, letrec_asterisk_, lookup, macro_asterisk_, malCoreEffectfulFunction_question_, malCorePureFunction_question_, malIgnore_question_, malIndex_question_, malList_question_, malMacro_question_, malNil, malSymbol_question_, malUserPureFunction_question_, map, next, quasiquote, quote, recurse, reduce, reduceBy2, reduceLet_asterisk_, reduceLetrec_asterisk_, reverse, setMainEnv, splat, spliceUnquote, spliceUnquote_question_, spliceUnquotedExpr_question_, toPartialArray, try_asterisk_, undef_bang_, undefineValue, unquote, unquote_question_, unquotedExpr_question_, unsetMainEnv, _do, _evaluate, _getCurrentEnv, _getDefaultEnv, _if,
  __hasProp = {}.hasOwnProperty;

addEnv = _dereq_('./env-utilities').addEnv;

car = _dereq_('./linked-list').car;

catch_asterisk_ = _dereq_('./keyTokens').catch_asterisk_;

cdr = _dereq_('./linked-list').cdr;

circumpendQuotes = _dereq_('./js-utilities').circumpendQuotes;

commentSignal = _dereq_('./commentSignal');

createMalIndex = _dereq_('./type-utilities').createMalIndex;

createMalKeyword = _dereq_('./type-utilities').createMalKeyword;

createMalList = _dereq_('./type-utilities').createMalList;

createMalMacro = _dereq_('./type-utilities').createMalMacro;

createMalNumber = _dereq_('./type-utilities').createMalNumber;

createMalString = _dereq_('./type-utilities').createMalString;

createMalSymbol = _dereq_('./type-utilities').createMalSymbol;

createMalUserPureFunction = _dereq_('./type-utilities').createMalUserPureFunction;

def_bang_ = _dereq_('./keyTokens').def_bang_;

_do = _dereq_('./keyTokens')._do;

empty_question_ = _dereq_('./linked-list').empty_question_;

expand_hyphen_macro = _dereq_('./keyTokens').expand_hyphen_macro;

extractJsValue = _dereq_('./type-utilities').extractJsValue;

filter = _dereq_('./linked-list').filter;

fn_asterisk_ = _dereq_('./keyTokens').fn_asterisk_;

forEach = _dereq_('./linked-list').forEach;

fromArray = _dereq_('./linked-list').fromArray;

fromJsObjects = _dereq_('./index-utilities').fromJsObjects;

_getCurrentEnv = _dereq_('./keyTokens')._getCurrentEnv;

_getDefaultEnv = _dereq_('./keyTokens')._getDefaultEnv;

_if = _dereq_('./keyTokens')._if;

jsString_question_ = _dereq_('./js-utilities').jsString_question_;

keyword_question_ = _dereq_('./keyTokens').keyword_question_;

let_asterisk_ = _dereq_('./keyTokens').let_asterisk_;

letrec_asterisk_ = _dereq_('./keyTokens').letrec_asterisk_;

lookup = _dereq_('./env-utilities').lookup;

macro_asterisk_ = _dereq_('./keyTokens').macro_asterisk_;

malCoreEffectfulFunction_question_ = _dereq_('./type-utilities').malCoreEffectfulFunction_question_;

malCorePureFunction_question_ = _dereq_('./type-utilities').malCorePureFunction_question_;

malIgnore_question_ = _dereq_('./type-utilities').malIgnore_question_;

malIndex_question_ = _dereq_('./type-utilities').malIndex_question_;

malList_question_ = _dereq_('./type-utilities').malList_question_;

malMacro_question_ = _dereq_('./type-utilities').malMacro_question_;

malNil = _dereq_('./type-utilities').malNil;

malSymbol_question_ = _dereq_('./type-utilities').malSymbol_question_;

malUserPureFunction_question_ = _dereq_('./type-utilities').malUserPureFunction_question_;

map = _dereq_('./linked-list').map;

next = _dereq_('./linked-list').next;

quasiquote = _dereq_('./keyTokens').quasiquote;

quote = _dereq_('./keyTokens').quote;

spliceUnquote = _dereq_('./keyTokens').spliceUnquote;

unquote = _dereq_('./keyTokens').unquote;

recurse = _dereq_('./linked-list').recurse;

reduce = _dereq_('./linked-list').reduce;

reduceBy2 = _dereq_('./linked-list').reduceBy2;

reverse = _dereq_('./linked-list').reverse;

setMainEnv = _dereq_('./env-utilities').setMainEnv;

splat = _dereq_('./keyTokens').splat;

toPartialArray = _dereq_('./linked-list').toPartialArray;

try_asterisk_ = _dereq_('./keyTokens').try_asterisk_;

undef_bang_ = _dereq_('./keyTokens').undef_bang_;

unsetMainEnv = _dereq_('./env-utilities').unsetMainEnv;

createFn = function(malList, envs) {
  return createMalUserPureFunction({
    localEnvs: envs.slice(0),
    malExpression: next(malList),
    malParameters: car(malList)
  });
};

createLocalEnv = function(malParams, malArgs) {
  var env, jsParam;
  env = {};
  while (!empty_question_(malParams)) {
    jsParam = extractJsValue(car(malParams));
    if (jsParam === splat) {
      env[extractJsValue(next(malParams))] = malArgs;
      return env;
    } else {
      env[jsParam] = car(malArgs);
      malParams = cdr(malParams);
      malArgs = cdr(malArgs);
    }
  }
  return env;
};

createMacro = function(malList, envs) {
  return createMalMacro({
    localEnvs: envs.slice(0),
    malExpression: next(malList),
    malParameters: car(malList)
  });
};

defineNewValue = function(malList, envs, addResult) {
  var jsKey, malValue;
  jsKey = extractJsValue(car(malList));
  malValue = _evaluate(next(malList), envs, addResult);
  return setMainEnv(envs, jsKey, malValue);
};

evalQuasiquotedExpr = function(expr, envs, addResult) {
  var manageItem;
  if (!malList_question_(expr)) {
    return expr;
  }
  manageItem = function(memo, item) {
    var _manageItem;
    switch (false) {
      case !unquotedExpr_question_(item):
        return createMalList(_evaluate(next(item), envs, addResult), memo);
      case !spliceUnquotedExpr_question_(item):
        _manageItem = function(_memo, _item) {
          return createMalList(_item, _memo);
        };
        return reduce(memo, _manageItem, _evaluate(next(item), envs, addResult));
      case !malList_question_(item):
        return createMalList(evalQuasiquotedExpr(item, envs, addResult), memo);
      default:
        return createMalList(item, memo);
    }
  };
  return reverse(reduce(createMalList(), manageItem, expr));
};

_evaluate = function(malExpr, envs, addResult) {
  var arg1, catchExpr, ex, fn, head, index, jsString, key, localEnvs, malArgs, malExpression, malInvokable, malParameters, malSymbol, newEnv, newIndex, otherwise, remainingArgs, tailList, value, _catch, _ex, _ref, _ref1, _ref2;
  while (true) {
    switch (false) {
      case !malSymbol_question_(malExpr):
        jsString = extractJsValue(malExpr);
        if (keyword_question_(jsString)) {
          return createMalKeyword(jsString);
        } else {
          return lookup(envs, jsString);
        }
        break;
      case !malIndex_question_(malExpr):
        index = extractJsValue(malExpr);
        newIndex = {};
        for (key in index) {
          if (!__hasProp.call(index, key)) continue;
          value = index[key];
          newIndex[key] = _evaluate(index[key], envs, addResult);
        }
        return createMalIndex(newIndex);
      case !!(malList_question_(malExpr)):
        return malExpr;
      default:
        malExpr = filter((function(x) {
          return !(ignorable_question_(x, envs, addResult));
        }), malExpr);
        _ref = toPartialArray(2, malExpr), head = _ref[0], arg1 = _ref[1], remainingArgs = _ref[2];
        tailList = cdr(malExpr);
        switch (extractJsValue(head)) {
          case def_bang_:
            return defineNewValue(tailList, envs, addResult);
          case undef_bang_:
            return undefineValue(tailList, envs);
          case let_asterisk_:
            malExpr = car(remainingArgs);
            envs = addEnv(envs, reduceLet_asterisk_(envs, arg1, addResult));
            break;
          case letrec_asterisk_:
            malExpr = car(remainingArgs);
            envs = addEnv(envs, reduceLetrec_asterisk_(envs, arg1, addResult));
            break;
          case _do:
            return forEach(evaluate(envs, addResult), tailList);
          case _getCurrentEnv:
            return fromJsObjects.apply(null, envs.reverse());
          case _getDefaultEnv:
            return fromJsObjects(envs[envs.length - 1]);
          case _if:
            malExpr = extractJsValue(_evaluate(arg1, envs, addResult)) ? car(remainingArgs) : empty_question_(otherwise = next(remainingArgs)) ? malNil : otherwise;
            break;
          case fn_asterisk_:
            return createFn(tailList, envs);
          case macro_asterisk_:
            return createMacro(tailList, envs);
          case quote:
            return car(tailList);
          case quasiquote:
            return evalQuasiquotedExpr(car(tailList), envs, addResult);
          case expand_hyphen_macro:
            return expandMacro(car(arg1), cdr(arg1), envs, addResult);
          case try_asterisk_:
            try {
              return _evaluate(arg1, envs, addResult);
            } catch (_error) {
              ex = _error;
              if (empty_question_(remainingArgs)) {
                throw ex;
              } else {
                _ref1 = toPartialArray(3, car(remainingArgs)), _catch = _ref1[0], _ex = _ref1[1], catchExpr = _ref1[2];
                if ((extractJsValue(_catch)) !== "catch*") {
                  throw ex;
                }
                if (ex instanceof Error) {
                  ex = createMalString(circumpendQuotes(ex.message));
                }
                newEnv = {};
                newEnv[extractJsValue(_ex)] = ex;
                return _evaluate(catchExpr, addEnv(envs, newEnv), addResult);
              }
            }
            break;
          default:
            malSymbol = head;
            malExpr = tailList;
            malInvokable = _evaluate(malSymbol, envs, addResult);
            switch (false) {
              case !malMacro_question_(malInvokable):
                malExpr = expandMacro(head, tailList, envs, addResult);
                break;
              case !malCorePureFunction_question_(malInvokable):
                fn = extractJsValue(malInvokable);
                malArgs = map(evaluate(envs, addResult), malExpr);
                return fn(malArgs);
              case !malCoreEffectfulFunction_question_(malInvokable):
                fn = extractJsValue(malInvokable);
                malArgs = map(evaluate(envs, addResult), malExpr);
                addResult(fn(malArgs));
                return malNil;
              case !malUserPureFunction_question_(malInvokable):
                _ref2 = extractJsValue(malInvokable), localEnvs = _ref2.localEnvs, malExpression = _ref2.malExpression, malParameters = _ref2.malParameters;
                malArgs = map(evaluate(envs, addResult), malExpr);
                malExpr = malExpression;
                newEnv = createLocalEnv(malParameters, malArgs);
                envs = addEnv(localEnvs, newEnv);
                break;
              default:
                throw 'Value is not a function';
            }
        }
    }
  }
};

evaluate = function(envs, addResult) {
  return function(malExpr) {
    if (malExpr === commentSignal) {
      return commentSignal;
    }
    return _evaluate(malExpr, envs, addResult);
  };
};

expandMacro = function(malMacroSymbol, malArgs, envs, addResult) {
  var localEnvs, malExpression, malMacro, malParameters, newEnv, newEnvStack, _ref;
  malMacro = _evaluate(malMacroSymbol, envs, addResult);
  _ref = extractJsValue(malMacro), localEnvs = _ref.localEnvs, malExpression = _ref.malExpression, malParameters = _ref.malParameters;
  newEnv = createLocalEnv(malParameters, malArgs);
  newEnvStack = addEnv(localEnvs, newEnv);
  return _evaluate(malExpression, newEnvStack, addResult);
};

ignorable_question_ = function(malVal, envs, addResult) {
  var jsString, symbol;
  return malIgnore_question_(malVal) || (malList_question_(malVal) && malSymbol_question_(symbol = car(malVal)) && (((jsString = extractJsValue(symbol)) === 'ignore!') || ((jsString === 'ignoreIfTrue') && (extractJsValue(_evaluate(next(malVal), envs, addResult)))) || ((jsString === 'ignoreUnlessTrue') && !(extractJsValue(_evaluate(next(malVal), envs, addResult))))));
};

reduceLet_asterisk_ = function(envs, list, addResult) {
  var envValue, jsKey, newEnv, _envs;
  newEnv = {};
  _envs = addEnv(envs, newEnv);
  while (!empty_question_(list)) {
    jsKey = extractJsValue(list.value);
    list = recurse(list);
    envValue = _evaluate(list.value, _envs, addResult);
    newEnv[jsKey] = envValue;
    list = recurse(list);
  }
  return newEnv;
};

reduceLetrec_asterisk_ = function(envs, list, addResult) {
  var envValue, jsKey, newEnv, _envs, _malExpr;
  newEnv = {};
  _envs = addEnv(envs, newEnv);
  while (!empty_question_(list)) {
    jsKey = extractJsValue(list.value);
    list = recurse(list);
    _malExpr = fromArray([createMalSymbol("fix*"), fromArray([createMalSymbol("fn*"), fromArray([jsKey]), list.value])]);
    envValue = _evaluate(_malExpr, _envs, addResult);
    newEnv[jsKey] = envValue;
    list = recurse(list);
  }
  return newEnv;
};

spliceUnquote_question_ = function(malValue) {
  return spliceUnquote === (extractJsValue(malValue));
};

spliceUnquotedExpr_question_ = function(malValue) {
  return malList_question_(malValue) && (spliceUnquote_question_(car(malValue)));
};

undefineValue = function(malList, envs) {
  var jsKey;
  jsKey = extractJsValue(car(malList));
  return unsetMainEnv(envs, jsKey);
};

unquote_question_ = function(malValue) {
  return unquote === (extractJsValue(malValue));
};

unquotedExpr_question_ = function(malValue) {
  return malList_question_(malValue) && (unquote_question_(car(malValue)));
};

module.exports = evaluate;


},{"./commentSignal":4,"./env-utilities":5,"./index-utilities":12,"./js-utilities":14,"./keyTokens":15,"./linked-list":16,"./type-utilities":22}],11:[function(_dereq_,module,exports){
var getLispEnvironment, setEnv0_bang_, setEnv1_bang_, setEnv2_bang_, setEnv3_bang_;

setEnv0_bang_ = _dereq_('./env0');

setEnv1_bang_ = _dereq_('./env1');

setEnv2_bang_ = _dereq_('./env2');

setEnv3_bang_ = _dereq_('./env3');

getLispEnvironment = function(config) {
  var display, environment;
  display = config.display;
  environment = {};
  config = {
    display: display,
    environment: environment
  };
  setEnv0_bang_(config);
  setEnv1_bang_(config);
  setEnv2_bang_(config);
  setEnv3_bang_(config);
  return environment;
};

module.exports = getLispEnvironment;


},{"./env0":6,"./env1":7,"./env2":8,"./env3":9}],12:[function(_dereq_,module,exports){
var createMalIndex, fromJsObjects, fromMalIndex, jsString_question_, stripQuotes,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty;

createMalIndex = _dereq_('./type-utilities').createMalIndex;

jsString_question_ = _dereq_('./js-utilities').jsString_question_;

fromJsObjects = function() {
  var copy, jsObject, jsObjects, key, val, _i, _len;
  jsObjects = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  copy = {};
  for (_i = 0, _len = jsObjects.length; _i < _len; _i++) {
    jsObject = jsObjects[_i];
    for (key in jsObject) {
      if (!__hasProp.call(jsObject, key)) continue;
      val = jsObject[key];
      if (jsString_question_(key)) {
        copy[':' + key] = val;
      } else {
        copy[key] = val;
      }
    }
  }
  return createMalIndex(copy);
};

fromMalIndex = function(malIndex) {
  var key, localEnv, value, _ref;
  localEnv = {};
  _ref = malIndex.jsValue;
  for (key in _ref) {
    if (!__hasProp.call(_ref, key)) continue;
    value = _ref[key];
    if (jsString_question_(key)) {
      stripQuotes(key);
      localEnv[stripQuotes(key)] = value;
    } else {
      localEnv[key] = value;
    }
  }
  return localEnv;
};

stripQuotes = function(jsString) {
  return jsString.slice(1, -1);
};

module.exports = {
  fromJsObjects: fromJsObjects,
  fromMalIndex: fromMalIndex
};


},{"./js-utilities":14,"./type-utilities":22}],13:[function(_dereq_,module,exports){
var circumpendQuotes, createMalString, encapsulate, environment, error, flattenIfNecessary, fromArray, getLispEnvironment, interpret, serialize, standardFnsAndMacros, tokenizeAndParse, _createMalString, _interpret, _process, _serialize,
  __hasProp = {}.hasOwnProperty;

circumpendQuotes = _dereq_('./js-utilities').circumpendQuotes;

createMalString = _dereq_('./type-utilities').createMalString;

fromArray = _dereq_('./linked-list').fromArray;

getLispEnvironment = _dereq_('./getLispEnvironment');

_process = _dereq_('./_process');

_serialize = _dereq_('./serialize');

standardFnsAndMacros = _dereq_('./standard-fns-and-macros');

tokenizeAndParse = _dereq_('./tokenizeAndParse');

_createMalString = function(jsString) {
  return createMalString(circumpendQuotes(jsString));
};

encapsulate = function(type) {
  return function(malValue) {
    return {
      effect: {
        type: type
      },
      value: malValue
    };
  };
};

error = function(errorMessage) {
  return [encapsulate('error')("repl error: (" + errorMessage + ")")];
};

flattenIfNecessary = function(effects) {
  var result, value;
  result = effects;
  while (result.length === 1 && Array.isArray(value = result[0].value)) {
    result = flattenIfNecessary(value);
  }
  return result;
};

_interpret = function(envs, jsString) {
  var e;
  try {
    return serialize(flattenIfNecessary(_process(tokenizeAndParse)(envs)(jsString)));
  } catch (_error) {
    e = _error;
    return error(e);
  }
};

interpret = function(jsString, userJsArray) {
  var userEnv;
  if (userJsArray != null) {
    userEnv = {
      '*ARGV*': fromArray(userJsArray.map(_createMalString))
    };
    return _interpret([userEnv, environment], jsString);
  } else {
    return _interpret([environment], jsString);
  }
};

serialize = function(results) {
  return results.map(function(result) {
    var key, value, _result;
    _result = {};
    for (key in result) {
      if (!__hasProp.call(result, key)) continue;
      value = result[key];
      if (key === 'effect') {
        _result[key] = value;
      } else {
        _result[key] = _serialize(value);
      }
    }
    return _result;
  });
};

environment = getLispEnvironment({
  display: encapsulate('display')
});

interpret(standardFnsAndMacros);

module.exports = interpret;


},{"./_process":3,"./getLispEnvironment":11,"./js-utilities":14,"./linked-list":16,"./serialize":18,"./standard-fns-and-macros":19,"./tokenizeAndParse":21,"./type-utilities":22}],14:[function(_dereq_,module,exports){
var circumpendQuotes, jsNaN_question_, jsNumber_question_, jsString_question_;

circumpendQuotes = function(jsString) {
  return '"' + jsString + '"';
};

jsNaN_question_ = function(val) {
  return jsNumber_question_(val) && val !== val;
};

jsNumber_question_ = function(val) {
  return {}.toString.call(val) === '[object Number]';
};

jsString_question_ = function(jsVal) {
  return Object.prototype.toString.call(jsVal) === '[object String]';
};

module.exports = {
  circumpendQuotes: circumpendQuotes,
  jsNaN_question_: jsNaN_question_,
  jsNumber_question_: jsNumber_question_,
  jsString_question_: jsString_question_
};


},{}],15:[function(_dereq_,module,exports){
var binaryGlyphTokens, catch_asterisk_, def_bang_, deref, derefGlyph, expand_hyphen_macro, fn_asterisk_, glyphTokens, ignore, ignoreIfTrue, ignoreIfTrueGlyph, ignoreUnlessTrue, ignoreUnlessTrueGlyph, ignore_bang_, ignore_bang_Glyph, indexEnd, indexStart, keyTokens, keyword_question_, keywords, let_asterisk_, letrec_asterisk_, listEnd, listStart, macroTokens, macro_asterisk_, nil, quasiquote, quasiquoteGlyph, quote, quoteGlyph, splat, spliceUnquote, spliceUnquoteGlyph, try_asterisk_, undef_bang_, unquote, unquoteGlyph, _do, _false, _getCurrentEnv, _getDefaultEnv, _if, _process, _true,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

keyword_question_ = function(jsString) {
  return __indexOf.call(keywords, jsString) >= 0;
};

keyTokens = [deref = 'deref', derefGlyph = '@', catch_asterisk_ = 'catch*', def_bang_ = 'def!', _do = 'do', expand_hyphen_macro = 'expand-macro', _false = 'false', fn_asterisk_ = 'fn*', _getCurrentEnv = '-get-current-env-', _getDefaultEnv = '-get-default-env-', _if = 'if', ignore_bang_ = 'ignore!', ignore_bang_Glyph = '#!', ignoreIfTrue = 'ignoreIfTrue', ignoreIfTrueGlyph = '#-', ignoreUnlessTrue = 'ignoreUnlessTrue', ignoreUnlessTrueGlyph = '#+', ignore = 'ignore', indexEnd = '}', indexStart = '{', let_asterisk_ = 'let*', letrec_asterisk_ = 'letrec*', listEnd = ')', listStart = '(', macro_asterisk_ = 'macro*', nil = 'nil', _process = '-process-', quasiquote = 'quasiquote', quasiquoteGlyph = '`', quote = 'quote', quoteGlyph = '\'', splat = '&', spliceUnquote = 'splice-unquote', spliceUnquoteGlyph = '~@', _true = 'true', try_asterisk_ = 'try*', undef_bang_ = 'undef!', unquote = 'unquote', unquoteGlyph = '~'];

keywords = [catch_asterisk_, def_bang_, _do, expand_hyphen_macro, _false, fn_asterisk_, _getCurrentEnv, _getDefaultEnv, _if, ignore, let_asterisk_, letrec_asterisk_, macro_asterisk_, nil, _process, quasiquote, quote, spliceUnquote, _true, try_asterisk_, undef_bang_, unquote];

macroTokens = [quasiquote, quote, spliceUnquote, unquote];

glyphTokens = [derefGlyph, ignore_bang_Glyph, quasiquoteGlyph, quoteGlyph, spliceUnquoteGlyph, unquoteGlyph];

binaryGlyphTokens = [ignoreIfTrueGlyph, ignoreUnlessTrueGlyph];

module.exports = {
  binaryGlyphTokens: binaryGlyphTokens,
  deref: deref,
  derefGlyph: derefGlyph,
  catch_asterisk_: catch_asterisk_,
  def_bang_: def_bang_,
  _do: _do,
  expand_hyphen_macro: expand_hyphen_macro,
  _false: _false,
  fn_asterisk_: fn_asterisk_,
  _getCurrentEnv: _getCurrentEnv,
  _getDefaultEnv: _getDefaultEnv,
  glyphTokens: glyphTokens,
  _if: _if,
  ignoreIfTrue: ignoreIfTrue,
  ignoreIfTrueGlyph: ignoreIfTrueGlyph,
  ignoreUnlessTrue: ignoreUnlessTrue,
  ignoreUnlessTrueGlyph: ignoreUnlessTrueGlyph,
  ignore: ignore,
  ignore_bang_: ignore_bang_,
  ignore_bang_Glyph: ignore_bang_Glyph,
  indexEnd: indexEnd,
  indexStart: indexStart,
  keyTokens: keyTokens,
  keyword_question_: keyword_question_,
  let_asterisk_: let_asterisk_,
  letrec_asterisk_: letrec_asterisk_,
  listEnd: listEnd,
  listStart: listStart,
  macro_asterisk_: macro_asterisk_,
  macroTokens: macroTokens,
  nil: nil,
  _process: _process,
  quasiquote: quasiquote,
  quasiquoteGlyph: quasiquoteGlyph,
  quote: quote,
  quoteGlyph: quoteGlyph,
  splat: splat,
  spliceUnquote: spliceUnquote,
  spliceUnquoteGlyph: spliceUnquoteGlyph,
  _true: _true,
  try_asterisk_: try_asterisk_,
  undef_bang_: undef_bang_,
  unquote: unquote,
  unquoteGlyph: unquoteGlyph
};


},{}],16:[function(_dereq_,module,exports){
var EOL, car, cdr, concat, cons, copy, createMalList, createNode, drop, empty_question_, equal_question_, filter, forEach, fromArray, last, lastTail, malListType, malTypes, map, next, recurse, reduce, reduceBy2, reverse, take, toArray, toPartialArray, zip, _EOL,
  __slice = [].slice;

malTypes = _dereq_('./types').malTypes;

malListType = malTypes[6];

car = function(malList) {
  if (empty_question_(malList)) {
    return EOL;
  } else {
    return malList.value;
  }
};

cdr = function(malList) {
  if (empty_question_(malList)) {
    return EOL;
  } else {
    return malList.next;
  }
};

concat = function() {
  var malList, malLists, result, tail, _copy, _i, _len, _ref;
  malLists = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  if (malLists.length === 0) {
    return EOL;
  }
  result = copy(malLists[0]);
  tail = lastTail(result);
  _ref = malLists.slice(1);
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    malList = _ref[_i];
    _copy = copy(malList);
    if (empty_question_(tail)) {
      result = _copy;
      tail = lastTail(result);
      continue;
    }
    if (!empty_question_(_copy)) {
      tail.next = _copy;
      tail = lastTail(_copy);
    }
  }
  return result;
};

cons = function(malArgs) {
  return createMalList(car(malArgs), next(malArgs));
};

copy = function(malList) {
  return map((function(x) {
    return x;
  }), malList);
};

createMalList = function(value, nextNode) {
  if (value == null) {
    return EOL;
  }
  return createNode(value, nextNode != null ? nextNode : EOL);
};

createNode = function(value, nextNode) {
  return {
    type: malListType,
    value: value,
    next: nextNode
  };
};

drop = function(nbr, malList) {
  while (nbr !== 0) {
    malList = cdr(malList);
    nbr = nbr - 1;
  }
  return malList;
};

empty_question_ = function(value) {
  return value === EOL;
};

equal_question_ = function(list0, list1, equivalent_question_) {
  while (!(empty_question_(list0) || empty_question_(list1))) {
    if (!equivalent_question_(list0.value, list1.value)) {
      return false;
    }
    list0 = cdr(list0);
    list1 = cdr(list1);
  }
  return empty_question_(list0) && empty_question_(list1);
};

filter = function(predicate, list) {
  var _reduce;
  _reduce = function(list, value) {
    if (predicate(value)) {
      return createMalList(value, list);
    } else {
      return list;
    }
  };
  return reverse(reduce(EOL, _reduce, list));
};

forEach = function(fn, list) {
  var result;
  result = list;
  while (!empty_question_(list)) {
    result = fn(list.value);
    list = recurse(list);
  }
  return result;
};

last = function(malList) {
  return car(lastTail(malList));
};

lastTail = function(malList) {
  var current, prior;
  if (empty_question_(malList)) {
    return malList;
  }
  prior = malList;
  current = cdr(malList);
  while (!empty_question_(current)) {
    prior = cdr(prior);
    current = cdr(current);
  }
  return prior;
};

map = function(fn, list) {
  var _reduce;
  _reduce = function(list, value) {
    return createMalList(fn(value), list);
  };
  return reverse(reduce(EOL, _reduce, list));
};

next = function(malList) {
  return car(cdr(malList));
};

recurse = function(list) {
  if (empty_question_(list)) {
    return list;
  } else {
    return list.next;
  }
};

reduce = function(seed, fn, list) {
  while (!empty_question_(list)) {
    seed = fn(seed, list.value);
    list = recurse(list);
  }
  return seed;
};

reduceBy2 = function(seed, fn, list) {
  var value0, value1;
  while (!empty_question_(list)) {
    value0 = list.value;
    list = recurse(list);
    value1 = list.value;
    seed = fn(seed, value0, value1);
    list = recurse(list);
  }
  return seed;
};

reverse = function(list) {
  var result;
  result = EOL;
  while (!empty_question_(list)) {
    result = createMalList(list.value, result);
    list = list.next;
  }
  return result;
};

take = function(nbr, malList) {
  var node, result;
  result = createMalList();
  while (nbr !== 0) {
    node = car(malList);
    malList = cdr(malList);
    result = createMalList(node, result);
    nbr = nbr - 1;
  }
  return reverse(result);
};

toArray = function(list) {
  var _reduce;
  _reduce = function(jsArray, value) {
    jsArray.push(value);
    return jsArray;
  };
  return reduce([], _reduce, list);
};

fromArray = function(array) {
  var _reduce;
  _reduce = function(list, value) {
    return createMalList(value, list);
  };
  return array.reverse().reduce(_reduce, createMalList());
};

toPartialArray = function(nbr, list) {
  var node, result;
  result = [];
  while (nbr !== 0) {
    node = car(list);
    list = cdr(list);
    result.push(node);
    nbr = nbr - 1;
  }
  result.push(list);
  return result;
};

zip = function(seed, fn, list0, list1) {
  var value0, value1;
  while (!(empty_question_(list0) || empty_question_(list1))) {
    value0 = car(list0);
    list0 = cdr(list0);
    value1 = car(list1);
    list1 = cdr(list1);
    seed = fn(seed, value0, value1);
  }
  return seed;
};

_EOL = {};

EOL = createNode(_EOL, _EOL);

module.exports = {
  car: car,
  cdr: cdr,
  concat: concat,
  cons: cons,
  copy: copy,
  createMalList: createMalList,
  drop: drop,
  empty_question_: empty_question_,
  equal_question_: equal_question_,
  filter: filter,
  forEach: forEach,
  fromArray: fromArray,
  last: last,
  map: map,
  next: next,
  recurse: recurse,
  reduce: reduce,
  reduceBy2: reduceBy2,
  reverse: reverse,
  take: take,
  toArray: toArray,
  toPartialArray: toPartialArray
};


},{"./types":23}],17:[function(_dereq_,module,exports){
var atomize, binaryGlyphIndex, binaryGlyphTokens, binaryGlyph_question_, boolean_question_, comment, createMalBoolean, createMalIdentifier, createMalIgnore, createMalIndex, createMalList, createMalNil, createMalNumber, createMalString, createMalSymbol, deref, derefGlyph, extractJsValue, float_question_, glyphIndex, glyphTokens, glyph_question_, identifer_question_, ignore, ignoreIfTrue, ignoreIfTrueGlyph, ignoreUnlessTrue, ignoreUnlessTrueGlyph, ignore_bang_, ignore_bang_Glyph, ignore_question_, indexEnd, indexStart, indexStart_question_, integer_question_, keyTokens, listEnd, listStart, listStart_question_, nil, nil_question_, parse, parseBinaryGlyph, parseBoolean, parseFloat10, parseGlyph, parseIndex, parseInt10, parseList, quasiquote, quasiquoteGlyph, quote, quoteGlyph, reverse, spliceUnquote, spliceUnquoteGlyph, startsWith_question_, string_question_, stripUnderscores, unquote, unquoteGlyph, _false, _parse, _true,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

binaryGlyphTokens = _dereq_('./keyTokens').binaryGlyphTokens;

comment = _dereq_('./commentSignal');

createMalBoolean = _dereq_('./type-utilities').createMalBoolean;

createMalIdentifier = _dereq_('./type-utilities').createMalIdentifier;

createMalIgnore = _dereq_('./type-utilities').createMalIgnore;

createMalIndex = _dereq_('./type-utilities').createMalIndex;

createMalList = _dereq_('./type-utilities').createMalList;

createMalNil = _dereq_('./type-utilities').createMalNil;

createMalNumber = _dereq_('./type-utilities').createMalNumber;

createMalString = _dereq_('./type-utilities').createMalString;

createMalSymbol = _dereq_('./type-utilities').createMalSymbol;

deref = _dereq_('./keyTokens').deref;

derefGlyph = _dereq_('./keyTokens').derefGlyph;

extractJsValue = _dereq_('./type-utilities').extractJsValue;

_false = _dereq_('./keyTokens')._false;

glyphTokens = _dereq_('./keyTokens').glyphTokens;

ignore = _dereq_('./keyTokens').ignore;

ignore_bang_ = _dereq_('./keyTokens').ignore_bang_;

ignore_bang_Glyph = _dereq_('./keyTokens').ignore_bang_Glyph;

ignoreIfTrue = _dereq_('./keyTokens').ignoreIfTrue;

ignoreIfTrueGlyph = _dereq_('./keyTokens').ignoreIfTrueGlyph;

ignoreUnlessTrue = _dereq_('./keyTokens').ignoreUnlessTrue;

ignoreUnlessTrueGlyph = _dereq_('./keyTokens').ignoreUnlessTrueGlyph;

indexEnd = _dereq_('./keyTokens').indexEnd;

indexStart = _dereq_('./keyTokens').indexStart;

keyTokens = _dereq_('./keyTokens').keyTokens;

listEnd = _dereq_('./keyTokens').listEnd;

listStart = _dereq_('./keyTokens').listStart;

nil = _dereq_('./keyTokens').nil;

quasiquote = _dereq_('./keyTokens').quasiquote;

quote = _dereq_('./keyTokens').quote;

spliceUnquote = _dereq_('./keyTokens').spliceUnquote;

unquote = _dereq_('./keyTokens').unquote;

quasiquoteGlyph = _dereq_('./keyTokens').quasiquoteGlyph;

quoteGlyph = _dereq_('./keyTokens').quoteGlyph;

spliceUnquoteGlyph = _dereq_('./keyTokens').spliceUnquoteGlyph;

unquoteGlyph = _dereq_('./keyTokens').unquoteGlyph;

reverse = _dereq_('./linked-list').reverse;

_true = _dereq_('./keyTokens')._true;

atomize = function(token) {
  var createMalValue;
  createMalValue = (function() {
    switch (false) {
      case !nil_question_(token):
        return createMalNil;
      case !ignore_question_(token):
        return createMalIgnore;
      case !boolean_question_(token):
        return function(__i) {
          return createMalBoolean(parseBoolean(__i));
        };
      case !string_question_(token):
        return createMalString;
      case !identifer_question_(token):
        return createMalIdentifier;
      case !integer_question_(token):
        return function(__i) {
          return createMalNumber(parseInt10(__i));
        };
      case !float_question_(token):
        return function(__i) {
          return createMalNumber(parseFloat10(__i));
        };
      default:
        return createMalSymbol;
    }
  })();
  return createMalValue(token);
};

boolean_question_ = function(token) {
  return token === _false || token === _true;
};

float_question_ = function(token) {
  return /^(-|\+)?[0-9](_|\d)*\.(\d|(\d(_|\d)*\d))$/.test(token);
};

binaryGlyph_question_ = function(token) {
  return __indexOf.call(binaryGlyphTokens, token) >= 0;
};

glyph_question_ = function(token) {
  return __indexOf.call(glyphTokens, token) >= 0;
};

ignore_question_ = function(token) {
  return token === ignore;
};

indexStart_question_ = function(token) {
  return token === indexStart;
};

integer_question_ = function(token) {
  return /^(0(?!\.)|((-|\+)?[1-9](_|\d)*$))/.test(token);
};

listStart_question_ = function(token) {
  return token === listStart;
};

nil_question_ = function(token) {
  return token === nil;
};

_parse = function(token, tokens) {
  switch (false) {
    case !listStart_question_(token):
      return parseList(tokens);
    case !indexStart_question_(token):
      return parseIndex(tokens);
    case !glyph_question_(token):
      return parseGlyph(glyphIndex[token], tokens);
    case !binaryGlyph_question_(token):
      return parseBinaryGlyph(binaryGlyphIndex[token], tokens);
    default:
      return atomize(token);
  }
};

parse = function(tokens) {
  if (tokens === comment) {
    return comment;
  }
  return _parse(tokens.shift(), tokens);
};

parseBinaryGlyph = function(keyword, tokens) {
  return createMalList(createMalSymbol(keyword), createMalList(parse(tokens), createMalList(parse(tokens))));
};

parseBoolean = function(token) {
  return token === _true;
};

parseFloat10 = function(token) {
  return parseFloat(stripUnderscores(token), 10);
};

parseGlyph = function(keyword, tokens) {
  return createMalList(createMalSymbol(keyword), createMalList(parse(tokens)));
};

parseIndex = function(tokens) {
  var jsIndex, key, keyStep_question_, token;
  jsIndex = {};
  key = null;
  keyStep_question_ = true;
  while ((token = tokens.shift()) !== indexEnd) {
    if (keyStep_question_) {
      key = _parse(token, tokens);
      keyStep_question_ = false;
    } else {
      jsIndex[extractJsValue(key)] = _parse(token, tokens);
      keyStep_question_ = true;
    }
  }
  return createMalIndex(jsIndex);
};

parseInt10 = function(token) {
  return parseInt(stripUnderscores(token), 10);
};

parseList = function(tokens) {
  var malList, token;
  malList = createMalList();
  while ((token = tokens.shift()) !== listEnd) {
    malList = createMalList(_parse(token, tokens), malList);
  }
  return reverse(malList);
};

startsWith_question_ = function(char) {
  return function(token) {
    return token[0] === char;
  };
};

stripUnderscores = function(token) {
  return token.replace(/_/g, '');
};

glyphIndex = {};

glyphIndex[derefGlyph] = deref;

glyphIndex[ignore_bang_Glyph] = ignore_bang_;

glyphIndex[quasiquoteGlyph] = quasiquote;

glyphIndex[quoteGlyph] = quote;

glyphIndex[spliceUnquoteGlyph] = spliceUnquote;

glyphIndex[unquoteGlyph] = unquote;

binaryGlyphIndex = {};

binaryGlyphIndex[ignoreIfTrueGlyph] = ignoreIfTrue;

binaryGlyphIndex[ignoreUnlessTrueGlyph] = ignoreUnlessTrue;

string_question_ = startsWith_question_('"');

identifer_question_ = startsWith_question_(':');

module.exports = parse;


},{"./commentSignal":4,"./keyTokens":15,"./linked-list":16,"./type-utilities":22}],18:[function(_dereq_,module,exports){
var adjoinMalValue, commentSignal, coreEffectfulFunctionLabel, corePureFunctionLabel, extractJsValue, ignoreLabel, indexEnd, indexStart, keywordLabel, listEnd, listStart, macroLabel, malAtom_question_, malCoreEffectfulFunction_question_, malCorePureFunction_question_, malIdentifier_question_, malIgnore_question_, malIndex_question_, malKeyword_question_, malList_question_, malMacro_question_, malNil_question_, malString_question_, malUserPureFunction_question_, nilLabel, reduce, serialize, serializeAtom, serializeIdentifier, serializeIndex, serializeList, serializeString, stripQuotes, userPureFunctionLabel,
  __hasProp = {}.hasOwnProperty;

commentSignal = _dereq_('./commentSignal');

extractJsValue = _dereq_('./type-utilities').extractJsValue;

indexEnd = _dereq_('./keyTokens').indexEnd;

indexStart = _dereq_('./keyTokens').indexStart;

listEnd = _dereq_('./keyTokens').listEnd;

listStart = _dereq_('./keyTokens').listStart;

malAtom_question_ = _dereq_('./type-utilities').malAtom_question_;

malCoreEffectfulFunction_question_ = _dereq_('./type-utilities').malCoreEffectfulFunction_question_;

malCorePureFunction_question_ = _dereq_('./type-utilities').malCorePureFunction_question_;

malIdentifier_question_ = _dereq_('./type-utilities').malIdentifier_question_;

malIgnore_question_ = _dereq_('./type-utilities').malIgnore_question_;

malIndex_question_ = _dereq_('./type-utilities').malIndex_question_;

malKeyword_question_ = _dereq_('./type-utilities').malKeyword_question_;

malList_question_ = _dereq_('./type-utilities').malList_question_;

malMacro_question_ = _dereq_('./type-utilities').malMacro_question_;

malNil_question_ = _dereq_('./type-utilities').malNil_question_;

malString_question_ = _dereq_('./type-utilities').malString_question_;

malUserPureFunction_question_ = _dereq_('./type-utilities').malUserPureFunction_question_;

reduce = _dereq_('./linked-list').reduce;

adjoinMalValue = function(printReadably_question_) {
  return function(memo, malValue) {
    var serialized;
    serialized = serialize(malValue, printReadably_question_);
    if (memo.length === 0) {
      return serialized;
    } else {
      return "" + memo + " " + serialized;
    }
  };
};

serialize = function(malExpr, printReadably_question_) {
  var _serialize;
  if (malExpr === commentSignal) {
    return commentSignal;
  }
  _serialize = (function() {
    switch (false) {
      case !malList_question_(malExpr):
        return serializeList;
      case !malIgnore_question_(malExpr):
        return function(x) {
          return ignoreLabel;
        };
      case !malIndex_question_(malExpr):
        return serializeIndex;
      case !malKeyword_question_(malExpr):
        return function(x) {
          return keywordLabel;
        };
      case !malCoreEffectfulFunction_question_(malExpr):
        return function(x) {
          return coreEffectfulFunctionLabel;
        };
      case !malCorePureFunction_question_(malExpr):
        return function(x) {
          return corePureFunctionLabel;
        };
      case !malUserPureFunction_question_(malExpr):
        return function(x) {
          return userPureFunctionLabel;
        };
      case !malMacro_question_(malExpr):
        return function(x) {
          return macroLabel;
        };
      case !malNil_question_(malExpr):
        return function(x) {
          return nilLabel;
        };
      case !malIdentifier_question_(malExpr):
        return serializeIdentifier;
      case !malString_question_(malExpr):
        return serializeString;
      case !malAtom_question_(malExpr):
        return serializeAtom;
      case malExpr.jsValue == null:
        return extractJsValue;
      default:
        return function(x) {
          return x;
        };
    }
  })();
  return _serialize(malExpr, printReadably_question_);
};

serializeAtom = function(malAtom, printReadably_question_) {
  return "(atom " + (serialize(malAtom.malValue, printReadably_question_)) + ")";
};

serializeIdentifier = function(malString, printReadably_question_) {
  return extractJsValue(malString);
};

serializeIndex = function(malIndex, printReadably_question_) {
  var jsIndex, key, malValue, memo;
  jsIndex = malIndex.jsValue;
  memo = '';
  for (key in jsIndex) {
    if (!__hasProp.call(jsIndex, key)) continue;
    malValue = jsIndex[key];
    memo = memo === '' ? "" + key + " " + (serialize(malValue, printReadably_question_)) : "" + memo + ", " + key + " " + (serialize(malValue, printReadably_question_));
  }
  return indexStart + memo + indexEnd;
};

serializeList = function(malList, printReadably_question_) {
  var serializedList;
  serializedList = reduce("", adjoinMalValue(printReadably_question_), malList);
  return listStart + serializedList + listEnd;
};

serializeString = function(malString, printReadably_question_) {
  var jsString;
  jsString = stripQuotes(extractJsValue(malString));
  if (!printReadably_question_) {
    return jsString;
  }
  return jsString.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
};

stripQuotes = function(jsString) {
  return jsString.slice(1, -1);
};

coreEffectfulFunctionLabel = '<effectful core function>';

corePureFunctionLabel = '<core function>';

ignoreLabel = '<ignore>';

keywordLabel = '<keyword>';

macroLabel = '<macro>';

nilLabel = 'nil';

userPureFunctionLabel = '<function>';

module.exports = serialize;


},{"./commentSignal":4,"./keyTokens":15,"./linked-list":16,"./type-utilities":22}],19:[function(_dereq_,module,exports){
module.exports = "(do\n  (def! fix*\n    (fn* (f)\n      ( (fn* (x) (f (fn* (& ys) (apply (x x) ys))))\n        (fn* (x) (f (fn* (& ys) (apply (x x) ys)))))))\n\n  (def! y* (macro* (f x) `(~f (y* ~f) ~x)))\n\n  (def! memfix*\n    (fn* (f)\n      (let* (cache {})\n        (\n          (fn* (x cache)\n            (f\n              (fn* (z)\n                (if (contains? cache z)\n                  (get cache z)\n                  (let* (result ((fn* (y) ((x x cache) y)) z))\n                    (do (set! cache z result) result))))\n              cache))\n          (fn* (x cache)\n            (f\n              (fn* (z)\n                (if (contains? cache z)\n                  (get cache z)\n                  (let* (result ((fn* (y) ((x x cache) y)) z))\n                    (do (set! cache z result) result))))\n              cache))\n          cache))))\n\n  (def! _0 car)\n  (def! _1 (fn* (xs) (nth 1 xs)))\n  (def! _2 (fn* (xs) (nth 2 xs)))\n\n  (def! swap! (macro* (atom & xs)\n    (if (empty? xs)\n      atom\n      `(let* (-atom- ~atom)\n        (do\n          (reset! -atom- (~(car xs) (deref -atom-) ~@(cdr xs)))\n          (deref -atom-))))))\n\n  (def! *gensym-counter* (atom 0))\n\n  (def! gensym (fn* ()\n    (symbol (str \"G__\" (swap! *gensym-counter* incr)))))\n\n  (def! or (macro* (& xs)\n    (if (empty? xs)\n      false\n      (let* (-query- (gensym))\n        `(let* (~-query- ~(car xs))\n          (if ~-query- \n            ~-query-\n            (or ~@(cdr xs))))))))\n\n  (def! and (macro* (& xs)\n    (if (empty? xs)\n      true\n      (let* (-query- (gensym))\n        `(let* (~-query- ~(car xs))\n          (if ~-query-\n            (and ~@(cdr xs))\n            false))))))\n\n  (def! cond (macro* (& xs)\n    (if (empty? xs)\n      nil\n      (if (empty? (cdr xs))\n        (throw \"`cond` requires an even number of forms.\")\n        (let* (-query- (gensym))\n          `(let* (~-query- ~(car xs))\n            (if ~-query-\n              ~(_1 xs)\n              (cond ~@(cdr (cdr xs))))))))))\n\n  (def! loop (macro* (form0 form1)\n    `(let* (loop (memfix* (fn* (loop) (fn* (~(_0 form0)) ~form1)))) (loop ~(_1 form0)))))\n\n  (def! -> (macro* (& xs)\n    (if (empty? xs)\n      nil\n      (let* (x  (car xs)\n             xs (cdr xs))\n        (if (empty? xs)\n          x\n          (let* (form  (car xs)\n                forms  (cdr xs))\n            (if (empty? forms)\n              (if (list? form)\n                (if (= (symbol \"fn*\") (car form))\n                  `(~form ~x)\n                  `(~(car form) ~x ~@(cdr form)))\n                (list form x))\n              `(-> (-> ~x ~form) ~@forms))))))))\n\n  (def! ->> (macro* (& xs)\n    (if (empty? xs)\n      nil\n      (let* (x  (car xs)\n             xs (cdr xs))\n        (if (empty? xs)\n          x\n          (let* (form  (car xs)\n                 forms (cdr xs))\n            (if (empty? forms)\n              (if (list? form)\n                (if (= (symbol \"fn*\") (car form))\n                  `(~form ~x)\n                  `(~@form  ~x))\n                (list form x))\n              `(->> (->> ~x ~form) ~@forms))))))))\n\n  (def! ->* (macro* (& xs) `(fn* (-x-) (-> -x- ~@xs))))\n\n  (def! ->>* (macro* (& xs) `(fn* (-x-) (->> -x- ~@xs))))\n\n  (def! not (fn* (x) (if x false true)))\n  (def! incr  (->* (+ 1)))\n  (def! decr  (->* (- 1)))\n  (def! zero? (->* (= 0)))\n\n  (def! identity (fn* (x) x))\n\n  (def! constant-fn (fn* (x) (fn* (y) x)))\n\n  (def! call-on (fn* (& xs) (fn* (fn) (apply fn xs))))\n\n  (def! step-into-list (fn* (xs fn0 fn1)\n    (let* (x   (car xs)\n          -xs- (cdr xs))\n      (if (empty? -xs-)\n        (fn1 x)\n        (fn0 x -xs-)))))\n\n  (def! apply-on (fn* (& xs)\n    (step-into-list\n      xs\n      (fn* (arguments -xs-) (apply (car -xs-) arguments))\n      (fn* (arguments) (fn* (f) (apply f arguments))))))\n\n  (def! reduce (fn* (f seed xs)\n      (if (empty? xs)\n        seed\n        (reduce f (f seed (car xs)) (cdr xs)))))\n\n  (def! filter (fn* (predicate xs)\n    (reverse\n      (reduce\n        (fn* (memo x)\n          (if (predicate x)\n            (cons x memo)\n            memo))\n        '()\n        xs))))\n\n  (def! map (fn* (f xs)\n      (reverse (reduce (fn* (memo x) (cons (f x) memo)) '() xs))))\n\n  (def! every?  (fn* (pred xs)\n      (if (empty? xs)\n        true\n        (if (pred (car xs))\n          (every? pred (cdr xs))\n          false))))\n\n  (def! some?  (fn* (pred xs)\n      (if (empty? xs)\n        false\n        (if (pred (car xs))\n          true\n          (some? pred (cdr xs))))))\n\n  (def! letmemrec* (macro* (alias expr)\n    `(let* (~(car alias) (memfix* (fn* (~(car alias)) ~(_1 alias)))) ~expr)))\n\n  (def! skip (fn* (nbr xs)\n    (letrec* (-skip- (fn* (ys)\n      (let* (nbr (car ys)\n             xs  (_1 ys))\n        (cond\n          (= 0 nbr) xs\n          (= 1 nbr) (cdr xs)\n          \"default\" (-skip- (list (decr nbr) (cdr xs)))))))\n      (-skip- (list nbr xs)))))\n\n  (def! . (macro* (x key & xs)\n    `((get ~x ~key) ~@xs)))\n\n  (def! .. (fn* (lo hi)\n    (letrec* (-..- (fn* (xs)\n      (let* (lo     (_0 xs)\n             hi     (_1 xs)\n             -list- (_2 xs))\n        (if (= lo hi)\n          (cons hi -list-)\n          (-..- (list lo (decr hi) (cons hi -list-)))))))\n      (-..- (list lo hi '())))))\n\n  (def! defrec! (macro* (fn-name fn-body)\n    `(def! ~fn-name (letrec* (~fn-name ~fn-body) ~fn-name))))\n\n  (def! for* (macro* (loop-parameters body)\n    `(loop\n      ~(_0 loop-parameters)\n      (if ~(_1 loop-parameters)\n        nil\n        (do ~body (loop ~(_2 loop-parameters)))))))\n\n  (def! for-each (fn* (f xs)\n    (reduce\n      (fn* (memo x) (do (f x) memo))\n      nil\n      xs)))\n\n  (def! n-times (fn* (n f)\n    (loop (i 0)\n      (if (= i n)\n        nil\n        (do (f i) (loop (+ i 1)))))))\n\n  (def! tap (fn* (f x)\n    (do (f x) x)))\n\n  (def! with-side-effect (fn* (thunk x)\n    (do (thunk) x)))\n\n\n  (def! thunk (macro* (form)\n    `(fn* () ~form)))\n\n)";


},{}],20:[function(_dereq_,module,exports){
var commentSignal, comment_question_, createTokenRegex, meaningful_question_, tokenize;

commentSignal = _dereq_('./commentSignal');

comment_question_ = function(match) {
  return match[0] === ';';
};

createTokenRegex = function() {
  return /[\s,]*(~@|\#\+|\#\-|\#\!|[\[\](){}'`~@^]|"(?:\\.|[^\\"])*"|;.*|[^\s\[\](){}'"`,;]*)/g;
};

meaningful_question_ = function(match) {
  return match !== '';
};

tokenize = function(sourceCode) {
  var match, result, tokenRegex;
  tokenRegex = createTokenRegex();
  result = [];
  while (meaningful_question_(match = tokenRegex.exec(sourceCode)[1])) {
    if (comment_question_(match)) {
      continue;
    }
    result.push(match);
  }
  if (result.length === 0) {
    return commentSignal;
  } else {
    return result;
  }
};

module.exports = tokenize;


},{"./commentSignal":4}],21:[function(_dereq_,module,exports){
var parse, tokenize;

parse = _dereq_('./parse');

tokenize = _dereq_('./tokenize');

module.exports = function(sourceCode) {
  return parse(tokenize(sourceCode));
};


},{"./parse":17,"./tokenize":20}],22:[function(_dereq_,module,exports){
var createMalAtom, createMalBoolean, createMalCoreEffectfulFunction, createMalCorePureFunction, createMalIdentifier, createMalIgnore, createMalIndex, createMalKeyword, createMalList, createMalMacro, createMalNil, createMalNumber, createMalSpecialForm, createMalString, createMalSymbol, createMalUserPureFunction, createMalValue, createPredicate, create_hyphen_factory_hyphen__ampersand__hyphen_predicate, extractJsValue, malAtomType, malAtom_question_, malBoolean_question_, malCoreEffectfulFunction_question_, malCorePureFunction_question_, malFalse, malFalse_question_, malIdentifier_question_, malIgnore, malIgnore_question_, malIndex_question_, malKeyword_question_, malList_question_, malMacro_question_, malNil, malNil_question_, malNumber_question_, malSpecialForm_question_, malString_question_, malSymbol_question_, malTrue, malTrue_question_, malTypes, malUserPureFunction_question_, _createMalAtom, _createMalBoolean, _createMalList, _createMalUnit, _malUnit_question_, _ref, _ref1, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _ref16, _ref17, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;

createMalList = _dereq_('./linked-list').createMalList;

malAtomType = _dereq_('./types').malAtomType;

malTypes = _dereq_('./types').malTypes;

create_hyphen_factory_hyphen__ampersand__hyphen_predicate = function(malType) {
  var factory, predicate;
  factory = function(jsValue) {
    return createMalValue(jsValue, malType);
  };
  predicate = function(malValue) {
    return malValue.type === malType;
  };
  return [factory, predicate];
};

createMalAtom = function(malValue) {
  return {
    malValue: malValue,
    type: malAtomType
  };
};

createMalBoolean = function(jsBoolean) {
  if (jsBoolean) {
    return malTrue;
  } else {
    return malFalse;
  }
};

createMalIgnore = function() {
  return malIgnore;
};

createMalNil = function() {
  return malNil;
};

createMalValue = function(jsValue, malType) {
  return {
    jsValue: jsValue,
    type: malType
  };
};

createPredicate = function(constant) {
  return function(value) {
    return value === constant;
  };
};

extractJsValue = function(malValue) {
  return malValue.jsValue;
};

_ref = malTypes.map(create_hyphen_factory_hyphen__ampersand__hyphen_predicate), (_ref1 = _ref[0], _createMalBoolean = _ref1[0], malBoolean_question_ = _ref1[1]), (_ref2 = _ref[1], createMalCoreEffectfulFunction = _ref2[0], malCoreEffectfulFunction_question_ = _ref2[1]), (_ref3 = _ref[2], createMalCorePureFunction = _ref3[0], malCorePureFunction_question_ = _ref3[1]), (_ref4 = _ref[3], createMalIdentifier = _ref4[0], malIdentifier_question_ = _ref4[1]), (_ref5 = _ref[4], createMalIndex = _ref5[0], malIndex_question_ = _ref5[1]), (_ref6 = _ref[5], createMalKeyword = _ref6[0], malKeyword_question_ = _ref6[1]), (_ref7 = _ref[6], _createMalList = _ref7[0], malList_question_ = _ref7[1]), (_ref8 = _ref[7], createMalMacro = _ref8[0], malMacro_question_ = _ref8[1]), (_ref9 = _ref[8], createMalNumber = _ref9[0], malNumber_question_ = _ref9[1]), (_ref10 = _ref[9], createMalSpecialForm = _ref10[0], malSpecialForm_question_ = _ref10[1]), (_ref11 = _ref[10], createMalString = _ref11[0], malString_question_ = _ref11[1]), (_ref12 = _ref[11], createMalSymbol = _ref12[0], malSymbol_question_ = _ref12[1]), (_ref13 = _ref[12], _createMalUnit = _ref13[0], _malUnit_question_ = _ref13[1]), (_ref14 = _ref[13], createMalUserPureFunction = _ref14[0], malUserPureFunction_question_ = _ref14[1]), (_ref15 = _ref[14], _createMalAtom = _ref15[0], malAtom_question_ = _ref15[1]);

malIgnore = _createMalUnit(null);

malNil = _createMalUnit(null);

_ref16 = [false, true].map(_createMalBoolean), malFalse = _ref16[0], malTrue = _ref16[1];

_ref17 = [malFalse, malIgnore, malNil, malTrue].map(createPredicate), malFalse_question_ = _ref17[0], malIgnore_question_ = _ref17[1], malNil_question_ = _ref17[2], malTrue_question_ = _ref17[3];

module.exports = {
  createMalAtom: createMalAtom,
  createMalBoolean: createMalBoolean,
  createMalCoreEffectfulFunction: createMalCoreEffectfulFunction,
  createMalCorePureFunction: createMalCorePureFunction,
  createMalIdentifier: createMalIdentifier,
  createMalIgnore: createMalIgnore,
  createMalIndex: createMalIndex,
  createMalKeyword: createMalKeyword,
  createMalList: createMalList,
  createMalMacro: createMalMacro,
  createMalNil: createMalNil,
  createMalNumber: createMalNumber,
  createMalSpecialForm: createMalSpecialForm,
  createMalString: createMalString,
  createMalSymbol: createMalSymbol,
  createMalUserPureFunction: createMalUserPureFunction,
  extractJsValue: extractJsValue,
  malAtom_question_: malAtom_question_,
  malBoolean_question_: malBoolean_question_,
  malCoreEffectfulFunction_question_: malCoreEffectfulFunction_question_,
  malCorePureFunction_question_: malCorePureFunction_question_,
  malFalse: malFalse,
  malFalse_question_: malFalse_question_,
  malIdentifier_question_: malIdentifier_question_,
  malIgnore: malIgnore,
  malIgnore_question_: malIgnore_question_,
  malIndex_question_: malIndex_question_,
  malKeyword_question_: malKeyword_question_,
  malList_question_: malList_question_,
  malMacro_question_: malMacro_question_,
  malNil: malNil,
  malNil_question_: malNil_question_,
  malNumber_question_: malNumber_question_,
  malSpecialForm_question_: malSpecialForm_question_,
  malString_question_: malString_question_,
  malSymbol_question_: malSymbol_question_,
  malTrue: malTrue,
  malTrue_question_: malTrue_question_,
  malUserPureFunction_question_: malUserPureFunction_question_
};


},{"./linked-list":16,"./types":23}],23:[function(_dereq_,module,exports){
var malAtomType, malBooleanType, malCoreEffectfulFunctionType, malCorePureFunctionType, malIdentifierType, malIndexType, malKeywordType, malListType, malMacroType, malNumberType, malSpecialFormType, malStringType, malSymbolType, malTypes, malUnitType, malUserPureFunctionType;

malTypes = [malBooleanType = 'malBooleanType', malCoreEffectfulFunctionType = 'malCoreEffectfulFunctionType', malCorePureFunctionType = 'malCorePureFunctionType', malIdentifierType = 'malIdentifierType', malIndexType = 'malIndexType', malKeywordType = 'malKeywordType', malListType = 'malListType', malMacroType = 'malMacroType', malNumberType = 'malNumberType', malSpecialFormType = 'malSpecialFormType', malStringType = 'malStringType', malSymbolType = 'malSymbolType', malUnitType = 'malUnitType', malUserPureFunctionType = 'malUserPureFunctionType', malAtomType = 'malAtomType'];

module.exports = {
  malAtomType: malAtomType,
  malBooleanType: malBooleanType,
  malCoreEffectfulFunctionType: malCoreEffectfulFunctionType,
  malCorePureFunctionType: malCorePureFunctionType,
  malIdentifierType: malIdentifierType,
  malIndexType: malIndexType,
  malKeywordType: malKeywordType,
  malListType: malListType,
  malMacroType: malMacroType,
  malNumberType: malNumberType,
  malSpecialFormType: malSpecialFormType,
  malStringType: malStringType,
  malSymbolType: malSymbolType,
  malTypes: malTypes,
  malUnitType: malUnitType,
  malUserPureFunctionType: malUserPureFunctionType
};


},{}]},{},[13])(13)
});