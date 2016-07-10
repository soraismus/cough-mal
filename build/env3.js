var car, createMalCorePureFunction, createMalList, createMalSymbol, extractJsValue, fromArray, fromMalIndex, getEnvironment, malList_question_, setCoreFnsOnMalValues_bang_, stripQuotes, toArray, toPartialArray, tokenizeAndParse, _process, _process_,
  __hasProp = {}.hasOwnProperty;

car = require('./linked-list').car;

createMalCorePureFunction = require('./type-utilities').createMalCorePureFunction;

createMalList = require('./type-utilities').createMalList;

createMalSymbol = require('./type-utilities').createMalSymbol;

extractJsValue = require('./type-utilities').extractJsValue;

fromArray = require('./linked-list').fromArray;

fromMalIndex = require('./index-utilities').fromMalIndex;

malList_question_ = require('./type-utilities').malList_question_;

_process = require('./_process');

toArray = require('./linked-list').toArray;

tokenizeAndParse = require('./tokenizeAndParse');

toPartialArray = require('./linked-list').toPartialArray;

getEnvironment = function(config) {
  var apply, call, environment, evalString, evalWithBareEnv, evalWithEnv, functionsOnMalValues, parse, _eval, _evalListHead;
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
  parse = function(malArgs) {
    return tokenizeAndParse(stripQuotes(extractJsValue(car(malArgs))));
  };
  functionsOnMalValues = {
    parse: parse
  };
  setCoreFnsOnMalValues_bang_(environment, functionsOnMalValues);
  return environment;
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

_process_ = _process(function(malVal) {
  return malVal;
});

module.exports = getEnvironment;
