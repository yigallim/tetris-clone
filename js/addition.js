const hold = document.querySelector(".hold-container");
const lookOver = document.querySelector(".look-over-container");
const holdCanvas = hold.querySelector("canvas");
const lOCanvas = lookOver.querySelectorAll("canvas");

let barTopMargin = SQ * 2;

hold.style.marginTop = barTopMargin.toString() + "px";
lookOver.style.marginTop = barTopMargin.toString() + "px";

holdCanvas.style.paddingTop = SQ + "px";
holdCanvas.style.paddingBottom = SQ + "px";
holdCanvas.height = 2 * SQ;
holdCanvas.width = 6 * SQ;

for(let i = 0; i < lOCanvas.length; i++) {
  lOCanvas[i].height = 2 * SQ;
  lOCanvas[i].width = 6 * SQ;
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
          ctx.drawImage(mino, box * 2, box, box, box, data[0] * SQ, data[1] * SQ, SQ, SQ);
          ctx.drawImage(mino, box * 2, box, box, box, data[2] * SQ, data[3] * SQ, SQ, SQ);
          ctx.drawImage(mino, box * 2, box, box, box, data[4] * SQ, data[5] * SQ, SQ, SQ);
          ctx.drawImage(mino, box * 2, box, box, box, data[6] * SQ, data[7] * SQ, SQ, SQ);
        }
        else {
          ctx.drawImage(mino, tetr.sprite[sIndex], tetr.sprite[sIndex + 1], box, box, data[0] * SQ, data[1] * SQ, SQ, SQ);
          ctx.drawImage(mino, tetr.sprite[sIndex], tetr.sprite[sIndex + 1], box, box, data[2] * SQ, data[3] * SQ, SQ, SQ);
          ctx.drawImage(mino, tetr.sprite[sIndex], tetr.sprite[sIndex + 1], box, box, data[4] * SQ, data[5] * SQ, SQ, SQ);
          ctx.drawImage(mino, tetr.sprite[sIndex], tetr.sprite[sIndex + 1], box, box, data[6] * SQ, data[7] * SQ, SQ, SQ);
        }
      } else {
        if(ctx == holdCanvas.getContext("2d") && !tetr.firstHold) 
          ctx.fillStyle = "#808080";
        else ctx.fillStyle = tetr.color[index];
     
        ctx.fillRect(data[0] * SQ, data[1] * SQ, SQ, SQ);
        ctx.fillRect(data[2] * SQ, data[3] * SQ, SQ, SQ);
        ctx.fillRect(data[4] * SQ, data[5] * SQ, SQ, SQ);
        ctx.fillRect(data[6] * SQ, data[7] * SQ, SQ, SQ);
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

// Leveling
const cLevelInput = cLevel.querySelectorAll("input");
cLevelInput[cLevelInput.length - 1].value = 0;




