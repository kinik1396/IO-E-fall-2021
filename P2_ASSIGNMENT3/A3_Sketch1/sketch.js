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
    
    fill(255);
    textSize(35);
    textAlign(CENTER);
    textWidth(cnv.width);
    if (con >= .5){
    text(words,cnv.width /2,480/2);
    }
    else if (con <= .5){
        
            text("Please Wait...",cnv.width /2,480/2);
    
    }
    else{
        text("Say Something",cnv.width /2,480/2);
    }
}