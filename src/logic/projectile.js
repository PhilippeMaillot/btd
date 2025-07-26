export class Projectile {
  constructor(x, y, target, damage = 1, dx = null, dy = null, speed = 5, lifetime = null, image = null, angle = 0) {
    this.x = x;
    this.y = y;
    this.damage = damage;
    this.speed = speed;
    this.target = target;
    this.dx = dx;
    this.dy = dy;
    this.lifetime = lifetime;
    this.age = 0;
    this.image = image;
    this.angle = angle;
  }

  update() {
    if (this.dx !== null && this.dy !== null) {
      this.x += this.dx * this.speed;
      this.y += this.dy * this.speed;
    } else if (this.target) {
      const dx = this.target.x - this.x;
      const dy = this.target.y - this.y;
      const dist = Math.hypot(dx, dy);
      this.x += (dx / dist) * this.speed;
      this.y += (dy / dist) * this.speed;
    }

    this.age++;
    if (this.lifetime !== null && this.age > this.lifetime) {
      this.dead = true;
    }
  }

  draw(ctx) {
    if (this.image && this.image.complete) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.drawImage(this.image, -8, -8, 16, 16);
      ctx.restore();
    } else {
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
