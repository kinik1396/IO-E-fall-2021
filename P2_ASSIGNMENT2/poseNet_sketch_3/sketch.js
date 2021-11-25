let video;
let poseNet;
let pose;
let skeleton;
let noseX, noseY;
let wRx,wRy,wLx,wLy,wRz;
let R,G,B;
let nX, nY;


function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    
    pixelDensity(1);
    brush = createGraphics(width, height);
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

function draw() {
    image(video, 0, 0);

    if (pose) {
        
        noseX = pose.nose.x;
        noseY = pose.nose.y;
        nX = noseX;
        nY = noseY;
        wRx = pose.rightWrist.x;
        wRy = pose.rightWrist.y;
        wLx = pose.leftWrist.x;
        wLy = pose.leftWrist.y;
        wRz = wRx + wRy;
        
        image(brush, 0, 0, width, height);
        
        R = map(wRy, 0,height, 0, 255);
        G = map(wRx, 0, width, 0, 255);
        B = map(wRz, 0, width, 0, 255);

        strokeWeight(0);
        fill(R,G,B);
        ellipse(noseX, noseY, 30);

            brush.noErase();
            brush.stroke(R,G,B);
            brush.strokeWeight(30);
            brush.line(noseX, noseY, nX, nY);
            
            
            
        fill(R,G,B);
        ellipse(wRx, wRy, 32);
        fill(255);
        ellipse(wLx, wLy, 60);
        brush.noStroke();
        brush.erase(255,255);
        brush.fill(255);
        brush.ellipse(wLx, wLy, 60);
        
//        strokeWeight(0);
//        fill(0,0,255);
//        ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
//        ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);
//
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
