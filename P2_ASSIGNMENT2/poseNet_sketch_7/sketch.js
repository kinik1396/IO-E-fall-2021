let video;
let poseNet;
let pose;
let skeleton;
let noseX, noseY;
let wRx, wRy, wLx, wLy, wRz;
let R, G, B;
let nX, nY;
let isx = false;
let brain;
let poseLabel = "";
let jjcount = 0;

let state = 'waiting';
let targetLabel;

function keyPressed() {
    if (key == 't') {
        brain.normalizeData();
        brain.train({
            epochs: 50
        }, finished);
    } else if (key == 's') {
        brain.saveData();
    } else {
        targetLabel = key;
        console.log(targetLabel);
        setTimeout(function () {
            console.log('collecting');
            state = 'collecting';
            setTimeout(function () {
                console.log('not collecting');
                state = 'waiting';
            }, 10000);
        }, 5000);
    }
}

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

    let options = {
        inputs: 34,
        outputs: 6,
        task: 'classification',
        debug: true
    }
    brain = ml5.neuralNetwork(options);
    const modelInfo = {
        model: 'model/model.json',
        metadata: 'model/model_meta.json',
        weights: 'model/model.weights.bin',
    };
    brain.load(modelInfo, brainLoaded);
    //brain.loadData('colors.json', dataReady);
}

function brainLoaded() {
    console.log('pose classification ready!');
    classifyPose();
}

function classifyPose() {
    if (pose) {
        let inputs = [];
        for (let i = 0; i < pose.keypoints.length; i++) {
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;
            inputs.push(x);
            inputs.push(y);
        }
        brain.classify(inputs, gotResult);
    } else {
        setTimeout(classifyPose, 100);
    }
}

function gotResult(error, results) {
    console.log(results[0].label);
    if (results[0].confidence > 0.95) {
        poseLabel = results[0].label;
    }
    classifyPose();
}

function dataReady() {
    brain.normalizeData();
    brain.train({
        epochs: 50
    }, finished);
}

function finished() {
    console.log('model trained');
    brain.save();
    classifyPose();
}

function gotPoses(poses) {
    //console.log(poses);
    if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
        if (state == 'collecting') {
            let inputs = [];
            for (let i = 0; i < pose.keypoints.length; i++) {
                let x = pose.keypoints[i].position.x;
                let y = pose.keypoints[i].position.y;
                inputs.push(x);
                inputs.push(y);
            }
            let target = [targetLabel];
            brain.addData(inputs, target);
        }
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
        
        
        console.log(isx);
        
        if (poseLabel == 'x'){
            isx = true;
            
        }
        else if (poseLabel == 'j' && isx == false){
            isx = false;
        }
        
        if (poseLabel == 'j' && isx == true){
            
                jjcount++;
                isx = false;
        }
        
        textSize(500);
        textAlign(CENTER);
        text(jjcount, 310, 420);
        
//        strokeWeight(0);
//        noStroke();
//        fill(255, 0, 0)
//        ellipse(noseX, noseY, 30);
//
//
//
//
//
//        fill(0, 0, 255);
//        ellipse(wRx, wRy, 32);
//        ellipse(wLx, wLy, 32);


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
//            fill(0, 0, 255);
//            ellipse(x, y, 16, 16);
//        }
//
//        for (let i = 0; i < skeleton.length; i++) {
//            let a = skeleton[i][0];
//            let b = skeleton[i][1];
//            strokeWeight(5);
//            stroke(0, 155, 255);
//            line(a.position.x, a.position.y, b.position.x, b.position.y);
//        }
    }
}
