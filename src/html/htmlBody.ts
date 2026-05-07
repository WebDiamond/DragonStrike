export const HTML_BODY = `
<!-- MENU -->
<div id="s-menu" class="screen active">
  <canvas id="menu-bg-c"></canvas>
  <canvas id="menu-sprites-c" width="210" height="130"></canvas>
  <div class="title">DRAGON STRIKE</div>
  <div class="subtitle">&#9650; THE DRAGON STRIKES BACK &#9650;</div>
  <div class="mbtn" id="btn-play">&#9654;&#160;&#160;GIOCA</div>
  <div class="mbtn" id="btn-info">&#8505;&#160;&#160;INFO</div>
  <div class="mbtn" id="btn-settings">&#9881;&#160;&#160;SETTINGS</div>
  <div class="exit-btn" id="btn-exit">&#10005;&#160;&#160;ESCI</div>
  <div id="hi-display"></div>
</div>

<!-- INFO -->
<div id="s-info" class="screen">
  <div class="info-title">INFO</div>
  <p class="info-line">Guida il draghetto attraverso i livelli!</p>
  <p class="info-line">&nbsp;</p>
  <p class="info-line info-gold">&#9733; NEMICI</p>
  <p class="info-line info-gold">&#9650; Loominadi = -1 kill</p>
  <p class="info-line info-gold">&#9877; Cadooceadis = -3 kills</p>
  <p class="info-line info-gold">&#9673; Scarab = -5 sec timer</p>
  <p class="info-line">&nbsp;</p>
  <p class="info-line">Evita bombe e shuriken!</p>
  <p class="info-line">&nbsp;</p>
  <p class="info-line info-gold">&#9733; BARRA COMANDI</p>
  <p class="info-line">&#8593; Su &mdash; sposta il drago verso l'alto</p>
  <p class="info-line">&#8595; Gi&ugrave; &mdash; sposta il drago verso il basso</p>
  <p class="info-line">&#128293; Spara &mdash; lancia una palla di fuoco</p>
  <div class="mbtn" id="btn-info-back" style="margin-top:24px;">&#8592; MENU</div>
</div>

<!-- SETTINGS -->
<div id="s-settings" class="screen">
  <div class="info-title">IMPOSTAZIONI</div>
  <div class="mbtn" id="btn-sound-toggle" style="margin-bottom:24px;">SOUND: ON</div>
  <div class="mbtn" id="btn-settings-back">&#8592; MENU</div>
</div>

<!-- GAME -->
<div id="s-game" class="screen">
  <div id="hud">
    <span class="hud-txt" id="hud-kills">&#9670; 0</span>
    <span class="hud-txt" id="hud-time">&#9201; 30s</span>
    <span class="hud-txt" id="hud-score">&#9733; 0</span>
  </div>
  <canvas id="gc"></canvas>
  <div id="ctrl">
    <div class="gbtn" id="btn-up">&#8593;</div>
    <div class="sep"></div>
    <div class="gbtn" id="btn-dn">&#8595;</div>
    <div class="fbtn" id="btn-fire">&#128293;</div>
  </div>
</div>

<!-- OVER -->
<div id="s-over" class="screen">
  <div class="over-title">GAME OVER</div>
  <p class="over-score-lbl">Punteggio: <span class="score-val" id="over-val">0</span></p>
  <p class="over-hi-lbl" id="over-hi">Record: 0</p>
  <div class="mbtn" id="btn-retry">&#8635;&#160;&#160;RIPROVA</div>
  <div class="mbtn" id="btn-home">&#8962;&#160;&#160;HOME</div>
  <div class="exit-btn" id="btn-exit2">&#10005;&#160;&#160;ESCI</div>
</div>
`;
