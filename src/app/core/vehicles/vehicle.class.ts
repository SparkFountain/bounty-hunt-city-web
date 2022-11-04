import { Sprite } from '../ressources/sprite.class';

export class Vehicle {
  id!: number;
  speed!: number;
  position!: {
    x: number;
    y: number;
  };
  rotation!: number;
  acceleration!: number;
  friction!: number;

  sprite!: Sprite;

  constructor() {}

  getSprite(): HTMLImageElement {
    return this.sprite.image;
  }

  getCenterPoint(): { x: number; y: number } {
    return {
      x: this.sprite.image.width / 2,
      y: this.sprite.image.height / 2,
    };
  }
}
