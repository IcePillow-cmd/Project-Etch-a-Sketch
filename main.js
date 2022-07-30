const gridCon = document.querySelector("#grid-container");
const cellCounter = document.querySelector("#cell-counter");

function createCells(baseNumber) {
    for (let i = 0; i < Math.pow(baseNumber, 2); i++) {
        const gridCell = document.createElement("div");
        gridCell.classList.add("grid-cell");
        gridCell.style.flexBasis = `${100/baseNumber}%`
        gridCon.appendChild(gridCell);
    }
}

function sketchCells(e) {
    if (e.target !== gridCon) {
        e.target.style.backgroundColor = "black";
    }
}

createCells(16)

gridCon.addEventListener("mouseover", sketchCells)