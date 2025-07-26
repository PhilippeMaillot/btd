import { distance } from "../utils.js";
import { BoomerangProjectile } from "../projectileTypes/boomerangProjectile.js";

export default {
  cooldown: 900,
  damage: 1,
  range: 130,
  projectileSpeed: 5,

  shoot(tower, bloons, projectiles) {
    let target = null;
    let minDist = Infinity;

    for (let b of bloons) {
      if (!b.dead) {
        const d = distance(tower.x, tower.y, b.x, b.y);
        if (d < tower.range && d < minDist) {
          minDist = d;
          target = b;
        }
      }
    }

    if (target) {
      projectiles.push(new BoomerangProjectile(tower.x, tower.y, target, tower.damage));
      return true;
    }

    return false;
  }
}
