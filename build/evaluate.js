var addEnv, car, catch_asterisk_, cdr, circumpendQuotes, commentSignal, createFn, createLocalEnv, createMacro, createMalIndex, createMalKeyword, createMalList, createMalMacro, createMalNumber, createMalString, createMalSymbol, createMalUserPureFunction, def_bang_, defineNewValue, empty_question_, evalQuasiquotedExpr, evaluate, expandMacro, expand_hyphen_macro, extractJsValue, filter, fn_asterisk_, forEach, fromArray, fromJsObjects, fromMalIndex, ignorable_question_, jsString_question_, keyword_question_, let_asterisk_, letrec_asterisk_, lookup, macro_asterisk_, malCoreEffectfulFunction_question_, malCorePureFunction_question_, malIgnore_question_, malIndex_question_, malKeyword_question_, malList_question_, malMacro_question_, malNil, malSymbol_question_, malUserPureFunction_question_, map, next, quasiquote, quote, recurse, reduce, reduceBy2, reduceLet_asterisk_, reduceLetrec_asterisk_, reverse, setMainEnv, splat, spliceUnquote, spliceUnquote_question_, spliceUnquotedExpr_question_, toPartialArray, try_asterisk_, undef_bang_, undefineValue, unquote, unquote_question_, unquotedExpr_question_, unsetMainEnv, _do, _eval, _evalWithEnv, _evaluate, _getCurrentEnv, _getDefaultEnv, _if,
  __hasProp = {}.hasOwnProperty;

addEnv = require('./env-utilities').addEnv;

car = require('./linked-list').car;

catch_asterisk_ = require('./keyTokens').catch_asterisk_;

cdr = require('./linked-list').cdr;

circumpendQuotes = require('./js-utilities').circumpendQuotes;

commentSignal = require('./commentSignal');

createMalIndex = require('./type-utilities').createMalIndex;

createMalKeyword = require('./type-utilities').createMalKeyword;

createMalList = require('./type-utilities').createMalList;

createMalMacro = require('./type-utilities').createMalMacro;

createMalNumber = require('./type-utilities').createMalNumber;

createMalString = require('./type-utilities').createMalString;

createMalSymbol = require('./type-utilities').createMalSymbol;

createMalUserPureFunction = require('./type-utilities').createMalUserPureFunction;

def_bang_ = require('./keyTokens').def_bang_;

_do = require('./keyTokens')._do;

empty_question_ = require('./linked-list').empty_question_;

_eval = require('./keyTokens')._eval;

_evalWithEnv = require('./keyTokens')._evalWithEnv;

expand_hyphen_macro = require('./keyTokens').expand_hyphen_macro;

extractJsValue = require('./type-utilities').extractJsValue;

filter = require('./linked-list').filter;

fn_asterisk_ = require('./keyTokens').fn_asterisk_;

forEach = require('./linked-list').forEach;

fromArray = require('./linked-list').fromArray;

fromJsObjects = require('./index-utilities').fromJsObjects;

fromMalIndex = require('./index-utilities').fromMalIndex;

_getCurrentEnv = require('./keyTokens')._getCurrentEnv;

_getDefaultEnv = require('./keyTokens')._getDefaultEnv;

_if = require('./keyTokens')._if;

jsString_question_ = require('./js-utilities').jsString_question_;

keyword_question_ = require('./keyTokens').keyword_question_;

let_asterisk_ = require('./keyTokens').let_asterisk_;

letrec_asterisk_ = require('./keyTokens').letrec_asterisk_;

lookup = require('./env-utilities').lookup;

macro_asterisk_ = require('./keyTokens').macro_asterisk_;

malCoreEffectfulFunction_question_ = require('./type-utilities').malCoreEffectfulFunction_question_;

malCorePureFunction_question_ = require('./type-utilities').malCorePureFunction_question_;

malIgnore_question_ = require('./type-utilities').malIgnore_question_;

malIndex_question_ = require('./type-utilities').malIndex_question_;

malKeyword_question_ = require('./type-utilities').malKeyword_question_;

malList_question_ = require('./type-utilities').malList_question_;

malMacro_question_ = require('./type-utilities').malMacro_question_;

malNil = require('./type-utilities').malNil;

malSymbol_question_ = require('./type-utilities').malSymbol_question_;

malUserPureFunction_question_ = require('./type-utilities').malUserPureFunction_question_;

map = require('./linked-list').map;

next = require('./linked-list').next;

quasiquote = require('./keyTokens').quasiquote;

quote = require('./keyTokens').quote;

spliceUnquote = require('./keyTokens').spliceUnquote;

unquote = require('./keyTokens').unquote;

recurse = require('./linked-list').recurse;

reduce = require('./linked-list').reduce;

reduceBy2 = require('./linked-list').reduceBy2;

reverse = require('./linked-list').reverse;

setMainEnv = require('./env-utilities').setMainEnv;

splat = require('./keyTokens').splat;

toPartialArray = require('./linked-list').toPartialArray;

try_asterisk_ = require('./keyTokens').try_asterisk_;

undef_bang_ = require('./keyTokens').undef_bang_;

unsetMainEnv = require('./env-utilities').unsetMainEnv;

createFn = function(malList, envs) {
  return createMalUserPureFunction({
    localEnvs: envs.slice(0),
    malExpression: next(malList),
    malParameters: car(malList)
  });
};

createLocalEnv = function(malParams, malArgs) {
  var env, jsParam;
  env = {};
  while (!empty_question_(malParams)) {
    jsParam = extractJsValue(car(malParams));
    if (jsParam === splat) {
      env[extractJsValue(next(malParams))] = malArgs;
      return env;
    } else {
      env[jsParam] = car(malArgs);
      malParams = cdr(malParams);
      malArgs = cdr(malArgs);
    }
  }
  return env;
};

createMacro = function(malList, envs) {
  return createMalMacro({
    localEnvs: envs.slice(0),
    malExpression: next(malList),
    malParameters: car(malList)
  });
};

defineNewValue = function(malList, envs, addResult) {
  var jsKey, malValue;
  jsKey = extractJsValue(car(malList));
  malValue = _evaluate(next(malList), envs, addResult);
  return setMainEnv(envs, jsKey, malValue);
};

evalQuasiquotedExpr = function(expr, envs, addResult) {
  var manageItem;
  if (!malList_question_(expr)) {
    return expr;
  }
  manageItem = function(memo, item) {
    var _manageItem;
    switch (false) {
      case !unquotedExpr_question_(item):
        return createMalList(_evaluate(next(item), envs, addResult), memo);
      case !spliceUnquotedExpr_question_(item):
        _manageItem = function(_memo, _item) {
          return createMalList(_item, _memo);
        };
        return reduce(memo, _manageItem, _evaluate(next(item), envs, addResult));
      case !malList_question_(item):
        return createMalList(evalQuasiquotedExpr(item, envs, addResult), memo);
      default:
        return createMalList(item, memo);
    }
  };
  return reverse(reduce(createMalList(), manageItem, expr));
};

_evaluate = function(malExpr, envs, addResult) {
  var arg1, catchExpr, ex, fn, head, index, jsString, key, localEnvs, malArgs, malExpression, malInvokable, malParameters, malSymbol, newEnv, newIndex, otherwise, remainingArgs, tailList, value, _catch, _ex, _ref, _ref1, _ref2;
  while (true) {
    switch (false) {
      case !malSymbol_question_(malExpr):
        jsString = extractJsValue(malExpr);
        if (keyword_question_(jsString)) {
          return createMalKeyword(jsString);
        } else {
          return lookup(envs, jsString);
        }
        break;
      case !malIndex_question_(malExpr):
        index = extractJsValue(malExpr);
        newIndex = {};
        for (key in index) {
          if (!__hasProp.call(index, key)) continue;
          value = index[key];
          newIndex[key] = _evaluate(index[key], envs, addResult);
        }
        return createMalIndex(newIndex);
      case !!(malList_question_(malExpr)):
        return malExpr;
      default:
        malExpr = filter((function(x) {
          return !(ignorable_question_(x, envs, addResult));
        }), malExpr);
        _ref = toPartialArray(2, malExpr), head = _ref[0], arg1 = _ref[1], remainingArgs = _ref[2];
        tailList = cdr(malExpr);
        switch (extractJsValue(head)) {
          case def_bang_:
            return defineNewValue(tailList, envs, addResult);
          case undef_bang_:
            return undefineValue(tailList, envs);
          case _eval:
            malExpr = _evaluate(arg1, envs, addResult);
            break;
          case _evalWithEnv:
            envs = [fromMalIndex(_evaluate(arg1, envs, addResult))];
            malExpr = _evaluate(car(remainingArgs), envs, addResult);
            break;
          case let_asterisk_:
            malExpr = car(remainingArgs);
            envs = addEnv(envs, reduceLet_asterisk_(envs, arg1, addResult));
            break;
          case letrec_asterisk_:
            malExpr = car(remainingArgs);
            envs = addEnv(envs, reduceLetrec_asterisk_(envs, arg1, addResult));
            break;
          case _do:
            return forEach(evaluate(envs, addResult), tailList);
          case _getCurrentEnv:
            return fromJsObjects.apply(null, envs.reverse());
          case _getDefaultEnv:
            return fromJsObjects(envs[envs.length - 1]);
          case _if:
            malExpr = extractJsValue(_evaluate(arg1, envs, addResult)) ? car(remainingArgs) : empty_question_(otherwise = next(remainingArgs)) ? malNil : otherwise;
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
                  ex = createMalString(circumpendQuotes(ex.message));
                }
                newEnv = {};
                newEnv[extractJsValue(_ex)] = ex;
                return _evaluate(catchExpr, addEnv(envs, newEnv), addResult);
              }
            }
            break;
          default:
            malSymbol = head;
            malExpr = tailList;
            malInvokable = _evaluate(malSymbol, envs, addResult);
            switch (false) {
              case !malKeyword_question_(malInvokable):
                malExpr = createMalList(malInvokable, tailList);
                break;
              case !malMacro_question_(malInvokable):
                malExpr = expandMacro(head, tailList, envs, addResult);
                break;
              case !malCorePureFunction_question_(malInvokable):
                fn = extractJsValue(malInvokable);
                malArgs = map(evaluate(envs, addResult), malExpr);
                return fn(malArgs);
              case !malCoreEffectfulFunction_question_(malInvokable):
                fn = extractJsValue(malInvokable);
                malArgs = map(evaluate(envs, addResult), malExpr);
                addResult(fn(malArgs));
                return malNil;
              case !malUserPureFunction_question_(malInvokable):
                _ref2 = extractJsValue(malInvokable), localEnvs = _ref2.localEnvs, malExpression = _ref2.malExpression, malParameters = _ref2.malParameters;
                malArgs = map(evaluate(envs, addResult), malExpr);
                malExpr = malExpression;
                newEnv = createLocalEnv(malParameters, malArgs);
                envs = addEnv(localEnvs, newEnv);
                break;
              default:
                throw "" + (extractJsValue(malSymbol)) + " does not evaluate to a function, macro, or keyword.";
            }
        }
    }
  }
};

evaluate = function(envs, addResult) {
  return function(malExpr) {
    if (malExpr === commentSignal) {
      return commentSignal;
    }
    return _evaluate(malExpr, envs, addResult);
  };
};

expandMacro = function(malMacroSymbol, malArgs, envs, addResult) {
  var localEnvs, malExpression, malMacro, malParameters, newEnv, newEnvStack, _ref;
  malMacro = _evaluate(malMacroSymbol, envs, addResult);
  _ref = extractJsValue(malMacro), localEnvs = _ref.localEnvs, malExpression = _ref.malExpression, malParameters = _ref.malParameters;
  newEnv = createLocalEnv(malParameters, malArgs);
  newEnvStack = addEnv(localEnvs, newEnv);
  return _evaluate(malExpression, newEnvStack, addResult);
};

ignorable_question_ = function(malVal, envs, addResult) {
  var jsString, symbol;
  return malIgnore_question_(malVal) || (malList_question_(malVal) && malSymbol_question_(symbol = car(malVal)) && (((jsString = extractJsValue(symbol)) === 'ignore!') || ((jsString === 'ignoreIfTrue') && (extractJsValue(_evaluate(next(malVal), envs, addResult)))) || ((jsString === 'ignoreUnlessTrue') && !(extractJsValue(_evaluate(next(malVal), envs, addResult))))));
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
  var envValue, jsKey, newEnv, _envs, _malExpr;
  newEnv = {};
  _envs = addEnv(envs, newEnv);
  while (!empty_question_(list)) {
    jsKey = extractJsValue(list.value);
    list = recurse(list);
    _malExpr = fromArray([createMalSymbol("fix*"), fromArray([createMalSymbol("fn*"), fromArray([jsKey]), list.value])]);
    envValue = _evaluate(_malExpr, _envs, addResult);
    newEnv[jsKey] = envValue;
    list = recurse(list);
  }
  return newEnv;
};

spliceUnquote_question_ = function(malValue) {
  return spliceUnquote === (extractJsValue(malValue));
};

spliceUnquotedExpr_question_ = function(malValue) {
  return malList_question_(malValue) && (spliceUnquote_question_(car(malValue)));
};

undefineValue = function(malList, envs) {
  var jsKey;
  jsKey = extractJsValue(car(malList));
  return unsetMainEnv(envs, jsKey);
};

unquote_question_ = function(malValue) {
  return unquote === (extractJsValue(malValue));
};

unquotedExpr_question_ = function(malValue) {
  return malList_question_(malValue) && (unquote_question_(car(malValue)));
};

module.exports = evaluate;
