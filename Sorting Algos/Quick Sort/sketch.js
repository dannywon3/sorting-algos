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
    text("Quick Sort", -65, height*2/3 - 50);
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
    quickSort(array, lo, hi);
}

// Quick sort
async function quickSort(array, lo, hi) {
    await new Promise(r => setTimeout(r, 1000/fr));
    restart = true;
    
    if (lo < hi) {
        let p = await partition(array, lo, hi);
        await Promise.all([
            quickSort(array, lo, p - 1),
            quickSort(array, p + 1, hi)
        ]);

        redraw();
    }

    if (restart == false) {
        return;
    }

}


async function partition(array, lo, hi) {
    let rectWidth = (width-160)/array.length;
    let pivot = array[hi];
    let m = lo;
    for (let n = lo; n <= hi; n++) {
        if (array[n] < pivot) {
            await new Promise(r => setTimeout(r, 1000/fr));
            

            redraw();
            fill(142, 245, 216);
            rect(rectWidth*(m), 20, rectWidth, (array[m]/15) * (height/2));
            fill(255);

            fill(3, 232, 252);
            rect(rectWidth*n, 20, rectWidth, (array[n]/15) * (height/2));
            fill(255);

            var tmp = array[m];
            array[m] = array[n];
            array[n] = tmp;
            m++;

            if (restart == false) {
                return;
            }
        }
    }
    await new Promise(r => setTimeout(r, 1000/fr));

    redraw();
    fill(142, 245, 216);
    rect(rectWidth*(hi), 20, rectWidth, (array[hi]/15) * (height/2));
    fill(255);

    fill(3, 232, 252);
    rect(rectWidth*m, 20, rectWidth, (array[m]/15) * (height/2));
    fill(255);
    
    var tmp = array[m];
    array[m] = array[hi];
    array[hi] = tmp;
    
    if (restart == false) {
        return;
    }

    return m;
}




// function partition(array, lo, hi) {
//     let pivot = array[ Math.floor((hi + lo)/2) ];
//     let m = lo - 1;
//     let n = hi + 1;
//     while (m < n) {
//         m++;
//         while (array[m] < pivot) {
//             n--;
//         }
//         while(array[n] > pivot) {
//             if (m >= n) {
//                 return n;
//             }

//             var tmp = array[m];
//             array[m] = array[n];
//             array[n] = tmp;
//         }
//     }
// }