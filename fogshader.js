let fogShader;

function preload() {
  // Load the shaders from the 'shaders' folder
  fogShader = loadShader('shaders/vertexShader.vert', 'shaders/fogShader.frag');
}

function setup() {
  createCanvas(800, 600, WEBGL);
}

function draw() {
  background(20);
  
  // Apply the fog shader
  shader(fogShader);
  
  // Pass the resolution and time to the shader
  fogShader.setUniform('u_resolution', [width, height]);
  fogShader.setUniform('u_time', millis() / 1000.0);

  // Draw a rotating cube to see the fog effect in action
  rotateY(millis() / 1000);
  box(150);
}
