module.exports = "(do\n  (def! fix*\n    (fn* (f)\n      ( (fn* (x) (f (fn* (& ys) (apply (x x) ys))))\n        (fn* (x) (f (fn* (& ys) (apply (x x) ys)))))))\n\n  (def! y* (macro* (f x) `(~f (y* ~f) ~x)))\n\n  (def! memfix*\n    (fn* (f)\n      (let* (cache {})\n        (\n          (fn* (x cache)\n            (f\n              (fn* (z)\n                (if (contains? cache z)\n                  (get cache z)\n                  (let* (result ((fn* (y) ((x x cache) y)) z))\n                    (do (set! cache z result) result))))\n              cache))\n          (fn* (x cache)\n            (f\n              (fn* (z)\n                (if (contains? cache z)\n                  (get cache z)\n                  (let* (result ((fn* (y) ((x x cache) y)) z))\n                    (do (set! cache z result) result))))\n              cache))\n          cache))))\n\n  (def! _0 car)\n  (def! _1 (fn* (xs) (nth 1 xs)))\n  (def! _2 (fn* (xs) (nth 2 xs)))\n\n  (def! swap! (macro* (atom & xs)\n    (if (empty? xs)\n      atom\n      `(let* (-atom- ~atom)\n        (do\n          (reset! -atom- (~(car xs) (deref -atom-) ~@(cdr xs)))\n          (deref -atom-))))))\n\n  (def! *gensym-counter* (atom 0))\n\n  (def! gensym (fn* ()\n    (symbol (str \"G__\" (swap! *gensym-counter* incr)))))\n\n  (def! or (macro* (& xs)\n    (if (empty? xs)\n      false\n      (let* (-query- (gensym))\n        `(let* (~-query- ~(car xs))\n          (if ~-query- \n            ~-query-\n            (or ~@(cdr xs))))))))\n\n  (def! and (macro* (& xs)\n    (if (empty? xs)\n      true\n      (let* (-query- (gensym))\n        `(let* (~-query- ~(car xs))\n          (if ~-query-\n            (and ~@(cdr xs))\n            false))))))\n\n  (def! cond (macro* (& xs)\n    (if (empty? xs)\n      nil\n      (if (empty? (cdr xs))\n        (throw \"`cond` requires an even number of forms.\")\n        (let* (-query- (gensym))\n          `(let* (~-query- ~(car xs))\n            (if ~-query-\n              ~(_1 xs)\n              (cond ~@(cdr (cdr xs))))))))))\n\n  (def! loop (macro* (form0 form1)\n    `(let* (loop (memfix* (fn* (loop) (fn* (~(_0 form0)) ~form1)))) (loop ~(_1 form0)))))\n\n  (def! -> (macro* (& xs)\n    (if (empty? xs)\n      nil\n      (let* (x  (car xs)\n             xs (cdr xs))\n        (if (empty? xs)\n          x\n          (let* (form  (car xs)\n                forms  (cdr xs))\n            (if (empty? forms)\n              (if (list? form)\n                (if (= (symbol \"fn*\") (car form))\n                  `(~form ~x)\n                  `(~(car form) ~x ~@(cdr form)))\n                (list form x))\n              `(-> (-> ~x ~form) ~@forms))))))))\n\n  (def! ->> (macro* (& xs)\n    (if (empty? xs)\n      nil\n      (let* (x  (car xs)\n             xs (cdr xs))\n        (if (empty? xs)\n          x\n          (let* (form  (car xs)\n                 forms (cdr xs))\n            (if (empty? forms)\n              (if (list? form)\n                (if (= (symbol \"fn*\") (car form))\n                  `(~form ~x)\n                  `(~@form  ~x))\n                (list form x))\n              `(->> (->> ~x ~form) ~@forms))))))))\n\n  (def! ->* (macro* (& xs) `(fn* (-x-) (-> -x- ~@xs))))\n\n  (def! ->>* (macro* (& xs) `(fn* (-x-) (->> -x- ~@xs))))\n\n  (def! not (fn* (x) (if x false true)))\n  (def! incr  (->* (+ 1)))\n  (def! decr  (->* (- 1)))\n  (def! zero? (->* (= 0)))\n\n  (def! identity (fn* (x) x))\n\n  (def! constant-fn (fn* (x) (fn* (y) x)))\n\n  (def! call-on (fn* (& xs) (fn* (fn) (apply fn xs))))\n\n  (def! step-into-list (fn* (xs fn0 fn1)\n    (let* (x   (car xs)\n          -xs- (cdr xs))\n      (if (empty? -xs-)\n        (fn1 x)\n        (fn0 x -xs-)))))\n\n  (def! apply-on (fn* (& xs)\n    (step-into-list\n      xs\n      (fn* (arguments -xs-) (apply (car -xs-) arguments))\n      (fn* (arguments) (fn* (f) (apply f arguments))))))\n\n  (def! reduce (fn* (f seed xs)\n      (if (empty? xs)\n        seed\n        (reduce f (f seed (car xs)) (cdr xs)))))\n\n  (def! filter (fn* (predicate xs)\n    (reverse\n      (reduce\n        (fn* (memo x)\n          (if (predicate x)\n            (cons x memo)\n            memo))\n        '()\n        xs))))\n\n  (def! map (fn* (f xs)\n      (reverse (reduce (fn* (memo x) (cons (f x) memo)) '() xs))))\n\n  (def! every?  (fn* (pred xs)\n      (if (empty? xs)\n        true\n        (if (pred (car xs))\n          (every? pred (cdr xs))\n          false))))\n\n  (def! some?  (fn* (pred xs)\n      (if (empty? xs)\n        false\n        (if (pred (car xs))\n          true\n          (some? pred (cdr xs))))))\n\n  (def! letmemrec* (macro* (alias expr)\n    `(let* (~(car alias) (memfix* (fn* (~(car alias)) ~(_1 alias)))) ~expr)))\n\n  (def! skip (fn* (nbr xs)\n    (letrec* (-skip- (fn* (ys)\n      (let* (nbr (car ys)\n             xs  (_1 ys))\n        (cond\n          (= 0 nbr) xs\n          (= 1 nbr) (cdr xs)\n          \"default\" (-skip- (list (decr nbr) (cdr xs)))))))\n      (-skip- (list nbr xs)))))\n\n  (def! . (macro* (x key & xs)\n    `((get ~x ~key) ~@xs)))\n\n  (def! .. (fn* (lo hi)\n    (letrec* (-..- (fn* (xs)\n      (let* (lo     (_0 xs)\n             hi     (_1 xs)\n             -list- (_2 xs))\n        (if (= lo hi)\n          (cons hi -list-)\n          (-..- (list lo (decr hi) (cons hi -list-)))))))\n      (-..- (list lo hi '())))))\n\n  (def! defrec! (macro* (fn-name fn-body)\n    `(def! ~fn-name (letrec* (~fn-name ~fn-body) ~fn-name))))\n\n  (def! for* (macro* (loop-parameters body)\n    `(loop\n      ~(_0 loop-parameters)\n      (if ~(_1 loop-parameters)\n        nil\n        (do ~body (loop ~(_2 loop-parameters)))))))\n\n  (def! for-each (fn* (f xs)\n    (reduce\n      (fn* (memo x) (do (f x) memo))\n      nil\n      xs)))\n\n  (def! n-times (fn* (n f)\n    (loop (i 0)\n      (if (= i n)\n        nil\n        (do (f i) (loop (+ i 1)))))))\n\n  (def! tap (fn* (f x)\n    (do (f x) x)))\n\n  (def! with-side-effect (fn* (thunk x)\n    (do (thunk) x)))\n\n\n  (def! thunk (macro* (form)\n    `(fn* () ~form)))\n\n)";