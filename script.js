const grid = document.querySelector('#grid');

let n = 32;
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

const tiles = document.querySelectorAll('.tile');
let mouseDown = false;

tiles.forEach(tile => {

    tile.addEventListener('mousemove', () => {
        if (mouseDown) tile.style['background-color'] = 'black';
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

const resetBtn = document.querySelector('#reset');

resetBtn.addEventListener('click', ()=>{
    tiles.forEach(tile => { tile.style['background-color'] = 'white'; });
});
