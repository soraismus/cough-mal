var interpret, parse, tokenize;

parse = require('./parse');

tokenize = require('./tokenize');

interpret = function(sourceCode) {
  return parse(tokenize(sourceCode));
};

module.exports = interpret;
