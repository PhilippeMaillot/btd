import { startWave } from "./logic/waveManager.js";
import { updateGame } from "./logic/updateLoop.js";
import { handleTowerSelection } from "./ui/upgradeMenu.js";
import { Tower } from "./core/tower.js";
import { updateHUD, updateShopAffordability } from "./ui/hud.js";
import { state } from "./logic/state.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Surface logique fixe (dessin interne)
canvas.width = 1300;
canvas.height = 750;

let canvasScale = 1;

// Fonction pour rendre le canvas visuellement responsive
function resizeCanvas() {
  const maxWidth = window.innerWidth - 500; // 160 = largeur #shop
  const scale = Math.min(maxWidth / 1300, window.innerHeight / 750);
  canvas.style.width = `${1300 * scale}px`;
  canvas.style.height = `${750 * scale}px`;
  canvasScale = scale;
}

// Appel au chargement et au redimensionnement
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Chargement des images
Tower.loadImages();

// Lancement de la vague
document.getElementById("startWave").onclick = startWave;

// Sélection de tourelles
document.querySelectorAll(".tower-card").forEach(card => {
  card.addEventListener("click", () => {
    state.PlacingTower = {
      type: card.dataset.type,
      x: 0,
      y: 0
    };
  });
});

// Position souris convertie en coordonnées logiques
function getMousePos(e) {
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) / canvasScale;
  const y = (e.clientY - rect.top) / canvasScale;
  return { x, y };
}

// Placement d'une tourelle temporaire
canvas.addEventListener("mousemove", e => {
  if (state.PlacingTower) {
    const { x, y } = getMousePos(e);
    state.PlacingTower.x = x;
    state.PlacingTower.y = y;
  }
});

// Clic pour placer ou sélectionner
canvas.addEventListener("click", e => {
  const { x, y } = getMousePos(e);

  if (state.PlacingTower) {
    let price = 50;
    if (state.PlacingTower.type === "fast") price = 100;
    else if (state.PlacingTower.type === "sniper") price = 150;
    else if (state.PlacingTower.type === "blast") price = 100;

    if (state.money >= price) {
      state.towers.push(new Tower(x, y, state.PlacingTower.type));
      state.money -= price;
      updateHUD();
      updateShopAffordability();
    }
    state.PlacingTower = null;
    return;
  }

  handleTowerSelection(x, y);
});

// Boucle de jeu
updateGame();
