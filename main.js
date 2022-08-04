const gridCon = document.querySelector("#grid-container");
const cellCounter = document.querySelector("#cell-counter");
const counterCount = document.querySelector("#counter-count");
const clearBtn = document.querySelector("#clear-btn");
const colorPicker = document.querySelector("#color-picker");
const solidBtn = document.querySelector("#solid-btn");
const rainbowBtn = document.querySelector("#rainbow-btn");
const shadeBtn = document.querySelector("#shade-btn");
const tintBtn = document.querySelector("#tint-btn");
const styleBtns = [solidBtn, rainbowBtn, shadeBtn, tintBtn];
let sketchStyle = solidSketch;
const lineModeBtn = document.querySelector("#line-mode-btn");
const dotModeBtn = document.querySelector("#dot-mode-btn");

function changeSketchStyle(e) {
    switch (e.target) {
        case solidBtn:
            sketchStyle = solidSketch;
            break;
        case rainbowBtn:
            sketchStyle = rainbowSketch;
            break;
        case shadeBtn:
            sketchStyle = shadeSketch;
            break;
        case tintBtn:
            sketchStyle = tintSketch;
            break;
        default:
            sketchStyle = solidSketch;
    }
}

function getRandomNum(num, filler=0) {
    return Math.floor(Math.random()*num)+filler;
}

function getRGBValues(rgb) {
    const rgbValues = rgb.match(/[\d]+/g);
    return {
        red: parseInt(rgbValues[0]),
        green: parseInt(rgbValues[1]),
        blue: parseInt(rgbValues[2])
    }
}

function convertHexToRGB(hex) {
    const hexValues = hex.match(/[\w]{2}/g);
    const rgbValues = hexValues.map((hexValue) => parseInt(hexValue, 16));
    return `rgb(${rgbValues})`
}

function getPercentValue(num, percentage) {
    return Math.floor(num * percentage / 100);
}

function rainbowSketch(e) {
    e.target.style.backgroundColor = `rgb(${getRandomNum(255, 100)}, ${getRandomNum(255, 50)}, ${getRandomNum(255, 50)})`;
}

function shadeSketch(e) {
    const oldColor = getRGBValues(e.target.style.backgroundColor);
    const colorPercentage = getPercentValue(255, 10);
    const newRed = oldColor.red - colorPercentage;
    const newGreen = oldColor.green - colorPercentage;
    const newBlue = oldColor.blue - colorPercentage;
    e.target.style.backgroundColor = `rgb(${newRed}, ${newGreen}, ${newBlue})`;
}

function tintSketch(e) {
    const oldColor = getRGBValues(e.target.style.backgroundColor)
    const colorPercentage = getPercentValue(255, 10);
    const newRed = oldColor.red + colorPercentage; 
    const newGreen = oldColor.green + colorPercentage;
    const newBlue = oldColor.blue + colorPercentage;
    e.target.style.backgroundColor = `rgb(${newRed}, ${newGreen}, ${newBlue})`;
}

function createCells(baseNumber) {
    for (let i = 0; i < Math.pow(baseNumber, 2); i++) {
        const gridCell = document.createElement("div");
        gridCell.classList.add("grid-cell");
        gridCell.style.backgroundColor = "rgb(255,255,255)";
        gridCell.style.flexBasis = `${100/baseNumber}%`
        gridCon.appendChild(gridCell);
    }
}

function solidSketch(e) {
        e.target.style.backgroundColor = convertHexToRGB(colorPicker.value);
}

function changeCellCount() {
    const gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach((cell) => gridCon.removeChild(cell));
    createCells(cellCounter.value);
}

function clearGrid() {
    const gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach((cell) => cell.style.backgroundColor = "rgb(255,255,255)"); 
}

createCells(16)

gridCon.addEventListener("mouseover", (e) => {
    if(e.target !== gridCon) {
        sketchStyle(e);
    }
});
cellCounter.addEventListener("change", changeCellCount)
cellCounter.addEventListener("input", () => {
    counterCount.textContent = `${cellCounter.value}x${cellCounter.value}`
})
clearBtn.addEventListener("click", clearGrid);

styleBtns.forEach((btn) => {
    btn.addEventListener("click", changeSketchStyle);
})