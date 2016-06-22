var createMalAtom, createMalBoolean, createMalCoreEffectfulFunction, createMalCorePureFunction, createMalIdentifier, createMalIgnore, createMalIndex, createMalKeyword, createMalList, createMalMacro, createMalNil, createMalNumber, createMalSpecialForm, createMalString, createMalSymbol, createMalUserPureFunction, createMalValue, createPredicate, create_hyphen_factory_hyphen__ampersand__hyphen_predicate, extractJsValue, malAtomType, malAtom_question_, malBoolean_question_, malCoreEffectfulFunction_question_, malCorePureFunction_question_, malFalse, malFalse_question_, malIdentifier_question_, malIgnore, malIgnore_question_, malIndex_question_, malKeyword_question_, malList_question_, malMacro_question_, malNil, malNil_question_, malNumber_question_, malSpecialForm_question_, malString_question_, malSymbol_question_, malTrue, malTrue_question_, malTypes, malUserPureFunction_question_, _createMalAtom, _createMalBoolean, _createMalList, _createMalUnit, _malUnit_question_, _ref, _ref1, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _ref16, _ref17, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;

createMalList = require('./linked-list').createMalList;

malAtomType = require('./mal-types').malAtomType;

malTypes = require('./mal-types').malTypes;

create_hyphen_factory_hyphen__ampersand__hyphen_predicate = function(malType) {
  var factory, predicate;
  factory = function(jsValue) {
    return createMalValue(jsValue, malType);
  };
  predicate = function(malValue) {
    return malValue.type === malType;
  };
  return [factory, predicate];
};

createMalAtom = function(malValue) {
  return {
    malValue: malValue,
    type: malAtomType
  };
};

createMalBoolean = function(jsBoolean) {
  if (jsBoolean) {
    return malTrue;
  } else {
    return malFalse;
  }
};

createMalIgnore = function() {
  return malIgnore;
};

createMalNil = function() {
  return malNil;
};

createMalValue = function(jsValue, malType) {
  return {
    jsValue: jsValue,
    type: malType
  };
};

createPredicate = function(constant) {
  return function(value) {
    return value === constant;
  };
};

extractJsValue = function(malValue) {
  return malValue.jsValue;
};

_ref = malTypes.map(create_hyphen_factory_hyphen__ampersand__hyphen_predicate), (_ref1 = _ref[0], _createMalBoolean = _ref1[0], malBoolean_question_ = _ref1[1]), (_ref2 = _ref[1], createMalCoreEffectfulFunction = _ref2[0], malCoreEffectfulFunction_question_ = _ref2[1]), (_ref3 = _ref[2], createMalCorePureFunction = _ref3[0], malCorePureFunction_question_ = _ref3[1]), (_ref4 = _ref[3], createMalIdentifier = _ref4[0], malIdentifier_question_ = _ref4[1]), (_ref5 = _ref[4], createMalIndex = _ref5[0], malIndex_question_ = _ref5[1]), (_ref6 = _ref[5], createMalKeyword = _ref6[0], malKeyword_question_ = _ref6[1]), (_ref7 = _ref[6], _createMalList = _ref7[0], malList_question_ = _ref7[1]), (_ref8 = _ref[7], createMalMacro = _ref8[0], malMacro_question_ = _ref8[1]), (_ref9 = _ref[8], createMalNumber = _ref9[0], malNumber_question_ = _ref9[1]), (_ref10 = _ref[9], createMalSpecialForm = _ref10[0], malSpecialForm_question_ = _ref10[1]), (_ref11 = _ref[10], createMalString = _ref11[0], malString_question_ = _ref11[1]), (_ref12 = _ref[11], createMalSymbol = _ref12[0], malSymbol_question_ = _ref12[1]), (_ref13 = _ref[12], _createMalUnit = _ref13[0], _malUnit_question_ = _ref13[1]), (_ref14 = _ref[13], createMalUserPureFunction = _ref14[0], malUserPureFunction_question_ = _ref14[1]), (_ref15 = _ref[14], _createMalAtom = _ref15[0], malAtom_question_ = _ref15[1]);

malIgnore = _createMalUnit(null);

malNil = _createMalUnit(null);

_ref16 = [false, true].map(_createMalBoolean), malFalse = _ref16[0], malTrue = _ref16[1];

_ref17 = [malFalse, malIgnore, malNil, malTrue].map(createPredicate), malFalse_question_ = _ref17[0], malIgnore_question_ = _ref17[1], malNil_question_ = _ref17[2], malTrue_question_ = _ref17[3];

module.exports = {
  createMalAtom: createMalAtom,
  createMalBoolean: createMalBoolean,
  createMalCoreEffectfulFunction: createMalCoreEffectfulFunction,
  createMalCorePureFunction: createMalCorePureFunction,
  createMalIdentifier: createMalIdentifier,
  createMalIgnore: createMalIgnore,
  createMalIndex: createMalIndex,
  createMalKeyword: createMalKeyword,
  createMalList: createMalList,
  createMalMacro: createMalMacro,
  createMalNil: createMalNil,
  createMalNumber: createMalNumber,
  createMalSpecialForm: createMalSpecialForm,
  createMalString: createMalString,
  createMalSymbol: createMalSymbol,
  createMalUserPureFunction: createMalUserPureFunction,
  extractJsValue: extractJsValue,
  malAtom_question_: malAtom_question_,
  malBoolean_question_: malBoolean_question_,
  malCoreEffectfulFunction_question_: malCoreEffectfulFunction_question_,
  malCorePureFunction_question_: malCorePureFunction_question_,
  malFalse: malFalse,
  malFalse_question_: malFalse_question_,
  malIdentifier_question_: malIdentifier_question_,
  malIgnore: malIgnore,
  malIgnore_question_: malIgnore_question_,
  malIndex_question_: malIndex_question_,
  malKeyword_question_: malKeyword_question_,
  malList_question_: malList_question_,
  malMacro_question_: malMacro_question_,
  malNil: malNil,
  malNil_question_: malNil_question_,
  malNumber_question_: malNumber_question_,
  malSpecialForm_question_: malSpecialForm_question_,
  malString_question_: malString_question_,
  malSymbol_question_: malSymbol_question_,
  malTrue: malTrue,
  malTrue_question_: malTrue_question_,
  malUserPureFunction_question_: malUserPureFunction_question_
};
