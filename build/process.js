var commentSignal, evaluate, interpret, process;

commentSignal = require('./commentSignal');

evaluate = require('./evaluate').evaluate;

interpret = require('./interpret');

process = function(envs) {
  return function(sourceCode) {
    var addResult, result, results, value;
    results = [];
    addResult = function(result) {
      return results.push(result);
    };
    value = evaluate(envs, addResult)(interpret(sourceCode));
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

module.exports = process;
