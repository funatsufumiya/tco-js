# tco.js

Tail-call Optimization for JavaScript

## Features

- Convert a tail-call recursion to a loop
- Compatible with browsers and node.js
- Easy to use
- Not using `eval` or `new Function`

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

#### [NOTE] Create Tail-call Using Accumulator

If the implementaion of `sum()` is like below, **cannot** apply TCO, because it's not tail-call.

```javascript
function sum(n){
  if(n == 0)
    return 0;
  else
    return n + sum(n-1); // <- not tail-call
}
```
This code should be converted to use **accumulators** like below:

```javascript
function sum(n, acc){ // acc is optional
  acc = acc || 0; // default value of acc is 0
  if(n == 0)
    return acc;
  else
    return sum(n-1, acc+n); // <- tail-call
}
```

## Limitation

### Mutual Recursion

`tco.js` **cannot** optimize the *mutual recursion* like below.

```javascript
function is_even(n) {
    if (n == 0)
        return true;
    else
        return is_odd(n - 1); // call is_odd
}
 
function is_odd(n) {
    if (n == 0)
        return false;
    else
        return is_even(n - 1); // call is_even
}
```

## TODO

### Improve The Performance

From the version 0.0.2a, the performance was very improved.

However if the recursion depth increases, the performance becomes worse.

For example, the results of the benchmarks in `test.html` becomes below.

<table>
<tr><th>N</th><th>sum (manually optimized)</th><th>sum (TCO-ed)</th></tr>
<tr><td>1000000</td><td>24ms</td><td>450ms</td></tr>
<tr><td>100000</td><td>0ms</td><td>30ms</td></tr>
<tr><td>10000</td><td>1ms</td><td>4ms</td></tr>
<tr><td>1000</td><td>0ms</td><td>1ms</td></tr>
</table>


## License

MIT License
