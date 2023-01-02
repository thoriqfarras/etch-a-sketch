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

const buttons = document.querySelectorAll('button');
let activeBtn = document.querySelector('.activated');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.id === 'reset') return;
        if (activeBtn) activeBtn.classList.toggle('activated');
        button.classList.toggle('activated');
        activeBtn = button;
    });
});

function draw(tile, color) {
    tile.style['background-color'] = color;
}

function erase(tile) {
    tile.style['background-color'] = 'white';
}

const resetBtn = document.querySelector('#reset');
resetBtn.addEventListener('click', () => {tiles.forEach(resetTile)});

createGrid();
const tiles = document.querySelectorAll('.tile');
let mouseDown = false;
let selectedColor = 'black';
tiles.forEach(tile => {
    tile.addEventListener('mousemove', () => {
        if (mouseDown) {
            if (activeBtn.id === 'color') draw(tile, selectedColor);
            else if (activeBtn.id === 'eraser') erase(tile);
        }
    });
    
    tile.addEventListener('mousedown', () => {
        mouseDown = true;
    });
    
    tile.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
    
    window.addEventListener('mouseup', () => {
        if (mouseDown) mouseDown = false;     
    });
});


