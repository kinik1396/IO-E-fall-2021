let video;
let poseNet;
let pose;
let skeleton;
let on;
let noseX, noseY;
let wRx,wRy,wLx,wLy;
let osc;

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    osc = new p5.Oscillator('traingle');
}

function gotPoses(poses) {
    //console.log(poses);
    if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function modelLoaded() {
    console.log('poseNet ready');
}

function overNose(){
    osc.start();
    
}
function notOverNose(){
    osc.amp(0, 0.5);
    
}

function draw() {
    image(video, 0, 0);

    if (pose) {
        wRx = pose.rightWrist.x;
        wRy = pose.rightWrist.y;
        wLx = pose.leftWrist.x;
        wLy = pose.leftWrist.y;
        noseX = pose.nose.x;
        noseY = pose.nose.y;
        
//        let eyeR = pose.rightEye;
//        let eyeL = pose.leftEye;
//        let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);

        strokeWeight(0);
        noStroke();
        fill(255, 0, 0);
        ellipse(noseX, noseY, 50);
        
        if (wRx >= noseX - 50 && wRx <= noseX + 50 && wRy >= noseY - 50 && wRy <= noseY + 50){
            overNose();
            osc.amp(0.2);
            osc.freq(400);
            
        } else {
            notOverNose();
        }
        if (wLx >= noseX - 50 && wLx <= noseX + 50 && wLy >= noseY - 50 && wLy <= noseY + 50){
            overNose();
            osc.amp(0.2);
            osc.freq(700);
            
        } else {
            notOverNose();
        }
        
        strokeWeight(0);
        fill(0,0,255);
        ellipse(wRx, wRy, 32);
        ellipse(wLx, wLy, 32);

//        for (let i = 0; i < pose.keypoints.length; i++) {
//            let x = pose.keypoints[i].position.x;
//            let y = pose.keypoints[i].position.y;
//            
//            strokeWeight(0);
//            fill(0,0,255);
//            ellipse(x, y, 16, 16);
//        }
//
//        for (let i = 0; i < skeleton.length; i++) {
//            let a = skeleton[i][0];
//            let b = skeleton[i][1];
//            strokeWeight(5);
//            stroke(0,155,255);
//            line(a.position.x, a.position.y, b.position.x, b.position.y);
//        }
    }
}
