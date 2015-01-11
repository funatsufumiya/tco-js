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
      throw Error("[Error] TCO: Function name is not specified");
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
      eval("var fook_"+name+" = function(){return {'tco_return':true, 'args':arguments};}");

      return function(){
        var args = arguments;

        while(true){
          var retVal = mainFunc.apply(null, args);
          if(retVal.constructor == Object && retVal['tco_return'] == true){
            args = retVal['args'];
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
