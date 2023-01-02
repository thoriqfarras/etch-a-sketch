const grid = document.querySelector('#grid');

let n = 32;
let sq = n**2;
let dimensionValue = `calc(500px / ${n})`;

function createGrid() {
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

let mode = 'color';
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', updateActiveBtn);
});

const resetBtn = document.querySelector('#reset');
resetBtn.addEventListener('click', () => {tiles.forEach(resetTile)});

createGrid();

const tiles = document.querySelectorAll('.tile');
const colorPicker = document.querySelector('#color-picker');
let mouseDown = false;
let selectedColor = 'black'; // black as default value.

colorPicker.addEventListener('input', (event) => {
    selectedColor = event.target.value;
});

tiles.forEach(tile => {
    tile.addEventListener('mousemove', () => {
        if (mouseDown) {
            mode = getActiveBtn();
            if (mode === 'color') draw(tile, selectedColor);
            else if (mode === 'rainbow') {
                selectedColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
                draw(tile, selectedColor);
            } else if (mode === 'eraser') erase(tile);
        }
    });

    tile.addEventListener('mousedown', () => { mouseDown = true; });
    tile.addEventListener('dragstart', (e) => { e.preventDefault(); });
    window.addEventListener('mouseup', () => { if (mouseDown) mouseDown = false; });
});


