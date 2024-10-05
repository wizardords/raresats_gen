let characters = [];
let totalChars = 3333;
let traitVariations = {
  color: ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33A1", "#33FFF6"],
  sizeMultiplier: [0.8, 1, 1.2],
  eyeSize: [0.1, 0.15, 0.2],
  // Add more traits like shape, accessory, etc.
};

function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < totalChars; i++) {
    characters.push(new Character(random(width), random(height), random(traitVariations.color)));
  }
}

function draw() {
  background(220);
  characters.forEach(char => {
    char.update();
    char.display();
  });
}

class Character {
  constructor(x, y, color) {
    this.position = createVector(x, y);
    this.color = color;
    this.size = random(30, 60);
    this.speed = random(0.5, 2);
    this.eyeSize = random(traitVariations.eyeSize);
    this.sizeMultiplier = random(traitVariations.sizeMultiplier);
  }

  update() {
    // Simple movement logic; you can expand this for more complex behavior
    this.position.x += sin(frameCount * 0.05 * this.speed);
    this.position.y += cos(frameCount * 0.05 * this.speed);
    
    // Wrap around the screen
    if (this.position.x > width) this.position.x = 0;
    if (this.position.y > height) this.position.y = 0;
  }

  display() {
    fill(this.color);
    push();
    translate(this.position.x, this.position.y);
    // Body
    rect(-this.size/2, 0, this.size, this.size * this.sizeMultiplier, this.size/4);
    // Head
    ellipse(0, -this.size/2, this.size * 0.7, this.size * 0.7);
    // Eyes for simplicity - could be more complex based on traits
    fill(0);
    ellipse(-this.size/5, -this.size/2, this.size * this.eyeSize);
    ellipse(this.size/5, -this.size/2, this.size * this.eyeSize);
    pop();

    // Recursive children (simplified for visualization)
    if (this.size > 20) {
      push();
      translate(this.size/2, this.size/2);
      scale(0.7);
      this.display(); // Recursively call display for a smaller character
      pop();
    }
  }
}