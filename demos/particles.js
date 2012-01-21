$(document).ready(function() {

  var canvas = document.getElementById('particles-webgl');
  var gl = canvas.getContext('experimental-webgl');

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  
  var PARTICLECOUNT = 200000;
  var vertices = new Float32Array(PARTICLECOUNT * 2);
  var velocities = new Float32Array(PARTICLECOUNT * 2);
  var colours = new Float32Array(PARTICLECOUNT * 3);
  for(var x = 0; x < PARTICLECOUNT; x++) {
    vertices[x * 2] = Math.random() * canvas.width;
    vertices[x * 2 + 1] = Math.random() * canvas.height;
    velocities[x * 2] = Math.random() * 0.05 - 0.025;
    velocities[x * 2 + 1] = Math.random() * 0.05 - 0.025;
    colours[x * 3] = Math.random() * 1.0;
    colours[x * 3 + 1] = Math.random() * 1.0;
    colours[x * 3 + 2] = 0.0; //Math.random() * 1.0;
    colours[x * 3 + 3] = Math.random() * 0.25;
  }
   
  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW); 
  
  var velocityBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, velocityBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, velocities, gl.STATIC_DRAW); 
  
  var colourBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colourBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, colours, gl.STATIC_DRAW); 
    
  var vertexText = document.getElementById('particles-vertex').innerText;
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexText);
  gl.compileShader(vertexShader);
  
  var fragmentText = document.getElementById('particles-fragment').innerText;
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentText);
  gl.compileShader(fragmentShader);
      
  var program = gl.createProgram(); 

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
     
  var aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
  var aVertexVelocity = gl.getAttribLocation(program, 'aVertexVelocity');
  var aColour = gl.getAttribLocation(program, 'aColour');
  var uProjection = gl.getUniformLocation(program, 'uProjection');
  
  var uView = gl.getUniformLocation(program, 'uView');
  var uWorld = gl.getUniformLocation(program, 'uWorld');
  var uTime = gl.getUniformLocation(program, 'uTime');

  var projection = mat4.create();
  var view = mat4.create();
  var world = mat4.create();
  
  mat4.ortho(0, canvas.width, canvas.height, 0, -1, 1, projection);
  mat4.lookAt([0, 0, 0], [0, 0, -1], [0, 1, 0], view);
  mat4.identity(world);
 
  var startTime = new Date();
  
  setInterval(function() {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    gl.useProgram(program);
    
    gl.uniformMatrix4fv(uProjection, false, projection);
    gl.uniformMatrix4fv(uView, false, view);
    gl.uniformMatrix4fv(uWorld, false, world);
    gl.uniform1f(uTime, new Date() - startTime);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(aVertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aVertexPosition);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, velocityBuffer);
    gl.vertexAttribPointer(aVertexVelocity, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aVertexVelocity);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, colourBuffer);
    gl.vertexAttribPointer(aColour, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aColour);
    
    gl.drawArrays(gl.POINTS, 0, PARTICLECOUNT);    
      
  }, 1000 / 30);
  
  $(canvas).on({
    click: function() {
      startTime = new Date();
      return false;    
  }});

});
