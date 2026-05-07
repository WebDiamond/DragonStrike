# Dragon Strike

Un gioco mobile 2D side-scrolling sviluppato con **Expo** (React Native) e **Three.js** (WebGL) via WebView.

## Stack Tecnico

| Layer | Tecnologia |
|---|---|
| App shell | Expo SDK 54 / React Native |
| Rendering gioco | Three.js r158 (WebGL) in WebView |
| Scripting gioco | JavaScript ES5 auto-contenuto |
| Font | Google Fonts (Cinzel, Exo 2) |
| Storage | `localStorage` (hi score) |

## Architettura

```
App.tsx                  ← SafeAreaProvider + StatusBar
  └─ GameWebView.tsx     ← react-native-webview wrapper
       └─ gameHTML.ts    ← assembla l'HTML finale da parti
            ├─ html/css.ts        → stili di tutte le schermate
            ├─ html/htmlBody.ts   → struttura HTML (5 schermate)
            ├─ html/engine.ts     → motore di gioco (JS puro)
            ├─ html/sprites.ts    → disegno sprite Canvas 2D + texture Three.js
            ├─ html/renderer.ts   → Three.js: scene, camera, game loop
            └─ html/screens.ts    → gestione schermate, controlli, animazioni
```

### Bridge RN ↔ WebView

| Direzione | Evento | Dati |
|---|---|---|
| WebView → RN | `postMessage` | `{ type: "exit" }` |

Lo **hi score** è gestito tramite `localStorage` direttamente nel WebView (nessun bridge necessario).

## Schermate

- **Splash** — Piramide animata su sfondo nero (Canvas 2D)
- **Menu** — Sprites animati, titolo, pulsanti GIOCA / INFO / ESCI
- **Info** — Guida ai nemici e ai controlli
- **Gioco** — Three.js WebGL + HUD + barra comandi touch
- **Game Over** — Punteggio, record, Riprova / Home / Esci

## Nemici & Hazard

| Sprite | Tipo | Effetto |
|---|---|---|
| ▲ Loominadi | Nemico | -1 kill |
| ⚕ Cadooceadis | Nemico | -3 kills |
| ◉ Scarab | Nemico | -5 secondi al timer |
| 💣 Bomba | Hazard | game over al contatto |
| ✦ Shuriken | Hazard | game over al contatto |

## Setup & Avvio

```bash
# Installa dipendenze
npm install

# Avvia in development
npx expo start
```

> **Nota:** Il WebView carica Three.js e i Google Fonts via CDN (jsdelivr / fonts.googleapis.com).  
> È richiesta la connessione internet al **primo avvio**. Le risorse vengono poi messe in cache dal browser.

## Build (EAS)

```bash
# Android
eas build --platform android --profile preview

# iOS
eas build --platform ios --profile preview
```

Vedi `COMPILE.md` per la guida completa alla compilazione.

## Struttura File

```
├── App.tsx                  # Entry point (semplificato)
├── src/
│   ├── GameWebView.tsx      # Componente WebView
│   ├── gameHTML.ts          # Assembler HTML
│   └── html/
│       ├── css.ts           # Stili CSS
│       ├── htmlBody.ts      # Struttura HTML
│       ├── engine.ts        # Motore di gioco
│       ├── sprites.ts       # Sprite Canvas 2D
│       ├── renderer.ts      # Three.js renderer
│       └── screens.ts       # Schermate & controlli
├── assets/                  # Icone e splash screen Expo
├── app.json                 # Configurazione Expo
└── eas.json                 # Configurazione EAS Build
```
