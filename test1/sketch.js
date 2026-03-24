let frames = [];
let currentPhoto = 0;

function preload() {
  for (let i = 1; i <= 4; i++) {
    frames.push(loadImage("20260320123501-" + i + ".jpg"));
  }
}
function setup() {
  createCanvas(800, 500);
}
function draw() {
  background(255);

  image(frames[currentPhoto], 100, 50, 600, 400);
  currentPhoto = floor(frameCount / 10 % frames.length);
}