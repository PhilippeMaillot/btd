import { state } from "../logic/state.js";

export function updateHUD() {
  document.getElementById("money").textContent = "💰 " + state.money;
  document.getElementById("lives").textContent = "❤️ " + state.lives;
  document.getElementById("score").textContent = "🏆 " + state.score;
  document.getElementById("wave").textContent = "🌊 Vague " + (state.wave - 1);
}

export function updateShopAffordability() {
  document.querySelectorAll(".tower-card").forEach(card => {
    const type = card.dataset.type;
    let price = 50;
    if (type === "fast") price = 100;
    else if (type === "sniper") price = 150;

    const priceSpan = card.querySelector("span");
    if (state.money < price) {
      priceSpan.style.color = "red";
    } else {
      priceSpan.style.color = ""; // couleur par défaut
    }
  });
}
