var createMalString, display, environment, fromArray, getEnvironment, repl, serialize, standard, _createMalString, _fromArray, _process, _repl, _serialize,
  __hasProp = {}.hasOwnProperty;

createMalString = require('./mal-type-utilities').createMalString;

fromArray = require('./linked-list').fromArray;

getEnvironment = require('./environment');

_process = require('./process');

_serialize = require('./serialize');

_createMalString = function(jsString) {
  return createMalString('"' + jsString + '"');
};

display = function(malValue) {
  return {
    effect: {
      type: 'display'
    },
    value: malValue
  };
};

_fromArray = function(array) {
  var i, index, _i, _ref;
  index = {};
  for (i = _i = 0, _ref = array.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
    index[array[i]] = array[i + 1];
  }
  return index;
};

repl = function(envs, jsString) {
  var e;
  try {
    return serialize(_process(envs)(jsString));
  } catch (_error) {
    e = _error;
    return "repl error: (" + (serialize(e)) + " + )";
  }
};

_repl = function(jsString, userEnv) {
  var _userEnv;
  if (userEnv != null) {
    _userEnv = {
      '*ARGV*': fromArray(userEnv.map(_createMalString))
    };
    return repl([_userEnv, environment], jsString);
  } else {
    return repl([environment], jsString);
  }
};

serialize = function(results) {
  return results.map(function(result) {
    var key, value, _result;
    _result = {};
    for (key in result) {
      if (!__hasProp.call(result, key)) continue;
      value = result[key];
      if (key === 'effect') {
        _result[key] = value;
      } else {
        _result[key] = _serialize(value);
      }
    }
    return _result;
  });
};

environment = getEnvironment(display);

standard = "(do\n  (def! fix*\n    (fn* (f)\n      ( (fn* (x) (f (fn* (& ys) (apply (x x) ys))))\n        (fn* (x) (f (fn* (& ys) (apply (x x) ys)))))))\n\n  (def! y* (macro* (f x) `(~f (y* ~f) ~x)))\n\n  (def! memfix*\n    (fn* (f)\n      (let* (cache {})\n        (\n          (fn* (x cache)\n            (f\n              (fn* (z)\n                (if (contains? cache z)\n                  (get cache z)\n                  (let* (result ((fn* (y) ((x x cache) y)) z))\n                    (do (set! cache z result) result))))\n              cache))\n          (fn* (x cache)\n            (f\n              (fn* (z)\n                (if (contains? cache z)\n                  (get cache z)\n                  (let* (result ((fn* (y) ((x x cache) y)) z))\n                    (do (set! cache z result) result))))\n              cache))\n          cache))))\n\n  (def! 1st car)\n  (def! 2nd (fn* (xs) (nth 1 xs)))\n  (def! 3rd (fn* (xs) (nth 2 xs)))\n\n  (def! swap! (macro* (atom & xs)\n    (if (empty? xs)\n      atom\n      `(let* (-atom- ~atom)\n        (do\n          (reset! -atom- (~(car xs) (deref -atom-) ~@(cdr xs)))\n          (deref -atom-))))))\n\n  (def! *gensym-counter* (atom 0))\n\n  (def! gensym (fn* ()\n    (symbol (str \"G__\" (swap! *gensym-counter* incr)))))\n\n  (def! or (macro* (& xs)\n    (if (empty? xs)\n      false\n      (let* (-query- (gensym))\n        `(let* (~-query- ~(car xs))\n          (if ~-query- \n            ~-query-\n            (or ~@(cdr xs))))))))\n\n  (def! and (macro* (& xs)\n    (if (empty? xs)\n      true\n      (let* (-query- (gensym))\n        `(let* (~-query- ~(car xs))\n          (if ~-query-\n            (and ~@(cdr xs))\n            false))))))\n\n  (def! cond (macro* (& xs)\n    (if (empty? xs)\n      nil\n      (if (empty? (cdr xs))\n        (throw \"`cond` requires an even number of forms.\")\n        (let* (-query- (gensym))\n          `(let* (~-query- ~(car xs))\n            (if ~-query-\n              ~(2nd xs)\n              (cond ~@(cdr (cdr xs))))))))))\n\n  (def! loop (macro* (form0 form1)\n    `(let* (loop (memfix* (fn* (loop) (fn* (~(1st form0)) ~form1)))) (loop ~(2nd form0)))))\n\n  (def! -> (macro* (& xs)\n    (if (empty? xs)\n      nil\n      (let* (x  (car xs)\n            xs (cdr xs))\n        (if (empty? xs)\n          x\n          (let* (form  (car xs)\n                forms (cdr xs))\n            (if (empty? forms)\n              (if (list? form)\n                (if (= (symbol \"fn*\") (car form))\n                  `(~form ~x)\n                  `(~(car form) ~x ~@(cdr form)))\n                (list form x))\n              `(-> (-> ~x ~form) ~@forms))))))))\n\n  (def! ->> (macro* (& xs)\n    (if (empty? xs)\n      nil\n      (let* (x  (car xs)\n            xs (cdr xs))\n        (if (empty? xs)\n          x\n          (let* (form  (car xs)\n                forms (cdr xs))\n            (if (empty? forms)\n              (if (list? form)\n                (if (= (symbol \"fn*\") (car form))\n                  `(~form ~x)\n                  `(~@form  ~x))\n                (list form x))\n              `(->> (->> ~x ~form) ~@forms))))))))\n\n  (def! ->* (macro* (& xs) `(fn* (-x-) (-> -x- ~@xs))))\n\n  (def! ->>* (macro* (& xs) `(fn* (-x-) (->> -x- ~@xs))))\n\n  (def! not (fn* (x) (if x false true)))\n  (def! incr  (->* (+ 1)))\n  (def! decr  (->* (- 1)))\n  (def! zero? (->* (= 0)))\n\n  (def! identity (fn* (x) x))\n\n  (def! constant-fn (fn* (x) (fn* (y) x)))\n\n  (def! call-on (fn* (& xs) (fn* (fn) (apply fn xs))))\n\n  (def! reduce\n    (fn* (seed f xs)\n      (if (empty? xs)\n        seed\n        (reduce (f seed (car xs)) f (cdr xs)))))\n\n  (def! every?\n    (fn* (pred xs)\n      (if (empty? xs)\n        true\n        (if (pred (car xs))\n          (every? pred (cdr xs))\n          false))))\n\n  (def! some?\n    (fn* (pred xs)\n      (if (empty? xs)\n        false\n        (if (pred (car xs))\n          true\n          (some? pred (cdr xs))))))\n\n  (def! letmemrec* (macro* (alias expr)\n    `(let* (~(car alias) (memfix* (fn* (~(car alias)) ~(2nd alias)))) ~expr)))\n\n  (def! skip (fn* (nbr xs)\n    (letrec* (-skip- (fn* (ys)\n      (let* (nbr (car ys)\n            xs (2nd ys))\n        (cond\n          (= 0 nbr) xs\n          (= 1 nbr) (cdr xs)\n          \"default\" (-skip- (list (decr nbr) (cdr xs)))))))\n      (-skip- (list nbr xs)))))\n\n  (def! . (macro* (x key & xs)\n    `((get ~x ~key) ~@xs)))\n\n  (def! .. (fn* (lo hi)\n    (letrec* (-..- (fn* (ys)\n      (let* (lo     (1st ys)\n            hi     (2nd ys)\n            -list- (3rd ys))\n        (if (= lo hi)\n          (cons hi -list-)\n          (-..- (list lo (decr hi) (cons hi -list-)))))))\n      (-..- (list lo hi '())))))\n)";

_repl(standard);

module.exports = _repl;
