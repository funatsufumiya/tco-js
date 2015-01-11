(function(){
  var G = (typeof window == 'undefined')? GLOBAL: window;

  function getFuncName(f){
    var s = f.toString();
    var m = s.match(/function[ ]*(.*)\(/);
    return m[1];
  }

  function tco(func, funcName){
    var name = getFuncName(func) || funcName;
    if(name == null || name == ''){
      throw Error("tco(): Function name is not specified");
    }else{
      var lines = func.toString().split("\n");
      var re = new RegExp(name+"[ ]*[(]", 'g');
      var fs = '';
      for(var i=0; i<lines.length; i++) {
        var line = lines[i];
        if(/function[ ]*(.*)\(/.test(line)){
          fs += (line + "\n");
        }else{
          var s = line.replace(re, "fook_"+name+"(");
          fs += (s + "\n");
        }
      };

      eval("var mainFunc = "+fs+";")
      function TCO_RETURN(){
      }
      var retObj = new TCO_RETURN();
      this["fook_"+name] = function(){
        retObj.args = arguments;
        return retObj;
      }

      return function(){
        var args = arguments;

        while(true){
          var retVal = mainFunc.apply(null, args);
          if(retVal instanceof TCO_RETURN){
            args = retVal.args;
            continue;
          }else{
            return retVal;
          }
        }
      }
    }
  }

  G.tco = tco;

})();
