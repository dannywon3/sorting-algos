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

// Parameters for quick sort
let lo = 0;
let hi = array.length;
let i = lo;
function draw() {
    
    let rectWidth = (width-160)/array.length;
    background(220);
    translate(80, 0);

    fill(0);
    textSize(32);
    text("Merge Sort", -65, height*2/3 - 50);
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
    mergeSort(array, lo, hi);
}

// Merge sort
async function mergeSort(array, lo, hi) {
    restart = true;
    
    if (hi <= lo) {
        return;
    }

    
    await new Promise(r => setTimeout(r, 1000/fr));
    
    let mid = lo + parseInt((hi - lo) / 2);
    await Promise.all([
        mergeSort(array, lo, mid),
        mergeSort(array, mid+1, hi)
    ])
    // mergeSort(array, lo, mid);
    // mergeSort(array, mid+1, hi);
    await merge(array, lo, mid, hi);

    redraw();

    if (restart == false) {
        return;
    }

}


async function merge(array, lo, mid, hi) {
    let rectWidth = (width-160)/array.length;
    await new Promise(r => setTimeout(r, 1000/fr));

    let nL = mid - lo + 1;
    let nR = hi - mid;
    let leftArr = new Array(nL);
    let rightArr = new Array(nR);
    
    for (let m = 0; m < nL; m++) {
        leftArr[m] = array[lo + m];
    }
    for (let n = 0; n < nR; n++) {
        rightArr[n] = array[mid + 1 + n];
    }

    let m = 0;
    let n = 0;
    let k = lo;

    while (m < nL && n < nR) {
        if (leftArr[m] <= rightArr[n]) {
            if (restart == false) {
                return;
            }
            await new Promise(r => setTimeout(r, 1000/fr));
            array[k] = leftArr[m];
            m++;
            redraw();
            fill(142, 245, 216);
            rect(rectWidth*(m), 20, rectWidth, (array[m]/15) * (height/2));
            fill(255);

            fill(3, 232, 252);
            rect(rectWidth*k, 20, rectWidth, (array[k]/15) * (height/2));
            fill(255);
        }
        else {
            if (restart == false) {
                return;
            }
            await new Promise(r => setTimeout(r, 1000/fr));
            array[k] = rightArr[n];
            n++;
            redraw();
            fill(142, 245, 216);
            rect(rectWidth*(n), 20, rectWidth, (array[n]/15) * (height/2));
            fill(255);

            fill(3, 232, 252);
            rect(rectWidth*k, 20, rectWidth, (array[k]/15) * (height/2));
            fill(255);
        }
        k++;
    }

    while (m < nL) {
        if (restart == false) {
            return;
        }
        await new Promise(r => setTimeout(r, 1000/fr));
        array[k] = leftArr[m];
        m++;
        k++;
        redraw();
        fill(142, 245, 216);
        rect(rectWidth*(m), 20, rectWidth, (array[m]/15) * (height/2));
        fill(255);

        fill(3, 232, 252);
        rect(rectWidth*k, 20, rectWidth, (array[k]/15) * (height/2));
        fill(255);
    }

    while (n < nR) {
        if (restart == false) {
            return;
        }
        await new Promise(r => setTimeout(r, 1000/fr));
        array[k] = rightArr[n];
        n++;
        k++;
        redraw();
        fill(142, 245, 216);
        rect(rectWidth*(n), 20, rectWidth, (array[n]/15) * (height/2));
        fill(255);

        fill(3, 232, 252);
        rect(rectWidth*k, 20, rectWidth, (array[k]/15) * (height/2));
        fill(255);
    }


    redraw();

}


