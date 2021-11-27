let language;
let speech;
let speechRec
let cnv;
let continuous = true;
let interim = true;
let words;
let con;

function setup() {
    cnv = createCanvas(640,480);

    language = navigator.language || 'en-US';
    
    speechRec = new p5.SpeechRec(language, gotSpeech);
    
    speechRec.start(continuous, interim);
    
    
    

}

function gotSpeech() {
    if (speechRec.resultValue) {
        console.log(speechRec.resultConfidence);
        console.log(speechRec.resultString);
        words = speechRec.resultString;
        con = speechRec.resultConfidence;
    }
}

function draw(){
    
    background(0);
    
    textSize(35);
    textAlign(CENTER);
    textWidth(cnv.width);
    if (con >= .7){
        
        switch (words) {
            case 'red':
                fill(255, 100, 100);
                text(words,cnv.width /2,480/2);
                break;
            case 'green':
                fill(100, 255, 100);
                text(words,cnv.width /2,480/2);
                break;
            case 'blue':
                fill(100, 100, 255);
                text(words,cnv.width /2,480/2);
                break;
            case 'orange':
                fill(255, 140, 100);
                text(words,cnv.width /2,480/2);
                break;
            case 'yellow':
                fill(255, 255, 100);
                text(words,cnv.width /2,480/2);
                break;
            case 'purple':
                fill(128, 0, 128);
                text(words,cnv.width /2,480/2);
                break;
            default:
                fill(255, 255, 255);
                text(words,cnv.width /2,480/2);
        }
    }
    
    else if (con <= .5){
        
            text("Please Wait...",cnv.width /2,480/2);
    
    }
    else{
        text("Say Something",cnv.width /2,480/2);
    }
}