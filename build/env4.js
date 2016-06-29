var createMalCorePureFunction, extractJsValue, fromMalIndex, getEnvironment, toPartialArray, _process,
  __hasProp = {}.hasOwnProperty;

createMalCorePureFunction = require('./type-utilities').createMalCorePureFunction;

extractJsValue = require('./type-utilities').extractJsValue;

fromMalIndex = require('./index-utilities').fromMalIndex;

_process = require('./_process');

toPartialArray = require('./linked-list').toPartialArray;

getEnvironment = function(config) {
  var environment, functionsOnMalValues, get_jsFileName_and_localEnv, load, loadWithBareEnv, loadWithEnv, readFile, setCoreFnsOnMalValues_bang_, stripQuotes, _processFileAndEnv, _process_, _read;
  environment = config.environment;
  get_jsFileName_and_localEnv = function(malArgs) {
    var jsFileName, localEnv, malFileName, _ref;
    _ref = toPartialArray(2, malArgs), malFileName = _ref[0], localEnv = _ref[1];
    jsFileName = stripQuotes(extractJsValue(malFileName));
    return [jsFileName, localEnv];
  };
  load = function(malArgs) {
    return _process_(_read(malArgs));
  };
  loadWithBareEnv = function(malArgs) {
    var jsFileName, localEnv, _ref;
    _ref = get_jsFileName_and_localEnv(malArgs), jsFileName = _ref[0], localEnv = _ref[1];
    return _processFileAndEnv(readFile(jsFileName), [fromMalIndex(localEnv)]);
  };
  loadWithEnv = function(malArgs) {
    var jsFileName, localEnv, _ref;
    _ref = get_jsFileName_and_localEnv(malArgs), jsFileName = _ref[0], localEnv = _ref[1];
    return _processFileAndEnv(readFile(jsFileName), [fromMalIndex(localEnv), environment]);
  };
  _process_ = function(jsString) {
    return _process([environment])(jsString);
  };
  _processFileAndEnv = function(file, envStack) {
    return _process(envStack)(file);
  };
  _read = function(malArgs) {
    var jsFileName;
    jsFileName = get_jsFileName_and_localEnv(malArgs)[0];
    return readFile(jsFileName);
  };
  readFile = function(jsFileName) {
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
  stripQuotes = function(jsString) {
    return jsString.slice(1, -1);
  };
  functionsOnMalValues = {
    'load': load,
    'load-with-env': loadWithEnv,
    'load-with-bare-env': loadWithBareEnv
  };
  setCoreFnsOnMalValues_bang_(environment, functionsOnMalValues);
  return environment;
};

module.exports = getEnvironment;
