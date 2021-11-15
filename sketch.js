let song, osc, freq, amp, playing, cnv, font;

function preload() {
    song = loadSound('assets/ROCwhataboutme.mp3');
    font = loadFont('assets/Rubik.ttf')
}

function setup() {

    cnv = createCanvas(windowWidth, windowHeight);
    cnv.mousePressed(playOscillator);
    osc = new p5.Oscillator('triangle')
    
}

function draw() {
    
    let ampR = round(amp * 255);
    let freqR = round(freq / 2);
    
    if (playing) {
        background(freqR, ampR , random(ampR));
        osc.freq(freq, 0.5);
        osc.amp(amp, 0.5);
    }
    else{
        background(255,0,0);
    }
    
    freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
    amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
    
    textStyle(BOLD);
    text('FREQ: ' + round(freq), cnv.width / 2, cnv.height / 2);
    text('AMP: ' + round(amp) , cnv.width / 2, cnv.height / 2 + 50);
    textSize(cnv.width /30)
    textAlign(CENTER);
    textFont(font);
}


function playOscillator() {
    
    osc.start();
    playing = true;
}

function mouseReleased() {
    osc.amp(0, 0.5);
    playing = false;
}

//function mousePressed() {
//  if (song.isPlaying()) {
//    song.pause();
//    background(255, 0, 0);
//  } else {
//    song.play();
//    background(0, 255, 0);
//  }
//}
