// updateLoop.js
import { state } from "./state.js";
import { Tower } from "../core/tower.js";
import { distance } from "../logic/utils.js";
import { updateHUD } from "../ui/hud.js";
import { getSelectedPath } from "../config/path.js";
const pathImage = new Image();
pathImage.src = "../assets/images/rock2.png";
const path = getSelectedPath();

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function drawPath() {
  if (!pathImage.complete) return;

  for (let i = 0; i < path.length - 1; i++) {
    const p1 = path[i];
    const p2 = path[i + 1];

    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const angle = Math.atan2(dy, dx);
    const distance = Math.hypot(dx, dy);
    const tileSize = 40;

    for (let j = 0; j < distance; j += tileSize) {
      const x = p1.x + (dx / distance) * j;
      const y = p1.y + (dy / distance) * j;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.drawImage(pathImage, -tileSize / 2, -tileSize / 2, tileSize, tileSize);
      ctx.restore();
    }
  }
}

function drawPops() {
  for (let i = state.pops.length - 1; i >= 0; i--) {
    const p = state.pops[i];
    ctx.beginPath();
    ctx.globalAlpha = p.alpha;
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 3;
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;

    p.radius += 1;
    p.alpha -= 0.05;
    if (p.alpha <= 0) state.pops.splice(i, 1);
  }
}

export function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPath();
  drawPops();

  if (state.selectedTower) {
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 3;
    ctx.arc(state.selectedTower.x, state.selectedTower.y, 25, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = "rgba(255, 153, 255, 0.4)";
    ctx.lineWidth = 2;
    ctx.arc(state.selectedTower.x, state.selectedTower.y, state.selectedTower.range, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  if (state.PlacingTower) {
    ctx.globalAlpha = 0.5;
    const previewImage = Tower.images[state.PlacingTower.type] || Tower.images.basic;
    ctx.drawImage(previewImage, state.PlacingTower.x - 20, state.PlacingTower.y - 20, 40, 40);
    ctx.globalAlpha = 1;
  }

  for (let tower of state.towers) {
    tower.draw(ctx);
    tower.update(state.bloons, state.projectiles);
  }

  for (let i = state.bloons.length - 1; i >= 0; i--) {
    let b = state.bloons[i];
    b.update();
    b.draw(ctx);
    if (b.reachedEnd) {
      state.bloons.splice(i, 1);
      state.lives -= b.health;
      if (state.lives < 0) state.lives = 0;
      document.getElementById("lives").classList.add("blink");
      setTimeout(() => document.getElementById("lives").classList.remove("blink"), 400);
      updateHUD();
    }
  }

  for (let i = state.projectiles.length - 1; i >= 0; i--) {
    const p = state.projectiles[i];
    p.update();

    if (p.dead) {
      state.projectiles.splice(i, 1);
      continue;
    }

    p.draw(ctx);

    for (let j = 0; j < state.bloons.length; j++) {
      let b = state.bloons[j];
      if (typeof p.checkCollision === "function" ? p.checkCollision(b) : distance(p.x, p.y, b.x, b.y) < 15) {
        state.pops.push({ x: b.x, y: b.y, radius: 5, alpha: 1, color: b.color });
        b.hit(state.projectiles, state.bloons, p.damage);
        if (b.dead) {
          state.bloons.splice(j, 1);
          state.money += 10;
          state.score++;
        }
        if (!p.checkCollision) {
          state.projectiles.splice(i, 1);
        }
        updateHUD();
        break;
      }
    }
  }

  requestAnimationFrame(updateGame);
}
