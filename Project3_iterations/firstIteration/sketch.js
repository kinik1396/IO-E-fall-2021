// Kinik Khan
// Project 4
// Fall 2021
// found a way to find a specific color and have a vector follow it 
//https://editor.p5js.org/jeffThompson/sketches/30YhUmgVU

var video;
var canvas;
var tolerance = 5;
var colorToMatch;

function preload() {


}

function setup() {
    canvas = createCanvas(1280, 920);



    video = createCapture(VIDEO);
    video.hide();
    video.size(1280, 920);

    colorToMatch = color(143,175,54);


}
function draw() {
    imageMode(CORNER);
    image(video, 0, 0);

    var firstPx = findColor(video, colorToMatch, tolerance);

    if (firstPx !== undefined) {
        fill(colorToMatch);
        stroke(255);
        strokeWeight(2);
        circle(firstPx.x, firstPx.y, 30);
    }
}


function mousePressed() {
    loadPixels();
    colorToMatch = get(mouseX, mouseY);


}

function findColor(input, c, tolerance) {

    if (input.width === 0 || input.height === 0) {
        return undefined;
    }

    let matchR = c[0];
    let matchG = c[1];
    let matchB = c[2];

    input.loadPixels();
    for (let y = 0; y < input.height; y++) {
        for (let x = 0; x < input.width; x++) {

            // current pixel color
            let index = (y * video.width + x) * 4;
            let r = video.pixels[index];
            let g = video.pixels[index + 1];
            let b = video.pixels[index + 2];
            if (r >= matchR - tolerance && r <= matchR + tolerance &&
                g >= matchG - tolerance && g <= matchG + tolerance &&
                b >= matchB - tolerance && b <= matchB + tolerance) {

                // send back the x/y location immediately
                // (faster, since we stop the loop)
                return createVector(x, y);
            }
        }
    }
    return undefined;
}

