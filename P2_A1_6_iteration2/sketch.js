let song, osc, freq, amp, playing, cnv, font, heli;

let serial;
let latestData = "waiting for data";
let splitter;
let heliX = 0,
    heliY = 0,
    heliZ = 0;
let fitheliX, fitheliY , heliSize;

function preload() {
    font = loadFont('assets/Rubik.ttf');
    heli = loadImage('assets/Heli2.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    serial = new p5.SerialPort();

    serial.list();
    serial.open('COM3');

    serial.on('connected', serverConnected);

    serial.on('list', gotList);

    serial.on('data', gotData);

    serial.on('error', gotError);

    serial.on('open', gotOpen);

    serial.on('close', gotClose);

    cnv = createCanvas(windowWidth, windowHeight);
    heli.resize(300,100);
    //    cnv.mousePressed(playOscillator);
    //    osc = new p5.Oscillator('triangle');

    
//    osc1 = new p5.TriOsc(); // set frequency and type
//    osc1.amp(.5);
//    osc2 = new p5.TriOsc(); // set frequency and type
//    osc2.amp(.5);
//    osc3 = new p5.TriOsc(); // set frequency and type
//    osc3.amp(.5);
//
//    fft = new p5.FFT();
//    osc1.start();
//    osc2.start();
//    osc3.start();
}

function serverConnected() {
    print("Connected to Server");
}

function gotList(thelist) {
    print("List of Serial Ports:");

    for (let i = 0; i < thelist.length; i++) {
        print(i + " " + thelist[i]);
    }
}

function gotOpen() {
    print("Serial Port is Open");
}

function gotClose() {
    print("Serial Port is Closed");
    latestData = "Serial Port is Closed";
}

function gotError(theerror) {
    print(theerror);
}

function gotData() {
    let currentString = serial.readLine();
    trim(currentString);
    if (!currentString) return;
    //console.log('currentString ', currentString);
    latestData = currentString;
    //console.log("latestData" + latestData); //check to see if data is coming in
    splitter = split(latestData, ','); // split each number using the comma as a delimiter
    //console.log("splitter[0]" + splitter[0]); 
    heliX = splitter[0]; //put the first sensor's data into a variable
    heliY = splitter[1];
    heliZ = splitter[2];
}



function draw() {
    background(255, 255, 255);
    text(latestData, 10, 10);
    fitheliX = heliX * (cnv.width / 100);
    fitheliY = heliZ * (cnv.height / 100);
    heliSize = heliY;
    image(heli, fitheliX, fitheliY, 300 , 100 );
    imageMode(CENTER);

    


    //    var freq = map(diameter0, 0, width, 40, 880);
    //    osc1.freq(freq);
    //    //console.log(freq);
    //
    //    var freq2 = map(diameter1, 0, width, 40, 880);
    //    osc2.freq(freq2);
    //    //console.log(freq2);
    //
    //    var freq3 = map(diameter2 * 10, 0, width, 40, 880);
    //    osc3.freq(freq3);









    //    let ampR = round(amp * 255);
    //    let freqR = round(freq / 2);

    //    if (playing) {
    //        background(freqR, ampR , random(ampR));
    //        osc.freq(freq, 0.5);
    //        osc.amp(amp, 0.5);
    //    }
    //    else{
    //        background(255,0,0);
    //    }
    //    
    //    freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
    //    amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
    //    
    //    textStyle(BOLD);
    //    text('FREQ: ' + round(freq), cnv.width / 2, cnv.height / 2);
    //    text('AMP: ' + round(amp) , cnv.width / 2, cnv.height / 2 + 50);
    //    textSize(cnv.width /30)
    //    textAlign(CENTER);
    //    textFont(font);
}

function mouseClicked() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
        //console.log("getAudioContext().state" + getAudioContext().state);
    }
};

//function playOscillator() {
//
//    osc.start();
//    playing = true;
//}
//
//function mouseReleased() {
//    osc.amp(0, 0.5);
//    playing = false;
//}

//function mousePressed() {
//  if (song.isPlaying()) {
//    song.pause();
//    background(255, 0, 0);
//  } else {
//    song.play();
//    background(0, 255, 0);
//  }
//}
