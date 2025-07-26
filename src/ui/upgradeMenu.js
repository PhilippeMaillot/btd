// upgradeMenu.js
import { state } from "../logic/state.js";
import { distance } from "../logic/utils.js";
import { showUpgradeMenu, hideUpgradeMenu } from "./listeners.js";

export function handleTowerSelection(x, y) {
  for (let t of state.towers) {
    if (distance(x, y, t.x, t.y) < 25) {
      state.selectedTower = t;
      showUpgradeMenu(t.x, t.y, t);
      return;
    }
  }

  hideUpgradeMenu();
  state.selectedTower = null;
}
