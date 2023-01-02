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
    if (this.id === 'reset' || this.id === 'apply') return;
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
        gameMode = getActiveBtn();
        if (gameMode === 'color') draw(tile, selectedColor);
        else if (gameMode === 'rainbow') {
            selectedColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
            draw(tile, selectedColor);
        } else if (gameMode === 'eraser') erase(tile);
    }
}

function listenForTileUpdates() {
    let tiles = document.querySelectorAll('.tile');
    let previousTile;
    resetBtn.addEventListener('click', () => { tiles.forEach(resetTile) });
    tiles.forEach(tile => {
        tile.addEventListener('mousedown', () => {
            mouseDown = true; 
            updateTile(tile);
            previousTile = tile;
        });
        tile.addEventListener('mousemove', () => { 
            if (previousTile !== tile) {
                updateTile(tile);
                previousTile = tile;
            }
        });
        tile.addEventListener('dragstart', (e) => { e.preventDefault(); });
        window.addEventListener('mouseup', () => { if (mouseDown) mouseDown = false; });
    });
}

// == BUTTONS ========================================================================================

const buttons = document.querySelectorAll('button');
let gameMode = 'color'; // color as default gameMode
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
resetBtn.addEventListener('mousedown', () => {
    resetBtn.classList.add('activated');
});
resetBtn.addEventListener('mouseup', () => {
    resetBtn.classList.remove('activated');
});


const canvasResizer = document.querySelector('#canvas-resizer');
let canvasSizeText = document.querySelector('#canvas-resizer p');

const applyBtn = document.querySelector('#apply');
let applyBtnActive = false;
applyBtn.addEventListener('mousedown', () => {
    applyBtn.classList.add('activated');
});
applyBtn.addEventListener('mouseup', () => {
    applyBtn.classList.remove('activated');
});

// == GRID ========================================================================================


let initialGridSize = document.querySelector('#canvas-resizer input').value;
let currentGridSize = initialGridSize;
const grid = document.querySelector('#grid');
createGrid(initialGridSize);

canvasResizer.addEventListener('input', (e) => {
    canvasSizeText.textContent = `${e.target.value} x ${e.target.value}`;
});

canvasResizer.addEventListener('change', (e) => {
    currentGridSize = e.target.value;
    applyBtnActive = true;
});

applyBtn.addEventListener('click', () => {
    if (applyBtnActive) {
        applyBtnActive = false;
        removeGrid();
        createGrid(currentGridSize);
        listenForTileUpdates();
    }
});

listenForTileUpdates();