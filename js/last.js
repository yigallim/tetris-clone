// Fps Bar //
let fps = 0;
const fpsBar = document.getElementById("fps-bar");

(function fpsLoop() {
  fps++;
  tetr.refreshBlock();
  requestAnimationFrame(fpsLoop);
})();

(function fpsVarLoop() {
  fpsBar.innerHTML = fps;
  fps = 0;
  setTimeout(fpsVarLoop, 1000);
})();

setTimeout(() => {
  tetr.init();
}, 200);
