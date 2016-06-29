var getLispEnvironment, setEnv0, setEnv1, setEnv2, setEnv3;

setEnv0 = require('./env0');

setEnv1 = require('./env1');

setEnv2 = require('./env2');

setEnv3 = require('./env3');

getLispEnvironment = function(config) {
  var display, environment;
  console.log('getLispEnvironment');
  display = config.display;
  environment = {};
  config = {
    display: display,
    environment: environment
  };
  setEnv0(config);
  setEnv1(config);
  setEnv2(config);
  return setEnv3(config);
};

module.exports = getLispEnvironment;
