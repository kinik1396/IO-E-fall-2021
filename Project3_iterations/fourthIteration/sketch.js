// Kinik Khan
// Project 4
// Fall 2021
//this iteration i was messing with multiple people in posess
var video;
var canvas;
var tolerance = 5;
var getPointColor;
var getPointColor1;
var picture;

var poseNet;
var poses = [];

function preload() {
    

}

function setup() {
    canvas = createCanvas(1280, 920);
    

    picture = loadImage("img/three.jpeg");
    video = createCapture(VIDEO);
    video.hide();
    video.size(canvas.width, canvas.height);

    poseNet = ml5.poseNet(video, 'multiple', modelReady);
    poseNet.on('pose', function(results) {
        poses = results;
  });
}

function modelReady() {
  console.log('Model Loaded!');
}

function draw() {
    imageMode(CORNER);
    image(picture, 0, 0, 1280, 920);
    
    if (poses.length = 1) {
        
        var person0 = poses[0].pose;
        skeleton = poses[0].skeleton;
        
        var RHipX = person0.rightHip.x; 
        var RHipY = person0.rightHip.y; 
        var RShoX = person0.rightShoulder.x; 
        var RShoY = person0.rightShoulder.y; 
        var LHipX = person0.leftHip.x; 
        var LHipY = person0.leftHip.y; 
        var LShoX = person0.leftShoulder.x; 
        var LShoY = person0.leftShoulder.y; 
        
        var ShoLerpX = lerp(RShoX, LShoX,0.5);
        var ShoLerpY = lerp(RShoY, LShoY,0.5);
        var HipLerpX = lerp(RHipX, LHipX,0.5);
        var HipLerpY = lerp(RHipY, LHipY,0.5);
        
        var px = lerp(ShoLerpX,ShoLerpY, 0.5);
        var py = lerp(HipLerpX,HipLerpY, 0.5);
        
        getPointColor = get(px,py);
        fill(getPointColor);
        stroke(255);
        strokeWeight(2);
        circle(px, py, 30);
    
        var person1 = poses[1].pose;
        
        var RHip1X = person1.rightHip.x; 
        var RHip1Y = person1.rightHip.y; 
        var RSho1X = person1.rightShoulder.x; 
        var RSho1Y = person1.rightShoulder.y; 
        var LHip1X = person1.leftHip.x; 
        var LHip1Y = person1.leftHip.y; 
        var LSho1X = person1.leftShoulder.x; 
        var LSho1Y = person1.leftShoulder.y; 
        
        var ShoLerpX1 = lerp(RSho1X, LSho1X,0.5);
        var ShoLerpY1 = lerp(RSho1Y, LSho1Y,0.5);
        var HipLerpX1 = lerp(RHip1X, LHip1X,0.5);
        var HipLerpY1 = lerp(RHip1Y, LHip1Y,0.5);
        
        var p1x = lerp(ShoLerpX1,ShoLerpY1, 0.5);
        var p1y = lerp(HipLerpX1,HipLerpY1, 0.5);
        
        getPointColor1 = get(p1x,p1y);
        fill(getPointColor1);
        stroke(255);
        strokeWeight(2);
        circle(p1x, p1y, 30);
        
        var person2 = poses[2].pose;
        
        var RHip2X = person2.rightHip.x; 
        var RHip2Y = person2.rightHip.y; 
        var RSho2X = person2.rightShoulder.x; 
        var RSho2Y = person2.rightShoulder.y; 
        var LHip2X = person2.leftHip.x; 
        var LHip2Y = person2.leftHip.y; 
        var LSho2X = person2.leftShoulder.x; 
        var LSho2Y = person2.leftShoulder.y; 
        
        var ShoLerpX2 = lerp(RSho2X, LSho2X,0.5);
        var ShoLerpY2 = lerp(RSho2Y, LSho2Y,0.5);
        var HipLerpX2 = lerp(RHip2X, LHip2X,0.5);
        var HipLerpY2 = lerp(RHip2Y, LHip2Y,0.5);
        
        var p2x = lerp(ShoLerpX2,ShoLerpY2, 0.5);
        var p2y = lerp(HipLerpX2,HipLerpY2, 0.5);
        
        getPointColor1 = get(p2x, p2y);
        fill(getPointColor1);
        stroke(255);
        strokeWeight(2);
        circle(p2x, p2y, 30);
        
    }
    
    
//    var firstPx = findColor(video, getPointColor, tolerance);

    
        
    
}



//function mousePressed() {
//    loadPixels();
//    colorToMatch = get(mouseX, mouseY);
//    
//
//}

function findColor(input, c, tolerance) {

    if (input.width === 0 || input.height === 0) {
        return undefined;
    }

    

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
    
}

