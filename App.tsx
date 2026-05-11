import React, { useRef, useEffect } from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { GAME_HTML } from "./src/gameHTML";

// ── AdMob (commentato temporaneamente) ──────────────────────────
// import {
//   InterstitialAd,
//   AdEventType,
//   TestIds,
// } from "react-native-google-mobile-ads";
// 
// // ID per l'annuncio Interstitial (Video/Full-screen)
// const INTERSTITIAL_ID = __DEV__ ? TestIds.INTERSTITIAL : "ca-app-pub-XXXXXXXX/XXXXXXXX";
// 
// const interstitial = InterstitialAd.createForAdRequest(INTERSTITIAL_ID, {
//   requestNonPersonalizedAdsOnly: true,
// });
// ────────────────────────────────────────────────────────────────

export default function App() {
  const webRef = useRef<WebView>(null);

  // const hasShownStartupAd = useRef(false);

  // ── AdMob useEffect (commentato) ──────────────────────────────
  // useEffect(() => {
  //   const unsubLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
  //     if (!hasShownStartupAd.current) {
  //       hasShownStartupAd.current = true;
  //       interstitial.show();
  //     }
  //   });
  //   const unsubClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
  //     interstitial.load();
  //   });
  //   interstitial.load();
  //   return () => { unsubLoaded(); unsubClosed(); };
  // }, []);
  // ─────────────────────────────────────────────────────────────

  function handleMessage(e: WebViewMessageEvent) {
    try {
      const msg = JSON.parse(e.nativeEvent.data);
      if (msg.type === "exit") {
        BackHandler.exitApp();
      }
      // ── AdMob: interstitial al game over (commentato) ─────────
      // else if (msg.type === "gameOver") {
      //   if (interstitial.loaded && Math.random() <= 0.30) {
      //     interstitial.show();
      //   }
      // }
      // ──────────────────────────────────────────────────────────
    } catch (_) { }
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <SafeAreaView style={styles.root}>
        <View style={styles.game}>
          <WebView
            ref={webRef}
            source={{ html: GAME_HTML, baseUrl: "https://localhost" }}
            style={styles.web}
            onMessage={handleMessage}
            javaScriptEnabled
            domStorageEnabled
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
            originWhitelist={["*"]}
            mixedContentMode="always"
          />
        </View>
        {/* ── AdMob Banner (commentato) ──────────────────────────
        <BannerAd
          unitId={BANNER_ID}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{ requestNonPersonalizedAdsOnly: true }}
        />
        ─────────────────────────────────────────────────────── */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#060804" },
  game: { flex: 1 },
  web:  { flex: 1, backgroundColor: "#060804" },
});
