/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let x;
let y;
let size = 10;
let n = 10;
let spread = 0
let mouseholdtime = 0
let exploded = false

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.parent("p5-canvas-container");
}

function draw() {
    if (mouseIsPressed) {
        mouseholdtime++;
        if (mouseholdtime > 1200) {
            exploded = true
        }

        if (mouseholdtime > 180) {
            background(random(255), random(255), random(255));
        } else {
            background("red");
        }

    } else {
        background(0);
        mouseholdtime = 0;
    }

    drawCreature();
}

function drawCreature() {
    if (exploded) return;
    if (mouseIsPressed) {
        size += 0.2;
    } else {
        size = 10;
    }

    stroke(255);
    noFill();
    x = width / 2;
    y = height / 2;
    if (mouseIsPressed) {
        x = x + random(-0.5, 1);
        y = y + random(-0.5, 1);
    }
    if (mouseIsPressed) {
        spread = 100;
    } else {
        spread *= 0.9;
    }



    fill(150, 0, 200);
    noStroke();
    ellipse(x - 55 + random(-spread, spread), y - 180 + random(-spread, spread), 30, 30);
    ellipse(x + 100 + random(-spread, spread), y - 160 + random(-spread, spread), 30, 30);
    ellipse(x - 130 + random(-spread, spread), y - 100 + random(-spread, spread), 30, 30);
    ellipse(x - 130 + random(-spread, spread), y + 150 + random(-spread, spread), 30, 30);
    ellipse(x + 140 + random(-spread, spread), y + 80 + random(-spread, spread), 30, 30);
    ellipse(x + 50 + random(-spread, spread), y + 130 + random(-spread, spread), 30, 30);

    if (mouseholdtime > 180) {
        fill(0, 255, 0);
    } else {
        fill(150, 0, 200);
    }

    beginShape();
    for (let i = 0; i < n; i++) {
        let angle = map(i, 0, n, 0, 360);
        let offset = map(i, 0, n, 0, 15);
        let rad = 100 + sin(frameCount / 10 + offset) * size;
        let x = width / 2 + cos(radians(angle)) * rad;
        let y = height / 2 + sin(radians(angle)) * rad;
        curveVertex(x, y);
        angle = map(i, 0, n, 0, 360);
        offset = map(i, 0, n, 0, 15);
        rad = 100 + sin(frameCount / 30 + offset) * 20;
        x = width / 2 + cos(radians(angle)) * rad;
        y = height / 2 + sin(radians(angle)) * rad;
        curveVertex(x, y);
    }
    endShape(CLOSE);
    let eyeMove = sin(frameCount * 0.1) * 3;
    fill(255);
    noStroke();
    ellipse(width / 2 - 20 + eyeMove, height / 2 - 10, 15, 15);
    ellipse(width / 2 + 20 + eyeMove, height / 2 - 10, 15, 15);


    stroke(200);
    strokeWeight(4);
    for (let i = 50; i < width; i += 40) {
        if (mouseholdtime > 180) continue;
        line(i, 0, i, height);

    }

    line(0, 20, width, 20);
    line(0, height - 20, width, height - 20);

}

