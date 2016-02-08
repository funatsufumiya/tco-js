var TCO = require('./tco.js');

// Note: only for testing, bad algorithm
function sum(n, acc){
  acc = acc || 0;
  if(n == 0)
    return acc;
  else
    return TCO.tail_call(n-1, acc+n);
}

var sumOpt = TCO.optimize(sum); // Tail-call Optimization

// var ret = sum(1000000); // Maximum call stack size exceeded
var ret = sumOpt(1000000); // 500000500000

console.log(ret);
