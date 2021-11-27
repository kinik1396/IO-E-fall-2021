let language;
let speech;
let speechRec
let cnv;
let continuous = true;
let interim = true;
let words;
let con;
let dColor;
let dSize = 30;
let nX, nY;
let brush;
let wordsToNum;
let video;
let poseNet;
let pose;
let skeleton;
let noseX, noseY;
let eraseB = false;

function setup() {
    cnv = createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

    language = navigator.language || 'en-US';

    speechRec = new p5.SpeechRec(language, gotSpeech);

    speechRec.start(continuous, interim);

    speech = new p5.Speech();

    pixelDensity(1);
    brush = createGraphics(width, height);
    dColor = color('black');
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

function gotSpeech() {
    con = speechRec.resultConfidence;
    if (con >= .80) {
        if (speechRec.resultValue) {
            console.log(speechRec.resultConfidence);
            console.log(speechRec.resultString);
            words = speechRec.resultString;
            speech.speak(words);
            eraseB = false;
        }
    }
    gotRead();
}

function gotRead() {
    console.log(speech);

}

function draw() {
image(video, 0, 0);
    if (pose){
    
    background(255,255,255,100);
    noseX = pose.nose.x;
    noseY = pose.nose.y;
    mX = mouseX;
    mY = mouseY;
    nX = noseX;
    nY = noseY;
    textSize(35);
    textAlign(CENTER);
    textWidth(cnv.width);
    if (con >= .7) {

        switch (words) {
            case 'maroon':
                fill(160, 50, 50);
                text('MAROON', cnv.width / 4, 50);
                dColor = color(160, 50, 50);

                break;
            case 'green':
                fill(100, 255, 100);
                text('GREEN', cnv.width / 4, 50);
                dColor = color(100, 255, 100);
                break;
            case 'blue':
                fill(100, 100, 255);
                text('BLUE', cnv.width / 4, 50);
                dColor = color(100, 100, 255);
                break;
            case 'orange':
                fill(255, 140, 100);
                text('ORANGE', cnv.width / 4, 50);
                dColor = color(255, 140, 100);
                break;
            case 'yellow':
                fill(255, 255, 100);
                text('YELLOW', cnv.width / 4, 50);
                dColor = color(255, 255, 100);
                break;
            case 'purple':
                fill(128, 0, 128);
                text('PURPLE', cnv.width / 4, 50);
                dColor = color(128, 30, 128);
                break;
            case 'black':
                fill(0);
                text('BLACK', cnv.width / 4, 50);
                dColor = color(0);
                break;
            case 'white':
                fill(255);
                text('WHITE', cnv.width / 4, 50);
                dColor = color(255);
                break;
            case 'erase':
                text('ERASE', cnv.width / 4, 50);
                eraseB = true;
                break;
            case 'clear':
                brush.clear();
                break;
            default:
                fill(0);
                text(words, cnv.width / 4, 50);
        }
    } else if (con <= .5) {

        text("Please Wait...", cnv.width / 4, 50);

    } else {
        text("Say Something", cnv.width / 4, 50);
    }
    wordsToNum = int(words);
    if (wordsToNum >= 1 || wordsToNum <= 100) {
        dSize = wordsToNum;
    }
        

    image(brush, 0, 0, width, height);
        if (eraseB == true) {
        brush.noStroke();
        brush.erase(255, 255);
        brush.fill(244);
        brush.ellipse(noseX, noseY, dSize);
    } else {
        brush.noStroke();
        brush.noErase();
        brush.fill(dColor);
        brush.ellipse(noseX, noseY, dSize);
    }
    }

}


