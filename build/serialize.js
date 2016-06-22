var adjoinMalValue, commentSignal, coreEffectfulFunctionLabel, corePureFunctionLabel, extractJsValue, ignoreLabel, indexEnd, indexStart, keywordLabel, listEnd, listStart, macroLabel, malAtom_question_, malCoreEffectfulFunction_question_, malCorePureFunction_question_, malIdentifier_question_, malIgnore_question_, malIndex_question_, malKeyword_question_, malList_question_, malMacro_question_, malNil_question_, malString_question_, malUserPureFunction_question_, nilLabel, reduce, serialize, serializeAtom, serializeIdentifier, serializeIndex, serializeList, serializeString, stripQuotes, userPureFunctionLabel,
  __hasProp = {}.hasOwnProperty;

commentSignal = require('./commentSignal');

extractJsValue = require('./mal-type-utilities').extractJsValue;

indexEnd = require('./keyTokens').indexEnd;

indexStart = require('./keyTokens').indexStart;

listEnd = require('./keyTokens').listEnd;

listStart = require('./keyTokens').listStart;

malAtom_question_ = require('./mal-type-utilities').malAtom_question_;

malCoreEffectfulFunction_question_ = require('./mal-type-utilities').malCoreEffectfulFunction_question_;

malCorePureFunction_question_ = require('./mal-type-utilities').malCorePureFunction_question_;

malIdentifier_question_ = require('./mal-type-utilities').malIdentifier_question_;

malIgnore_question_ = require('./mal-type-utilities').malIgnore_question_;

malIndex_question_ = require('./mal-type-utilities').malIndex_question_;

malKeyword_question_ = require('./mal-type-utilities').malKeyword_question_;

malList_question_ = require('./mal-type-utilities').malList_question_;

malMacro_question_ = require('./mal-type-utilities').malMacro_question_;

malNil_question_ = require('./mal-type-utilities').malNil_question_;

malString_question_ = require('./mal-type-utilities').malString_question_;

malUserPureFunction_question_ = require('./mal-type-utilities').malUserPureFunction_question_;

reduce = require('./linked-list').reduce;

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

corePureFunctionLabel = '<pure core function>';

ignoreLabel = '<ignore>';

keywordLabel = '<keyword>';

macroLabel = '<macro>';

nilLabel = 'nil';

userPureFunctionLabel = '<user function>';

module.exports = serialize;
