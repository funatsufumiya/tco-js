# tco.js

Tail-call Optimization for JavaScript

## Usage

- Add `<script src="path/to/tco.js"></script>` to head

```javascript

// Note: only for testing, bad implementation 
function sum(n, acc){
  acc = acc || 0;
  if(n == 0)
    return acc;
  else
    return sumRecur(n-1, acc+n);
}

var sumOpt = tco(sumOpt); // Tail-call Optimization

sum(1000000) // Maximum call stack size exceeded
sumOpt(1000000) // 500000500000
```

## Notice

On the current implementation, TCO-ed function is too slow.

If you set "N = 10000" on the above example, *sum(N) is 0ms* while *sumOpt(N) is 19ms*.

## License

MIT License