// Kinik Khan
// Project 4
// Fall 2021
//This iteration i was trying my best to get this color match to work with posenet but it didnt
var video;
var canvas;
var poseNet;

var tolerance = 50;
var brightestColors = [];
var getColor;
var bColor;
var matchR;
var matchG;
var matchB;

function preload() {


}

function setup() {
    canvas = createCanvas(1280, 920);
    video = createCapture(VIDEO);
    video.size(canvas.width, canvas.height);

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


    //    poseNet = ml5.poseNet(video, 'multiple', modelReady);
    //    poseNet.on('pose', function(results) {
    //    poses = results;
    //  });
    video.hide();




}
//function modelReady() {
//  select('#status').html('Model Loaded');
//}
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

    for (var i = 0; i < 8; i++) {
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
        
    }
    

}
