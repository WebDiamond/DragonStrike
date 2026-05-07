import { CSS_CONTENT } from "./html/css";
import { HTML_BODY } from "./html/htmlBody";
import { ENGINE_JS } from "./html/engine";
import { SPRITES_JS } from "./html/sprites";
import { RENDERER_JS } from "./html/renderer";
import { SCREENS_JS } from "./html/screens";
import { AUDIO_JS } from "./html/audio";

export const GAME_HTML = `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>Dragon Strike</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Exo+2:wght@400;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.min.js"></script>
<style>${CSS_CONTENT}</style>
</head>
<body>
${HTML_BODY}
<script>
${AUDIO_JS}
${ENGINE_JS}
${SPRITES_JS}
${RENDERER_JS}
${SCREENS_JS}
</script>
</body>
</html>`;
