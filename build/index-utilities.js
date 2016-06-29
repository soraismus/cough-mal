var createMalIndex, fromJsObject, fromMalIndex, jsString_question_, stripQuotes,
  __hasProp = {}.hasOwnProperty;

createMalIndex = require('./type-utilities').createMalIndex;

jsString_question_ = require('./js-utilities').jsString_question_;

fromJsObject = function(jsObject) {
  var copy, key, val;
  copy = {};
  for (key in jsObject) {
    if (!__hasProp.call(jsObject, key)) continue;
    val = jsObject[key];
    if (jsString_question_(key)) {
      copy['"' + key + '"'] = val;
    } else {
      copy[key] = val;
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
  fromJsObject: fromJsObject,
  fromMalIndex: fromMalIndex
};
