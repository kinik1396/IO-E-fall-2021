// Kinik Khan
// Project 4
// Fall 2021
// In this final iteration i get the skeleton of my body through posenet to create a sillhouette of whoever might pass by

var video;
var canvas;
var tolerance = 5;
var getPointColor;
var getPointColor1;
var picture;
var brightestColors =[];
var vScale = 16;
var poseNet;
var poses = [];
var pose;
var colorPic = 0;
var img;


function preload() {
    img = loadImage('img/rainbow.png')

}

function setup() {
    canvas = createCanvas(1280, 920);
    pixelDensity(1)

    
    video = createCapture(VIDEO);
    video.hide();
    video.size(canvas.width, canvas.height);
    
    brightestColors[0] = color(143, 175, 54);
    brightestColors[1] = color(255, 135, 0);
    brightestColors[2] = color(255, 211, 0);
    brightestColors[3] = color(222, 255, 10);
    brightestColors[4] = color(161, 255, 10);
    brightestColors[5] = color(10, 255, 153);
    brightestColors[6] = color(10, 239, 255);
    brightestColors[7] = color(20, 125, 245);
    brightestColors[8] = color(88, 10, 255);
    
    
    
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
    image(img, 0,0, width,height);
    
    //makes the color of the skeleton
    var r = brightestColors[1].levels[0];
    var g = brightestColors[1].levels[1];
    var b = brightestColors[1].levels[2];
    
    //takes that color and distributes it
    var bigColor = color(r,g,b);
   
    
person = false;
  if (pose) {
      //gets the positions in posenet
        var RHipX = pose.rightHip.x; 
        var RHipY = pose.rightHip.y; 
        var RShoX = pose.rightShoulder.x; 
        var RShoY = pose.rightShoulder.y; 
        var LHipX = pose.leftHip.x; 
        var LHipY = pose.leftHip.y; 
        var LShoX = pose.leftShoulder.x; 
        var LShoY = pose.leftShoulder.y; 
      
        var ShoLerpX = lerp(RShoX, LShoX,0.5);
        var ShoLerpY = lerp(RShoY, LShoY,0.5);
        var HipLerpX = lerp(RHipX, LHipX,0.5);
        var HipLerpY = lerp(RHipY, LHipY,0.5);
        
        var px = lerp(ShoLerpX,ShoLerpY, 0.5);
        var py = lerp(HipLerpX,HipLerpY, 0.5);
      
    
    //makes the shapes based on the positons in posenet
    fill(bigColor);
    ellipse(pose.nose.x, pose.nose.y,250 ,350 );
    fill(bigColor);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);
    
    
    fill (bigColor);
    
    quad(RHipX,RHipY,LHipX,LHipY,LShoX,LShoY,RShoX,RShoY);
    
    drawingContext.shadowBlur= 32;
    drawingContext.shadowColor= color(bigColor);
    ellipse(px,py,50,40)
        
    
    
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(50);
      stroke(bigColor);
      line(a.position.x, a.position.y,b.position.x,b.position.y);      
    }
    
  
        
  }
}




