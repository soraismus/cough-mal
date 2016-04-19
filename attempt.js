console.log(
  process.argv
    .slice(2)
    .map((function(x) { return parseInt(x); }))
    .reduce((function(memo, x) { return memo + x; })));
