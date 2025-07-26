import { Projectile } from "../projectile.js";
import { distance } from "../utils.js";

const baseImage = new Image();
baseImage.src = "./public/images/boulet.png";

export default {
  cooldown: 400,
  damage: 1,
  range: 120,
  projectileSpeed: 7,

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
          null,
          baseImage,
          angle
        ));
        return true;
      }
    }
    return false;
  }
};
