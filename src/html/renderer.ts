export const RENDERER_JS = `
/* ---- Three.js Game Renderer ---- */
var threeRenderer, threeScene, threeCamera;
var GW=0, SVG_H=0;
var dragonSpr, bgMesh;
var bulletPool=[], enemyPool=[], hazardPool=[], boomPool=[];
var gameState=null, gameScore=0, overFired=false;
var animId=null, lastTs=0, accumulator=0;
var FIXED_DT = 0.05; /* 50ms = 20fps, identico al vecchio setInterval */
var threeInited = false;

function makeSprite(tex,w,h){
  var mat=new THREE.SpriteMaterial({map:tex,transparent:true});
  var spr=new THREE.Sprite(mat);
  spr.scale.set(w,h,1);
  spr.visible=false;
  threeScene.add(spr);
  return spr;
}
function posSprite(spr,gx,gy){
  spr.position.set(gx, SVG_H-gy, 0);
  spr.visible=true;
}
function hideSprite(spr){spr.visible=false;}

function initThree(){
  if(threeInited) return;
  threeInited = true;

  /* Dimensioni dalla finestra, non dal canvas (che potrebbe essere display:none) */
  GW = Math.min(window.innerWidth, 420);
  var HUD_H = 40; /* altezza HUD approssimativa */
  SVG_H = window.innerHeight - HUD_H;

  var canvas=document.getElementById('gc');
  threeRenderer=new THREE.WebGLRenderer({canvas:canvas,antialias:false,alpha:false});
  threeRenderer.setSize(GW,SVG_H);
  threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio,2));

  threeScene=new THREE.Scene();
  threeCamera=new THREE.OrthographicCamera(0,GW,SVG_H,0,-1,1);
  threeCamera.position.z=0.5;

  buildTextures();

  /* Background tiled */
  TEX.bg.repeat.set(GW/40, SVG_H/35);
  var bgGeo=new THREE.PlaneGeometry(GW,SVG_H);
  bgMesh=new THREE.Mesh(bgGeo,new THREE.MeshBasicMaterial({map:TEX.bg}));
  bgMesh.position.set(GW/2,SVG_H/2,-0.5);
  threeScene.add(bgMesh);

  /* Dragon */
  dragonSpr=makeSprite(TEX.dragon[0],70,60);

  /* Object pools */
  var i;
  for(i=0;i<15;i++) bulletPool.push(makeSprite(TEX.fireball[0],36,20));
  for(i=0;i<ENEMY_COUNT;i++) enemyPool.push(makeSprite(TEX.pyramid[0][0],44,44));
  for(i=0;i<BOMB_COUNT+SHURIKEN_COUNT;i++) hazardPool.push(makeSprite(TEX.shuriken,30,30));
  for(i=0;i<8;i++) boomPool.push(makeSprite(TEX.bomb[0],40,40));
}

function updateHUD(){
  if(!gameState)return;
  var tl=Math.max(0,Math.floor((gameState.tl||0)-(gameState.el||0)));
  document.getElementById('hud-kills').textContent='\\u25C8 '+(gameState.req||0);
  var htEl=document.getElementById('hud-time');
  htEl.textContent='\\u23F1 '+tl+'s';
  htEl.className='hud-txt'+(tl<=3?' hud-urgent':'');
  document.getElementById('hud-score').textContent='\\u2605 '+gameScore;
}

function updateSprites(){
  var g=gameState; if(!g)return;
  var sx=g.sx, fr=g.fr;

  /* Dragon */
  if(g.alive){
    var df=Math.floor(fr/3)%8;
    dragonSpr.material.map=TEX.dragon[df];
    dragonSpr.material.needsUpdate=true;
    posSprite(dragonSpr, PLAYER_X, (g.py||0)+(g.bob||0));
  } else hideSprite(dragonSpr);

  /* Bullets */
  var bi=0;
  g.bul.forEach(function(b){
    if(bi>=bulletPool.length)return;
    var bx=b.x-sx;
    if(bx>-20&&bx<GW+20){
      var ff=Math.floor(fr/2)%4;
      bulletPool[bi].material.map=TEX.fireball[ff];
      bulletPool[bi].material.needsUpdate=true;
      posSprite(bulletPool[bi],bx,b.y);
    } else hideSprite(bulletPool[bi]);
    bi++;
  });
  for(;bi<bulletPool.length;bi++) hideSprite(bulletPool[bi]);

  /* Enemies */
  var ei=0;
  g.en.forEach(function(e){
    if(ei>=enemyPool.length)return;
    if(!e.alive){hideSprite(enemyPool[ei++]);return;}
    var ex=e.x-sx;
    if(ex>-60&&ex<GW+60){
      var spr=enemyPool[ei];
      var ef=Math.floor(fr/4)%4, ev=e.variant%5;
      if(e.type==='loominadi'){spr.scale.set(44,44,1);spr.material.map=TEX.pyramid[ev][ef];}
      else if(e.type==='cadooceadis'){spr.scale.set(56,56,1);var cf2=Math.floor(fr/3)%8;spr.material.map=(e.hp<=1)?TEX.caducDamaged[cf2]:TEX.caduc[cf2];}
      else{spr.scale.set(30,36,1);var sv2=e.variant%3,sf2=Math.floor(fr/4)%4;spr.material.map=(e.hp<=1)?TEX.scarabDamaged[sv2][sf2]:TEX.scarab[sv2][sf2];}
      spr.material.needsUpdate=true;
      posSprite(spr,ex,e.y);
    } else hideSprite(enemyPool[ei]);
    ei++;
  });
  for(;ei<enemyPool.length;ei++) hideSprite(enemyPool[ei]);

  /* Hazards */
  var hi=0;
  g.hz.forEach(function(h){
    if(hi>=hazardPool.length)return;
    if(!h.alive){hideSprite(hazardPool[hi++]);return;}
    var hx=h.x-sx;
    if(hx>-40&&hx<GW+40){
      var spr2=hazardPool[hi];
      if(h.kind==='bomb'){
        spr2.scale.set(30,30,1);
        spr2.material.map=TEX.bomb[Math.floor(fr/6)%4];
      } else {
        spr2.scale.set(30,30,1);
        spr2.material.map=TEX.shuriken;
        spr2.material.rotation=h.angle*Math.PI/180;
      }
      spr2.material.needsUpdate=true;
      posSprite(spr2,hx,h.y);
    } else hideSprite(hazardPool[hi]);
    hi++;
  });
  for(;hi<hazardPool.length;hi++) hideSprite(hazardPool[hi]);

  /* Explosions */
  var xi=0;
  g.ex.forEach(function(ex2){
    if(xi>=boomPool.length)return;
    var bc=document.createElement('canvas');bc.width=40;bc.height=40;
    drawBoom(bc.getContext('2d'),ex2.progress);
    boomPool[xi].material.map=new THREE.CanvasTexture(bc);
    boomPool[xi].material.needsUpdate=true;
    boomPool[xi].scale.set(40,40,1);
    posSprite(boomPool[xi],ex2.x,ex2.y);
    xi++;
  });
  for(;xi<boomPool.length;xi++) hideSprite(boomPool[xi]);
}

/* Fixed-timestep game loop: aggiorna la logica a 20fps (50ms),
   renderizza a framerate nativo (60fps). Mantiene la stessa
   velocità del vecchio setInterval. */
function gameLoop(ts){
  animId=requestAnimationFrame(gameLoop);
  if(!gameState)return;

  var elapsed=Math.min((ts-lastTs)/1000, 0.15); /* cap a 150ms */
  lastTs=ts;
  accumulator+=elapsed;

  /* Consuma in chunk da 50ms, esattamente come il vecchio setInterval */
  while(accumulator>=FIXED_DT){
    var res=tick(gameState,FIXED_DT,GW,SVG_H);
    if(res.levelDone){gameScore++;gameState=mkLevel(GW,SVG_H);}
    if(res.dead&&!overFired){
      overFired=true;
      saveHi(gameScore);
      setTimeout(function(){showOver(gameScore);},800);
    }
    accumulator-=FIXED_DT;
  }

  updateSprites();
  updateHUD();
  threeRenderer.render(threeScene,threeCamera);
}

function startGame(){
  gameScore=0; overFired=false; accumulator=0;
  showScreen('game');

  /* Inizializza Three.js solo al primo avvio, dopo che il canvas è visibile */
  requestAnimationFrame(function(){
    initThree();
    gameState=mkLevel(GW,SVG_H);
    lastTs=performance.now();
    if(animId)cancelAnimationFrame(animId);
    animId=requestAnimationFrame(gameLoop);
  });
}

function stopGame(){
  if(animId){cancelAnimationFrame(animId);animId=null;}
  gameState=null;
}
`;
