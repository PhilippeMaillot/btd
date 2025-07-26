import { Projectile } from "../projectile.js";

const baseImage = new Image();
baseImage.src = "./public/images/snipbullet.png";

export default {
  cooldown: 1800,
  damage: 3,
  range: Infinity,
  projectileSpeed: 12,

  shoot(tower, bloons, projectiles) {
    for (let b of bloons) {
      if (!b.dead) {
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
