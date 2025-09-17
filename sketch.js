const trails = [];
const gridSize = 20;
const cursorUnits = 3;
const revealTime = 4000;
const fadeTime = 0;

// --- NEW: Variables for the text content and font ---
let manropeFont;
const topLayerText = 'A strategic product designer with deep expertise in complex product ecosystems.\n\nI transform challenging workflows into differentiating experiences — driving adoption, productivity and growth.';

// --- NEW: Preload the font file before the sketch starts ---
function preload() {
  manropeFont = loadFont('assets/Manrope-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(255); // white top layer

  // --- NEW: Draw the text onto the canvas ---
  textFont(manropeFont);
  textSize(22.4); // Approx 1.4rem
  fill('#37393D'); // Original text color
  textAlign(LEFT, TOP);
  
  // Position the text to match the original layout
  const textX = 24;
  const textY = 80 + 30; // 80px header + 30px padding
  const textMaxWidth = windowWidth * 0.5;
  
  text(topLayerText, textX, textY, textMaxWidth, windowHeight - textY);

  // --- The reveal/erase logic now runs AFTER the text is drawn ---
  for (const t of trails) {
    const age = millis() - t.time;

    if (age < revealTime) {
      erase();
      rect(t.x, t.y, t.w, t.h);
      noErase();
    } else if (age < revealTime + fadeTime) {
      const progress = (age - revealTime) / fadeTime;
      const eased = progress * progress * (3 - 2 * progress);
      fill(255, 255 * eased);
      rect(t.x, t.y, t.w, t.h);
    }
  }

  // --- Performance Update ---
  while (trails.length > 0 && millis() - trails[0].time > revealTime + fadeTime) {
    trails.shift();
  }
}

function mouseMoved() {
  const x = floor(mouseX / gridSize) * gridSize;
  const y = floor(mouseY / gridSize) * gridSize;

  trails.push({
    x: x - (cursorUnits / 2) * gridSize,
    y: y - (cursorUnits / 2) * gridSize,
    w: cursorUnits * gridSize,
    h: cursorUnits * gridSize,
    time: millis(),
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}