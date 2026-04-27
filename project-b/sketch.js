let box;

let qilinImg;
let familyImg;
let messageImg;
let brainrotImg;

let warningSound;
let scanSound;

let openTime = 0;
let scanX = 0;
let soundPlayed = false;

function preload() {
  qilinImg = loadImage("IMG_5390.JPG");
  familyImg = loadImage("IMG_5391.JPG");
  messageImg = loadImage("IMG_5392.JPG");
  brainrotImg = loadImage("IMG_5394.JPG");

  warningSound = loadSound(
    "emergency-siren-alert-single-epic-stock-media-1-00-01.mp3"
  );
  scanSound = loadSound(
    "notification-metallic-ding-echo-epic-stock-media-1-00-01.mp3"
  );
}

function setup() {
  createCanvas(700, 500);
  box = new Box(250, 180, 200, 120);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(40, 45, 60);

  fill(255);
  textSize(28);
  text("Adam's Belongings, 1000 years ago", width / 2, 50);

  box.display();

  if (!box.open) {
    textSize(18);
    fill(200);
    text("interact with the box to find a way to open it", width / 2, 100);
  } else {
    if (millis() - openTime < 2000) {
      fill(200);
      text("Contents inside unknown", width / 2, 100);
    }

    if (millis() - openTime > 2000 && millis() - openTime < 5000) {
      if (!scanSound.isPlaying()) {
        scanSound.loop();
      }
      fill(200);
      text("Scanning contents...", width / 2, 100);
      fill(0, 255, 100, 120);
      rect(scanX, 250, 60, 200);
      scanX += 5;

      if (scanX > width) {
        scanX = -60;
      }
    }

    if (millis() - openTime > 5000) {
      scanSound.stop();

      if (!soundPlayed) {
        warningSound.play();
        soundPlayed = true;
      }

      fill(255, 0, 0);
      textSize(22);
      text(
        "WARNING: Contents cannot be verified, could be dangerous",
        width / 2,
        100
      );
    }

    image(qilinImg, 60, 290, 130, 100);
    image(familyImg, 210, 290, 130, 100);
    image(messageImg, 360, 290, 130, 100);
    image(brainrotImg, 510, 290, 130, 100);
  }
}

function mousePressed() {
  let wasClosed = !box.open;

  box.checkClick(mouseX, mouseY);

  if (wasClosed && box.open) {
    openTime = millis();
    soundPlayed = false;
    scanSound.stop();
  }
}

class Box {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.clicks = 0;
    this.open = false;
  }

  display() {
    if (!this.open) {
      fill(140, 90, 50);
      rect(this.x, this.y, this.w, this.h);

      fill(110, 70, 40);
      rect(this.x, this.y - 20, this.w, 20);

      fill(255);
      textSize(18);
      text("LOCK: " + this.clicks + "/3", width / 2, 270);
    } else {
      fill(140, 90, 50);
      rect(this.x, this.y + 30, this.w, this.h - 30);

      fill(180, 120, 80);
      rect(this.x, this.y - 20, this.w, 20);

      fill(255, 230, 150);
      rect(this.x + 20, this.y + 50, this.w - 40, 40);
    }
  }

  checkClick(mx, my) {
    if (
      mx > this.x &&
      mx < this.x + this.w &&
      my > this.y &&
      my < this.y + this.h &&
      !this.open
    ) {
      this.clicks++;
    }

    if (this.clicks >= 3) {
      this.open = true;
    }
  }
}
