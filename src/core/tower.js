import { TowerTypes } from "../logic/towerTypes.js";
import boomerang from "../logic/towerTypes/boome.js";
import { distance } from "../logic/utils.js";

export class Tower {
  static images = {
    basic: new Image(),
    fast: new Image(),
    sniper: new Image(),
    blast: new Image(),
    boomerang: new Image()
    // ➕ Tu peux ajouter ici d'autres images ex. ninja, freezer...
  };

  static loadImages() {
    this.images.basic.src = "public/images/tower_basic.png";
    this.images.fast.src = "public/images/tower_fast.png";
    this.images.sniper.src = "public/images/tower_sniper.png";
    this.images.blast.src = "public/images/tower_blast.png";
    this.images.boomerang.src = "public/images/tower_boomerang.png";
    // ➕ Charger d'autres public ici si besoin
  }

  constructor(x, y, type = "basic") {
    this.x = x;
    this.y = y;
    this.type = type;

    const stats = TowerTypes[type];
    this.cooldown = stats.cooldown;
    this.damage = stats.damage;
    this.range = stats.range;
    this.projectileSpeed = stats.projectileSpeed;

    this.lastShot = 0;
  }

  draw(ctx) {
    const image = Tower.images[this.type] || Tower.images.basic;
    ctx.drawImage(image, this.x - 20, this.y - 20, 40, 40);
  }

  update(bloons, projectiles) {
    const now = Date.now();
    if (now - this.lastShot < this.cooldown) return;

    const logic = TowerTypes[this.type];
    if (logic && logic.shoot(this, bloons, projectiles)) {
      this.lastShot = now;
    }
  }
}

Tower.loadImages();
