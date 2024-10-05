let characters = [];
let cathedral; // Changed from backgrounds array to a single cathedral object for generative art
let currentBGIndex = 0; // Still useful for dynamic effects or loading specific cathedral designs if needed
let diamondGlow;
let fogShader; // For WebGL effects

function preload() {
  // Load shaders for WebGL effects
  fogShader = loadShader('vertexShader.vert', 'fogShader.frag');
}

function setup() {
  createCanvas(800, 600, WEBGL); // Switching to WEBGL for depth and shader effects
  for(let i = 0; i < 3; i++) {
    characters.push(new RobedMan(random(-width/2, width/2), random(-height/2, height/2)));
  }
  cathedral = new Cathedral();
  diamondGlow = color(255, 255, 200, 100);
}

function draw() {
  background(20); // Dark background for an eerie effect

  // Apply shader for fog effect
  shader(fogShader);
  fogShader.setUniform('u_resolution', [width, height]);
  fogShader.setUniform('u_time', millis() / 1000.0);

  // Cathedral in the background with depth
  push();
  translate(0, 0, -500); // Z-depth for cathedral
  cathedral.display();
  pop();

  // Characters in the foreground
  for(let character of characters) {
    character.display();
    character.update();
  }

  // Reset shader for characters if they don't need the fog effect
  resetShader();
}

// Cathedral class for generative art
class Cathedral {
  constructor() {
    this.generate();
  }

  generate() {
    this.elements = [];
    for(let i = 0; i < 50; i++) {
      let stone = {
        x: random(-width/2, width/2),
        y: random(-height/2, height/2),
        z: random(-500, -100), // Depth for 3D effect
        size: random(5, 20)
      };
      this.elements.push(stone);
    }
    // Add more detailed generative elements like spires, windows etc.
  }

  display() {
    for(let stone of this.elements) {
      push();
      translate(stone.x, stone.y, stone.z);
      fill(100, 100, 100, 200);
      box(stone.size);
      pop();
    }
  }
}

// RobedMan class needs adjustments for WEBGL
class RobedMan {
  constructor(x, y) {
    this.pos = createVector(x, y, 0); // Z coordinate for WEBGL
    this.robeColor = color(random(255), random(255), random(255));
    this.handHeight = random(-20, 20);
    this.diamondSize = random(20, 50);
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);

    // Simplified drawing for WEBGL - using primitive shapes
    fill(this.robeColor);
    box(60, 100, 20); // Body

    // Drawing the diamond with glow effect (simplified for WEBGL)
    ambientMaterial(red(diamondGlow), green(diamondGlow), blue(diamondGlow));
    push();
    translate(0, this.handHeight, 50);
    octahedron(this.diamondSize);
    pop();

    pop();
  }

  update() {
    // Update logic remains similar, with added potential for Z-axis movement
  }
}

function mousePressed() {
  // Interaction could trigger cathedral regeneration or character movement
  cathedral.generate();
  for(let character of characters) {
    character.robeColor = color(random(255), random(255), random(255));
  }
}