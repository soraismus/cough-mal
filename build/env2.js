var createMalCoreEffectfulFunction, displayEffectsOnMalValues, getEnvironment, serialize, setCoreEffectfulFnsOnMalValues_bang_, toArray, _prStr,
  __hasProp = {}.hasOwnProperty;

createMalCoreEffectfulFunction = require('./type-utilities').createMalCoreEffectfulFunction;

serialize = require('./serialize');

toArray = require('./linked-list').toArray;

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
  'print': function(malArgs) {
    return _prStr(malArgs, false);
  },
  'pretty-print': function(malArgs) {
    return _prStr(malArgs, true);
  }
};

module.exports = getEnvironment;
