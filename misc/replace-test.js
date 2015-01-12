function g(){
  return 'g()';
}

function f(){
  return g();
}

console.log(f());

var old = g;
var g = function(){
  if(g.replace_flag == true){
    g.replace_flag = false;
    return 'hey';
  }else{
    return old();
  }
}

function h(){
  g.replace_flag = true;
  return g();
}

console.log(h());

console.log(f());