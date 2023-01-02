function createGrid(n) {
    let sq = n**2;
    let dimensionValue = `calc(500px / ${n})`;
    for (let i = 1; i <= sq; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.classList.add('regular');
        
        if (i > sq - n) {
            tile.classList.remove('regular');
            tile.classList.add('bottom');
        }
        if (i % n === 0) {
            tile.classList.remove('regular');
            tile.classList.add('end');
        }
        if (i === sq) {
            tile.classList.remove('bottom');
            tile.classList.remove('end');
        }
        
        tile.style.width = dimensionValue;
        tile.style.height = dimensionValue;
        grid.appendChild(tile);
    }
    return grid;
}

function removeGrid() {
    const oldTiles = document.querySelectorAll('.tile');
    for (let tile of oldTiles) grid.removeChild(tile);
}

function resetTile(tile) {
    tile.style['background-color'] = 'white';
}

function draw(tile, color) {
    tile.style['background-color'] = color;
}

function erase(tile) {
    tile.style['background-color'] = 'white';
}

function updateActiveBtn(event) {
    let activeBtn = document.querySelector('.activated');
    if (this.id === 'reset') return;
    if (activeBtn) activeBtn.classList.toggle('activated');
    this.classList.toggle('activated');
    activeBtn = this;
    console.log(activeBtn.id);
}

function getActiveBtn() {
    return document.querySelector('.activated').id;
}

function updateTile(tile) {
    if (mouseDown) {
        mode = getActiveBtn();
        if (mode === 'color') draw(tile, selectedColor);
        else if (mode === 'rainbow') {
            selectedColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
            draw(tile, selectedColor);
        } else if (mode === 'eraser') erase(tile);
    }
}

function listenForTileUpdates() {
    let tiles = document.querySelectorAll('.tile');
    resetBtn.addEventListener('click', () => { tiles.forEach(resetTile) });
    tiles.forEach(tile => {
        tile.addEventListener('mousedown', () => {
            mouseDown = true; 
            updateTile(tile);
        });
        tile.addEventListener('mousemove', () => { updateTile(tile)} );
        tile.addEventListener('dragstart', (e) => { e.preventDefault(); });
        window.addEventListener('mouseup', () => { if (mouseDown) mouseDown = false; });
    });
}

// == BUTTONS ========================================================================================

const buttons = document.querySelectorAll('button');
let mode = 'color'; // color as default mode
buttons.forEach(button => {
    button.addEventListener('click', updateActiveBtn);
});

const colorPicker = document.querySelector('#color-picker');
let mouseDown = false;
let selectedColor = 'black'; // black as default value.

colorPicker.addEventListener('input', (event) => {
    selectedColor = event.target.value;
});

const resetBtn = document.querySelector('#reset');

const canvasResizer = document.querySelector('#canvas-resizer');
let canvasSizeText = document.querySelector('#canvas-resizer p');
console.log(canvasSizeText);

// == GRID ========================================================================================


let initialGridSize = document.querySelector('#canvas-resizer input').value;
let currentGridSize = initialGridSize;
let previousGridSize = 0;
const grid = document.querySelector('#grid');
createGrid(initialGridSize);

canvasResizer.addEventListener('input', (e) => {
    canvasSizeText.textContent = `${e.target.value} x ${e.target.value}`;
    removeGrid();
    createGrid(e.target.value);
    listenForTileUpdates();
});

listenForTileUpdates();