import { startWave } from "./logic/waveManager.js";
import { updateGame } from "./logic/updateLoop.js";
import { handleTowerSelection } from "./ui/upgradeMenu.js";
import { Tower } from "./core/tower.js";
import { updateHUD, updateShopAffordability } from "./ui/hud.js";
import { state } from "./logic/state.js";

const canvas = document.getElementById("game");
const rect = canvas.getBoundingClientRect();

Tower.loadImages();

document.getElementById("startWave").onclick = startWave;

document.querySelectorAll(".tower-card").forEach(card => {
  card.addEventListener("click", () => {
    state.PlacingTower = {
      type: card.dataset.type,
      x: 0,
      y: 0
    };
  });
});

canvas.addEventListener("mousemove", e => {
  if (state.PlacingTower) {
    state.PlacingTower.x = e.clientX - rect.left;
    state.PlacingTower.y = e.clientY - rect.top;
  }
});

canvas.addEventListener("click", e => {
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (state.PlacingTower) {
    let price = 50;
    if (state.PlacingTower.type === "fast") price = 100;
    else if (state.PlacingTower.type === "sniper") price = 150;
    else if (state.PlacingTower.type === "blast") price = 100;

    if (state.money >= price) {
      state.towers.push(new Tower(state.PlacingTower.x, state.PlacingTower.y, state.PlacingTower.type));
      state.money -= price;
      updateHUD();
      updateShopAffordability();
    }
    state.PlacingTower = null;
    return;
  }

  handleTowerSelection(x, y);
});

updateGame();
