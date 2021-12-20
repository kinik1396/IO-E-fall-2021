// Kinik Khan
// Project 4
// Fall 2021
//This iterations shows how i used the skeleton to create a body.

var video;
var canvas;
var tolerance = 5;
var getPointColor;
var getPointColor1;
var picture;

var vScale = 16;

var poseNet;
var poses = [];
var pose
function preload() {
    

}

function setup() {
    canvas = createCanvas(1280, 920);
    pixelDensity(1)

   
    video = createCapture(VIDEO);
    video.hide();
    video.size(canvas.width, canvas.height);

    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', gotPoses);
}

function modelReady() {
  console.log('Model Loaded!');
}


function gotPoses(poses) {
  //console.log(poses); 
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}


function draw() {
    imageMode(CORNER);
    push();
    translate(width, 0);
    scale(-1, 1);
    image(video, 0, 0, width, height);
    background('rgba(0,0,0,0.9)');
    strokeWeight(2);
    

  if (pose) {
        var RHipX = pose.rightHip.x; 
        var RHipY = pose.rightHip.y; 
        var RShoX = pose.rightShoulder.x; 
        var RShoY = pose.rightShoulder.y; 
        var LHipX = pose.leftHip.x; 
        var LHipY = pose.leftHip.y; 
        var LShoX = pose.leftShoulder.x; 
        var LShoY = pose.leftShoulder.y; 
      
    
      
    fill(255, 255, 255);
    ellipse(pose.nose.x, pose.nose.y, 250,350 );
    fill(0, 0, 255);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);
    
    fill (255,255,255);
    quad(RHipX,RHipY,LHipX,LHipY,LShoX,LShoY,RShoX,RShoY);
      
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0,255,0);
      ellipse(x,y,16,16);
    }
    
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(50);
      stroke(255);
      line(a.position.x, a.position.y,b.position.x,b.position.y);      
    }
  }
}
      
    
    
    
//    var firstPx = findColor(video, getPointColor, tolerance);

    
        
    




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

