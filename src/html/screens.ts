export const SCREENS_JS = `
/* ---- Utility ---- */
function sendToRN(data){if(window.ReactNativeWebView)window.ReactNativeWebView.postMessage(JSON.stringify(data));}
var currentScreen='splash';
function showScreen(name){
  document.querySelectorAll('.screen').forEach(function(el){el.classList.remove('active');});
  document.getElementById('s-'+name).classList.add('active');
  currentScreen=name;
}

/* ---- Hi Score ---- */
var hiScore=parseInt(localStorage.getItem('ki_hi')||'0');
function saveHi(s){if(s>hiScore){hiScore=s;localStorage.setItem('ki_hi',''+s);}updateHiDisp();}
function updateHiDisp(){var el=document.getElementById('hi-display');if(el)el.textContent=hiScore>0?'RECORD: '+hiScore:'';}

/* ---- Game Over screen ---- */
function showOver(s){
  stopGame();
  sendToRN({type:'gameOver',score:s});
  document.getElementById('over-val').textContent=String(s);
  document.getElementById('over-hi').textContent='Record: '+hiScore;
  showScreen('over');
}

/* ---- Menu background canvas (WebGL Shaders) ---- */
var bgGl=null, bgProgram=null, bgTimeLoc=null, bgResLoc=null;
function drawMenuBg(){
  var c=document.getElementById('menu-bg-c');
  if(!c)return;
  c.width=window.innerWidth; c.height=window.innerHeight;
  var gl=c.getContext('webgl') || c.getContext('experimental-webgl');
  if(!gl){
    var ctx=c.getContext('2d');
    ctx.fillStyle='#0a0e08'; ctx.fillRect(0,0,c.width,c.height);
    return;
  }
  bgGl=gl;
  var vsSource="attribute vec2 position; void main() { gl_Position = vec4(position, 0.0, 1.0); }";
  var fsSource="precision mediump float; uniform float time; uniform vec2 resolution;" +
    "float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }" +
    "float noise(vec2 p) {" +
    "  vec2 i = floor(p); vec2 f = fract(p); f = f * f * (3.0 - 2.0 * f);" +
    "  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);" +
    "}" +
    "float fbm(vec2 p) {" +
    "  float v = 0.0; float a = 0.5;" +
    "  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }" +
    "  return v;" +
    "}" +
    "void main() {" +
    "  vec2 uv = gl_FragCoord.xy / resolution.xy; uv.y *= resolution.y / resolution.x;" +
    "  vec2 p = uv * 3.0; p.x += time * 0.2; p.y -= time * 0.5;" +
    "  float n = fbm(p + fbm(p + time * 0.3));" +
    "  vec3 color = vec3(n * 0.6, n * n * 0.15, n * n * n * 0.05);" +
    "  gl_FragColor = vec4(color, 1.0);" +
    "}";
  function createShader(type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  }
  var vs = createShader(gl.VERTEX_SHADER, vsSource);
  var fs = createShader(gl.FRAGMENT_SHADER, fsSource);
  bgProgram = gl.createProgram();
  gl.attachShader(bgProgram, vs);
  gl.attachShader(bgProgram, fs);
  gl.linkProgram(bgProgram);
  gl.useProgram(bgProgram);
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
  var posLoc = gl.getAttribLocation(bgProgram, "position");
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
  bgTimeLoc = gl.getUniformLocation(bgProgram, "time");
  bgResLoc = gl.getUniformLocation(bgProgram, "resolution");
}
function drawMenuBgFrame(time) {
  if(!bgGl || !bgProgram) return;
  var gl = bgGl;
  var c = gl.canvas;
  if(c.width !== window.innerWidth || c.height !== window.innerHeight) {
    c.width = window.innerWidth; c.height = window.innerHeight;
    gl.viewport(0, 0, c.width, c.height);
  }
  gl.uniform1f(bgTimeLoc, time * 0.001);
  gl.uniform2f(bgResLoc, c.width, c.height);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

/* ---- Menu sprites animation ---- */
var menuAnimId=null, menuFrame=0;
function drawMenuSprites(){
  var c=document.getElementById('menu-sprites-c'); if(!c)return;
  var ctx=c.getContext('2d'); ctx.clearRect(0,0,210,130);
  var t=menuFrame*0.05, fr=menuFrame;
  ctx.save();ctx.translate(50,40);drawBomb(ctx,t);ctx.restore();
  ctx.save();ctx.translate(125,40);ctx.translate(15,15);ctx.rotate(fr*3*Math.PI/180);ctx.translate(-15,-15);drawShuriken(ctx);ctx.restore();
  
  // Caduc spostato a sinistra (dove prima c'era la piramide)
  ctx.save();ctx.translate(20,65);drawCaduc(ctx,t);ctx.restore();
  
  // Piramide spostata al centro con il draghetto più in alto
  ctx.save();ctx.translate(83,65);drawPyramid(ctx,fr,0);ctx.restore();
  ctx.save();ctx.translate(75,0);drawDragon(ctx,fr);ctx.restore();
  
  ctx.save();ctx.translate(162,75);drawScarab(ctx,t,0);ctx.restore();
}
function startMenuAnim(){
  menuFrame=0;
  var lastT=0, acc=0, STEP=100;
  (function loop(ts){
    menuAnimId=requestAnimationFrame(loop);
    if(typeof drawMenuBgFrame==='function') drawMenuBgFrame(ts);
    if(lastT===0){lastT=ts;}
    acc+=ts-lastT; lastT=ts;
    if(acc>=STEP){menuFrame++;drawMenuSprites();acc-=STEP;}
  })(0);
}
function stopMenuAnim(){if(menuAnimId){cancelAnimationFrame(menuAnimId);menuAnimId=null;}}


/* ---- Controls ---- */
var lastFire=0;
function doFire(){
  var now=Date.now();if(now-lastFire<500)return;lastFire=now;
  if(gameState&&gameState.alive){
    gameState.bul.push({x:gameState.sx+PLAYER_X+20,y:gameState.py});
    if(typeof playShoot==='function')playShoot();
  }
}
function doUp(){if(gameState)gameState.ty=Math.max(25,gameState.ty-45);}
function doDn(){if(gameState)gameState.ty=Math.min(SVG_H-40,gameState.ty+45);}

function bindBtn(id,fn,noClick){
  var el=document.getElementById(id); if(!el)return;
  function handle(e){
    e.preventDefault();
    if(typeof initAudio==='function')initAudio();
    if(!noClick && typeof playClick==='function')playClick();
    fn();
  }
  el.addEventListener('touchstart',handle,{passive:false});
  el.addEventListener('mousedown',handle);
}

/* ---- Wire up all buttons ---- */
function initControls(){
  bindBtn('btn-play',function(){stopMenuAnim();startGame();});
  bindBtn('btn-info',function(){showScreen('info');});
  bindBtn('btn-settings',function(){showScreen('settings');if(typeof updateSoundBtn==='function')updateSoundBtn();});
  bindBtn('btn-settings-back',function(){showScreen('menu');startMenuAnim();});
  bindBtn('btn-sound-toggle',function(){if(typeof toggleSound==='function')toggleSound();});
  bindBtn('btn-exit',function(){sendToRN({type:'exit'});});
  bindBtn('btn-exit2',function(){sendToRN({type:'exit'});});
  bindBtn('btn-info-back',function(){showScreen('menu');startMenuAnim();});
  bindBtn('btn-retry',function(){startGame();});
  bindBtn('btn-home',function(){showScreen('menu');startMenuAnim();});
  bindBtn('btn-up',doUp,true);
  bindBtn('btn-dn',doDn,true);
  bindBtn('btn-fire',doFire,true);
}

/* ---- Boot ---- */
window.addEventListener('load',function(){
  drawMenuBg();
  updateHiDisp();
  initControls();
  showScreen('menu');
  startMenuAnim();
});
`;
