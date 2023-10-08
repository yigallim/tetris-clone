const tetr = {
  block : _block,
  isPLaying : true,
  color : ["rgba(0, 0, 0, 0.8)", "#66ffff", "#692edd", "#ff7733", "#ffff66", "#99ff66", "#e615f9", "#ff4545"],
  hasSprite : true,
  sprite : [ box * 4, 0, 0, box, box, 0, box * 2, 0, box * 3, 0, box, box, 0, 0],
  piece : [

    [[[0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]], 

     [[0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0]],  

     [[0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0]],
     
     [[0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0]]],

    [[[2, 0, 0],
      [2, 2, 2],
      [0, 0, 0]], 

     [[0, 2, 2],
      [0, 2, 0],
      [0, 2, 0]], 

     [[0, 0, 0],
      [2, 2, 2],
      [0, 0, 2]], 
     
     [[0, 2, 0],
      [0, 2, 0],
      [2, 2, 0]]],

    [[[0, 0, 3],
      [3, 3, 3],
      [0, 0, 0]], 

     [[0, 3, 0],
      [0, 3, 0],
      [0, 3, 3]], 

     [[0, 0, 0],
      [3, 3, 3],
      [3, 0, 0]], 
     
     [[3, 3, 0],
      [0, 3, 0],
      [0, 3, 0]]],
    
    [[[0, 4, 4],
      [0, 4, 4],
      [0, 0, 0]], 

     [[0, 4, 4],
      [0, 4, 4],
      [0, 0, 0]], 

     [[0, 4, 4],
      [0, 4, 4],
      [0, 0, 0]],  
     
     [[0, 4, 4],
      [0, 4, 4],
      [0, 0, 0]]],

    [[[0, 5, 5],
      [5, 5, 0],
      [0, 0, 0]], 

     [[0, 5, 0],
      [0, 5, 5],
      [0, 0, 5]], 

     [[0, 0, 0],
      [0, 5, 5],
      [5, 5, 0]], 
     
     [[5, 0, 0],
      [5, 5, 0],
      [0, 5, 0]]],

    [[[0, 6, 0],
      [6, 6, 6],
      [0, 0, 0]], 

     [[0, 6, 0],
      [0, 6, 6],
      [0, 6, 0]], 

     [[0, 0, 0],
      [6, 6, 6],
      [0, 6, 0]], 
     
     [[0, 6, 0],
      [6, 6, 0],
      [0, 6, 0]]],

    [[[7, 7, 0],
      [0, 7, 7],
      [0, 0, 0]], 

     [[0, 0, 7],
      [0, 7, 7],
      [0, 7, 0]], 

     [[0, 0, 0],
      [7, 7, 0],
      [0, 7, 7]], 

     [[0, 7, 0],
      [7, 7, 0],
      [7, 0, 0]]]
  ],
  randArr : [],
  overLook : [],
  wkData : [
    [0, 0, -1, 0, -1, 1, 0, -2, -1, -2],
    [0, 0, 1, 0, 1, 1, 0, -2, 1, -2],
    [0, 0, 0, 1, 1, 1, -1, 1, 1, 0, -1, 0],
    [0, 0, 1, 0, 1, 2, 1, 1, 0, 2, 0, 1]
  ],
  lwkData : [
    [0, 0, -2, 0, 1, 0, -2, -1, 1, 2],
    [0, 0, -1, 0, 2, 0, -1, 2, 2, -1],
    [0, 0, 0, 1, 1, 1, -1, 1, 1, 0, -1, 0],
    [0, 0, 1, 0, 1, 2, 1, 1, 0, 2, 0, 1]
  ],
  clear : [],
  pieceVal : 0,
  holdVal : 0,
  X : 3,
  Y : 0,
  state : 0,
  lockDelay : 500,
  touchBottomTime : 0,
  touchBottomOnce : false,
  touchBottomQty : 0,
  touchingBottom : false,
  firstHold : true,
  shadowWidth : 5,
  shadowWidth2 : 1.75,
  gridWidth : 0.15,
  shadowGap : 1.25,
  shadowGap2 : 1.25 + 5 + 1.9,

  control : {

    moveLeft() {
      if(!tetr.collide(-1, 0)) {
        tetr.clear();
        tetr.X -= 1;
        tetr.pieceGenerate();
      }
    },

    moveRight() {
      if(!tetr.collide(1, 0)) {
        tetr.clear();
        tetr.X += 1;
        tetr.pieceGenerate();
      }
    },

    softDrop() {
      if(!tetr.collide(0, 1)) {
        tetr.clear();
        tetr.Y += 1;
        tetr.pieceGenerate();
      }
    },

    hardDrop() {
      for(let i = 0; i < 22; i++) {
        this.softDrop();
        tetr.touchBottom();
        if(tetr.touchingBottom) {
          tetr.touchBottomTime += 500;
          tetr.lockPiece();
          return;
        }
      }
    },

    rotate(p) {
      if(tetr.touchBottomOnce) tetr.touchBottomQty += 1;
      if(tetr.touchBottomQty < 15) tetr.touchBottomTime = 0;

      tetr.pState = tetr.state;
      tetr.state = tetr.stateLimit(p, tetr.state);

      if (tetr.pState === 0) {
        if (tetr.state === 1) tetr.test(0, 0, 1, 1); //1
        else if (tetr.state === 3) tetr.test(1, 1, 1, 1); //8
        else if (tetr.state === 2) tetr.test(2, 2, 1, 1); //9
      }
      else if (tetr.pState === 1) {
        if (tetr.state === 0) tetr.test(0, 0,-1, -1); //2
        else if (tetr.state === 2) tetr.test(0, 1, -1, 1); //3
        else if (tetr.state === 3) tetr.test(3, 3, 1, 1); //11
      }
      else if (tetr.pState === 2) {
        if (tetr.state === 1) tetr.test(0, 1, 1, -1); //4
        else if (tetr.state === 3) tetr.test(1, 0, 1, -1); //5
        else if (tetr.state === 0) tetr.test(2, 2, -1, -1); //10
      }
      else if (tetr.pState === 3) {
        if (tetr.state === 2) tetr.test(1, 0, -1, 1); //6
        else if (tetr.state === 0) tetr.test(1, 1, -1, -1); //7
        else if (tetr.state === 1) tetr.test(3, 3, -1, -1);; //12
      }
    },

    hold() {
      if(tetr.holdVal && tetr.firstHold) {
        let temp = tetr.holdVal;
        tetr.holdVal = tetr.pieceVal;
        tetr.pieceVal = temp;
        tetr.clear();
        tetr.reset(false);
        tetr.firstHold = false;
      } else if(tetr.firstHold){
        tetr.holdVal = tetr.pieceVal;
        tetr.clear();
        tetr.reset(true);
        tetr.firstHold = false;
      }
      addition.refresh();
      tetr.pieceGenerate();
    }

  },

  refreshBlock() {
    this.removeSquare();
    this.drawSquare();
  },

  drawSquare() {
    for (let y = 0; y < ROW - 2; y++) {
      for (let x = 2; x < COL - 2; x++) {

        if(this.hasSprite) {
          if (y < 2 && !this.block[y][x]) {
            ctx.fillStyle = "rgba(0, 0, 0, 0)";
            ctx.fillRect(SQ * (x - 2), SQ * y, SQ, SQ);
          }
          else if(this.block[y][x] > 0) {
            let index = ((this.block[y][x] % 10) - 1) * 2;
            ctx.drawImage(mino, this.sprite[index], this.sprite[index + 1], box, box, SQ * (x - 2), SQ * y, SQ, SQ);
          }
          else {
            ctx.fillStyle = this.color[0];
            ctx.fillRect(SQ * (x - 2), SQ * y, SQ, SQ);
          }
        }
        else {
          if (y < 2 && !this.block[y][x]) 
            ctx.fillStyle = "rgba(0, 0, 0, 0)";
          else if(this.block[y][x] >= 0)
            ctx.fillStyle = this.color[this.block[y][x] % 10];
          else {
            ctx.fillStyle = this.color[0];
            ctx.fillRect(SQ * (x - 2), SQ * y, SQ, SQ);
          }
      
          ctx.fillRect(SQ * (x - 2), SQ * y, SQ, SQ);
        }

        if(this.block[y][x] < 0) {
          let correctionXY = (this.shadowWidth / 2) + this.shadowGap;
          let correctionWidth = SQ - this.shadowWidth - (2 * this.shadowGap);
          let correctionXY2 = (this.shadowWidth2 / 2) + this.shadowGap2;
          let correctionWidth2 = SQ - this.shadowWidth2 - (2 * this.shadowGap2);
          ctx.strokeStyle = this.color[this.block[y][x] * -1];
          ctx.lineWidth = this.shadowWidth;
          ctx.strokeRect((SQ * (x - 2)) + correctionXY, (SQ * y) + correctionXY, correctionWidth, correctionWidth)
          ctx.lineWidth = this.shadowWidth2;
          ctx.strokeRect((SQ * (x - 2)) + correctionXY2, (SQ * y) + correctionXY2, correctionWidth2, correctionWidth2)
        }
        if(y >= 2 && (!this.block[y][x] || this.block[y][x] < 0)) {
          ctx.lineWidth = this.gridWidth;
          ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
          ctx.strokeRect(SQ * (x - 2), SQ * y, SQ, SQ);
        }
      }
    }
  },

  removeSquare() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },

  random() {
      if(!this.randArr.length) this.randArr = [1, 2, 3, 4, 5, 6, 7];
      let randLimit = this.randArr.length;
      let randSlice = Math.floor(Math.random() * randLimit);
      let val = this.randArr[randSlice];
      this.randArr.splice(randSlice, 1);
      return val;
  },

  pieceGenerate() {
    this.activePiece = this.piece[this.pieceVal - 1][this.state];
    this.sY = this.shadowY();
    for(j = 0; j < this.activePiece.length; j++) {
      for (i = 0; i < this.activePiece.length; i++) {
        if (this.activePiece[j][i]) {
          this.block[this.Y + this.sY + j][2 + this.X + i] = this.pieceVal * -1;
          this.block[this.Y + j][2 + this.X + i] = this.pieceVal + 10;
        }
      }
    }
  },

  collide(x, y) {
    let activePiece = this.piece[this.pieceVal - 1][this.state];
    for(j = 0; j < activePiece.length; j++) {
      for (i = 0; i < activePiece.length; i++) {
        if (!activePiece[j][i]) continue;
        let newX = this.X + i + x + 2;
        let newY = this.Y + j + y;
        if( newY < 0 || (this.block[newY][newX] > 0 && this.block[newY][newX] < 10))
          return true;
      }
    }
    return false;
  },

  stateLimit(p, state) {
    state += p;
    if(state < 0) state += 4;
    if(state + 1 > 4) state = ((state + 1) % 4) - 1;
    return state
  },

  test(forElse, forI, negateElse, negateI) {
    if(this.pieceVal === 1) {
      for(let i = 0; i < this.lwkData[forI].length; i +=2) {
        let offSet = this.lwkData[forI];
        if(!this.collide(offSet[i] * negateI, offSet[i + 1] * negateI * -1)) {
          this.clear();
          this.X += offSet[i] * negateI; 
          this.Y += offSet[i + 1] * negateI * -1;
          this.pieceGenerate();
          return;
        }
      }
      this.state = this.pState;
    } else {
      for(let i = 0; i < this.wkData[forElse].length; i +=2) {
        let offSet = this.wkData[forElse];
        if(!this.collide(offSet[i] * negateElse, offSet[i + 1] * negateElse * -1)) {
          this.clear();
          this.X += offSet[i] * negateElse;
          this.Y += offSet[i + 1] * negateElse * -1;
          this.pieceGenerate();
          return;
        }
      }
      this.state = this.pState;
    }
  },

  clear() {
    for (let y = this.Y; y < this.Y + 4; y++) {
      for (let x = this.X + 2; x < this.X + 4 + 2; x++) {
        if(this.block[y + this.sY][x] < 0) this.block[y + this.sY][x] = 0; 
        if(this.block[y][x] > 10) this.block[y][x] = 0;
      }
    }
  },

  solidify() {
    for (let y = this.Y; y < this.Y + 4; y++) {
      for (let x = this.X + 2; x < this.X + 4 + 2; x++) {
        if(this.block[y][x] > 10) this.block[y][x] -= 10;
      }
    }
  },

  reset(needVal) {
    this.X = 3;
    this.Y = 0;
    this.state = 0;
    this.touchBottomOnce = false;
    this.touchBottomQty = 0;
    this.touchingBottom = false;
    if(needVal) this.handleVal(); 
    this.firstHold = true;
  },

  clearLine() {
    for (let y = 0; y < ROW - 2; y++) {
      for (let x = 2; x < COL - 2; x++) {
        if (this.block[y][x] > 0) {
          this.clear[y] = this.clear[y] + 1;
        }
      }
      if (this.clear[y] > 9) {
        for (let y1 = 1; y1 < y + 1; y1++) {
          for (let x1 = 2; x1 < COL - 2; x1++) {
            this.block[y - (y1 - 1)][x1] = this.block[y - y1][x1];
            this.block[y - y1][x1] = 0;
          } 
        }
      }
      this.clear[y] = 0; 
    }
  },

  touchBottom() {
    for (let y = this.Y; y < this.Y + 4; y++) {
      for (let x = this.X + 2; x < this.X + 4 + 2; x++) {
        if(this.block[y][x] > 10 && this.block[y + 1][x] > 0 && this.block[y + 1][x] < 10) {
          this.touchingBottom = true;
          this.touchBottomOnce = true;
          this.touchBottomTime += 1;
          return;
        }
      }
    }
    if(this.touchBottomQty < 15) this.touchBottomTime = 0;
    this.touchingBottom = false;
  },

  lockPiece() {
    if(this.touchBottomTime >= this.lockDelay/5) {
      tetr.solidify();
      tetr.reset(true);
      addition.refresh();
      tetr.clearLine();
      if(this.collide(0, 0)) 
        console.debug("Game over");
      else tetr.pieceGenerate();
    }
  },

  handleVal() {
    this.pieceVal = this.overLook[0];
    this.overLook.splice(0, 1);
    this.overLook[this.overLook.length] = this.random();
  },

  init() {
    this.overLook = [this.random(), this.random(), this.random(), this.random(), this.random()];
    this.handleVal();
    this.pieceGenerate();
    addition.refresh();

    setInterval(() => {
      this.control.softDrop();
    }, 0);

    setInterval(() => {
      this.touchBottom();
      this.lockPiece();
    }, 5);
  },

  shadowY() {
    for(let i = 0; i < ROW - 2; i++) {
      if(this.collide(0, i)) return i - 1;
    }
  }
}

let keyUnit = {
  mlFT : true,
  mrFT : true,
  sdFT : true,
  hdFT : true,
  cwFT : true,
  ctcwFT : true,
  r2FT : true,
  holdFT : true,
  mlDAS : 0,
  mrDAS : 0,
  mlDASFT :true,
  mrDASFT : true,
  DAS : 130 / 4.25,
  ARR : 0,
  SDF : 15
}

addEventListener("keydown" , e => {
  if(e.key.toLowerCase() === "a" && keyUnit.mlFT) {
    tetr.control.moveLeft();
    keyUnit.mlInterval = setInterval(() => {
      keyUnit.mlDAS += 1;
      if (keyUnit.mlDAS >= keyUnit.DAS && keyUnit.mlDASFT) {
        keyUnit.mlDASInterval = setInterval(() => {
          tetr.control.moveLeft();
        }, keyUnit.ARR)
        keyUnit.mlDASFT = false
      }
    }, 1)
    keyUnit.mlFT = false;
  }
  if(e.key.toLowerCase() === "d" && keyUnit.mrFT) {
    tetr.control.moveRight();
    keyUnit.mrInterval = setInterval(() => {
      keyUnit.mrDAS += 1;
      if (keyUnit.mrDAS >= keyUnit.DAS && keyUnit.mrDASFT) {
        keyUnit.mrDASInterval = setInterval(() => {
          tetr.control.moveRight();
        }, keyUnit.ARR)
        keyUnit.mrDASFT = false
      }
    }, 1)
    keyUnit.mrFT = false;
  } 
  if(e.key.toLowerCase() === "s" && keyUnit.sdFT) {
    tetr.control.softDrop();
    keyUnit.SDFinterval = setInterval(() => {
      tetr.control.softDrop();
    }, keyUnit.SDF)
    keyUnit.sdFT = false;
  }
  if(e.key.toLowerCase() === " " && keyUnit.hdFT) {
    tetr.control.hardDrop();
    keyUnit.hdFT = false;
  }
  if(e.key.toLowerCase() === "arrowleft" && keyUnit.cwFT) {
    tetr.control.rotate(1);
    keyUnit.cwFT = false;
  }
  if(e.key.toLowerCase() === "arrowright" && keyUnit.ctcwFT) {
    tetr.control.rotate(-1);
    keyUnit.ctcwFT = false;
  }
  if(e.key.toLowerCase() === "arrowdown" && keyUnit.r2FT) {
    tetr.control.rotate(2);
    keyUnit.r2FT = false;
  }
  if(e.key.toLowerCase() === "shift" && keyUnit.holdFT) {
    tetr.control.hold();
    keyUnit.holdFT = false;
  } 
})

addEventListener("keyup" , e => {
  if(e.key.toLowerCase() === "a") {
    clearInterval(keyUnit.mlDASInterval);
    clearInterval(keyUnit.mlInterval);
    keyUnit.mlFT = true;
    keyUnit.mlDASFT = true;
    keyUnit.mlDAS = 0;
  }
  if(e.key.toLowerCase() === "d") {
    clearInterval(keyUnit.mrDASInterval);
    clearInterval(keyUnit.mrInterval);
    keyUnit.mrFT = true;
    keyUnit.mrDASFT = true;
    keyUnit.mrDAS = 0;
  } 
  if(e.key.toLowerCase() === "s") {
    clearInterval(keyUnit.SDFinterval);
    keyUnit.sdFT = true;
  }
  if(e.key.toLowerCase() === " ") {
    keyUnit.hdFT = true;
  }
  if(e.key.toLowerCase() === "arrowleft") {
    keyUnit.cwFT = true;
  }
  if(e.key.toLowerCase() === "arrowright") {
    keyUnit.ctcwFT = true;
  }
  if(e.key.toLowerCase() === "arrowdown") {
    keyUnit.r2FT = true;
  }
  if(e.key.toLowerCase() === "shift") {
    keyUnit.holdFT = true;
  } 
})

