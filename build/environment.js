var car, cdr, circumpendQuotes, concat, createMalAtom, createMalBoolean, createMalCoreEffectfulFunction, createMalCorePureFunction, createMalIdentifier, createMalIgnore, createMalIndex, createMalList, createMalNumber, createMalString, createMalSymbol, drop, empty_question_, equal_question_, evaluate, extractJsValue, fromArray, fromJsObject, fromMalIndex, getEnvironment, interpret, jsNaN_question_, jsNumber_question_, jsString_question_, last, malAtom_question_, malBoolean_question_, malCoreEffectfulFunction_question_, malCorePureFunction_question_, malFalse, malFalse_question_, malIgnore, malIndex_question_, malList_question_, malMacro_question_, malNil, malNil_question_, malNumber_question_, malString_question_, malSymbol_question_, malTrue, malTrue_question_, malUserEffectfulFunction_question_, malUserPureFunction_question_, next, recurse, reduce, reverse, serialize, take, toArray, toPartialArray, _process_,
  __hasProp = {}.hasOwnProperty,
  __slice = [].slice;

car = require('./linked-list').car;

cdr = require('./linked-list').cdr;

circumpendQuotes = require('./js-utilities').circumpendQuotes;

concat = require('./linked-list').concat;

createMalAtom = require('./mal-type-utilities').createMalAtom;

createMalBoolean = require('./mal-type-utilities').createMalBoolean;

createMalCoreEffectfulFunction = require('./mal-type-utilities').createMalCoreEffectfulFunction;

createMalCorePureFunction = require('./mal-type-utilities').createMalCorePureFunction;

createMalIdentifier = require('./mal-type-utilities').createMalIdentifier;

createMalIgnore = require('./mal-type-utilities').createMalIgnore;

createMalIndex = require('./mal-type-utilities').createMalIndex;

createMalList = require('./mal-type-utilities').createMalList;

createMalNumber = require('./mal-type-utilities').createMalNumber;

createMalString = require('./mal-type-utilities').createMalString;

createMalSymbol = require('./mal-type-utilities').createMalSymbol;

drop = require('./linked-list').drop;

empty_question_ = require('./linked-list').empty_question_;

equal_question_ = require('./linked-list').equal_question_;

evaluate = require('./evaluate').evaluate;

extractJsValue = require('./mal-type-utilities').extractJsValue;

fromArray = require('./linked-list').fromArray;

fromJsObject = require('./index-utilities').fromJsObject;

fromMalIndex = require('./index-utilities').fromMalIndex;

interpret = require('./interpret');

jsNaN_question_ = require('./js-utilities').jsNaN_question_;

jsNumber_question_ = require('./js-utilities').jsNumber_question_;

jsString_question_ = require('./js-utilities').jsString_question_;

last = require('./linked-list').last;

malAtom_question_ = require('./mal-type-utilities').malAtom_question_;

malCoreEffectfulFunction_question_ = require('./mal-type-utilities').malCoreEffectfulFunction_question_;

malCorePureFunction_question_ = require('./mal-type-utilities').malCorePureFunction_question_;

malBoolean_question_ = require('./mal-type-utilities').malBoolean_question_;

malFalse = require('./mal-type-utilities').malFalse;

malFalse_question_ = require('./mal-type-utilities').malFalse_question_;

malIgnore = require('./mal-type-utilities').malIgnore;

malIndex_question_ = require('./mal-type-utilities').malIndex_question_;

malList_question_ = require('./mal-type-utilities').malList_question_;

malMacro_question_ = require('./mal-type-utilities').malMacro_question_;

malNil = require('./mal-type-utilities').malNil;

malNil_question_ = require('./mal-type-utilities').malNil_question_;

malNumber_question_ = require('./mal-type-utilities').malNumber_question_;

malString_question_ = require('./mal-type-utilities').malString_question_;

malSymbol_question_ = require('./mal-type-utilities').malSymbol_question_;

malTrue = require('./mal-type-utilities').malTrue;

malTrue_question_ = require('./mal-type-utilities').malTrue_question_;

malUserEffectfulFunction_question_ = require('./mal-type-utilities').malUserEffectfulFunction_question_;

malUserPureFunction_question_ = require('./mal-type-utilities').malUserPureFunction_question_;

next = require('./linked-list').next;

_process_ = require('./process');

recurse = require('./linked-list').recurse;

reduce = require('./linked-list').reduce;

reverse = require('./linked-list').reverse;

serialize = require('./serialize');

take = require('./linked-list').take;

toArray = require('./linked-list').toArray;

toPartialArray = require('./linked-list').toPartialArray;

getEnvironment = function(display) {
  var add, append, apply, areEqual, assoc, atom, atom_question_, boolean_question_, call, cons, contains_question_, coreFn_question_, count, createPredicate, deref, displayEffectsOnMalValues, dissoc, divide, environment, evalWithBareEnv, evalWithEnv, exponentiate, false_question_, first, fix, function_question_, functionsOnJsValues, functionsOnMalValues, get, greaterThan, greaterThanOrEqual, ignoreIfTrue, ignoreUnlessTrue, ignore_bang_, keys, lessThan, lessThanOrEqual, lift, list, list_question_, load, loadWithBareEnv, loadWithEnv, macro_question_, malReduce, map, meta, mod, multiply, negate, nil_question_, nth, number_question_, parseNumber, prStr, prepend, read, reset, rest, set, setCoreEffectfulFnsOnMalValues_bang_, setCoreFnsOnJsValues_bang_, setCoreFnsOnMalValues_bang_, setMalValue, slurp, str, string_question_, stripQuotes, subtract, symbol, symbol_question_, time_hyphen_ms, true_question_, typeOf, userFn_question_, vals, withMeta, write, __evaluate__, __evaluate__2, _car, _cdr, _concat, _drop, _empty_question_, _environment_, _evaluate, _evaluateString, _evaluate_, _index, _interpret, _last, _length, _not, _prStr, _quit_, _read, _ref, _reverse, _take, _throw;
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
  _index = function() {
    var args, i, index, k, _i, _len;
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
  _length = function(jsVal) {
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
    'index': _index,
    'keys': keys,
    'length': _length,
    '<': lessThan,
    '<=': lessThanOrEqual,
    '%': mod,
    '*': multiply,
    'negate': negate,
    'parse-number': parseNumber,
    '-': subtract,
    'vals': vals
  };
  createPredicate = function(pred) {
    return function(jsList) {
      var malValue;
      malValue = jsList.value;
      return createMalBoolean(pred(malValue));
    };
  };
  __evaluate__ = function(malVal) {
    return evaluate([environment])(malVal);
  };
  __evaluate__2 = function(malVal) {
    return __evaluate__(__evaluate__(malVal));
  };
  _evaluate_ = function(jsString) {
    return _process_([environment])(jsString);
  };
  _evaluateString = function(malArgs) {
    return _evaluate_(stripQuotes(extractJsValue(car(malArgs))));
  };
  _evaluate = function(malArgs) {
    return evaluate([environment])(car(malArgs));
  };
  _prStr = function(malArgs, printReadably_question_) {
    return (toArray(malArgs)).map(function(malArg) {
      return serialize(malArg, printReadably_question_);
    });
  };
  prStr = function(malArgs) {
    return createMalString('"' + (_prStr(malArgs, true)).join('') + '"');
  };
  str = function(malArgs) {
    return createMalString('"' + (_prStr(malArgs, false)).join('') + '"');
  };
  _read = function(malArgs) {
    var jsFileName;
    jsFileName = stripQuotes(extractJsValue(car(malArgs)));
    return require('fs').readFileSync(jsFileName).toString();
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
  setMalValue = function(malAtom, malValue) {
    malAtom.malValue = malValue;
    return malAtom;
  };
  stripQuotes = function(jsString) {
    return jsString.slice(1, -1);
  };
  append = function(malArgs) {
    var malList, malValues, _ref;
    _ref = toArray(malArgs), malList = _ref[0], malValues = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
    return concat(malList, fromArray(malValues));
  };
  apply = function(malArgs) {
    var malArgList, malFn, _ref;
    _ref = toArray(malArgs), malFn = _ref[0], malArgList = _ref[1];
    return evaluate([])(createMalList(malFn, malArgList));
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
  call = function(malArgs) {
    return evaluate([])(malArgs);
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
  evalWithBareEnv = function(malArgs) {
    var expr, localEnv, _ref;
    _ref = toPartialArray(2, malArgs), expr = _ref[0], localEnv = _ref[1];
    return evaluate([fromMalIndex(localEnv)])(expr);
  };
  evalWithEnv = function(malArgs) {
    var expr, localEnv, _ref;
    _ref = toPartialArray(2, malArgs), expr = _ref[0], localEnv = _ref[1];
    return evaluate([fromMalIndex(localEnv), environment])(expr);
  };
  first = function(malArgs) {
    return car(car(malArgs));
  };
  fix = function(malArgs) {
    var jsFnX, malFnF, malFnX;
    malFnF = car(malArgs);
    jsFnX = function(malArgs1) {
      var jsFnY, malFnX, malFnY;
      malFnX = car(malArgs1);
      jsFnY = function(malArgs2) {
        var malValY;
        malValY = car(malArgs2);
        return __evaluate__2(createMalList(createMalList(malFnX, createMalList(malFnX)), createMalList(malValY)));
      };
      malFnY = createMalCorePureFunction(jsFnY);
      return __evaluate__2(createMalList(malFnF, createMalList(malFnY)));
    };
    malFnX = createMalCorePureFunction(jsFnX);
    return __evaluate__2(createMalList(malFnX, createMalList(malFnX)));
  };
  function_question_ = function(jsList) {
    var malValue;
    malValue = jsList.value;
    return createMalBoolean(malCorePureFunction_question_(malValue) || malUserPureFunction_question_(malValue));
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
  load = function(malArgs) {
    return _evaluate_(_read(malArgs));
  };
  loadWithBareEnv = function(malArgs) {
    var file, jsFileName, localEnv, malFileName, _ref;
    _ref = toPartialArray(2, malArgs), malFileName = _ref[0], localEnv = _ref[1];
    jsFileName = stripQuotes(extractJsValue(malFileName));
    file = require('fs').readFileSync(jsFileName).toString();
    return _process_([fromMalIndex(localEnv)])(file);
  };
  loadWithEnv = function(malArgs) {
    var file, jsFileName, localEnv, malFileName, _ref;
    _ref = toPartialArray(2, malArgs), malFileName = _ref[0], localEnv = _ref[1];
    jsFileName = stripQuotes(extractJsValue(malFileName));
    file = require('fs').readFileSync(jsFileName, 'utf-8').toString();
    return _process_([fromMalIndex(localEnv), environment])(file);
  };
  malReduce = function(malArgs) {
    var malArgList, malFn, malSeed, _malArgs, _reduce, _ref;
    _ref = toArray(malArgs), malSeed = _ref[0], malFn = _ref[1], malArgList = _ref[2];
    _malArgs = toArray(malArgList);
    _reduce = function(memo, item) {
      var _memo;
      _memo = malList_question_(memo) ? createMalList(createMalSymbol('quote'), createMalList(memo)) : memo;
      return evaluate([])(createMalList(malFn, createMalList(_memo, createMalList(item))));
    };
    return _malArgs.reduce(_reduce, malSeed);
  };
  map = function(malArgs) {
    var malArgList, malFn, results, __malArgs, _malArgs, _ref;
    _ref = toArray(malArgs), malFn = _ref[0], malArgList = _ref[1];
    _malArgs = toArray(malArgList);
    __malArgs = _malArgs.map(function(x) {
      return createMalList(malFn, createMalList(x));
    });
    results = __malArgs.map(evaluate([]));
    return fromArray(results);
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
  _quit_ = function() {
    return process.exit(0);
  };
  read = function(jsList) {
    return createMalString(_read(jsList));
  };
  reset = function(malArgs) {
    var value, _ref;
    _ref = toPartialArray(2, malArgs), atom = _ref[0], value = _ref[1];
    return setMalValue(atom, value);
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
  slurp = function(malArgs) {
    var jsFileName;
    jsFileName = stripQuotes(extractJsValue(car(malArgs)));
    return createMalString(circumpendQuotes(require('fs').readFileSync(jsFileName).toString()));
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
    'apply': apply,
    'atom': atom,
    'atom?': atom_question_,
    'boolean?': boolean_question_,
    'car': _car,
    'call': call,
    'cdr': _cdr,
    'cons': cons,
    'concat': _concat,
    'core-fn?': coreFn_question_,
    'count': count,
    'deref': deref,
    'drop': _drop,
    'empty?': _empty_question_,
    'eval': _evaluate,
    'evalStr': _evaluateString,
    'eval-with-env': evalWithEnv,
    'eval-with-bare-env': evalWithBareEnv,
    'first': _car,
    'false?': false_question_,
    'fix': fix,
    'function?': function_question_,
    'ignore!': ignore_bang_,
    'ignoreIfTrue': ignoreIfTrue,
    'ignoreUnlessTrue': ignoreUnlessTrue,
    'last': _last,
    'list': list,
    'list?': list_question_,
    'load': load,
    'load-with-env': loadWithEnv,
    'load-with-bare-env': loadWithBareEnv,
    'macro?': macro_question_,
    'map': map,
    'meta': meta,
    'nil?': nil_question_,
    'not': _not,
    'nth': nth,
    'number?': number_question_,
    'parse': _interpret,
    'prepend': prepend,
    'pr-str': prStr,
    '-quit-': _quit_,
    'read': read,
    'reduce': malReduce,
    'reset!': reset,
    'rest': _cdr,
    'reverse': _reverse,
    'set!': set,
    'slurp': slurp,
    'str': str,
    'string?': string_question_,
    'symbol': symbol,
    'symbol?': symbol_question_,
    'take': _take,
    'throw': _throw,
    'time-ms': time_hyphen_ms,
    'true?': true_question_,
    'typeof': typeOf,
    'user-fn?': userFn_question_,
    'with-meta': withMeta,
    'write': write
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
      return _prStr(malArgs, true).join('');
    },
    'println': function(malArgs) {
      return _prStr(malArgs, false).join('');
    }
  };
  environment = {};
  setCoreFnsOnJsValues_bang_(environment, functionsOnJsValues);
  setCoreFnsOnMalValues_bang_(environment, functionsOnMalValues);
  setCoreEffectfulFnsOnMalValues_bang_(display)(environment, displayEffectsOnMalValues);
  environment['*ARGV*'] = createMalList();
  _environment_ = fromJsObject(environment);
  environment['*DEFAULT-ENV*'] = _environment_;
  return environment;
};

module.exports = getEnvironment;
