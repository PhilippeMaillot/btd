// waveManager.js
import { state } from "./state.js";
import { Bloon } from "../core/bloon.js";
import { WAVES } from "../core/waves.js";
import { updateHUD } from "../ui/hud.js";
import { getSelectedPath } from "../config/path.js";
const path = getSelectedPath();


export function startWave() {
  const waveData = WAVES[state.wave - 1] || [];
  waveData.forEach(group => {
    for (let i = 0; i < group.count; i++) {
      setTimeout(() => {
        state.bloons.push(new Bloon(path[0].x, path[0].y, path, group.tier));
      }, i * 300);
    }
  });

  state.wave++;
  updateHUD();

  setTimeout(() => {
    state.projectiles = [];
  }, waveData.length * 300 + 10000);
}
