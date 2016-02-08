(function(G){

  function TCO_RETURN(){}; // This is just type

  var tail_call = function(){
    var t = new TCO_RETURN();
    t.args = arguments;
    return t;
  };

  function log(s){
    if(typeof console === 'object' && console.hasOwnProperty('log')){
      console.log(s);
    }
  }

  function getFuncName(f){
    if(typeof f === 'null' || (typeof f !== 'function' && typeof f !== 'object')){
      return undefined;
    }

    if(f.hasOwnProperty('name')){
      return f.name;
    }else if(f.hasOwnProperty('toString')){
      var s = f.toString();
      var n1 = s.indexOf('function') + 8;
      var n2 = s.indexOf('(');
      var name = s.substring(n1,n2);
      name = name.split(/\/\*[\s\S]*?\*\//).join('');

      var lines = name.split("\n");
      for (var i=0; i<lines.length; i++) {
        var line = lines[i]
      };
      name = name.split(/\/\/.*(?:$|\n)/).join('');
      name = name.split(/\s/).join('');
      return name;
    }
  }

  // function getArgumentDefs(f){
  //   var s = f.toString();
  //   var m = s.match(/function[ ]*(?:.*)\((.*)\)[ ]*?{/);
  //   return m[1].split(/[ ]*,[ ]*/);
  // }

  function getRandomInt(min, max) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
  }

  function tco(func, funcName){
    var name = getFuncName(func) || funcName;

    // var argDefs = getArgumentDefs(func);
    if(name === null || name === undefined || name === ''){
      throw Error("tco(): Function name is not specified (please pass the name at 2nd argment)");
    }else{
      var tco_return = new TCO_RETURN();

      var alias_id = '_' + getRandomInt(0,1000000);
      var alias_name = 'alias_'+name+alias_id;

      this[alias_name] = this[name];

      var tco_func = function(){
        var args = arguments;
        while(true){
          var retVal = func.apply(null, args);
          if(retVal instanceof TCO_RETURN){
            args = retVal.args;
            continue;
          }else{
            return retVal;
          }
        }
      }

      return tco_func;
    }
  }

  var export_obj = {'optimize':tco, 'tail_call':tail_call};

  if(typeof module != 'undefined' && module.exports){
    module.exports = export_obj; // for Node.js
  }else{
    G.TCO = export_obj; // for browser
  }

})(this);
