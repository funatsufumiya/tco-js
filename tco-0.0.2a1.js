(function(){
  var G = (typeof window == 'undefined')? GLOBAL: window;

  function getFuncName(f){
    var s = f.toString();
    var m = s.match(/function[ ]*(.*)\(/);
    return m[1];
  }

  function getArgumentDefs(f){
    var s = f.toString();
    var m = s.match(/function[ ]*(?:.*)\((.*)\)[ ]*?{/);
    return m[1].split(/[ ]*,[ ]*/);
  }

  function generateAssignExprs(argDefs){
    var i = 0;
    var s = '';
    for (var i=0; i<argDefs.length; i++) {
      var varName = argDefs[i];
      s += ('\t\t\t'+varName+' = args['+i+'];\n');
    };

    return s;
  }

  function makeArray(){
    return arguments;
  }

  function /*String*/ fookRecur(func, funcName, argDefs){
    var lines = func.toString().split("\n");
    var re = new RegExp('(?:return)?[ ]*'+funcName+"[ ]*[(]", 'g');
    var fs = '';
    for(var i=0; i<lines.length; i++) {
      var line = lines[i];
      if(/function[ ]*(.*)\(/.test(line)){
        var s = '';
        s += '\tvar args = null;\n';
        s += '\twhile(true){\n'
        s += '\t\tif(args != null){\n';
        s += generateAssignExprs(argDefs);
        s += '\t\t}\n'
        fs += (line + "\n" + s + "\n");
      }else{
        if(line.indexOf(funcName) > -1){
          var s = line.replace(re, "args = makeArray(");
          fs += (s + "\n");
        }else{
          fs += (line + "\n");
        }
      }
    };

    fs += "}\n";

    return fs;
  }

  function tco(func, funcName){
    var name = getFuncName(func) || funcName;
    var argDefs = getArgumentDefs(func);
    if(name == null || name == ''){
      throw Error("tco(): Function name is not specified (please pass the name at 2nd argment)");
    }else{
      var fookedFuncStr = fookRecur(func, name, argDefs); /* return as String */

      eval("var mainFunc = "+fookedFuncStr+";");
      return mainFunc;
    }
  }

  G.makeArray = makeArray;
  G.tco = tco;

})();
