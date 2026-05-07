export const CSS_CONTENT = `
*{margin:0;padding:0;box-sizing:border-box;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;}
html,body{width:100%;height:100%;overflow:hidden;background:#060804;}
.screen{position:fixed;inset:0;display:none;flex-direction:column;align-items:center;justify-content:center;}
.screen.active{display:flex;}

/* --- SPLASH --- */
#s-splash{background:#000;}

/* --- MENU --- */
#s-menu{background:#0a0e08;overflow:hidden;}
#menu-bg-c{position:absolute;inset:0;width:100%;height:100%;}
#menu-sprites-c{margin-bottom:12px;z-index:1;}
.title{font-family:'Cinzel',serif;font-weight:900;font-size:24px;color:#40c050;letter-spacing:5px;margin-bottom:6px;z-index:1;}
.subtitle{font-family:'Cinzel',serif;font-size:10px;color:#3a5a2a;letter-spacing:3px;margin-top:20px;margin-bottom:50px;z-index:1;}
.mbtn{z-index:1;margin:6px 0;padding:13px 0;width:210px;border:1px solid #1a3a15;border-radius:3px;background:rgba(10,30,10,0.6);color:#60c050;font-family:'Exo 2',sans-serif;font-size:14px;font-weight:600;letter-spacing:3px;text-align:center;cursor:pointer;}
.mbtn:active{background:rgba(20,50,20,0.8);}
.exit-btn{z-index:1;margin:6px 0;padding:13px 0;width:210px;border:1px solid #3a1515;border-radius:3px;background:rgba(30,8,8,0.7);color:#a04040;font-family:'Exo 2',sans-serif;font-size:14px;font-weight:600;letter-spacing:3px;text-align:center;cursor:pointer;}
.exit-btn:active{background:rgba(50,15,15,0.9);}
#hi-display{z-index:1;color:#2a4a20;font-family:'Exo 2',sans-serif;font-size:12px;margin-top:20px;}

/* --- INFO --- */
#s-info{background:#0a0e08;padding:20px;overflow-y:auto;}
.info-title{font-family:'Cinzel',serif;font-weight:700;font-size:22px;color:#60c050;letter-spacing:5px;margin-bottom:20px;}
.info-line{font-family:'Exo 2',sans-serif;font-size:13px;line-height:28px;color:#7a8a60;text-align:center;}
.info-gold{color:#60c050;}

/* --- GAME --- */
#s-game{background:#0a0e08;align-items:stretch;position:relative;}
#hud{display:flex;justify-content:space-between;padding:6px 14px;background:rgba(6,12,4,0.92);border-bottom:1px solid #1a2a15;flex-shrink:0;}
.hud-txt{font-family:'Exo 2',sans-serif;font-size:13px;font-weight:600;color:#80b060;letter-spacing:1px;}
.hud-urgent{color:#e84040 !important;}
#gc{display:block;flex:1;width:100%;}
#ctrl{position:absolute;bottom:30px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:10px;padding:9px 14px;background:rgba(6,12,4,0.95);border:1px solid #1a2a15;border-radius:8px;}
.sep{width:1px;height:36px;background:#1a2a15;}
.gbtn{font-family:'Exo 2',sans-serif;font-weight:700;color:#5a8a40;font-size:20px;padding:12px 22px;cursor:pointer;}
.fbtn{font-family:'Exo 2',sans-serif;font-weight:700;color:#80e050;font-size:20px;padding:12px 30px;cursor:pointer;}

/* --- OVER --- */
#s-over{background:#060804;}
.over-title{font-family:'Cinzel',serif;font-weight:900;font-size:30px;color:#8a2a1a;letter-spacing:5px;margin-bottom:14px;}
.over-score-lbl{font-family:'Exo 2',sans-serif;font-size:15px;color:#7a8a60;margin-bottom:5px;}
.over-hi-lbl{font-family:'Exo 2',sans-serif;font-size:13px;color:#4a5a3a;margin-bottom:30px;}
.score-val{color:#60c050;font-weight:700;}
`;
