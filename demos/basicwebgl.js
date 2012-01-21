(function() {

  var canvas = document.getElementById('basic-webgl');
  var gl = canvas.getContext('experimental-webgl');
  
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  
  
  setInterval(function() {
  
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
      
  }, 250);  

}).call(this);
