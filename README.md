# tco.js

Tail-call Optimization for JavaScript

## Usage

- Add `<script src="path/to/tco.js"></script>` to the head

```javascript

// Note: only for testing, bad implementation
function sum(n, acc){
  acc = acc || 0;
  if(n == 0)
    return acc;
  else
    return sum(n-1, acc+n);
}

var sumOpt = tco(sumOpt); // Tail-call Optimization

sum(1000000) // Maximum call stack size exceeded
sumOpt(1000000) // 500000500000
```

## Limitation

If the implementaion of `sum()` is like below, cannot be optimized with `tco.js`.

```javascript
function sum(n){
  if(n == 0)
    return 0;
  else
    return n + sum(n-1); // <- complex tail-call
}
```
This code should be converted to use **accumulators** like below:

```javascript
function sum(n, acc){ // acc is optional
  acc = acc || 0; // default value of acc is 0
  if(n == 0)
    return acc;
  else
    return sum(n-1, acc+n); // <- simple tail-call
}
```

## How to apply Tail-call Optimization

When you calls the `tco(f)` function, a passed function (`f`) is replaced dynamically to apply TCO.

For detail, call `f.toString()` to get string representation of the function, and modify that with string manipulation. At last, evaluate (`eval`) the string to get a optimized function.

Let's see an example of the sum function that is defined in the above.

```javascript
function sum(n, acc){
  acc = acc || 0;
  if(n == 0)
    return acc;
  else
    return sum(n-1, acc+n);
}
```

This calculates the sum total from 1 to N.

If you call `var sum_tco = tco(sum);`, sum function is converted like below.

```javascript
function sum_tco(n, acc){
  var args = null;
  while(true){
    if(args != null){
      n = args[0];
      acc = args[1];
    }

    acc = acc || 0;
    if(n == 0)
      return acc;
    else
      args = makeArray(n-1, acc+n);
  }
}
```

## TODO

### Improve The Performance

From the version 0.0.2a, the performance was very improved.

However if the recursion depth increases, the performance becomes worse with acceleration.

For example, the results of the benchmarks in `test.html` becomes below.


| N | sum (manually optimized) | sum (TCO-ed) |
| - | ------------------------ | ------------ |
| 1000000 | 10ms | 647ms |
| 100000 | 0ms | 44ms |
| 10000 | 1ms | 4ms |
| 1000 | 0ms | 1ms |


## License

MIT License
