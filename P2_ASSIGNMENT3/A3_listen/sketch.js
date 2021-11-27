let language;
let speech;
let speechRec
let cnv;

let words;

function setup() {
    cnv = createCanvas(640,480);

    language = navigator.language || 'en-US';
    
    speechRec = new p5.SpeechRec(language, gotSpeech);
    
    speechRec.start();
    
    
    

}

function gotSpeech() {
    if (speechRec.resultValue) {
        console.log(words = speechRec.resultString);
        words = speechRec.resultString;
    }
}

function draw(){
    
    background(0);
    fill(255);
    textSize(35);
    textAlign(CENTER);
    text(words,cnv.width /2,480/2);
}