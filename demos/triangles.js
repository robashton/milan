$(document).ready(function() {


  var canvas = document.getElementById('triangles-webgl');
  var gl = canvas.getContext('experimental-webgl');
  
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  
  var vertices = [
     0.0, 0.0, 0.0,
     1.0, 0.0, 0.0,
     0.0, 1.0, 0.0,
     1.0, 1.0, 0.0
  ];
  
  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);  
    
  var vertexText = document.getElementById('triangles-vertex').innerText;
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexText);
  gl.compileShader(vertexShader);
  
  var fragmentText = document.getElementById('triangles-fragment').innerText;
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentText);
  gl.compileShader(fragmentShader);
      
  var program = gl.createProgram(); 

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
     
  var aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
  var uProjection = gl.getUniformLocation(program, 'uProjection');
  var uView = gl.getUniformLocation(program, 'uView');
  var uWorld = gl.getUniformLocation(program, 'uWorld');

  var projection = mat4.create();
  var view = mat4.create();
  var world = mat4.create();
  
  mat4.ortho(0, canvas.width, canvas.height, 0, -1, 1, projection);
  mat4.lookAt([0, 0, 0], [0, 0, -1], [0, 1, 0], view);
  mat4.identity(world);
  
  mat4.scale(world, [canvas.width / 2.0, canvas.height / 2.0, 0.5]);
  mat4.translate(world, [0.5, 0.5, 0]);
  
  console.log(aVertexPosition, uProjection, uView, uWorld);
  
  var rotation = 0;
  setInterval(function() {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    gl.useProgram(program);
    
    gl.uniformMatrix4fv(uProjection, false, projection);
    gl.uniformMatrix4fv(uView, false, view);
    gl.uniformMatrix4fv(uWorld, false, world);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(aVertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aVertexPosition);
    
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
    
    mat4.identity(world);   
    mat4.scale(world, [canvas.width / 2.0, canvas.height / 2.0, 0.5]);  
    mat4.translate(world, [0.5, 0.5, 0]);
    
    
    rotation += 0.1;
      
  }, 250);

});
