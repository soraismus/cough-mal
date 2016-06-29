var fromJsObject, getLispEnvironment, setEnv0_bang_, setEnv1_bang_, setEnv2_bang_, setEnv3_bang_;

fromJsObject = require('./index-utilities').fromJsObject;

setEnv0_bang_ = require('./env0');

setEnv1_bang_ = require('./env1');

setEnv2_bang_ = require('./env2');

setEnv3_bang_ = require('./env3');

getLispEnvironment = function(config) {
  var display, envCopy, environment;
  console.log('getLispEnvironment');
  display = config.display;
  environment = {};
  config = {
    display: display,
    environment: environment
  };
  setEnv0_bang_(config);
  setEnv1_bang_(config);
  setEnv2_bang_(config);
  setEnv3_bang_(config);
  envCopy = fromJsObject(environment);
  environment['*DEFAULT-ENV*'] = envCopy;
  return environment;
};

module.exports = getLispEnvironment;
