# Guida alla Compilazione (Build) per Dragon Strike

Questo progetto è basato su **Expo**. Il metodo più semplice e supportato per generare le build (eseguibili) per iOS e Android è utilizzare **EAS (Expo Application Services)** Build.

---

## 🛠 Prerequisiti

1. **Account Expo**: Devi avere un account registrato su [expo.dev](https://expo.dev/).
2. **EAS CLI Globale**: Assicurati di avere installato l'interfaccia a riga di comando sul tuo computer. Esegui il comando sul terminale:
   ```bash
   npm install -g eas-cli
   ```
3. **Login**: Autenticati al tuo account Expo all'interno del terminale:
   ```bash
   eas login
   ```

Se è la primissima volta che usi EAS in questo progetto, esegui il comando di configurazione iniziale per generare il file `eas.json`:
```bash
eas build:configure
```

## ⚙️ Configurazione Pre-Compilazione (IMPORTANTE)

Prima di avviare qualsiasi comando di compilazione (build), assicurati di aver eseguito questi passaggi fondamentali introdotti con i recenti aggiornamenti:

1. **Installazione Dipendenze (Risoluzione Conflitti):**
   A causa dell'aggiornamento a React 19, alcuni pacchetti (come `react-native-webview`) richiedono l'installazione con il flag legacy:
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Configurazione AdMob (App ID):**
   Se hai intenzione di riattivare o utilizzare gli annunci Google AdMob in produzione, **DEVI** inserire i tuoi veri *App ID* all'interno del file `app.json` prima della compilazione. 
   Apri `app.json` e sostituisci le "X" con i tuoi codici forniti dalla console AdMob:
   ```json
   "plugins": [
     [
       "react-native-google-mobile-ads",
       {
         "androidAppId": "ca-app-pub-TUO_CODICE_ANDROID",
         "iosAppId": "ca-app-pub-TUO_CODICE_IOS"
       }
     ]
   ]
   ```
   *(Nota: Se compili l'app con gli ID fittizi o non validi, l'app potrebbe crashare istantaneamente all'avvio sul dispositivo fisico).*

---

## 🤖 Compilazione per Android

### 1. File APK (Per Emulatori o installazione manuale)
Se desideri un file `.apk` che puoi semplicemente inviare ai dispositivi tramite USB o avviare in un emulatore, fai riferimento a un profilo "preview" in `eas.json` (che abilita il `buildType` a `"apk"`) e lancia:
```bash
eas build -p android --profile preview
```
*(EAS farà l'upload del progetto sui loro server e ti rilascerà un link per scaricare l'APK compilato)*.

### 2. File AAB (Per il Google Play Store)
Il formato `.aab` (Android App Bundle) è il formato ufficiale e obbligatorio richiesto da Google Play Console. Questo è solitamente il comportamento standard in produzione, basta avviare:
```bash
eas build -p android
```
*(Nota: la prima volta che esegui questo comando, EAS ti chiederà se vuoi che lui gestisca automaticamente le Keystore, ovvero le credenziali crittografiche per firmare l'app. Rispondi "Sì").*

---

## 🍏 Compilazione per iOS

> **Attenzione (Requisiti Apple):** Per eseguire una build adatta all'App Store o TestFlight, o su dispositivi iOS fisici, devi possedere un **account Apple Developer a pagamento**. Non è tuttavia richiesto avere un Mac, in quanto l'app verrà compilata sui server Mac remoti di Expo.

### 1. Build per l'App Store / TestFlight (File IPA)
Una volta collegato il tutto, compila l'app per iOS con il comando:
```bash
eas build -p ios
```
Il sistema ti chiederà l'indirizzo email e la password (o l'App-Specific Password) del tuo ID Apple Sviluppatore. EAS gestirà automaticamente la generazione e il mantenimento di Certificati di Distribuzione, App ID e Provisioning Profiles.

### 2. Build per il Simulatore iOS (Se possiedi un Mac)
Se desideri semplicemente generare un eseguibile `.app`/`.tar.gz` per testarlo localmente nel Simulatore Xcode sul tuo Mac:
```bash
eas build -p ios --profile development
```

---

## 💻 Compilazione in Locale (Senza Cloud) - Avanzato

Se possiedi l'infrastruttura sul tuo PC (Android Studio completo SDK/NDK, oppure Xcode su macOS) e vuoi evitare il tempo di coda dei server gratuiti Expo, puoi effettuare la **pre-build**.

1. Genera le cartelle native `/android` e `/ios` che Expo tiene solitamente nascoste:
   ```bash
   npx expo prebuild
   ```
2. Questa operazione espone le infrastrutture standard dei due OS. Adesso puoi procedere aprendo le cartelle nei rispettivi IDE standard:
   * **Android:** Apri la cartella `android/` all'interno di **Android Studio**. Potrai creare l'APK nel menu superiore andando su `Build -> Build Bundle(s) / APK(s)`.
   * **iOS:** (Solo su Mac) Apri il file `.xcworkspace` all'interno della cartella `ios/` con **Xcode** ed esegui il build dalla piattaforma nativa Apple.
