const hold = document.querySelector(".hold-container");
const lookOver = document.querySelector(".look-over-container");
const holdCanvas = hold.querySelector("canvas");
const lOCanvas = lookOver.querySelectorAll("canvas");


holdCanvas.style.paddingTop = blockSize + "px";
holdCanvas.style.paddingBottom = blockSize + "px";
holdCanvas.height = 2 * blockSize;
holdCanvas.width = 6 * blockSize;

for(let i = 0; i < lOCanvas.length; i++) {
  lOCanvas[i].height = 2 * blockSize;
  lOCanvas[i].width = 6 * blockSize;
}

let addition = {
  drawData : [
    [1, 0.5, 2, 0.5, 3, 0.5, 4, 0.5],
    [1.5, 0, 1.5, 1, 2.5, 1, 3.5, 1],
    [3.5, 0, 1.5, 1, 2.5, 1, 3.5, 1],
    [2, 0, 3, 0, 2, 1, 3, 1],
    [2.5, 0, 3.5, 0, 1.5, 1, 2.5, 1],
    [2.5, 0, 1.5, 1, 2.5, 1, 3.5, 1],
    [1.5, 0, 2.5, 0, 2.5, 1, 3.5, 1],
  ],

  draw : function(ctx, index) {
    if(index) {
      let data = this.drawData[index  - 1];
      let sIndex = (index - 1) * 2;

      if(tetr.hasSprite) {
        if(ctx == holdCanvas.getContext("2d") && !tetr.firstHold) {
          ctx.drawImage(mino, box * 2, box, box, box, data[0] * blockSize, data[1] * blockSize, blockSize, blockSize);
          ctx.drawImage(mino, box * 2, box, box, box, data[2] * blockSize, data[3] * blockSize, blockSize, blockSize);
          ctx.drawImage(mino, box * 2, box, box, box, data[4] * blockSize, data[5] * blockSize, blockSize, blockSize);
          ctx.drawImage(mino, box * 2, box, box, box, data[6] * blockSize, data[7] * blockSize, blockSize, blockSize);
        }
        else {
          ctx.drawImage(mino, tetr.sprite[sIndex], tetr.sprite[sIndex + 1], box, box, data[0] * blockSize, data[1] * blockSize, blockSize, blockSize);
          ctx.drawImage(mino, tetr.sprite[sIndex], tetr.sprite[sIndex + 1], box, box, data[2] * blockSize, data[3] * blockSize, blockSize, blockSize);
          ctx.drawImage(mino, tetr.sprite[sIndex], tetr.sprite[sIndex + 1], box, box, data[4] * blockSize, data[5] * blockSize, blockSize, blockSize);
          ctx.drawImage(mino, tetr.sprite[sIndex], tetr.sprite[sIndex + 1], box, box, data[6] * blockSize, data[7] * blockSize, blockSize, blockSize);
        }
      } else {
        if(ctx == holdCanvas.getContext("2d") && !tetr.firstHold) 
          ctx.fillStyle = "#808080";
        else ctx.fillStyle = tetr.color[index];
     
        ctx.fillRect(data[0] * blockSize, data[1] * blockSize, blockSize, blockSize);
        ctx.fillRect(data[2] * blockSize, data[3] * blockSize, blockSize, blockSize);
        ctx.fillRect(data[4] * blockSize, data[5] * blockSize, blockSize, blockSize);
        ctx.fillRect(data[6] * blockSize, data[7] * blockSize, blockSize, blockSize);
      }
    }
  },
  
  unDraw : function(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },

  refresh : function() {
    this.unDraw(holdCanvas.getContext("2d"));
    this.draw(holdCanvas.getContext("2d"), tetr.holdVal)
    for(let i = 0; i < lOCanvas.length; i++) {
      this.unDraw(lOCanvas[i].getContext("2d"));
      this.draw(lOCanvas[i].getContext("2d"), tetr.overLook[i]);
    }
  },

  animation : {
    stack : false,
    countdown : function(loop) {
      this.stack = true;
      this.fadeInOut(document.querySelectorAll(".countdown div")[loop]);
      loop++;
      if(loop < 3) {
        setTimeout(() => {
          this.countdown(loop);
        }, 600)
      } 
      else this.stack = false;
    },

    fadeInOut : function(el) {
      el.classList.toggle("hided-initial");
      el.classList.toggle("scale-out-center");
      setTimeout(() => {
        el.classList.toggle("hided-initial");
        el.classList.toggle("scale-out-center");
      },599)
    }
  }
}

addition.animation.countdown(0);

/////////////////////////////////////////////////////////////////

const config = document.getElementById("config-nav");
const cLevel = config.children[0];
const level = [null, 200, 100, 50, 0];
const hardnessInput = document.querySelector('.hardness-input');
const tooltip = document.querySelector('.tooltip');

const levelDivs = document.querySelectorAll('.config-level div');

for (let index = 0; index < 5; index++) {
  const div = levelDivs[index];
  div.addEventListener('click', () => {
    const radioButton = div.querySelector('input[type="radio"]');
    radioButton.checked = true;
    tetr.levelReset(level[index]);
  });
}

hardnessInput.addEventListener('input', function() {
  const hardness = parseInt(this.value);
  
  const intervalDuration = (20 - hardness) * 10;
  tetr.levelReset(intervalDuration);
  const existingMessage = 'Higher Means Harder<br/>';
  tooltip.innerHTML = `${existingMessage}Static Gravity: ${hardness}`;
});
