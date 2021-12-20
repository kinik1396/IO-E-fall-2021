// Kinik Khan
// Project 4
// Fall 2021
//this iteration i am trying to get an array of bright colors and have the vector follow it around

var video;
var canvas;

var tolerance = 50;
var brightestColors = [];
var bColor;
var matchR;
var matchG;
var matchB;

function preload() {


}

function setup() {
    canvas = createCanvas(1280, 920);
    

    bColor = color(255, 255, 255);

    brightestColors[0] = color(143, 175, 54);
    brightestColors[1] = color(255, 135, 0);
    brightestColors[2] = color(255, 211, 0);
    brightestColors[3] = color(222, 255, 10);
    brightestColors[4] = color(161, 255, 10);
    brightestColors[5] = color(10, 255, 153);
    brightestColors[6] = color(10, 239, 255);
    brightestColors[7] = color(20, 125, 245);
    brightestColors[8] = color(88, 10, 255);
    
    video = createCapture(VIDEO);
    video.size(canvas.width, canvas.height);
    video.hide();




}

function draw() {
    imageMode(CORNER);
    push();
    translate(width, 0);
    scale(-1, 1);
    image(video, 0, 0, width, height);
    strokeWeight(2);



    var firstPx = findColor(video, bColor, tolerance);






    if (firstPx !== undefined) {
        fill(bColor);
        stroke(255);
        strokeWeight(2);
        circle(firstPx.x, firstPx.y, 30);
    }
}


function mousePressed() {
    loadPixels();
    bColor = get(mouseX, mouseY);
    
}

function findColor(input, c, tolerance) {

    if (input.width === 0 || input.height === 0) {
        return undefined;
    }

    matchR = c[0];
    matchG = c[1];
    matchB = c[2];

    for (var i = 0; i < brightestColors.length; i++) {
        if (c[0] >= brightestColors[i].levels[0] - tolerance && c[0] <= brightestColors[i].levels[0] + tolerance && c[1] >= brightestColors[i].levels[1] - tolerance && c[1] <= brightestColors[i].levels[1] + tolerance && c[2] >= brightestColors[i].levels[2] - tolerance && c[2] <= brightestColors[i].levels[2] + tolerance) {





            input.loadPixels();
            for (var y = 0; y < input.height; y++) {
                for (var x = 0; x < input.width; x++) {

                    // current pixel color
                    var index = (y * video.width + x) * 4;
                    var r = video.pixels[index];
                    var g = video.pixels[index + 1];
                    var b = video.pixels[index + 2];

                    if (r >= matchR - tolerance && r <= matchR + tolerance &&
                        g >= matchG - tolerance && g <= matchG + tolerance &&
                        b >= matchB - tolerance && b <= matchB + tolerance) {

                        return createVector(x, y);
                    }
                }
            }
            return undefined;
        }
        else{
            input.loadPixels();
            for (var y2 = 0; y2 < input.height; y2++) {
                for (var x2 = 0; x2 < input.width; x2++) {

                    // current pixel color
                    var index2 = (y2 * video.width + x2) * 4;
                    var r2 = video.pixels[index2];
                    var g2 = video.pixels[index2 + 1];
                    var b2 = video.pixels[index2 + 2];

                    if (r2 >= matchR - tolerance && r2 <= matchR + tolerance &&
                        g2 >= matchG - tolerance && g2 <= matchG + tolerance &&
                        b2 >= matchB - tolerance && b2 <= matchB + tolerance) {

                    }
                }
            }
            return undefined;
        }
        
    }
    

}
