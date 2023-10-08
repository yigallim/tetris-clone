const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const ROW = 24;
const COL = 14;
let SQ = canvas.height / 22;
let _block = [];

for (let y = 0; y < ROW; y++) {
  _block[y] = [];
  for (let x = 0; x < COL; x++) {
    _block[y][x] = 0;
  }
} 

for (let x = 0; x < COL; x++) {
  _block[22][x] = 1;
  _block[23][x] = 1;
}

for (let x = 0; x < COL; x += 12) {
  for (let y = 0; y < ROW - 2; y++) {
    _block[y][x] = 1;
    _block[y][x + 1] = 1;
  }
}

//Sprite//
const mino = new Image();
const spriteLength = 256;
const box = (256 - 16) / 5;
mino.src = "assets/tetromino.png"

document.body.style.transform = "scale(0.8)";
document.body.style.transformOrigin = "40% 30%";
