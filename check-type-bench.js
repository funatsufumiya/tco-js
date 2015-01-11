function millis(){
  return new Date().getTime();
}

function f1(n){
  return n;
}

function f2(n){
  var flag = (n.constructor == Object);
  return n;
}

function f3(n){
  return typeof n == 'object';
}

var t1, t2;
var N = 1e7;

t1 = millis();
for (var i=0; i < N;i++) {
  f1(i);
};
t2 = millis();
console.log('f1: ' + (t2 - t1) + "ms");

t1 = millis();
for (var i=0; i < N;i++) {
  f2(i)
};
t2 = millis();
console.log('f2: ' + (t2 - t1) + "ms");

t1 = millis();
for (var i=0; i < N;i++) {
  f3(i)
};
t2 = millis();
console.log('f3: ' + (t2 - t1) + "ms");

