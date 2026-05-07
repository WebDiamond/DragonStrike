import React, { useRef } from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { GAME_HTML } from "./gameHTML";

export function GameWebView() {
  const ref = useRef<InstanceType<typeof WebView>>(null);

  function handleMessage(e: WebViewMessageEvent) {
    try {
      const msg = JSON.parse(e.nativeEvent.data);
      if (msg.type === "exit") BackHandler.exitApp();
    } catch (_) { }
  }

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <WebView
        ref={ref}
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
  );
}

const styles = StyleSheet.create({
  web: { flex: 1, backgroundColor: "#060804" },
});
