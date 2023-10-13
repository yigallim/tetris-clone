const canvasEl = document.querySelector("canvas");

const mouseThreshold = .9;
const devicePixelRatio = Math.min(window.devicePixelRatio, 2);

const mouse = {
    x: .5 * window.innerWidth,
    y: .5 * window.innerHeight,
    tX: .5 * window.innerWidth,
    tY: .5 * window.innerHeight,    
}

const params = {
    scale: 9,
    warmth: 0.44,
};


let uniforms;
const gl = initShader();

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
render();

window.addEventListener("mousemove", e => {
    updateMousePosition(e.pageX, e.pageY);
});
window.addEventListener("touchmove", e => {
    updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
});
window.addEventListener("click", e => {
    updateMousePosition(e.pageX, e.pageY);
});

function updateMousePosition(eX, eY) {
    mouse.tX = .5 * eX * devicePixelRatio;
    mouse.tY = .5 * eY * devicePixelRatio;
}

function initShader() {
    const vsSource = document.getElementById("vertShader").innerHTML;
    const fsSource = document.getElementById("fragShader").innerHTML;

    const gl = canvasEl.getContext("webgl") || canvasEl.getContext("experimental-webgl");

    if (!gl) {
        alert("WebGL is not supported by your browser.");
    }

    function createShader(gl, sourceCode, type) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, sourceCode);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    const vertexShader = createShader(gl, vsSource, gl.VERTEX_SHADER);
    const fragmentShader = createShader(gl, fsSource, gl.FRAGMENT_SHADER);

    function createShaderProgram(gl, vertexShader, fragmentShader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Unable to initialize the shader program: " + gl.getProgramInfoLog(program));
            return null;
        }

        return program;
    }

    const shaderProgram = createShaderProgram(gl, vertexShader, fragmentShader);
    uniforms = getUniforms(shaderProgram);

    function getUniforms(program) {
        let uniforms = [];
        let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
            let uniformName = gl.getActiveUniform(program, i).name;
            uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
        }
        return uniforms;
    }

    const vertices = new Float32Array([-1., -1., 1., -1., -1., 1., 1., 1.]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    gl.useProgram(shaderProgram);

    const positionLocation = gl.getAttribLocation(shaderProgram, "a_position");
    gl.enableVertexAttribArray(positionLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.uniform1f(uniforms.u_scale, params.scale);
    gl.uniform1f(uniforms.u_color, params.warmth);

    return gl;
}


function render() {
    const currentTime = performance.now();
    gl.uniform1f(uniforms.u_time, currentTime);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    mouse.x += (mouse.tX - mouse.x) * mouseThreshold;
    mouse.y += (mouse.tY - mouse.y) * mouseThreshold;

    gl.uniform2f(uniforms.u_pointer, mouse.x / window.innerWidth, 1. - mouse.y / window.innerHeight);

    requestAnimationFrame(render);
}

function updateWarmth() {
    params.warmth += (Math.random() * 0.05 - 0.05 / 2); 
    params.warmth = Math.max(0.2, Math.min(0.6, params.warmth)); 
    gl.uniform1f(uniforms.u_color, params.warmth);
    console.log(params.warmth);
}

setInterval(updateWarmth, 500);

function resizeCanvas() {
    canvasEl.width = window.innerWidth * devicePixelRatio;
    canvasEl.height = window.innerHeight * devicePixelRatio;
    gl.viewport(0, 0, canvasEl.width, canvasEl.height);
    gl.uniform1f(uniforms.u_ratio, canvasEl.width / canvasEl.height);
}



const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const ROW = 24;
const COL = 14;
const SQ = canvas.height / 22;
const blockSize = 30;
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

function globalInit() {
  setTimeout(() => {
    tetr.levelReset(200);
  }, 1000)
}
