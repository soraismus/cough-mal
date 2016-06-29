var circumpendQuotes, createMalString, display, environment, flattenIfNecessary, fromArray, getLispEnvironment, interpret, serialize, standardFnsAndMacros, tokenizeAndParse, _createMalString, _interpret, _process, _serialize,
  __hasProp = {}.hasOwnProperty;

circumpendQuotes = require('./js-utilities').circumpendQuotes;

createMalString = require('./type-utilities').createMalString;

fromArray = require('./linked-list').fromArray;

getLispEnvironment = require('./getLispEnvironment');

_process = require('./_process');

_serialize = require('./serialize');

standardFnsAndMacros = require('./standard-fns-and-macros');

tokenizeAndParse = require('./tokenizeAndParse');

_createMalString = function(jsString) {
  return createMalString(circumpendQuotes(jsString));
};

display = function(malValue) {
  return {
    effect: {
      type: 'display'
    },
    value: malValue
  };
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
    return "repl error: (" + (serialize(e)) + " + )";
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
  display: display
});

interpret(standardFnsAndMacros);

module.exports = interpret;
