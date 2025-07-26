import { state } from "../logic/state.js";
import { updateHUD } from "./hud.js";

export function showUpgradeMenu(x, y, tower) {
  hideUpgradeMenu();

  const menu = document.createElement("div");
  menu.classList.add("upgrade-menu");
  const title = document.createElement("div");
  title.textContent = "Amélioration de la tourelle";
  title.style.fontWeight = "bold";
  title.style.marginBottom = "6px";
  menu.appendChild(title);

  const stats = document.createElement("div");
  stats.innerHTML = `
    <div><strong>Dégâts :</strong> ${tower.damage}</div>
    <div><strong>Cadence :</strong> ${(tower.cooldown / 1000).toFixed(2)} s</div>
    <div><strong>Portée :</strong> ${tower.range} px</div>
    <div><strong>Vitesse projectile :</strong> ${tower.projectileSpeed}</div>
  `;
  stats.style.fontSize = "14px";
  stats.style.marginBottom = "10px";
  menu.appendChild(stats);

  const dmgBtn = document.createElement("button");
  dmgBtn.textContent = "Améliorer les dégâts (+25💰)";
  dmgBtn.onclick = () => {
    if (state.money >= 25) {
      tower.damage++;
      state.money -= 25;
      updateHUD();
      hideUpgradeMenu();
      showUpgradeMenu(x, y, tower);
    }
  };

  const rateBtn = document.createElement("button");
  rateBtn.textContent = "Réduire le temps de recharge (+25💰)";
  rateBtn.onclick = () => {
    if (state.money >= 25 && tower.cooldown > 300) {
      tower.cooldown -= 100;
      state.money -= 25;
      updateHUD();
      hideUpgradeMenu();
      showUpgradeMenu(x, y, tower);
    }
  };

  const rangeBtn = document.createElement("button");
  rangeBtn.textContent = "Augmenter la portée (+25💰)";
  rangeBtn.onclick = () => {
    if (state.money >= 25) {
      tower.range += 25;
      state.money -= 25;
      updateHUD();
      hideUpgradeMenu();
      showUpgradeMenu(x, y, tower);
    }
  };

  menu.appendChild(dmgBtn);
  menu.appendChild(rateBtn);
  menu.appendChild(rangeBtn);

  document.body.appendChild(menu);
}

export function hideUpgradeMenu() {
  const existing = document.querySelector(".upgrade-menu");
  if (existing) existing.remove();
}