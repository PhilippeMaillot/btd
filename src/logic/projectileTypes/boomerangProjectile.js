export class BoomerangProjectile {
  static image = null;

  constructor(x, y, target, damage, speed = 5) {
    this.startX = x;
    this.startY = y;
    this.x = x;
    this.y = y;
    this.damage = damage;
    this.speed = speed;
    this.returning = false;
    this.dead = false;

    const dx = target.x - x;
    const dy = target.y - y;
    const dist = Math.hypot(dx, dy);
    this.vx = (dx / dist) * speed;
    this.vy = (dy / dist) * speed;

    this.maxDistance = 150;
    this.traveled = 0;
    this.hitAtPhase = new Map();

    this.rotation = 0;

    // Chargement de l'image si ce n’est pas déjà fait
    if (!BoomerangProjectile.image) {
      BoomerangProjectile.image = new Image();
      BoomerangProjectile.image.src = "../assets/images/boomerang.png";
    }
  }

  update() {
    if (this.dead) return;

    this.x += this.vx;
    this.y += this.vy;
    this.traveled += this.speed;

    this.rotation += 0.3; // incrémente l'angle pour la rotation continue

    if (!this.returning && this.traveled >= this.maxDistance) {
      this.returning = true;
    }

    if (this.returning) {
      const dx = this.startX - this.x;
      const dy = this.startY - this.y;
      const dist = Math.hypot(dx, dy);

      this.vx = (dx / dist) * this.speed;
      this.vy = (dy / dist) * this.speed;

      if (dist < this.speed) {
        this.dead = true;
      }
    }
  }

  checkCollision(bloon) {
    if (this.dead || bloon.dead) return false;

    const phase = this.returning ? "return" : "forward";
    const alreadyHit = this.hitAtPhase.get(bloon);

    if (alreadyHit === phase) return false;

    const d = Math.hypot(bloon.x - this.x, bloon.y - this.y);
    if (d < 15) {
      this.hitAtPhase.set(bloon, phase);
      return true;
    }

    return false;
  }

  draw(ctx) {
    const img = BoomerangProjectile.image;
    if (!img.complete) return; // Ne dessine rien tant que l'image n'est pas chargée

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.drawImage(img, -10, -10, 20, 20); // Centré et redimensionné
    ctx.restore();
  }
}
