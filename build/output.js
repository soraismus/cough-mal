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
var add, contains_question_, createErlBoolean, createErlCorePureFunction, createErlIdentifier, createErlIndex, createErlNumber, createErlString, dissoc, divide, erlNil, exponentiate, extractJsValue, fromArray, functionsOnJsValues, get, getEnvironment, greaterThan, greaterThanOrEqual, index, jsNaN_question_, jsNumber_question_, jsString_question_, keys, length, lessThan, lessThanOrEqual, lift, max, min, mod, multiply, negate, parseNumber, reduce, setCoreFnsOnJsValues_bang_, subtract, toArray, vals,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty;

createErlBoolean = _dereq_('./type-utilities').createErlBoolean;

createErlCorePureFunction = _dereq_('./type-utilities').createErlCorePureFunction;

createErlIdentifier = _dereq_('./type-utilities').createErlIdentifier;

createErlIndex = _dereq_('./type-utilities').createErlIndex;

createErlNumber = _dereq_('./type-utilities').createErlNumber;

createErlString = _dereq_('./type-utilities').createErlString;

extractJsValue = _dereq_('./type-utilities').extractJsValue;

fromArray = _dereq_('./linked-list').fromArray;

jsNaN_question_ = _dereq_('./js-utilities').jsNaN_question_;

jsNumber_question_ = _dereq_('./js-utilities').jsNumber_question_;

jsString_question_ = _dereq_('./js-utilities').jsString_question_;

erlNil = _dereq_('./type-utilities').erlNil;

reduce = _dereq_('./linked-list').reduce;

toArray = _dereq_('./linked-list').toArray;

add = function() {
  var nbrs;
  nbrs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return createErlNumber(nbrs.reduce(function(x, nbr) {
    return x += nbr;
  }));
};

contains_question_ = function(index, key) {
  return createErlBoolean(key in index);
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
  return createErlIndex(copy);
};

divide = function() {
  var nbrs;
  nbrs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return createErlNumber(nbrs.reduce(function(x, nbr) {
    return x /= nbr;
  }));
};

exponentiate = function() {
  var nbrs;
  nbrs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return createErlNumber(nbrs.reduce(function(x, nbr) {
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
  return createErlBoolean(nbrs[0] >= nbrs[1]);
};

greaterThan = function() {
  var nbrs;
  nbrs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return createErlBoolean(nbrs[0] > nbrs[1]);
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
  return createErlIndex(index);
};

keys = function(index) {
  var jsNbr, key, value, _keys;
  _keys = [];
  for (key in index) {
    if (!__hasProp.call(index, key)) continue;
    value = index[key];
    _keys.push(jsNaN_question_(jsNbr = parseFloat(key, 10)) ? (key[0] === ':' ? createErlIdentifier : createErlString)(key) : createErlNumber(jsNbr));
  }
  return fromArray(_keys);
};

length = function(jsVal) {
  if (!jsString_question_(jsVal)) {
    return erlNil;
  }
  return createErlNumber(jsVal.length - 2);
};

lessThan = function() {
  var nbrs;
  nbrs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return createErlBoolean(nbrs[0] < nbrs[1]);
};

lessThanOrEqual = function() {
  var nbrs;
  nbrs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return createErlBoolean(nbrs[0] <= nbrs[1]);
};

lift = function(fnOnJsValues) {
  return function(erlValueList) {
    return fnOnJsValues.apply(null, (toArray(erlValueList)).map(extractJsValue));
  };
};

max = function() {
  var nbrs;
  nbrs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return createErlNumber(Math.max.apply(Math, nbrs));
};

min = function() {
  var nbrs;
  nbrs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return createErlNumber(Math.min.apply(Math, nbrs));
};

mod = function(nbr0, nbr1) {
  return createErlNumber(nbr0 % nbr1);
};

multiply = function() {
  var nbrs;
  nbrs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return createErlNumber(nbrs.reduce(function(x, nbr) {
    return x *= nbr;
  }));
};

negate = function(nbr) {
  return createErlNumber(-1 * nbr);
};

parseNumber = function(jsVal) {
  var jsNbr;
  if (jsNumber_question_(jsVal)) {
    return jsVal;
  }
  if (!jsString_question_(jsVal)) {
    return erlNil;
  }
  jsNbr = parseFloat(stripQuotes(jsVal), 10);
  if (jsNaN_question_(jsNbr)) {
    return erlNil;
  } else {
    return createErlNumber(jsNbr);
  }
};

setCoreFnsOnJsValues_bang_ = function(env, fns) {
  var fn, fnName, _results;
  _results = [];
  for (fnName in fns) {
    if (!__hasProp.call(fns, fnName)) continue;
    fn = fns[fnName];
    _results.push(env[fnName] = createErlCorePureFunction(lift(fn)));
  }
  return _results;
};

subtract = function() {
  var nbrs;
  nbrs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return createErlNumber(nbrs.reduce(function(x, nbr) {
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
  'max': max,
  'min': min,
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
var append, areEqual, assoc, atom, atom_question_, boolean_question_, car, cdr, circumpendQuotes, concat, cons, coreFn_question_, count, createErlAtom, createErlBoolean, createErlCorePureFunction, createErlIndex, createErlList, createErlNumber, createErlString, createErlSymbol, createPredicate, deref, drop, empty_question_, equal_question_, erlAtom_question_, erlBoolean_question_, erlCorePureFunction_question_, erlFalse, erlFalse_question_, erlIgnore, erlIndex_question_, erlList_question_, erlMacro_question_, erlNil, erlNil_question_, erlNumber_question_, erlString_question_, erlSymbol_question_, erlTrue, erlTrue_question_, erlUserPureFunction_question_, extractJsValue, false_question_, first, fromArray, function_question_, functionsOnErlValues, getEnvironment, ignoreIfTrue, ignoreUnlessTrue, ignore_bang_, interpret, last, list, list_question_, macro_question_, meta, next, nil_question_, nth, number_question_, prepend, prettyString, read, recurse, reduce, reset, rest, reverse, serialize, set, setCoreFnsOnErlValues_bang_, slurp, string, string_question_, stripQuotes, symbol, symbol_question_, take, time_hyphen_ms, toArray, toPartialArray, true_question_, typeOf, userFn_question_, withMeta, write, _car, _cdr, _concat, _drop, _empty_question_, _interpret, _last, _not, _prStr, _quit_, _ref, _reverse, _take, _throw,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty;

car = _dereq_('./linked-list').car;

cdr = _dereq_('./linked-list').cdr;

circumpendQuotes = _dereq_('./js-utilities').circumpendQuotes;

concat = _dereq_('./linked-list').concat;

createErlAtom = _dereq_('./type-utilities').createErlAtom;

createErlBoolean = _dereq_('./type-utilities').createErlBoolean;

createErlCorePureFunction = _dereq_('./type-utilities').createErlCorePureFunction;

createErlIndex = _dereq_('./type-utilities').createErlIndex;

createErlList = _dereq_('./type-utilities').createErlList;

createErlNumber = _dereq_('./type-utilities').createErlNumber;

createErlString = _dereq_('./type-utilities').createErlString;

createErlSymbol = _dereq_('./type-utilities').createErlSymbol;

drop = _dereq_('./linked-list').drop;

empty_question_ = _dereq_('./linked-list').empty_question_;

equal_question_ = _dereq_('./linked-list').equal_question_;

extractJsValue = _dereq_('./type-utilities').extractJsValue;

fromArray = _dereq_('./linked-list').fromArray;

interpret = _dereq_('./interpret');

last = _dereq_('./linked-list').last;

erlAtom_question_ = _dereq_('./type-utilities').erlAtom_question_;

erlCorePureFunction_question_ = _dereq_('./type-utilities').erlCorePureFunction_question_;

erlBoolean_question_ = _dereq_('./type-utilities').erlBoolean_question_;

erlFalse = _dereq_('./type-utilities').erlFalse;

erlFalse_question_ = _dereq_('./type-utilities').erlFalse_question_;

erlIgnore = _dereq_('./type-utilities').erlIgnore;

erlIndex_question_ = _dereq_('./type-utilities').erlIndex_question_;

erlList_question_ = _dereq_('./type-utilities').erlList_question_;

erlMacro_question_ = _dereq_('./type-utilities').erlMacro_question_;

erlNil = _dereq_('./type-utilities').erlNil;

erlNil_question_ = _dereq_('./type-utilities').erlNil_question_;

erlNumber_question_ = _dereq_('./type-utilities').erlNumber_question_;

erlString_question_ = _dereq_('./type-utilities').erlString_question_;

erlSymbol_question_ = _dereq_('./type-utilities').erlSymbol_question_;

erlTrue = _dereq_('./type-utilities').erlTrue;

erlTrue_question_ = _dereq_('./type-utilities').erlTrue_question_;

erlUserPureFunction_question_ = _dereq_('./type-utilities').erlUserPureFunction_question_;

next = _dereq_('./linked-list').next;

recurse = _dereq_('./linked-list').recurse;

reduce = _dereq_('./linked-list').reduce;

reverse = _dereq_('./linked-list').reverse;

serialize = _dereq_('./serialize');

take = _dereq_('./linked-list').take;

toArray = _dereq_('./linked-list').toArray;

toPartialArray = _dereq_('./linked-list').toPartialArray;

append = function(erlArgs) {
  var erlList, erlValues, _ref;
  _ref = toArray(erlArgs), erlList = _ref[0], erlValues = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
  return concat(erlList, fromArray(erlValues));
};

areEqual = function(erlArgs) {
  var erlValue0, erlValue1, _areEqual, _ref;
  _ref = toPartialArray(2, erlArgs), erlValue0 = _ref[0], erlValue1 = _ref[1];
  _areEqual = function(erlValue0, erlValue1) {
    var jsIndex0, jsIndex1;
    if (erlList_question_(erlValue0) && erlList_question_(erlValue1)) {
      return equal_question_(erlValue0, erlValue1, _areEqual);
    } else if (erlIndex_question_(erlValue0) && erlIndex_question_(erlValue1)) {
      jsIndex0 = erlValue0.jsValue;
      jsIndex1 = erlValue1.jsValue;
      return (_areEqual(keys(jsIndex0), keys(jsIndex1))) && (_areEqual(vals(jsIndex0), vals(jsIndex1)));
    } else {
      return erlValue0.jsValue === erlValue1.jsValue;
    }
  };
  return createErlBoolean(_areEqual(erlValue0, erlValue1));
};

assoc = function(erlArgs) {
  var args, copy, jsIndex, k, key, v, value;
  jsIndex = extractJsValue(car(erlArgs));
  args = cdr(erlArgs);
  copy = {};
  for (key in jsIndex) {
    if (!__hasProp.call(jsIndex, key)) continue;
    value = jsIndex[key];
    copy[key] = value;
  }
  while (!empty_question_(args)) {
    k = car(args);
    v = next(args);
    args = recurse(recurse(args));
    copy[extractJsValue(k)] = v;
  }
  return createErlIndex(copy);
};

atom = function(erlArgs) {
  return createErlAtom(car(erlArgs));
};

_car = function(erlArgs) {
  var arg;
  arg = car(erlArgs);
  if (erlList_question_(arg)) {
    return car(arg);
  } else {
    return erlNil;
  }
};

_cdr = function(erlArgs) {
  var arg;
  arg = car(erlArgs);
  if (erlList_question_(arg)) {
    return cdr(arg);
  } else {
    return erlNil;
  }
};

_concat = function(erlArgs) {
  var erlLists;
  erlLists = toArray(erlArgs);
  return concat.apply(null, erlLists);
};

cons = function(erlArgs) {
  return createErlList(car(erlArgs), next(erlArgs));
};

count = function(erlArgs) {
  var erlList, _reduce;
  erlList = car(erlArgs);
  if (!erlList_question_(erlList)) {
    return erlNil;
  }
  _reduce = function(sum, value) {
    return sum + 1;
  };
  return createErlNumber(reduce(0, _reduce, car(erlArgs)));
};

createPredicate = function(pred) {
  return function(jsList) {
    var erlValue;
    erlValue = jsList.value;
    return createErlBoolean(pred(erlValue));
  };
};

deref = function(erlArgs) {
  return (car(erlArgs)).erlValue;
};

_drop = function(erlArgs) {
  var erlList, erlNumber, _ref;
  _ref = toPartialArray(2, erlArgs), erlNumber = _ref[0], erlList = _ref[1];
  return drop(extractJsValue(erlNumber), erlList);
};

_empty_question_ = function(erlArgs) {
  if (empty_question_(erlArgs)) {
    return erlFalse;
  } else {
    if (empty_question_(car(erlArgs))) {
      return erlTrue;
    } else {
      return erlFalse;
    }
  }
};

first = function(erlArgs) {
  return car(car(erlArgs));
};

function_question_ = function(jsList) {
  var erlValue;
  erlValue = jsList.value;
  return createErlBoolean(erlCorePureFunction_question_(erlValue) || erlUserPureFunction_question_(erlValue));
};

getEnvironment = function(config) {
  var environment;
  environment = config.environment;
  setCoreFnsOnErlValues_bang_(environment, functionsOnErlValues);
  return environment;
};

ignore_bang_ = function(erlArgs) {
  return erlIgnore;
};

ignoreIfTrue = function(erlArgs) {
  var erlBool, erlValue, _ref;
  _ref = toPartialArray(2, erlArgs), erlBool = _ref[0], erlValue = _ref[1];
  if (extractJsValue(erlBool)) {
    return erlIgnore;
  } else {
    return erlValue;
  }
};

ignoreUnlessTrue = function(erlArgs) {
  var erlBool, erlValue, _ref;
  _ref = toPartialArray(2, erlArgs), erlBool = _ref[0], erlValue = _ref[1];
  if (extractJsValue(erlBool)) {
    return erlValue;
  } else {
    return erlIgnore;
  }
};

_interpret = function(erlArgs) {
  return interpret(stripQuotes(extractJsValue(car(erlArgs))));
};

_last = function(erlArgs) {
  var arg;
  arg = car(erlArgs);
  if (erlList_question_(arg)) {
    return last(arg);
  } else {
    return erlNil;
  }
};

list = function(erlArgs) {
  return erlArgs;
};

meta = function(erlArgs) {
  var erlMeta;
  erlMeta = (car(erlArgs)).meta;
  if (erlMeta != null) {
    return erlMeta;
  } else {
    return erlNil;
  }
};

_not = function(erlArgs) {
  var erlVal;
  erlVal = car(erlArgs);
  if (erlNil_question_(erlVal) || erlFalse_question_(erlVal)) {
    return erlTrue;
  } else {
    return erlFalse;
  }
};

nth = function(erlArgs) {
  var erlList, erlNumber, i, _i, _ref, _ref1;
  _ref = toPartialArray(2, erlArgs), erlNumber = _ref[0], erlList = _ref[1];
  for (i = _i = 0, _ref1 = extractJsValue(erlNumber); 0 <= _ref1 ? _i < _ref1 : _i > _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
    erlList = cdr(erlList);
  }
  return car(erlList);
};

prepend = function(erlArgs) {
  var erlList, erlValues, _reduce, _ref;
  _ref = toArray(erlArgs), erlList = _ref[0], erlValues = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
  _reduce = function(list, val) {
    return createErlList(val, list);
  };
  return erlValues.reduce(_reduce, erlList);
};

_prStr = function(erlArgs, printReadably_question_) {
  return ((toArray(erlArgs)).map(function(erlArg) {
    return serialize(erlArg, printReadably_question_);
  })).join('');
};

prettyString = function(erlArgs) {
  return createErlString(circumpendQuotes(_prStr(erlArgs, true)));
};

_quit_ = function() {
  return process.exit(0);
};

read = function(jsList) {
  var _read;
  _read = function(erlArgs) {
    var jsFileName;
    jsFileName = stripQuotes(extractJsValue(car(erlArgs)));
    return _dereq_('fs').readFileSync(jsFileName).toString();
  };
  return createErlString(_read(jsList));
};

reset = function(erlArgs) {
  var value, _ref;
  _ref = toPartialArray(2, erlArgs), atom = _ref[0], value = _ref[1];
  atom.erlValue = value;
  return atom;
};

rest = function(erlArgs) {
  var arg;
  arg = car(erlArgs);
  if (erlList_question_(arg)) {
    return cdr(arg);
  } else {
    return erlNil;
  }
};

_reverse = function(erlArgs) {
  var arg;
  arg = car(erlArgs);
  if (erlList_question_(arg)) {
    return reverse(arg);
  } else {
    return erlNil;
  }
};

set = function(erlArgs) {
  var index, key, val, _ref;
  _ref = toPartialArray(3, erlArgs), index = _ref[0], key = _ref[1], val = _ref[2];
  (extractJsValue(index))[extractJsValue(key)] = val;
  return index;
};

setCoreFnsOnErlValues_bang_ = function(env, fns) {
  var fn, fnName, _results;
  _results = [];
  for (fnName in fns) {
    if (!__hasProp.call(fns, fnName)) continue;
    fn = fns[fnName];
    _results.push(env[fnName] = createErlCorePureFunction(fn));
  }
  return _results;
};

slurp = function(erlArgs) {
  var jsFileName;
  jsFileName = stripQuotes(extractJsValue(car(erlArgs)));
  return createErlString(circumpendQuotes(_dereq_('fs').readFileSync(jsFileName).toString()));
};

string = function(erlArgs) {
  return createErlString(circumpendQuotes(_prStr(erlArgs, false)));
};

stripQuotes = function(jsString) {
  return jsString.slice(1, -1);
};

symbol = function(erlArgs) {
  var erlValue, jsStr;
  erlValue = car(erlArgs);
  if (erlString_question_(erlValue)) {
    jsStr = extractJsValue(erlValue);
    return createErlSymbol(jsStr.slice(1, -1));
  } else {
    return erlNil;
  }
};

_take = function(erlArgs) {
  var erlList, erlNumber, _ref;
  _ref = toPartialArray(2, erlArgs), erlNumber = _ref[0], erlList = _ref[1];
  return take(extractJsValue(erlNumber), erlList);
};

typeOf = function(erlArgs) {
  var erlValue;
  erlValue = car(erlArgs);
  return createErlString(circumpendQuotes(erlValue.type));
};

_throw = function(erlArgs) {
  throw car(erlArgs);
};

time_hyphen_ms = function() {
  return createErlNumber(new Date().getTime());
};

withMeta = function(erlArgs) {
  var erlMeta, erlVal, erlValue, jsValue, type, _ref;
  _ref = toPartialArray(2, erlArgs), erlVal = _ref[0], erlMeta = _ref[1];
  if (erlAtom_question_(erlVal)) {
    erlValue = erlVal.erlValue, type = erlVal.type;
    return {
      erlValue: erlValue,
      type: type,
      meta: erlMeta
    };
  } else {
    jsValue = erlVal.jsValue, type = erlVal.type;
    return {
      jsValue: jsValue,
      type: type,
      meta: erlMeta
    };
  }
};

write = function(erlArgs) {
  return createErlString(serialize(car(erlArgs)));
};

_ref = [erlAtom_question_, erlBoolean_question_, erlCorePureFunction_question_, erlFalse_question_, erlList_question_, erlMacro_question_, erlNil_question_, erlNumber_question_, erlSymbol_question_, erlString_question_, erlUserPureFunction_question_, erlTrue_question_].map(createPredicate), atom_question_ = _ref[0], boolean_question_ = _ref[1], coreFn_question_ = _ref[2], false_question_ = _ref[3], list_question_ = _ref[4], macro_question_ = _ref[5], nil_question_ = _ref[6], number_question_ = _ref[7], symbol_question_ = _ref[8], string_question_ = _ref[9], userFn_question_ = _ref[10], true_question_ = _ref[11];

functionsOnErlValues = {
  '=': areEqual,
  'append': append,
  'assoc': assoc,
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
  'pretty-string': prettyString,
  'rest': _cdr,
  'reverse': _reverse,
  'string': string,
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
var createErlCoreEffectfulFunction, displayEffectsOnErlValues, getEnvironment, serialize, setCoreEffectfulFnsOnErlValues_bang_, toArray, _prStr,
  __hasProp = {}.hasOwnProperty;

createErlCoreEffectfulFunction = _dereq_('./type-utilities').createErlCoreEffectfulFunction;

serialize = _dereq_('./serialize');

toArray = _dereq_('./linked-list').toArray;

getEnvironment = function(config) {
  var display, environment;
  display = config.display, environment = config.environment;
  setCoreEffectfulFnsOnErlValues_bang_(display)(environment, displayEffectsOnErlValues);
  return environment;
};

_prStr = function(erlArgs, printReadably_question_) {
  return ((toArray(erlArgs)).map(function(erlArg) {
    return serialize(erlArg, printReadably_question_);
  })).join('');
};

setCoreEffectfulFnsOnErlValues_bang_ = function(represent) {
  return function(env, fns) {
    var fn, fnName, _results;
    _results = [];
    for (fnName in fns) {
      if (!__hasProp.call(fns, fnName)) continue;
      fn = fns[fnName];
      _results.push(env[fnName] = createErlCoreEffectfulFunction(function(erlArgs) {
        return represent(fn(erlArgs));
      }));
    }
    return _results;
  };
};

displayEffectsOnErlValues = {
  'print': function(erlArgs) {
    return _prStr(erlArgs, false);
  },
  'pretty-print': function(erlArgs) {
    return _prStr(erlArgs, true);
  }
};

module.exports = getEnvironment;


},{"./linked-list":16,"./serialize":18,"./type-utilities":22}],9:[function(_dereq_,module,exports){
var car, createErlCorePureFunction, createErlList, createErlSymbol, erlList_question_, extractJsValue, fromArray, fromErlIndex, getEnvironment, setCoreFnsOnErlValues_bang_, stripQuotes, toArray, toPartialArray, tokenizeAndParse, _process, _process_,
  __hasProp = {}.hasOwnProperty;

car = _dereq_('./linked-list').car;

createErlCorePureFunction = _dereq_('./type-utilities').createErlCorePureFunction;

createErlList = _dereq_('./type-utilities').createErlList;

createErlSymbol = _dereq_('./type-utilities').createErlSymbol;

extractJsValue = _dereq_('./type-utilities').extractJsValue;

fromArray = _dereq_('./linked-list').fromArray;

fromErlIndex = _dereq_('./index-utilities').fromErlIndex;

erlList_question_ = _dereq_('./type-utilities').erlList_question_;

_process = _dereq_('./_process');

toArray = _dereq_('./linked-list').toArray;

tokenizeAndParse = _dereq_('./tokenizeAndParse');

toPartialArray = _dereq_('./linked-list').toPartialArray;

getEnvironment = function(config) {
  var apply, call, environment, evalString, evalWithBareEnv, evalWithEnv, functionsOnErlValues, parse, _eval, _evalListHead;
  environment = config.environment;
  apply = function(erlArgs) {
    var erlArgList, erlFn, _ref;
    _ref = toArray(erlArgs), erlFn = _ref[0], erlArgList = _ref[1];
    return _eval(createErlList(erlFn, erlArgList));
  };
  call = function(erlArgs) {
    return _eval(erlArgs);
  };
  _eval = function(erlVal) {
    return _process_([environment])(erlVal);
  };
  _evalListHead = function(erlArgs) {
    return _eval(car(erlArgs));
  };
  evalString = function(erlArgs) {
    return (function(__i) {
      return _eval(tokenizeAndParse(stripQuotes(extractJsValue(car(__i)))));
    })(erlArgs);
  };
  evalWithBareEnv = function(erlArgs) {
    var expr, localEnv, _ref;
    _ref = toPartialArray(2, erlArgs), expr = _ref[0], localEnv = _ref[1];
    return _process_([fromErlIndex(localEnv)])(expr);
  };
  evalWithEnv = function(erlArgs) {
    var expr, localEnv, _ref;
    _ref = toPartialArray(2, erlArgs), expr = _ref[0], localEnv = _ref[1];
    return _process_([fromErlIndex(localEnv), environment])(expr);
  };
  parse = function(erlArgs) {
    return tokenizeAndParse(stripQuotes(extractJsValue(car(erlArgs))));
  };
  functionsOnErlValues = {
    parse: parse
  };
  setCoreFnsOnErlValues_bang_(environment, functionsOnErlValues);
  return environment;
};

setCoreFnsOnErlValues_bang_ = function(env, fns) {
  var fn, fnName, _results;
  _results = [];
  for (fnName in fns) {
    if (!__hasProp.call(fns, fnName)) continue;
    fn = fns[fnName];
    _results.push(env[fnName] = createErlCorePureFunction(fn));
  }
  return _results;
};

stripQuotes = function(jsString) {
  return jsString.slice(1, -1);
};

_process_ = _process(function(erlVal) {
  return erlVal;
});

module.exports = getEnvironment;


},{"./_process":3,"./index-utilities":12,"./linked-list":16,"./tokenizeAndParse":21,"./type-utilities":22}],10:[function(_dereq_,module,exports){
var addEnv, car, catch_asterisk_, cdr, circumpendQuotes, commentSignal, createErlIndex, createErlKeyword, createErlList, createErlMacro, createErlNumber, createErlString, createErlSymbol, createErlUserPureFunction, createFn, createLocalEnv, createMacro, def_bang_, defineNewValue, empty_question_, erlCoreEffectfulFunction_question_, erlCorePureFunction_question_, erlIgnore_question_, erlIndex_question_, erlKeyword_question_, erlList_question_, erlMacro_question_, erlNil, erlSymbol_question_, erlUserPureFunction_question_, evalQuasiquotedExpr, evaluate, expandMacro, expand_hyphen_macro, extractJsValue, filter, fn_asterisk_, forEach, fromArray, fromErlIndex, fromJsObjects, ignorable_question_, jsString_question_, keyword_question_, let_asterisk_, letrec_asterisk_, lookup, macro_asterisk_, map, next, quasiquote, quote, recurse, reduce, reduceBy2, reduceLet_asterisk_, reduceLetrec_asterisk_, reverse, setMainEnv, splat, spliceUnquote, spliceUnquote_question_, spliceUnquotedExpr_question_, toPartialArray, try_asterisk_, undef_bang_, undefineValue, unquote, unquote_question_, unquotedExpr_question_, unsetMainEnv, _do, _eval, _evalWithEnv, _evaluate, _getCurrentEnv, _getDefaultEnv, _if,
  __hasProp = {}.hasOwnProperty;

addEnv = _dereq_('./env-utilities').addEnv;

car = _dereq_('./linked-list').car;

catch_asterisk_ = _dereq_('./keyTokens').catch_asterisk_;

cdr = _dereq_('./linked-list').cdr;

circumpendQuotes = _dereq_('./js-utilities').circumpendQuotes;

commentSignal = _dereq_('./commentSignal');

createErlIndex = _dereq_('./type-utilities').createErlIndex;

createErlKeyword = _dereq_('./type-utilities').createErlKeyword;

createErlList = _dereq_('./type-utilities').createErlList;

createErlMacro = _dereq_('./type-utilities').createErlMacro;

createErlNumber = _dereq_('./type-utilities').createErlNumber;

createErlString = _dereq_('./type-utilities').createErlString;

createErlSymbol = _dereq_('./type-utilities').createErlSymbol;

createErlUserPureFunction = _dereq_('./type-utilities').createErlUserPureFunction;

def_bang_ = _dereq_('./keyTokens').def_bang_;

_do = _dereq_('./keyTokens')._do;

empty_question_ = _dereq_('./linked-list').empty_question_;

_eval = _dereq_('./keyTokens')._eval;

_evalWithEnv = _dereq_('./keyTokens')._evalWithEnv;

expand_hyphen_macro = _dereq_('./keyTokens').expand_hyphen_macro;

extractJsValue = _dereq_('./type-utilities').extractJsValue;

filter = _dereq_('./linked-list').filter;

fn_asterisk_ = _dereq_('./keyTokens').fn_asterisk_;

forEach = _dereq_('./linked-list').forEach;

fromArray = _dereq_('./linked-list').fromArray;

fromJsObjects = _dereq_('./index-utilities').fromJsObjects;

fromErlIndex = _dereq_('./index-utilities').fromErlIndex;

_getCurrentEnv = _dereq_('./keyTokens')._getCurrentEnv;

_getDefaultEnv = _dereq_('./keyTokens')._getDefaultEnv;

_if = _dereq_('./keyTokens')._if;

jsString_question_ = _dereq_('./js-utilities').jsString_question_;

keyword_question_ = _dereq_('./keyTokens').keyword_question_;

let_asterisk_ = _dereq_('./keyTokens').let_asterisk_;

letrec_asterisk_ = _dereq_('./keyTokens').letrec_asterisk_;

lookup = _dereq_('./env-utilities').lookup;

macro_asterisk_ = _dereq_('./keyTokens').macro_asterisk_;

erlCoreEffectfulFunction_question_ = _dereq_('./type-utilities').erlCoreEffectfulFunction_question_;

erlCorePureFunction_question_ = _dereq_('./type-utilities').erlCorePureFunction_question_;

erlIgnore_question_ = _dereq_('./type-utilities').erlIgnore_question_;

erlIndex_question_ = _dereq_('./type-utilities').erlIndex_question_;

erlKeyword_question_ = _dereq_('./type-utilities').erlKeyword_question_;

erlList_question_ = _dereq_('./type-utilities').erlList_question_;

erlMacro_question_ = _dereq_('./type-utilities').erlMacro_question_;

erlNil = _dereq_('./type-utilities').erlNil;

erlSymbol_question_ = _dereq_('./type-utilities').erlSymbol_question_;

erlUserPureFunction_question_ = _dereq_('./type-utilities').erlUserPureFunction_question_;

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

createFn = function(erlList, envs) {
  return createErlUserPureFunction({
    localEnvs: envs.slice(0),
    erlExpression: next(erlList),
    erlParameters: car(erlList)
  });
};

createLocalEnv = function(erlParams, erlArgs) {
  var env, jsParam;
  env = {};
  while (!empty_question_(erlParams)) {
    jsParam = extractJsValue(car(erlParams));
    if (jsParam === splat) {
      env[extractJsValue(next(erlParams))] = erlArgs;
      return env;
    } else {
      env[jsParam] = car(erlArgs);
      erlParams = cdr(erlParams);
      erlArgs = cdr(erlArgs);
    }
  }
  return env;
};

createMacro = function(erlList, envs) {
  return createErlMacro({
    localEnvs: envs.slice(0),
    erlExpression: next(erlList),
    erlParameters: car(erlList)
  });
};

defineNewValue = function(erlList, envs, addResult) {
  var erlValue, jsKey;
  jsKey = extractJsValue(car(erlList));
  erlValue = _evaluate(next(erlList), envs, addResult);
  return setMainEnv(envs, jsKey, erlValue);
};

evalQuasiquotedExpr = function(expr, envs, addResult) {
  var manageItem;
  if (!erlList_question_(expr)) {
    return expr;
  }
  manageItem = function(memo, item) {
    var _manageItem;
    switch (false) {
      case !unquotedExpr_question_(item):
        return createErlList(_evaluate(next(item), envs, addResult), memo);
      case !spliceUnquotedExpr_question_(item):
        _manageItem = function(_memo, _item) {
          return createErlList(_item, _memo);
        };
        return reduce(memo, _manageItem, _evaluate(next(item), envs, addResult));
      case !erlList_question_(item):
        return createErlList(evalQuasiquotedExpr(item, envs, addResult), memo);
      default:
        return createErlList(item, memo);
    }
  };
  return reverse(reduce(createErlList(), manageItem, expr));
};

_evaluate = function(erlExpr, envs, addResult) {
  var arg1, catchExpr, erlArgs, erlExpression, erlInvokable, erlParameters, erlSymbol, ex, fn, head, index, jsString, key, localEnvs, newEnv, newIndex, otherwise, remainingArgs, tailList, value, _catch, _ex, _ref, _ref1, _ref2;
  while (true) {
    switch (false) {
      case !erlSymbol_question_(erlExpr):
        jsString = extractJsValue(erlExpr);
        if (keyword_question_(jsString)) {
          return createErlKeyword(jsString);
        } else {
          return lookup(envs, jsString);
        }
        break;
      case !erlIndex_question_(erlExpr):
        index = extractJsValue(erlExpr);
        newIndex = {};
        for (key in index) {
          if (!__hasProp.call(index, key)) continue;
          value = index[key];
          newIndex[key] = _evaluate(index[key], envs, addResult);
        }
        return createErlIndex(newIndex);
      case !!(erlList_question_(erlExpr)):
        return erlExpr;
      default:
        erlExpr = filter((function(x) {
          return !(ignorable_question_(x, envs, addResult));
        }), erlExpr);
        _ref = toPartialArray(2, erlExpr), head = _ref[0], arg1 = _ref[1], remainingArgs = _ref[2];
        tailList = cdr(erlExpr);
        switch (extractJsValue(head)) {
          case def_bang_:
            return defineNewValue(tailList, envs, addResult);
          case undef_bang_:
            return undefineValue(tailList, envs);
          case _eval:
            erlExpr = _evaluate(arg1, envs, addResult);
            break;
          case _evalWithEnv:
            envs = [fromErlIndex(_evaluate(arg1, envs, addResult))];
            erlExpr = _evaluate(car(remainingArgs), envs, addResult);
            break;
          case let_asterisk_:
            erlExpr = car(remainingArgs);
            envs = addEnv(envs, reduceLet_asterisk_(envs, arg1, addResult));
            break;
          case letrec_asterisk_:
            erlExpr = car(remainingArgs);
            envs = addEnv(envs, reduceLetrec_asterisk_(envs, arg1, addResult));
            break;
          case _do:
            return forEach(evaluate(envs, addResult), tailList);
          case _getCurrentEnv:
            return fromJsObjects.apply(null, envs.reverse());
          case _getDefaultEnv:
            return fromJsObjects(envs[envs.length - 1]);
          case _if:
            erlExpr = extractJsValue(_evaluate(arg1, envs, addResult)) ? car(remainingArgs) : empty_question_(otherwise = next(remainingArgs)) ? erlNil : otherwise;
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
                  ex = createErlString(circumpendQuotes(ex.message));
                }
                newEnv = {};
                newEnv[extractJsValue(_ex)] = ex;
                return _evaluate(catchExpr, addEnv(envs, newEnv), addResult);
              }
            }
            break;
          default:
            erlSymbol = head;
            erlExpr = tailList;
            erlInvokable = _evaluate(erlSymbol, envs, addResult);
            switch (false) {
              case !erlKeyword_question_(erlInvokable):
                erlExpr = createErlList(erlInvokable, tailList);
                break;
              case !erlMacro_question_(erlInvokable):
                erlExpr = expandMacro(head, tailList, envs, addResult);
                break;
              case !erlCorePureFunction_question_(erlInvokable):
                fn = extractJsValue(erlInvokable);
                erlArgs = map(evaluate(envs, addResult), erlExpr);
                return fn(erlArgs);
              case !erlCoreEffectfulFunction_question_(erlInvokable):
                fn = extractJsValue(erlInvokable);
                erlArgs = map(evaluate(envs, addResult), erlExpr);
                addResult(fn(erlArgs));
                return erlNil;
              case !erlUserPureFunction_question_(erlInvokable):
                _ref2 = extractJsValue(erlInvokable), localEnvs = _ref2.localEnvs, erlExpression = _ref2.erlExpression, erlParameters = _ref2.erlParameters;
                erlArgs = map(evaluate(envs, addResult), erlExpr);
                erlExpr = erlExpression;
                newEnv = createLocalEnv(erlParameters, erlArgs);
                envs = addEnv(localEnvs, newEnv);
                break;
              default:
                throw "" + (extractJsValue(erlSymbol)) + " does not evaluate to a function, macro, or keyword.";
            }
        }
    }
  }
};

evaluate = function(envs, addResult) {
  return function(erlExpr) {
    if (erlExpr === commentSignal) {
      return commentSignal;
    }
    return _evaluate(erlExpr, envs, addResult);
  };
};

expandMacro = function(erlMacroSymbol, erlArgs, envs, addResult) {
  var erlExpression, erlMacro, erlParameters, localEnvs, newEnv, newEnvStack, _ref;
  erlMacro = _evaluate(erlMacroSymbol, envs, addResult);
  _ref = extractJsValue(erlMacro), localEnvs = _ref.localEnvs, erlExpression = _ref.erlExpression, erlParameters = _ref.erlParameters;
  newEnv = createLocalEnv(erlParameters, erlArgs);
  newEnvStack = addEnv(localEnvs, newEnv);
  return _evaluate(erlExpression, newEnvStack, addResult);
};

ignorable_question_ = function(erlVal, envs, addResult) {
  var jsString, symbol;
  return erlIgnore_question_(erlVal) || (erlList_question_(erlVal) && erlSymbol_question_(symbol = car(erlVal)) && (((jsString = extractJsValue(symbol)) === 'ignore!') || ((jsString === 'ignoreIfTrue') && (extractJsValue(_evaluate(next(erlVal), envs, addResult)))) || ((jsString === 'ignoreUnlessTrue') && !(extractJsValue(_evaluate(next(erlVal), envs, addResult))))));
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
  var envValue, jsKey, newEnv, _envs, _erlExpr;
  newEnv = {};
  _envs = addEnv(envs, newEnv);
  while (!empty_question_(list)) {
    jsKey = extractJsValue(list.value);
    list = recurse(list);
    _erlExpr = fromArray([createErlSymbol("fix*"), fromArray([createErlSymbol("fn*"), fromArray([jsKey]), list.value])]);
    envValue = _evaluate(_erlExpr, _envs, addResult);
    newEnv[jsKey] = envValue;
    list = recurse(list);
  }
  return newEnv;
};

spliceUnquote_question_ = function(erlValue) {
  return spliceUnquote === (extractJsValue(erlValue));
};

spliceUnquotedExpr_question_ = function(erlValue) {
  return erlList_question_(erlValue) && (spliceUnquote_question_(car(erlValue)));
};

undefineValue = function(erlList, envs) {
  var jsKey;
  jsKey = extractJsValue(car(erlList));
  return unsetMainEnv(envs, jsKey);
};

unquote_question_ = function(erlValue) {
  return unquote === (extractJsValue(erlValue));
};

unquotedExpr_question_ = function(erlValue) {
  return erlList_question_(erlValue) && (unquote_question_(car(erlValue)));
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
var createErlIndex, fromErlIndex, fromJsObjects, jsString_question_,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty;

createErlIndex = _dereq_('./type-utilities').createErlIndex;

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
  return createErlIndex(copy);
};

fromErlIndex = function(erlIndex) {
  var key, newKey, result, value, _ref;
  result = {};
  _ref = erlIndex.jsValue;
  for (key in _ref) {
    if (!__hasProp.call(_ref, key)) continue;
    value = _ref[key];
    if (jsString_question_(key)) {
      newKey = (function() {
        switch (key[0]) {
          case ':':
            return key.slice(1);
          case '"':
            return key.slice(1, -1);
          default:
            return key;
        }
      })();
      result[newKey] = value;
    } else {
      result[key] = value;
    }
  }
  return result;
};

module.exports = {
  fromJsObjects: fromJsObjects,
  fromErlIndex: fromErlIndex
};


},{"./js-utilities":14,"./type-utilities":22}],13:[function(_dereq_,module,exports){
var circumpendQuotes, createErlString, encapsulate, environment, error, flattenIfNecessary, fromArray, getLispEnvironment, interpret, serialize, standardFnsAndMacros, tokenizeAndParse, _createErlString, _interpret, _process, _serialize,
  __hasProp = {}.hasOwnProperty;

circumpendQuotes = _dereq_('./js-utilities').circumpendQuotes;

createErlString = _dereq_('./type-utilities').createErlString;

fromArray = _dereq_('./linked-list').fromArray;

getLispEnvironment = _dereq_('./getLispEnvironment');

_process = _dereq_('./_process');

_serialize = _dereq_('./serialize');

standardFnsAndMacros = _dereq_('./standard-fns-and-macros');

tokenizeAndParse = _dereq_('./tokenizeAndParse');

_createErlString = function(jsString) {
  return createErlString(circumpendQuotes(jsString));
};

encapsulate = function(type) {
  return function(erlValue) {
    return {
      effect: {
        type: type
      },
      value: erlValue
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
      '*ARGV*': fromArray(userJsArray.map(_createErlString))
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
var binaryGlyphTokens, catch_asterisk_, def_bang_, deref, derefGlyph, expand_hyphen_macro, fn_asterisk_, glyphTokens, ignore, ignoreIfTrue, ignoreIfTrueGlyph, ignoreUnlessTrue, ignoreUnlessTrueGlyph, ignore_bang_, ignore_bang_Glyph, indexEnd, indexStart, keyTokens, keyword_question_, keywords, let_asterisk_, letrec_asterisk_, listEnd, listStart, macroTokens, macro_asterisk_, nil, quasiquote, quasiquoteGlyph, quote, quoteGlyph, splat, spliceUnquote, spliceUnquoteGlyph, try_asterisk_, undef_bang_, unquote, unquoteGlyph, _do, _eval, _evalWithEnv, _false, _getCurrentEnv, _getDefaultEnv, _if, _process, _true,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

keyword_question_ = function(jsString) {
  return __indexOf.call(keywords, jsString) >= 0;
};

keyTokens = [deref = 'deref', derefGlyph = '@', catch_asterisk_ = 'catch*', def_bang_ = 'def!', _do = 'do', _eval = 'eval', _evalWithEnv = 'eval-with-env', expand_hyphen_macro = 'expand-macro', _false = 'false', fn_asterisk_ = 'fn*', _getCurrentEnv = '-get-current-env-', _getDefaultEnv = '-get-default-env-', _if = 'if', ignore_bang_ = 'ignore!', ignore_bang_Glyph = '#!', ignoreIfTrue = 'ignoreIfTrue', ignoreIfTrueGlyph = '#-', ignoreUnlessTrue = 'ignoreUnlessTrue', ignoreUnlessTrueGlyph = '#+', ignore = 'ignore', indexEnd = '}', indexStart = '{', let_asterisk_ = 'let*', letrec_asterisk_ = 'letrec*', listEnd = ')', listStart = '(', macro_asterisk_ = 'macro*', nil = 'nil', _process = '-process-', quasiquote = 'quasiquote', quasiquoteGlyph = '`', quote = 'quote', quoteGlyph = '\'', splat = '&', spliceUnquote = 'splice-unquote', spliceUnquoteGlyph = '~@', _true = 'true', try_asterisk_ = 'try*', undef_bang_ = 'undef!', unquote = 'unquote', unquoteGlyph = '~'];

keywords = [catch_asterisk_, def_bang_, _do, _eval, _evalWithEnv, expand_hyphen_macro, _false, fn_asterisk_, _getCurrentEnv, _getDefaultEnv, _if, ignore, let_asterisk_, letrec_asterisk_, macro_asterisk_, nil, _process, quasiquote, quote, spliceUnquote, _true, try_asterisk_, undef_bang_, unquote];

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
  _eval: _eval,
  _evalWithEnv: _evalWithEnv,
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
var EOL, car, cdr, concat, cons, copy, createErlList, createNode, drop, empty_question_, equal_question_, erlListType, erlTypes, filter, forEach, fromArray, last, lastTail, map, next, recurse, reduce, reduceBy2, reverse, take, toArray, toPartialArray, zip, _EOL,
  __slice = [].slice;

erlTypes = _dereq_('./types').erlTypes;

erlListType = erlTypes[6];

car = function(erlList) {
  if (empty_question_(erlList)) {
    return EOL;
  } else {
    return erlList.value;
  }
};

cdr = function(erlList) {
  if (empty_question_(erlList)) {
    return EOL;
  } else {
    return erlList.next;
  }
};

concat = function() {
  var erlList, erlLists, result, tail, _copy, _i, _len, _ref;
  erlLists = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  if (erlLists.length === 0) {
    return EOL;
  }
  result = copy(erlLists[0]);
  tail = lastTail(result);
  _ref = erlLists.slice(1);
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    erlList = _ref[_i];
    _copy = copy(erlList);
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

cons = function(erlArgs) {
  return createErlList(car(erlArgs), next(erlArgs));
};

copy = function(erlList) {
  return map((function(x) {
    return x;
  }), erlList);
};

createErlList = function(value, nextNode) {
  if (value == null) {
    return EOL;
  }
  return createNode(value, nextNode != null ? nextNode : EOL);
};

createNode = function(value, nextNode) {
  return {
    type: erlListType,
    value: value,
    next: nextNode
  };
};

drop = function(nbr, erlList) {
  while (nbr !== 0) {
    erlList = cdr(erlList);
    nbr = nbr - 1;
  }
  return erlList;
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
      return createErlList(value, list);
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

last = function(erlList) {
  return car(lastTail(erlList));
};

lastTail = function(erlList) {
  var current, prior;
  if (empty_question_(erlList)) {
    return erlList;
  }
  prior = erlList;
  current = cdr(erlList);
  while (!empty_question_(current)) {
    prior = cdr(prior);
    current = cdr(current);
  }
  return prior;
};

map = function(fn, list) {
  var _reduce;
  _reduce = function(list, value) {
    return createErlList(fn(value), list);
  };
  return reverse(reduce(EOL, _reduce, list));
};

next = function(erlList) {
  return car(cdr(erlList));
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
    result = createErlList(list.value, result);
    list = list.next;
  }
  return result;
};

take = function(nbr, erlList) {
  var node, result;
  result = createErlList();
  while (nbr !== 0) {
    node = car(erlList);
    erlList = cdr(erlList);
    result = createErlList(node, result);
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
    return createErlList(value, list);
  };
  return array.reverse().reduce(_reduce, createErlList());
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
  createErlList: createErlList,
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
var atomize, binaryGlyphIndex, binaryGlyphTokens, binaryGlyph_question_, boolean_question_, comment, createErlBoolean, createErlIdentifier, createErlIgnore, createErlIndex, createErlList, createErlNil, createErlNumber, createErlString, createErlSymbol, deref, derefGlyph, extractJsValue, float_question_, glyphIndex, glyphTokens, glyph_question_, identifer_question_, ignore, ignoreIfTrue, ignoreIfTrueGlyph, ignoreUnlessTrue, ignoreUnlessTrueGlyph, ignore_bang_, ignore_bang_Glyph, ignore_question_, indexEnd, indexStart, indexStart_question_, integer_question_, keyTokens, listEnd, listStart, listStart_question_, nil, nil_question_, parse, parseBinaryGlyph, parseBoolean, parseFloat10, parseGlyph, parseIndex, parseInt10, parseList, quasiquote, quasiquoteGlyph, quote, quoteGlyph, reverse, spliceUnquote, spliceUnquoteGlyph, startsWith_question_, string_question_, stripUnderscores, unquote, unquoteGlyph, _false, _parse, _true,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

binaryGlyphTokens = _dereq_('./keyTokens').binaryGlyphTokens;

comment = _dereq_('./commentSignal');

createErlBoolean = _dereq_('./type-utilities').createErlBoolean;

createErlIdentifier = _dereq_('./type-utilities').createErlIdentifier;

createErlIgnore = _dereq_('./type-utilities').createErlIgnore;

createErlIndex = _dereq_('./type-utilities').createErlIndex;

createErlList = _dereq_('./type-utilities').createErlList;

createErlNil = _dereq_('./type-utilities').createErlNil;

createErlNumber = _dereq_('./type-utilities').createErlNumber;

createErlString = _dereq_('./type-utilities').createErlString;

createErlSymbol = _dereq_('./type-utilities').createErlSymbol;

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
  var createErlValue;
  createErlValue = (function() {
    switch (false) {
      case !nil_question_(token):
        return createErlNil;
      case !ignore_question_(token):
        return createErlIgnore;
      case !boolean_question_(token):
        return function(__i) {
          return createErlBoolean(parseBoolean(__i));
        };
      case !string_question_(token):
        return createErlString;
      case !identifer_question_(token):
        return createErlIdentifier;
      case !integer_question_(token):
        return function(__i) {
          return createErlNumber(parseInt10(__i));
        };
      case !float_question_(token):
        return function(__i) {
          return createErlNumber(parseFloat10(__i));
        };
      default:
        return createErlSymbol;
    }
  })();
  return createErlValue(token);
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
  return createErlList(createErlSymbol(keyword), createErlList(parse(tokens), createErlList(parse(tokens))));
};

parseBoolean = function(token) {
  return token === _true;
};

parseFloat10 = function(token) {
  return parseFloat(stripUnderscores(token), 10);
};

parseGlyph = function(keyword, tokens) {
  return createErlList(createErlSymbol(keyword), createErlList(parse(tokens)));
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
  return createErlIndex(jsIndex);
};

parseInt10 = function(token) {
  return parseInt(stripUnderscores(token), 10);
};

parseList = function(tokens) {
  var erlList, token;
  erlList = createErlList();
  while ((token = tokens.shift()) !== listEnd) {
    erlList = createErlList(_parse(token, tokens), erlList);
  }
  return reverse(erlList);
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
var adjoinErlValue, commentSignal, coreEffectfulFunctionLabel, corePureFunctionLabel, erlAtom_question_, erlCoreEffectfulFunction_question_, erlCorePureFunction_question_, erlIdentifier_question_, erlIgnore_question_, erlIndex_question_, erlKeyword_question_, erlList_question_, erlMacro_question_, erlNil_question_, erlString_question_, erlUserPureFunction_question_, extractJsValue, ignoreLabel, indexEnd, indexStart, keywordLabel, listEnd, listStart, macroLabel, nilLabel, reduce, serialize, serializeAtom, serializeIdentifier, serializeIndex, serializeList, serializeString, stripQuotes, userPureFunctionLabel,
  __hasProp = {}.hasOwnProperty;

commentSignal = _dereq_('./commentSignal');

extractJsValue = _dereq_('./type-utilities').extractJsValue;

indexEnd = _dereq_('./keyTokens').indexEnd;

indexStart = _dereq_('./keyTokens').indexStart;

listEnd = _dereq_('./keyTokens').listEnd;

listStart = _dereq_('./keyTokens').listStart;

erlAtom_question_ = _dereq_('./type-utilities').erlAtom_question_;

erlCoreEffectfulFunction_question_ = _dereq_('./type-utilities').erlCoreEffectfulFunction_question_;

erlCorePureFunction_question_ = _dereq_('./type-utilities').erlCorePureFunction_question_;

erlIdentifier_question_ = _dereq_('./type-utilities').erlIdentifier_question_;

erlIgnore_question_ = _dereq_('./type-utilities').erlIgnore_question_;

erlIndex_question_ = _dereq_('./type-utilities').erlIndex_question_;

erlKeyword_question_ = _dereq_('./type-utilities').erlKeyword_question_;

erlList_question_ = _dereq_('./type-utilities').erlList_question_;

erlMacro_question_ = _dereq_('./type-utilities').erlMacro_question_;

erlNil_question_ = _dereq_('./type-utilities').erlNil_question_;

erlString_question_ = _dereq_('./type-utilities').erlString_question_;

erlUserPureFunction_question_ = _dereq_('./type-utilities').erlUserPureFunction_question_;

reduce = _dereq_('./linked-list').reduce;

adjoinErlValue = function(printReadably_question_) {
  return function(memo, erlValue) {
    var serialized;
    serialized = serialize(erlValue, printReadably_question_);
    if (memo.length === 0) {
      return serialized;
    } else {
      return "" + memo + " " + serialized;
    }
  };
};

serialize = function(erlExpr, printReadably_question_) {
  var _serialize;
  if (erlExpr === commentSignal) {
    return commentSignal;
  }
  _serialize = (function() {
    switch (false) {
      case !erlList_question_(erlExpr):
        return serializeList;
      case !erlIgnore_question_(erlExpr):
        return function(x) {
          return ignoreLabel;
        };
      case !erlIndex_question_(erlExpr):
        return serializeIndex;
      case !erlKeyword_question_(erlExpr):
        return function(x) {
          return keywordLabel;
        };
      case !erlCoreEffectfulFunction_question_(erlExpr):
        return function(x) {
          return coreEffectfulFunctionLabel;
        };
      case !erlCorePureFunction_question_(erlExpr):
        return function(x) {
          return corePureFunctionLabel;
        };
      case !erlUserPureFunction_question_(erlExpr):
        return function(x) {
          return userPureFunctionLabel;
        };
      case !erlMacro_question_(erlExpr):
        return function(x) {
          return macroLabel;
        };
      case !erlNil_question_(erlExpr):
        return function(x) {
          return nilLabel;
        };
      case !erlIdentifier_question_(erlExpr):
        return serializeIdentifier;
      case !erlString_question_(erlExpr):
        return serializeString;
      case !erlAtom_question_(erlExpr):
        return serializeAtom;
      case erlExpr.jsValue == null:
        return extractJsValue;
      default:
        return function(x) {
          return x;
        };
    }
  })();
  return _serialize(erlExpr, printReadably_question_);
};

serializeAtom = function(erlAtom, printReadably_question_) {
  return "(atom " + (serialize(erlAtom.erlValue, printReadably_question_)) + ")";
};

serializeIdentifier = function(erlString, printReadably_question_) {
  return extractJsValue(erlString);
};

serializeIndex = function(erlIndex, printReadably_question_) {
  var erlValue, jsIndex, key, memo;
  jsIndex = erlIndex.jsValue;
  memo = '';
  for (key in jsIndex) {
    if (!__hasProp.call(jsIndex, key)) continue;
    erlValue = jsIndex[key];
    memo = memo === '' ? "" + key + " " + (serialize(erlValue, printReadably_question_)) : "" + memo + ", " + key + " " + (serialize(erlValue, printReadably_question_));
  }
  return indexStart + memo + indexEnd;
};

serializeList = function(erlList, printReadably_question_) {
  var serializedList;
  serializedList = reduce("", adjoinErlValue(printReadably_question_), erlList);
  return listStart + serializedList + listEnd;
};

serializeString = function(erlString, printReadably_question_) {
  var jsString;
  jsString = stripQuotes(extractJsValue(erlString));
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
module.exports = "(do\n  (def! fix*\n    (fn* (f)\n      ( (fn* (x) (f (fn* (& ys) (apply (x x) ys))))\n        (fn* (x) (f (fn* (& ys) (apply (x x) ys)))))))\n\n  (def! memfix*\n    (fn* (f)\n      (let* (cache {})\n        (\n          (fn* (x cache)\n            (f\n              (fn* (z)\n                (if (contains? cache z)\n                  (get cache z)\n                  (let* (result ((fn* (y) ((x x cache) y)) z))\n                    (do (set! cache z result) result))))\n              cache))\n          (fn* (x cache)\n            (f\n              (fn* (z)\n                (if (contains? cache z)\n                  (get cache z)\n                  (let* (result ((fn* (y) ((x x cache) y)) z))\n                    (do (set! cache z result) result))))\n              cache))\n          cache))))\n\n  (def! _0 car)\n  (def! _1 (fn* (xs) (nth 1 xs)))\n  (def! _2 (fn* (xs) (nth 2 xs)))\n\n  (def! swap! (macro* (atom & xs)\n    (if (empty? xs)\n      atom\n      `(let* (-atom- ~atom)\n        (do\n          (reset! -atom- (~(car xs) (deref -atom-) ~@(cdr xs)))\n          (deref -atom-))))))\n\n  (def! *gensym-counter* (atom 0))\n\n  (def! gensym (fn* ()\n    (symbol (string \"G__\" (swap! *gensym-counter* incr)))))\n\n  (def! or (macro* (& xs)\n    (if (empty? xs)\n      false\n      (let* (-query- (gensym))\n        `(let* (~-query- ~(car xs))\n          (if ~-query- \n            ~-query-\n            (or ~@(cdr xs))))))))\n\n  (def! and (macro* (& xs)\n    (if (empty? xs)\n      true\n      (let* (-query- (gensym))\n        `(let* (~-query- ~(car xs))\n          (if ~-query-\n            (and ~@(cdr xs))\n            false))))))\n\n  (def! cond (macro* (& xs)\n    (if (empty? xs)\n      nil\n      (if (empty? (cdr xs))\n        (throw \"`cond` requires an even number of forms.\")\n        (let* (-query- (gensym))\n          `(let* (~-query- ~(car xs))\n            (if ~-query-\n              ~(_1 xs)\n              (cond ~@(cdr (cdr xs))))))))))\n\n  (def! loop (macro* (form0 form1)\n    `(let* (loop (memfix* (fn* (loop) (fn* (~(_0 form0)) ~form1)))) (loop ~(_1 form0)))))\n\n  (def! -> (macro* (& xs)\n    (if (empty? xs)\n      nil\n      (let* (x  (car xs)\n             xs (cdr xs))\n        (if (empty? xs)\n          x\n          (let* (form  (car xs)\n                forms  (cdr xs))\n            (if (empty? forms)\n              (if (list? form)\n                (if (= (symbol \"fn*\") (car form))\n                  `(~form ~x)\n                  `(~(car form) ~x ~@(cdr form)))\n                (list form x))\n              `(-> (-> ~x ~form) ~@forms))))))))\n\n  (def! ->> (macro* (& xs)\n    (if (empty? xs)\n      nil\n      (let* (x  (car xs)\n             xs (cdr xs))\n        (if (empty? xs)\n          x\n          (let* (form  (car xs)\n                 forms (cdr xs))\n            (if (empty? forms)\n              (if (list? form)\n                (if (= (symbol \"fn*\") (car form))\n                  `(~form ~x)\n                  `(~@form  ~x))\n                (list form x))\n              `(->> (->> ~x ~form) ~@forms))))))))\n\n  (def! ->* (macro* (& xs) `(fn* (-x-) (-> -x- ~@xs))))\n\n  (def! ->>* (macro* (& xs) `(fn* (-x-) (->> -x- ~@xs))))\n\n  (def! not (fn* (x) (if x false true)))\n  (def! incr  (->* (+ 1)))\n  (def! decr  (->* (- 1)))\n  (def! zero? (->* (= 0)))\n\n  (def! identity (fn* (x) x))\n\n  (def! constant-fn (fn* (x) (fn* (y) x)))\n\n  (def! call-on (fn* (& xs) (fn* (fn) (apply fn xs))))\n\n  (def! step-into-list (fn* (xs fn0 fn1)\n    (let* (x   (car xs)\n          -xs- (cdr xs))\n      (if (empty? -xs-)\n        (fn1 x)\n        (fn0 x -xs-)))))\n\n  (def! apply-on (fn* (& xs)\n    (step-into-list\n      xs\n      (fn* (arguments -xs-) (apply (car -xs-) arguments))\n      (fn* (arguments) (fn* (f) (apply f arguments))))))\n\n  (def! reduce (fn* (f seed xs)\n      (if (empty? xs)\n        seed\n        (reduce f (f seed (car xs)) (cdr xs)))))\n\n  (def! filter (fn* (predicate xs)\n    (reverse\n      (reduce\n        (fn* (memo x)\n          (if (predicate x)\n            (cons x memo)\n            memo))\n        '()\n        xs))))\n\n  (def! map (fn* (f xs)\n    (reverse (reduce (fn* (memo x) (cons (f x) memo)) '() xs))))\n\n  (def! every?  (fn* (pred xs)\n    (if (empty? xs)\n      true\n      (if (pred (car xs))\n        (every? pred (cdr xs))\n        false))))\n\n  (def! some?  (fn* (pred xs)\n    (if (empty? xs)\n      false\n      (if (pred (car xs))\n        true\n        (some? pred (cdr xs))))))\n\n  (def! letmemrec* (macro* (alias expr)\n    `(let* (~(car alias) (memfix* (fn* (~(car alias)) ~(_1 alias)))) ~expr)))\n\n  (def! skip (fn* (nbr xs)\n    (letrec* (-skip- (fn* (ys)\n      (let* (nbr (car ys)\n             xs  (_1 ys))\n        (cond\n          (= 0 nbr) xs\n          (= 1 nbr) (cdr xs)\n          \"default\" (-skip- (list (decr nbr) (cdr xs)))))))\n      (-skip- (list nbr xs)))))\n\n  (def! invokable? (fn* (x) (or (function? x) (macro? x))))\n\n  (def! . (macro* (x key & xs)\n    (if (empty? xs)\n      `(get ~x ~key)\n      `((get ~x ~key) ~@xs))))\n\n  (def! .. (fn* (lo hi)\n    (letrec* (-..- (fn* (xs)\n      (let* (lo     (_0 xs)\n             hi     (_1 xs)\n             -list- (_2 xs))\n        (if (= lo hi)\n          (cons hi -list-)\n          (-..- (list lo (decr hi) (cons hi -list-)))))))\n      (-..- (list lo hi '())))))\n\n  (def! defrec! (macro* (fn-name fn-body)\n    `(def! ~fn-name (letrec* (~fn-name ~fn-body) ~fn-name))))\n\n  (def! for* (macro* (loop-parameters body)\n    `(loop\n      ~(_0 loop-parameters)\n      (if ~(_1 loop-parameters)\n        (do ~body (loop ~(_2 loop-parameters)))\n        nil))))\n\n  (def! for-each (fn* (f xs)\n    (reduce\n      (fn* (memo x) (do (f x) memo))\n      nil\n      xs)))\n\n  (def! n-times (fn* (n f)\n    (loop (i 0)\n      (if (= i n)\n        nil\n        (do (f i) (loop (+ i 1)))))))\n\n  (def! tap (fn* (f x) (do (f x) x)))\n\n  (def! with-side-effect (fn* (thunk x)\n    (do (thunk) x)))\n\n  (def! thunk (macro* (form)\n    `(fn* () ~form)))\n\n  (def! call (macro* (f & xs) `(~f ~@xs)))\n\n  (def! apply (macro* (f xs) `(eval (cons ~f ~xs))))\n\n  (def! eval-string (fn* (erlString) (eval (parse erlString))))\n\n)";


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
var createErlAtom, createErlBoolean, createErlCoreEffectfulFunction, createErlCorePureFunction, createErlIdentifier, createErlIgnore, createErlIndex, createErlKeyword, createErlList, createErlMacro, createErlNil, createErlNumber, createErlSpecialForm, createErlString, createErlSymbol, createErlUserPureFunction, createErlValue, createPredicate, create_hyphen_factory_hyphen__ampersand__hyphen_predicate, erlAtomType, erlAtom_question_, erlBoolean_question_, erlCoreEffectfulFunction_question_, erlCorePureFunction_question_, erlFalse, erlFalse_question_, erlIdentifier_question_, erlIgnore, erlIgnore_question_, erlIndex_question_, erlKeyword_question_, erlList_question_, erlMacro_question_, erlNil, erlNil_question_, erlNumber_question_, erlSpecialForm_question_, erlString_question_, erlSymbol_question_, erlTrue, erlTrue_question_, erlTypes, erlUserPureFunction_question_, extractJsValue, _createErlAtom, _createErlBoolean, _createErlList, _createErlUnit, _erlUnit_question_, _ref, _ref1, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _ref16, _ref17, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;

createErlList = _dereq_('./linked-list').createErlList;

erlAtomType = _dereq_('./types').erlAtomType;

erlTypes = _dereq_('./types').erlTypes;

create_hyphen_factory_hyphen__ampersand__hyphen_predicate = function(erlType) {
  var factory, predicate;
  factory = function(jsValue) {
    return createErlValue(jsValue, erlType);
  };
  predicate = function(erlValue) {
    return erlValue.type === erlType;
  };
  return [factory, predicate];
};

createErlAtom = function(erlValue) {
  return {
    erlValue: erlValue,
    type: erlAtomType
  };
};

createErlBoolean = function(jsBoolean) {
  if (jsBoolean) {
    return erlTrue;
  } else {
    return erlFalse;
  }
};

createErlIgnore = function() {
  return erlIgnore;
};

createErlNil = function() {
  return erlNil;
};

createErlValue = function(jsValue, erlType) {
  return {
    jsValue: jsValue,
    type: erlType
  };
};

createPredicate = function(constant) {
  return function(value) {
    return value === constant;
  };
};

extractJsValue = function(erlValue) {
  return erlValue.jsValue;
};

_ref = erlTypes.map(create_hyphen_factory_hyphen__ampersand__hyphen_predicate), (_ref1 = _ref[0], _createErlBoolean = _ref1[0], erlBoolean_question_ = _ref1[1]), (_ref2 = _ref[1], createErlCoreEffectfulFunction = _ref2[0], erlCoreEffectfulFunction_question_ = _ref2[1]), (_ref3 = _ref[2], createErlCorePureFunction = _ref3[0], erlCorePureFunction_question_ = _ref3[1]), (_ref4 = _ref[3], createErlIdentifier = _ref4[0], erlIdentifier_question_ = _ref4[1]), (_ref5 = _ref[4], createErlIndex = _ref5[0], erlIndex_question_ = _ref5[1]), (_ref6 = _ref[5], createErlKeyword = _ref6[0], erlKeyword_question_ = _ref6[1]), (_ref7 = _ref[6], _createErlList = _ref7[0], erlList_question_ = _ref7[1]), (_ref8 = _ref[7], createErlMacro = _ref8[0], erlMacro_question_ = _ref8[1]), (_ref9 = _ref[8], createErlNumber = _ref9[0], erlNumber_question_ = _ref9[1]), (_ref10 = _ref[9], createErlSpecialForm = _ref10[0], erlSpecialForm_question_ = _ref10[1]), (_ref11 = _ref[10], createErlString = _ref11[0], erlString_question_ = _ref11[1]), (_ref12 = _ref[11], createErlSymbol = _ref12[0], erlSymbol_question_ = _ref12[1]), (_ref13 = _ref[12], _createErlUnit = _ref13[0], _erlUnit_question_ = _ref13[1]), (_ref14 = _ref[13], createErlUserPureFunction = _ref14[0], erlUserPureFunction_question_ = _ref14[1]), (_ref15 = _ref[14], _createErlAtom = _ref15[0], erlAtom_question_ = _ref15[1]);

erlIgnore = _createErlUnit(null);

erlNil = _createErlUnit(null);

_ref16 = [false, true].map(_createErlBoolean), erlFalse = _ref16[0], erlTrue = _ref16[1];

_ref17 = [erlFalse, erlIgnore, erlNil, erlTrue].map(createPredicate), erlFalse_question_ = _ref17[0], erlIgnore_question_ = _ref17[1], erlNil_question_ = _ref17[2], erlTrue_question_ = _ref17[3];

module.exports = {
  createErlAtom: createErlAtom,
  createErlBoolean: createErlBoolean,
  createErlCoreEffectfulFunction: createErlCoreEffectfulFunction,
  createErlCorePureFunction: createErlCorePureFunction,
  createErlIdentifier: createErlIdentifier,
  createErlIgnore: createErlIgnore,
  createErlIndex: createErlIndex,
  createErlKeyword: createErlKeyword,
  createErlList: createErlList,
  createErlMacro: createErlMacro,
  createErlNil: createErlNil,
  createErlNumber: createErlNumber,
  createErlSpecialForm: createErlSpecialForm,
  createErlString: createErlString,
  createErlSymbol: createErlSymbol,
  createErlUserPureFunction: createErlUserPureFunction,
  extractJsValue: extractJsValue,
  erlAtom_question_: erlAtom_question_,
  erlBoolean_question_: erlBoolean_question_,
  erlCoreEffectfulFunction_question_: erlCoreEffectfulFunction_question_,
  erlCorePureFunction_question_: erlCorePureFunction_question_,
  erlFalse: erlFalse,
  erlFalse_question_: erlFalse_question_,
  erlIdentifier_question_: erlIdentifier_question_,
  erlIgnore: erlIgnore,
  erlIgnore_question_: erlIgnore_question_,
  erlIndex_question_: erlIndex_question_,
  erlKeyword_question_: erlKeyword_question_,
  erlList_question_: erlList_question_,
  erlMacro_question_: erlMacro_question_,
  erlNil: erlNil,
  erlNil_question_: erlNil_question_,
  erlNumber_question_: erlNumber_question_,
  erlSpecialForm_question_: erlSpecialForm_question_,
  erlString_question_: erlString_question_,
  erlSymbol_question_: erlSymbol_question_,
  erlTrue: erlTrue,
  erlTrue_question_: erlTrue_question_,
  erlUserPureFunction_question_: erlUserPureFunction_question_
};


},{"./linked-list":16,"./types":23}],23:[function(_dereq_,module,exports){
var erlAtomType, erlBooleanType, erlCoreEffectfulFunctionType, erlCorePureFunctionType, erlIdentifierType, erlIndexType, erlKeywordType, erlListType, erlMacroType, erlNumberType, erlSpecialFormType, erlStringType, erlSymbolType, erlTypes, erlUnitType, erlUserPureFunctionType;

erlTypes = [erlBooleanType = 'erlBooleanType', erlCoreEffectfulFunctionType = 'erlCoreEffectfulFunctionType', erlCorePureFunctionType = 'erlCorePureFunctionType', erlIdentifierType = 'erlIdentifierType', erlIndexType = 'erlIndexType', erlKeywordType = 'erlKeywordType', erlListType = 'erlListType', erlMacroType = 'erlMacroType', erlNumberType = 'erlNumberType', erlSpecialFormType = 'erlSpecialFormType', erlStringType = 'erlStringType', erlSymbolType = 'erlSymbolType', erlUnitType = 'erlUnitType', erlUserPureFunctionType = 'erlUserPureFunctionType', erlAtomType = 'erlAtomType'];

module.exports = {
  erlAtomType: erlAtomType,
  erlBooleanType: erlBooleanType,
  erlCoreEffectfulFunctionType: erlCoreEffectfulFunctionType,
  erlCorePureFunctionType: erlCorePureFunctionType,
  erlIdentifierType: erlIdentifierType,
  erlIndexType: erlIndexType,
  erlKeywordType: erlKeywordType,
  erlListType: erlListType,
  erlMacroType: erlMacroType,
  erlNumberType: erlNumberType,
  erlSpecialFormType: erlSpecialFormType,
  erlStringType: erlStringType,
  erlSymbolType: erlSymbolType,
  erlTypes: erlTypes,
  erlUnitType: erlUnitType,
  erlUserPureFunctionType: erlUserPureFunctionType
};


},{}]},{},[13])(13)
});