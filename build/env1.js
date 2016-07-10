var append, areEqual, assoc, atom, atom_question_, boolean_question_, car, cdr, circumpendQuotes, concat, cons, coreFn_question_, count, createMalAtom, createMalBoolean, createMalCorePureFunction, createMalIndex, createMalList, createMalNumber, createMalString, createMalSymbol, createPredicate, deref, drop, empty_question_, equal_question_, extractJsValue, false_question_, first, fromArray, function_question_, functionsOnMalValues, getEnvironment, ignoreIfTrue, ignoreUnlessTrue, ignore_bang_, interpret, last, list, list_question_, macro_question_, malAtom_question_, malBoolean_question_, malCorePureFunction_question_, malFalse, malFalse_question_, malIgnore, malIndex_question_, malList_question_, malMacro_question_, malNil, malNil_question_, malNumber_question_, malString_question_, malSymbol_question_, malTrue, malTrue_question_, malUserPureFunction_question_, meta, next, nil_question_, nth, number_question_, prepend, prettyString, read, recurse, reduce, reset, rest, reverse, serialize, set, setCoreFnsOnMalValues_bang_, slurp, string, string_question_, stripQuotes, symbol, symbol_question_, take, time_hyphen_ms, toArray, toPartialArray, true_question_, typeOf, userFn_question_, withMeta, write, _car, _cdr, _concat, _drop, _empty_question_, _interpret, _last, _not, _prStr, _quit_, _ref, _reverse, _take, _throw,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty;

car = require('./linked-list').car;

cdr = require('./linked-list').cdr;

circumpendQuotes = require('./js-utilities').circumpendQuotes;

concat = require('./linked-list').concat;

createMalAtom = require('./type-utilities').createMalAtom;

createMalBoolean = require('./type-utilities').createMalBoolean;

createMalCorePureFunction = require('./type-utilities').createMalCorePureFunction;

createMalIndex = require('./type-utilities').createMalIndex;

createMalList = require('./type-utilities').createMalList;

createMalNumber = require('./type-utilities').createMalNumber;

createMalString = require('./type-utilities').createMalString;

createMalSymbol = require('./type-utilities').createMalSymbol;

drop = require('./linked-list').drop;

empty_question_ = require('./linked-list').empty_question_;

equal_question_ = require('./linked-list').equal_question_;

extractJsValue = require('./type-utilities').extractJsValue;

fromArray = require('./linked-list').fromArray;

interpret = require('./interpret');

last = require('./linked-list').last;

malAtom_question_ = require('./type-utilities').malAtom_question_;

malCorePureFunction_question_ = require('./type-utilities').malCorePureFunction_question_;

malBoolean_question_ = require('./type-utilities').malBoolean_question_;

malFalse = require('./type-utilities').malFalse;

malFalse_question_ = require('./type-utilities').malFalse_question_;

malIgnore = require('./type-utilities').malIgnore;

malIndex_question_ = require('./type-utilities').malIndex_question_;

malList_question_ = require('./type-utilities').malList_question_;

malMacro_question_ = require('./type-utilities').malMacro_question_;

malNil = require('./type-utilities').malNil;

malNil_question_ = require('./type-utilities').malNil_question_;

malNumber_question_ = require('./type-utilities').malNumber_question_;

malString_question_ = require('./type-utilities').malString_question_;

malSymbol_question_ = require('./type-utilities').malSymbol_question_;

malTrue = require('./type-utilities').malTrue;

malTrue_question_ = require('./type-utilities').malTrue_question_;

malUserPureFunction_question_ = require('./type-utilities').malUserPureFunction_question_;

next = require('./linked-list').next;

recurse = require('./linked-list').recurse;

reduce = require('./linked-list').reduce;

reverse = require('./linked-list').reverse;

serialize = require('./serialize');

take = require('./linked-list').take;

toArray = require('./linked-list').toArray;

toPartialArray = require('./linked-list').toPartialArray;

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

assoc = function(malArgs) {
  var args, copy, jsIndex, k, key, v, value;
  jsIndex = extractJsValue(car(malArgs));
  args = cdr(malArgs);
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
  return createMalIndex(copy);
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
  return ((toArray(malArgs)).map(function(malArg) {
    return serialize(malArg, printReadably_question_);
  })).join('');
};

prettyString = function(malArgs) {
  return createMalString(circumpendQuotes(_prStr(malArgs, true)));
};

_quit_ = function() {
  return process.exit(0);
};

read = function(jsList) {
  var _read;
  _read = function(malArgs) {
    var jsFileName;
    jsFileName = stripQuotes(extractJsValue(car(malArgs)));
    return require('fs').readFileSync(jsFileName).toString();
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
  return createMalString(circumpendQuotes(require('fs').readFileSync(jsFileName).toString()));
};

string = function(malArgs) {
  return createMalString(circumpendQuotes(_prStr(malArgs, false)));
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
