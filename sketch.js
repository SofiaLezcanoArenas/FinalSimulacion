let roots = [];
let flowfield;
let audio, amplitude;
let spacing = 20;
let cols, rows;

function preload() {
  soundFormats('mp3', 'ogg');
  audio = loadSound('assets/AURORA - The Seed.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 255);
  audio.loop();
  amplitude = new p5.Amplitude();

  cols = floor(width / spacing);
  rows = floor(height / spacing);
  flowfield = new FlowField(spacing);

  background(0);
}

function draw() {
  let level = amplitude.getLevel();
  let brightness = map(level, 0, 0.3, 20, 100);
  let speed = map(level, 0, 0.3, 0.5, 3); // velocidad sensible al audio

  flowfield.update();

  for (let i = 0; i < 4; i++) {
    roots.push(new Root(width / 2, height / 2, flowfield)); // inicia desde el centro
  }

  for (let i = roots.length - 1; i >= 0; i--) {
    let r = roots[i];
    r.update(speed);
    r.display(brightness);
    if (r.isDead()) {
      roots.splice(i, 1);
    }
  }

}

// Make a new flowfield
function mousePressed() {
  flowfield.init();
}
