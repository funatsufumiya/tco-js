function millis(){
  return new Date().getTime();
}

function myapply(func, args){
  var f = func;
  var a = args;
  switch(args.length){
    case 0:
      return f(); break;
    case 1:
      return f(a[0]); break;
    case 2:
      return f(a[0],a[1]); break;
    case 3:
      return f(a[0],a[1],a[2]); break;
    case 4:
      return f(a[0],a[1],a[2],a[3]); break;
    case 5:
      return f(a[0],a[1],a[2],a[3],a[4]); break;
    case 6:
      return f(a[0],a[1],a[2],a[3],a[4],a[5]); break;
    case 7:
      return f(a[0],a[1],a[2],a[3],a[4],a[5],a[6]); break;
    case 8:
      return f(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]); break;
    case 9:
      return f(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8]); break;
    case 10:
      return f(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9]); break;
    case 11:
      return f(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10]); break;
    case 12:
      return f(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11]); break;
    case 13:
      return f(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12]); break;
    case 14:
      return f(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13]); break;
    case 15:
      return f(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14]); break;
    case 16:
      return f(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15]); break;
    default:
      throw Error('tco(): length of funtion\'s args is limited to 16 (this should be fixed, sorry)');
  }
}

function g(n){ return n; }

function f1(n){
  return g(n);
}

function f2(n){
  return g.apply(null, [n]);
}

function f3(n){
  return myapply(g, [n]);
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

