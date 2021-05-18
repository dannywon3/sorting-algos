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

// Parameters for selection sort
let lo = 0;
let hi = array.length;
let i = lo;
function draw() {

    let rectWidth = (width-160)/array.length;
    background(220);
    translate(80, 0);

    fill(0);
    textSize(32);
    text("Selection Sort", -65, height*2/3 - 50);
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
    hi = array.length;
    i = lo;

    restart = false;
    redraw();
}

function startSort() {
    selectionSort(array, lo, hi);
}

// Selection sort
async function selectionSort(array, lo, hi) {

    let rectWidth = (width-160)/array.length;
    restart = true;
    
    for (let i = lo; i < hi-1; i++) {
        min = i;
        for (let j = i+1; j <= hi; j++) {
            if (array[j] < array[min]) {
                min = j;
            }
            redraw();

            fill(255, 157, 28);
            rect(rectWidth*min, 20, rectWidth, (array[min]/15) * (height/2));
            fill(255);

            fill(3, 232, 252);
            rect(rectWidth*i, 20, rectWidth, (array[i]/15) * (height/2));
            fill(255);

            if (j != hi) {
                fill(142, 245, 216);
                rect(rectWidth*j, 20, rectWidth, (array[j]/15) * (height/2));
                fill(255);
            }

            await new Promise(r => setTimeout(r, 1000/fr));
            if (restart == false) {
                return;
            }
        }
        var tmp = array[i];
        array[i] = array[min];
        array[min] = tmp;
    }
    redraw();
}