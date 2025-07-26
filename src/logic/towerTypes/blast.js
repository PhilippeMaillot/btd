import { Projectile } from "../projectile.js";
import { distance } from "../utils.js";
const blastImage = new Image();
blastImage.src = "../assets/images/baseproj.png";

export default {
  cooldown: 900,
  damage: 1,
  range: 100,
  projectileSpeed: 4,

  shoot(tower, bloons, projectiles) {
    const hasBloonInRange = bloons.some(b =>
      !b.dead && distance(tower.x, tower.y, b.x, b.y) < tower.range
    );

    if (hasBloonInRange) {
      const angles = [0, Math.PI / 4, Math.PI / 2, 3 * Math.PI / 4, Math.PI,
        5 * Math.PI / 4, 3 * Math.PI / 2, 7 * Math.PI / 4];

      for (let angle of angles) {
        const dx = Math.cos(angle);
        const dy = Math.sin(angle);
        projectiles.push(
          new Projectile(
            tower.x,
            tower.y,
            null,
            tower.damage,
            dx,
            dy,
            this.projectileSpeed,
            30,            // durée de vie
            blastImage,    // image
            angle
          )
        );
      }
      return true;
    }

    return false;
  }
};
