let button;
let slider;
let arraysize;
let fr = 30;
let arraylen = 40;
let start;
let restart = true;

function setup() {
    createCanvas(windowWidth, windowHeight);

    button = createButton("Randomise Array");
    button.position(90, height*2/3 - 25);
    button.mousePressed(scrambleArray);
    
    slider = createSlider(1, 150, 30);
    slider.position(10, height*2 / 3);
    slider.style('width', '120px');
    
    arraysize = createSlider(2, 200, 40);
    arraysize.position(10, height*2 / 3 + 25);
    arraysize.style('width', '120px');

    start = createButton("Start sort");
    start.position(10, height*2/3 - 25);
    start.mousePressed(startSort);
    
    frameRate(fr);
    noLoop();
}


// Generates random array
let array = [];
for (let l = 0; l < arraylen; l++) {
    array.push(Math.random()* 15);
}

// Parameters for bubble sort
let lo = 0;
let hi = array.length-1;
let i = lo;

// bubbleSort(array, lo, hi);

function draw() {

    let rectWidth = (width-160)/array.length;
    background(220);
    translate(80, 0);

    fill(0);
    textSize(32);
    text("Bubble Sort", -65, height*2/3 - 50);
    textSize(0);

    fill(0);
    let framerateText = "Framerate: " + fr;
    text(framerateText, 150, height*2/3 + 16);
    fr = slider.value();
    frameRate(fr);

    fill(0);
    let arrayText = "Array Size: " + arraylen;
    text(arrayText, 150, height*2/3 + 41);
    arraylen = arraysize.value();


    fill(255);
    // Drawing/printing the current state of the array
    for (var k = 0; k < array.length; k++) {
        let len = (array[k]/15) * (height/2);

        rect(rectWidth * k, 20, rectWidth, len);
        fill(255);
    }

}

// Randomises array
function scrambleArray() {
    redraw();
    array = []
    for (let l = 0; l < arraylen; l++) {
        array.push(Math.random()* 15);
    }
    lo = 0;
    hi = array.length - 1;
    i = lo;

    restart = false;
    redraw();
}

function startSort() {
    bubbleSort(array, lo, hi);
}


// Bubble sort
async function bubbleSort(array, lo, hi) {
    let rectWidth = (width-160)/array.length;
    restart = true;
    
    for (let i = lo; i < hi; i++) {
        let nswaps = 0;
        for (let j = hi; j > i; j--) {
            if (array[j] < array[j-1]) {
                var tmp = array[j];
                array[j] = array[j-1];
                array[j-1] = tmp;
                nswaps++;
                
            }
            redraw();

            fill(3, 232, 252);
            rect(rectWidth*(j-1), 20, rectWidth, (array[j-1]/15) * (height/2));
            fill(255);


            fill(142, 245, 216);
            rect(rectWidth*j, 20, rectWidth, (array[j]/15) * (height/2));
            fill(255);
            await new Promise(r => setTimeout(r, 1000/fr));
            if (restart == false) {
                return;
            }
        }
        if (nswaps == 0) {
            break;
        }
        
    }
    redraw();
}