export const SPRITES_JS = `
/* ---- Canvas 2D sprite drawing primitives ---- */
function makeTex(w,h,fn){var c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'));return new THREE.CanvasTexture(c);}

function drawDragon(ctx,frame){
  var wa=Math.sin(frame*0.6)*18, tw=Math.sin(frame*0.32)*6, br=0.4+Math.sin(frame*0.4)*0.3;
  ctx.save();ctx.translate(30,28);
  ctx.strokeStyle='#2a8a3a';ctx.lineWidth=3;ctx.lineCap='round';
  ctx.beginPath();ctx.moveTo(-8,2);ctx.quadraticCurveTo(-18,2+tw,-26,tw);ctx.stroke();
  ctx.save();ctx.rotate(-wa*Math.PI/180);ctx.fillStyle='rgba(58,170,74,0.75)';
  ctx.beginPath();ctx.moveTo(-2,-6);ctx.quadraticCurveTo(-14,-22,-8,-26);ctx.quadraticCurveTo(0,-20,2,-14);ctx.closePath();ctx.fill();ctx.restore();
  ctx.save();ctx.rotate(wa*0.7*Math.PI/180);ctx.scale(1,-1);ctx.translate(0,12);ctx.fillStyle='rgba(58,170,74,0.5)';
  ctx.beginPath();ctx.moveTo(-2,-6);ctx.quadraticCurveTo(-12,-18,-6,-22);ctx.quadraticCurveTo(0,-16,2,-12);ctx.closePath();ctx.fill();ctx.restore();
  ctx.fillStyle='#2d9940';ctx.beginPath();ctx.ellipse(0,2,10,7,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#3ab84e';ctx.beginPath();ctx.ellipse(0,4,8,4,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#2d9940';ctx.beginPath();ctx.ellipse(10,-3,7,5.5,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#34a545';ctx.beginPath();ctx.ellipse(16,-2,3.5,2.5,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#fffff0';ctx.beginPath();ctx.ellipse(11,-5,2.8,2.2,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#cc3300';ctx.beginPath();ctx.ellipse(11.5,-5,1.5,2,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#1a0000';ctx.beginPath();ctx.arc(11.5,-5,0.8,0,Math.PI*2);ctx.fill();
  var grd=ctx.createRadialGradient(24,-2,1,22,-2,10);
  grd.addColorStop(0,'rgba(255,240,60,'+br+')');grd.addColorStop(0.5,'rgba(255,120,20,'+(br*0.7)+')');grd.addColorStop(1,'rgba(255,80,0,0)');
  ctx.fillStyle=grd;ctx.beginPath();ctx.ellipse(22,-2,10+br*4,4+br*2,0,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle='#2a8a3a';ctx.lineWidth=2.5;
  ctx.beginPath();ctx.moveTo(-4,8);ctx.lineTo(-6,14);ctx.stroke();
  ctx.beginPath();ctx.moveTo(4,8);ctx.lineTo(6,14);ctx.stroke();
  ctx.restore();
}
function drawFireball(ctx,frame){
  var fl=Math.sin(frame*0.8)*2;
  ctx.save();ctx.translate(18,10);
  var g=ctx.createRadialGradient(0,0,0,0,0,10+fl);
  g.addColorStop(0,'rgba(255,240,150,1)');g.addColorStop(0.4,'rgba(255,160,30,0.9)');g.addColorStop(1,'rgba(255,80,0,0)');
  ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,0,10+fl,5+fl*0.4,0,0,Math.PI*2);ctx.fill();ctx.restore();
}
var PYR_COLORS=['#5a7a3a','#7a6a2a','#4a6a4a','#6a5a3a','#3a7a5a'];
function drawPyramid(ctx,frame,variant){
  var ey=-2+Math.sin(frame*1.2)*2,ex=Math.cos(frame*0.8)*2;
  ctx.save();ctx.translate(22,26);
  ctx.fillStyle=PYR_COLORS[variant%5];ctx.strokeStyle='#2a3a1a';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.moveTo(0,-16);ctx.lineTo(-14,12);ctx.lineTo(14,12);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.fillStyle='rgba(138,154,106,0.4)';ctx.beginPath();ctx.moveTo(0,-10);ctx.lineTo(-9,8);ctx.lineTo(9,8);ctx.closePath();ctx.fill();
  ctx.fillStyle='#fffff0';ctx.beginPath();ctx.ellipse(0,ey+2,5,3.5,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#1a1a0a';ctx.beginPath();ctx.arc(ex,ey+2,2,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='rgba(255,255,240,0.9)';ctx.beginPath();ctx.ellipse(ex,ey+1.5,0.7,0.5,0,0,Math.PI*2);ctx.fill();
  ctx.restore();
}
function drawCaduc(ctx,t){
  var w=Math.sin(t*2)*3,s=1+Math.sin(t*1.5)*0.05;
  var p1x=Math.cos(t*2.5)*12,p1y=Math.sin(t*3)*10;
  var p2x=Math.cos(t*1.8+2)*14,p2y=Math.sin(t*2.2+1)*8;
  ctx.save();ctx.translate(28,28);
  ctx.fillStyle='rgba(180,180,220,0.3)';ctx.beginPath();ctx.arc(p1x,p1y,1.5,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='rgba(200,200,240,0.3)';ctx.beginPath();ctx.arc(p2x,p2y,1,0,Math.PI*2);ctx.fill();
  ctx.save();ctx.rotate(w*Math.PI/180);ctx.scale(s,s);
  ctx.strokeStyle='#8a8a9a';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,-14);ctx.lineTo(0,14);ctx.stroke();
  ctx.strokeStyle='#8a8a9a';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(0,-14,3,0,Math.PI*2);ctx.stroke();
  ctx.strokeStyle='#9a9aaa';ctx.lineWidth=1.2;
  ctx.beginPath();ctx.moveTo(-6,-8);ctx.quadraticCurveTo(0,-4,6,-8);ctx.quadraticCurveTo(0,-1,-6,3);ctx.quadraticCurveTo(0,7,6,3);ctx.stroke();
  ctx.strokeStyle='#7a7a8a';
  ctx.beginPath();ctx.moveTo(6,-8);ctx.quadraticCurveTo(0,-4,-6,-8);ctx.quadraticCurveTo(0,-1,6,3);ctx.quadraticCurveTo(0,7,-6,3);ctx.stroke();
  ctx.restore();ctx.restore();
}
var SCR_COLORS=['#e8c820','#d4a810','#f0d030'];
function drawScarab(ctx,t,variant){
  var wf=Math.sin(t*12)*3,c=SCR_COLORS[variant%3];
  ctx.save();ctx.translate(15,18);
  ctx.fillStyle=c;ctx.globalAlpha=0.6;ctx.beginPath();ctx.ellipse(0,0,8+wf,6,0,0,Math.PI*2);ctx.fill();
  ctx.globalAlpha=1;ctx.strokeStyle='#8a6a00';ctx.lineWidth=1;
  ctx.fillStyle=c;ctx.beginPath();ctx.ellipse(0,2,5,7,0,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.arc(0,-5,3.5,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.fillStyle='#1a1a0a';ctx.beginPath();ctx.arc(-1.5,-6,0.8,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.arc(1.5,-6,0.8,0,Math.PI*2);ctx.fill();
  ctx.restore();
}
function drawBomb(ctx,t){
  var p=0.7+Math.sin(t*3)*0.3;
  ctx.save();ctx.translate(15,15);
  ctx.fillStyle='rgba(180,40,30,'+p+')';ctx.strokeStyle='#4a1a10';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.arc(0,0,8,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.strokeStyle='#6a4a2a';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(2,-8);ctx.lineTo(5,-13);ctx.stroke();
  ctx.fillStyle='rgba(255,200,50,'+p+')';ctx.beginPath();ctx.arc(5,-14,2,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#1a0a00';ctx.font='bold 9px sans-serif';ctx.textAlign='center';ctx.fillText('!',0,4);
  ctx.restore();
}
function drawShuriken(ctx){
  ctx.save();ctx.translate(15,15);
  ctx.fillStyle='#3a3a3a';ctx.strokeStyle='#1a1a1a';ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(0,-12);ctx.lineTo(3,-3);ctx.lineTo(12,0);ctx.lineTo(3,3);ctx.lineTo(0,12);ctx.lineTo(-3,3);ctx.lineTo(-12,0);ctx.lineTo(-3,-3);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.fillStyle='#5a5a5a';ctx.beginPath();ctx.arc(0,0,2.5,0,Math.PI*2);ctx.fill();
  ctx.restore();
}
function drawBoom(ctx,progress){
  var r=5+progress*22,o=1-progress;
  ctx.save();ctx.translate(20,20);
  ctx.fillStyle='rgba(255,200,50,'+(o*0.6)+')';ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='rgba(255,120,20,'+(o*0.8)+')';ctx.beginPath();ctx.arc(0,0,r*0.6,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='rgba(255,255,200,'+o+')';ctx.beginPath();ctx.arc(0,0,r*0.3,0,Math.PI*2);ctx.fill();
  ctx.restore();
}
function drawBgTile(ctx){
  ctx.fillStyle='#0a0e08';ctx.fillRect(0,0,40,35);
  ctx.strokeStyle='#141a10';ctx.lineWidth=0.5;
  ctx.beginPath();ctx.moveTo(20,0);ctx.lineTo(0,35);ctx.lineTo(40,35);ctx.closePath();ctx.stroke();
  ctx.strokeStyle='#0e140a';ctx.lineWidth=0.3;
  ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(40,0);ctx.lineTo(20,35);ctx.closePath();ctx.stroke();
}

/* ---- Pre-bake textures ---- */
var TEX = {};
function buildTextures(){
  var f,v;
  TEX.dragon=[];for(f=0;f<8;f++){var df=f;TEX.dragon.push(makeTex(70,60,function(ctx){drawDragon(ctx,df);}));}
  TEX.fireball=[];for(f=0;f<4;f++){var ff=f;TEX.fireball.push(makeTex(36,20,function(ctx){drawFireball(ctx,ff);}));}
  TEX.pyramid=[];for(v=0;v<5;v++){TEX.pyramid.push([]);for(f=0;f<4;f++){var pf=f,pv=v;TEX.pyramid[v].push(makeTex(44,44,function(ctx){drawPyramid(ctx,pf,pv);}));}}
  TEX.caduc=[];for(f=0;f<8;f++){var cf=f;TEX.caduc.push(makeTex(56,56,function(ctx){drawCaduc(ctx,cf*0.4);}));}
  TEX.caducDamaged=[];for(f=0;f<8;f++){var rdf=f;TEX.caducDamaged.push(makeTex(56,56,function(ctx){drawCaduc(ctx,rdf*0.4);ctx.globalCompositeOperation='source-atop';ctx.fillStyle='rgba(220,40,40,0.6)';ctx.fillRect(0,0,56,56);ctx.globalCompositeOperation='source-over';}));}
  TEX.scarab=[];for(v=0;v<3;v++){TEX.scarab.push([]);for(f=0;f<4;f++){var sf=f,sv=v;TEX.scarab[v].push(makeTex(30,36,function(ctx){drawScarab(ctx,sf*0.6,sv);}));}}
  TEX.scarabDamaged=[];for(v=0;v<3;v++){TEX.scarabDamaged.push([]);for(f=0;f<4;f++){var gf=f,gv=v;TEX.scarabDamaged[v].push(makeTex(30,36,function(ctx){drawScarab(ctx,gf*0.6,gv);ctx.globalCompositeOperation='source-atop';ctx.fillStyle='rgba(40,220,40,0.65)';ctx.fillRect(0,0,30,36);ctx.globalCompositeOperation='source-over';}));}}
  TEX.bomb=[];for(f=0;f<4;f++){var bf=f;TEX.bomb.push(makeTex(30,30,function(ctx){drawBomb(ctx,bf*0.8);}));}
  TEX.shuriken=makeTex(30,30,function(ctx){drawShuriken(ctx);});
  TEX.bg=makeTex(40,35,function(ctx){drawBgTile(ctx);});
  TEX.bg.wrapS=TEX.bg.wrapT=THREE.RepeatWrapping;
}
`;
