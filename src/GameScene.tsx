import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Defs, Pattern, Polygon, Rect } from "react-native-svg";
import { Dragon, Fireball, Pyramid, Caduc, ScarabSpr, BombSpr, ShurikenSpr, Boom } from "./Sprites";
import { GameState, PLAYER_X } from "./engine";

interface GameSceneProps {
  g: GameState;
  score: number;
  bBot: number;
  GW: number;
  SVG_H: number;
  ff: boolean;
  doFire: () => void;
  doUp: () => void;
  doDown: () => void;
  doBU: () => void;
  doBD: () => void;
}

// Pattern SVG riutilizzabile come componente memo
const BgPattern = memo(function BgPattern() {
  return (
    <>
      <Defs>
        <Pattern id="bp" x="0" y="0" width="40" height="35" patternUnits="userSpaceOnUse">
          <Polygon points="20,0 0,35 40,35" fill="none" stroke="#141a10" strokeWidth="0.5" />
          <Polygon points="0,0 40,0 20,35" fill="none" stroke="#0e140a" strokeWidth="0.3" />
        </Pattern>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#bp)" />
    </>
  );
});

// HUD separato con memo per evitare re-render inutili
const GameHUD = memo(function GameHUD({
  req, timeLeft, score, ff,
}: { req: number; timeLeft: number; score: number; ff: boolean }) {
  const isUrgent = timeLeft <= 3;
  return (
    <View style={st.hud}>
      <Text style={[st.hudTxt, ff && { fontFamily: "Exo2_600SemiBold" }]}>◈ {req}</Text>
      <Text style={[st.hudTxt, ff && { fontFamily: "Exo2_600SemiBold" }, isUrgent && st.hudUrgent]}>
        ⏱ {timeLeft}s
      </Text>
      <Text style={[st.hudTxt, ff && { fontFamily: "Exo2_600SemiBold" }]}>★ {score}</Text>
    </View>
  );
});

// Barra comandi con memo — cambia solo se bBot o ff cambiano
const CtrlBar = memo(function CtrlBar({
  bBot, ff, doUp, doDown, doFire, doBU, doBD,
}: {
  bBot: number; ff: boolean;
  doUp: () => void; doDown: () => void; doFire: () => void;
  doBU: () => void; doBD: () => void;
}) {
  return (
    <View style={[st.ctrlBar, { bottom: bBot }]}>
      <View style={{ gap: 4 }}>
        <Text style={[st.miniBtn, ff && { fontFamily: "Exo2_700Bold" }]} onPress={doBU}>▲</Text>
        <Text style={[st.miniBtn, ff && { fontFamily: "Exo2_700Bold" }]} onPress={doBD}>▼</Text>
      </View>
      <View style={st.sep} />
      <Text style={[st.gBtnTxt, ff && { fontFamily: "Exo2_700Bold" }]} onPress={doUp}>↑</Text>
      <Text style={[st.gBtnTxt, ff && { fontFamily: "Exo2_700Bold" }]} onPress={doDown}>↓</Text>
      <Text style={[st.fBtnTxt, ff && { fontFamily: "Exo2_700Bold" }]} onPress={doFire}>🔥</Text>
    </View>
  );
});

export const GameScene = memo(function GameScene({
  g, score, bBot, GW, SVG_H, ff,
  doFire, doUp, doDown, doBU, doBD,
}: GameSceneProps) {
  const timeLeft = Math.max(0, Math.floor((g.tl ?? 0) - (g.el ?? 0)));
  const fr = g.fr ?? 0;
  const sx = g.sx ?? 0;

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <GameHUD req={g.req ?? 0} timeLeft={timeLeft} score={score} ff={ff} />

      <Svg width={GW} height={SVG_H} viewBox={`0 0 ${GW} ${SVG_H}`} style={{ backgroundColor: "#0a0e08" }}>
        <BgPattern />

        {/* Proiettili */}
        {(g.bul || []).map((b: any, i: number) => {
          const bx = b.x - sx;
          if (bx < -20 || bx > GW + 20) return null;
          return <Fireball key={`b${i}`} x={bx} y={b.y} frame={fr} />;
        })}

        {/* Nemici */}
        {(g.en || []).filter((e: any) => e.alive).map((e: any, i: number) => {
          const ex = e.x - sx;
          if (ex < -30 || ex > GW + 30) return null;
          if (e.type === "loominadi") return <Pyramid key={`e${i}`} x={ex} y={e.y} frame={fr} variant={e.variant} />;
          if (e.type === "cadooceadis") return <Caduc key={`e${i}`} x={ex} y={e.y} t={fr * 0.08} />;
          return <ScarabSpr key={`e${i}`} x={ex} y={e.y} t={fr * 0.05} variant={e.variant} />;
        })}

        {/* Hazard */}
        {(g.hz || []).filter((h: any) => h.alive).map((h: any, i: number) => {
          const hx = h.x - sx;
          if (hx < -20 || hx > GW + 20) return null;
          if (h.kind === "bomb") return <BombSpr key={`h${i}`} x={hx} y={h.y} t={fr * 0.04} />;
          return <ShurikenSpr key={`h${i}`} x={hx} y={h.y} angle={h.angle} />;
        })}

        {/* Drago */}
        {g.alive !== false && (
          <Dragon
            x={PLAYER_X}
            y={(g.py ?? 250) + (g.bob ?? 0)}
            glow={0.5 + Math.sin(fr * 0.08) * 0.3}
            frame={fr}
          />
        )}

        {/* Esplosioni */}
        {(g.ex || []).map((e: any, i: number) => (
          <Boom key={`x${i}`} x={e.x} y={e.y} progress={e.progress} />
        ))}
      </Svg>

      <CtrlBar
        bBot={bBot}
        ff={ff}
        doUp={doUp}
        doDown={doDown}
        doFire={doFire}
        doBU={doBU}
        doBD={doBD}
      />
    </View>
  );
});

const st = StyleSheet.create({
  hud: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: "rgba(6,12,4,0.92)",
    borderBottomWidth: 1,
    borderBottomColor: "#1a2a15",
  },
  hudTxt: { color: "#80b060", fontSize: 13, letterSpacing: 1 },
  hudUrgent: { color: "#e84040" },
  ctrlBar: {
    position: "absolute",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: "rgba(6,12,4,0.95)",
    borderWidth: 1,
    borderColor: "#1a2a15",
    borderRadius: 8,
  },
  sep: { width: 1, height: 36, backgroundColor: "#1a2a15" },
  miniBtn: { color: "#3a6a30", fontSize: 11, paddingHorizontal: 10, paddingVertical: 4 },
  gBtnTxt: { color: "#5a8a40", fontSize: 18, letterSpacing: 2, paddingHorizontal: 22, paddingVertical: 12 },
  fBtnTxt: { color: "#80e050", fontSize: 18, letterSpacing: 2, paddingHorizontal: 30, paddingVertical: 12 },
});
