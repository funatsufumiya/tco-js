(function(G){
  function getFuncName(f){
    var s = f.toString();
    var m = s.match(/function[ ]*(.*)\(/);
    return m[1];
  }

  // function getArgumentDefs(f){
  //   var s = f.toString();
  //   var m = s.match(/function[ ]*(?:.*)\((.*)\)[ ]*?{/);
  //   return m[1].split(/[ ]*,[ ]*/);
  // }

  function /* Class */ TCO_RETURN(){}

  function getRandomInt(min, max) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
  }

  function tco(func, funcName){
    var name = getFuncName(func) || funcName;
    // var argDefs = getArgumentDefs(func);
    if(name == null || name == ''){
      throw Error("tco(): Function name is not specified (please pass the name at 2nd argment)");
    }else{
      var tco_return = new TCO_RETURN();

      var alias_id = '_' + getRandomInt(0,1000000);
      var alias_name = 'alias_'+name+alias_id;
      var fook = function(){
        if(fook.tco_flag == true){
          fook.tco_flag = false;
          tco_return.args = arguments;
          return tco_return;
        }else{
          return this[alias_name].apply(null, arguments);
        }
      };
      this[alias_name] = this[name];
      this[name] = fook;

      var tco_func = function(){
        var args = arguments;
        while(true){
          fook.tco_flag = true;
          var retVal = func.apply(null, args);
          if(retVal instanceof TCO_RETURN){
            args = retVal.args;
            continue;
          }else{
            fook.tco_flag = false;
            return retVal;
          }
        }
      }

      return tco_func;
    }
  }

  if(typeof module != 'undefined' && module.exports){
    module.exports = tco; // for Node.js
  }else{
    G.tco = tco; // for browser
  }

})(this);
