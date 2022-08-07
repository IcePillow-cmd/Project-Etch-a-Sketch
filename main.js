const gridCon = document.querySelector("#grid-container");
const cellCounter = document.querySelector("#cell-counter");
const counterCount = document.querySelector("#counter-count");
const clearBtn = document.querySelector("#clear-btn");
const colorPicker = document.querySelector("#color-picker");
const solidBtn = document.querySelector("#solid-btn");
const rainbowBtn = document.querySelector("#rainbow-btn");
const shadeBtn = document.querySelector("#shade-btn");
const tintBtn = document.querySelector("#tint-btn");
const styleBtns = document.querySelectorAll(".sketch-style-btn");
let sketchStyle = solidSketch;
const lineModeBtn = document.querySelector("#line-mode-btn");
const dotModeBtn = document.querySelector("#dot-mode-btn");
const modeBtns = document.querySelectorAll(".sketch-mode-btn");
const gridSwitch = document.querySelector("#grid-switch");

function changeStyleTarget(e) {
    switch (e.key) {
        case "a":
            return solidBtn;
        case "s":
            return rainbowBtn;
        case "d":
            return shadeBtn;
        case "f":
            return tintBtn;
        case undefined:
            return e.target;   
    }
}

function changeModeTarget(e) {
    switch (e.key) {
        case "z":
            return dotModeBtn;
        case "x":
            return lineModeBtn;
        case undefined:
            return e.target;
    }
}

function changeSketchStyle(e) {
    const styleTarget = changeStyleTarget(e);
    if (styleTarget === undefined) {
        return
    }
    styleBtns.forEach((cell) => cell.classList.replace("toggled", "untoggled"));
    styleTarget.classList.replace("untoggled", "toggled");
    switch (styleTarget) {
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
    }
}

function changeSketchMode(e) {
    const modeTarget = changeModeTarget(e);
    if (modeTarget === undefined) {
        return
    }
    modeBtns.forEach((btn) => btn.classList.replace("toggled", "untoggled"));
    modeTarget.classList.replace("untoggled", "toggled");
    if (modeTarget === dotModeBtn) {
        gridCon.removeEventListener("mouseover", sketchCell);
        gridCon.addEventListener("click", sketchCell);
    } else if (modeTarget == lineModeBtn) {
        gridCon.removeEventListener("click", sketchCell);
        gridCon.addEventListener("mouseover", sketchCell);
    }
}

function getRandomNum(num, filler=0) {
    return Math.floor(Math.random()*num)+filler;
}

function getPercentValue(num, percentage) {
    return Math.floor(num * percentage / 100);
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

function rainbowSketch(e) {
    e.target.style.backgroundColor = `rgb(${getRandomNum(255)}, ${getRandomNum(255)}, ${getRandomNum(255)})`;
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

function sketchCell(e) {
    if (e.target !== gridCon) {
        sketchStyle(e)
    }
}

function changeCellCount() {
    const gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach((cell) => gridCon.removeChild(cell));
    createCells(cellCounter.value);
}

function getCellCount() {
    counterCount.textContent = `${cellCounter.value} x ${cellCounter.value}`
}

function clearGrid() {
    const gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach((cell) => cell.style.backgroundColor = "rgb(255,255,255)"); 
}

function toggleGrid() {
    const gridCells = document.querySelectorAll(".grid-cell");
    if (gridSwitch.classList.contains("untoggled")) {
        gridSwitch.classList.replace("untoggled", "toggled");
        gridCells.forEach((cell) => cell.style.border = "none");
    } else {
        gridSwitch.classList.replace("toggled", "untoggled");
        gridCells.forEach((cell) => cell.style.border = "1px solid black");
    }
}

createCells(16)
getCellCount();

gridCon.addEventListener("mouseover", sketchCell);
cellCounter.addEventListener("change", changeCellCount)
cellCounter.addEventListener("input", getCellCount)
clearBtn.addEventListener("click", clearGrid);

styleBtns.forEach((btn) => {
    btn.addEventListener("click", changeSketchStyle);
})
window.addEventListener("keydown", changeSketchStyle)
window.addEventListener("keydown", changeSketchMode)
modeBtns.forEach((btn) => btn.addEventListener("click", changeSketchMode));
gridSwitch.addEventListener("click", toggleGrid);
colorPicker.addEventListener("input", () => {
    colorPicker.style.borderColor = colorPicker.value;
})