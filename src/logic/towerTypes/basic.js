import { Projectile } from "../projectile.js";
import { distance } from "../utils.js";

const baseImage = new Image();
baseImage.src = "../assets/images/baseproj.png";

export default {
  cooldown: 1000,
  damage: 1,
  range: 150,
  projectileSpeed: 5,

  shoot(tower, bloons, projectiles) {
    for (let b of bloons) {
      if (!b.dead && distance(tower.x, tower.y, b.x, b.y) < tower.range) {
        const dx = b.x - tower.x;
        const dy = b.y - tower.y;
        const angle = Math.atan2(dy, dx);
        projectiles.push(new Projectile(
          tower.x,
          tower.y,
          b,
          tower.damage,
          null,
          null,
          this.projectileSpeed,
          null, // pas de lifetime
          baseImage,
          angle
        ));
        return true;
      }
    }
    return false;
  }
};
