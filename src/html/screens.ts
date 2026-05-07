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

/* ---- Menu background canvas ---- */
function drawMenuBg(){
  var c=document.getElementById('menu-bg-c');
  if(!c)return;
  c.width=window.innerWidth; c.height=window.innerHeight;
  var ctx=c.getContext('2d');
  ctx.fillStyle='#0a0e08'; ctx.fillRect(0,0,c.width,c.height);
  ctx.strokeStyle='#141a10'; ctx.lineWidth=0.5;
  for(var x=0;x<c.width;x+=40){for(var y=0;y<c.height;y+=35){
    ctx.beginPath();ctx.moveTo(x+20,y);ctx.lineTo(x,y+35);ctx.lineTo(x+40,y+35);ctx.closePath();ctx.stroke();
  }}
}

/* ---- Menu sprites animation ---- */
var menuAnimId=null, menuFrame=0;
function drawMenuSprites(){
  var c=document.getElementById('menu-sprites-c'); if(!c)return;
  var ctx=c.getContext('2d'); ctx.clearRect(0,0,210,130);
  var t=menuFrame*0.05, fr=menuFrame;
  ctx.save();ctx.translate(50,40);drawBomb(ctx,t);ctx.restore();
  ctx.save();ctx.translate(125,40);ctx.translate(15,15);ctx.rotate(fr*3*Math.PI/180);ctx.translate(-15,-15);drawShuriken(ctx);ctx.restore();
  ctx.save();ctx.translate(20,65);drawPyramid(ctx,fr,0);ctx.restore();
  ctx.save();ctx.translate(83,65);drawCaduc(ctx,t);ctx.restore();
  ctx.save();ctx.translate(168,75);drawScarab(ctx,t,0);ctx.restore();
}
function startMenuAnim(){
  menuFrame=0;
  var lastT=0, acc=0, STEP=100;
  (function loop(ts){
    menuAnimId=requestAnimationFrame(loop);
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
