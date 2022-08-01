const gridCon = document.querySelector("#grid-container");
const cellCounter = document.querySelector("#cell-counter");
const counterCount = document.querySelector("#counter-count");
const clearBtn = document.querySelector("#clear-btn");

function getRandomNum(num, filler=0) {
    return Math.floor(Math.random()*num)+filler;
}

function getRGBValues(rgb) {
    rgbValues = rgb.substring(rgb.indexOf("(") + 1, rgb.lastIndexOf(")")).split(",");
    return {
        red: parseInt(rgbValues[0]),
        green: parseInt(rgbValues[1]),
        blue: parseInt(rgbValues[2])
    }
}

function getPercentValue(num, percentage) {
    return Math.floor(num * percentage / 100);
}

function rainbowSketch(e) {
    e.target.style.backgroundColor = `rgb(${getRandomNum(255, 100)}, ${getRandomNum(255, 50)}, ${getRandomNum(255, 50)})`;
}

function createCells(baseNumber) {
    for (let i = 0; i < Math.pow(baseNumber, 2); i++) {
        const gridCell = document.createElement("div");
        gridCell.classList.add("grid-cell");
        gridCell.style.flexBasis = `${100/baseNumber}%`
        gridCon.appendChild(gridCell);
    }
}

function sketchCells(e) {
        e.target.style.backgroundColor = "black";
}

function changeCellCount() {
    const gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach((cell) => gridCon.removeChild(cell));
    createCells(cellCounter.value);
}

function clearGrid() {
    const gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach((cell) => cell.style.backgroundColor = "white"); 
}

createCells(16)

gridCon.addEventListener("mouseover", (e) => {
    if(e.target !== gridCon) {
        sketchCells(e);
    }
});
cellCounter.addEventListener("change", changeCellCount)
cellCounter.addEventListener("input", () => {
    counterCount.textContent = `${cellCounter.value}x${cellCounter.value}`
})
clearBtn.addEventListener("click", clearGrid);