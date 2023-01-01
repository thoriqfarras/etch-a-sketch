const grid = document.querySelector('#grid');

let n = 2;
let sq = n**2;
let dimensionValue = `calc(500px / ${n})`;
for (let i = 1; i <= sq; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    if (i > sq - n) {
        tile.classList.remove('tile');
        tile.classList.add('tile-bottom');
    }
    if (i % n === 0) {
        tile.classList.remove('tile');
        tile.classList.add('tile-end');
    }
    if (i === sq) {
        tile.classList.remove('tile-bottom');
        tile.classList.remove('tile-end');
    }
    tile.style.width = dimensionValue;
    tile.style.height = dimensionValue;
    grid.appendChild(tile);
}