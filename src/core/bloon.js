import { BLOON_TIERS } from "./bloonTiers.js";

export class Bloon {
  constructor(x, y, path, tier = 1) {
    this.x = x;
    this.y = y;
    this.path = path;
    this.pathIndex = 0;
    this.tier = tier;

    const tierData = BLOON_TIERS[tier];
    this.color = tierData.color;
    this.speed = tierData.speed;
    this.maxHealth = tierData.health;
    this.health = tierData.health;
    this.name = tierData.name;
    this.onDeathSpawnLowerTier = tierData.onDeathSpawnLowerTier;

    this.dead = false;
    this.reachedEnd = false;
  }

  update() {
    if (this.dead || this.reachedEnd) return;

    const target = this.path[this.pathIndex + 1];
    if (!target) {
      this.reachedEnd = true;
      return;
    }

    const dx = target.x - this.x;
    const dy = target.y - this.y;
    const dist = Math.hypot(dx, dy);

    if (dist < this.speed) {
      this.x = target.x;
      this.y = target.y;
      this.pathIndex++;
    } else {
      this.x += (dx / dist) * this.speed;
      this.y += (dy / dist) * this.speed;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
    ctx.fill();
  }

  hit(projectiles, bloons, damage = 1) {
    this.health -= damage;

    if (this.health <= 0) {
      if (this.onDeathSpawnLowerTier && this.tier > 1) {
        const newBloon = new Bloon(this.x, this.y, this.path, this.tier - 1);
        newBloon.pathIndex = this.pathIndex;
        bloons.push(newBloon);
      }
      this.dead = true;
    }
  }
}
