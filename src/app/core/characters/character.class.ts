import { Position } from '../geometry/position.type';
import { Sprite } from '../ressources/sprite.class';
import { CharacterType } from './character-type.enum';

export class Character {
  id!: number;
  speed!: number;
  position!: {
    x: number;
    y: number;
  };
  rotation!: number;

  sprite!: Sprite;

  constructor(type: CharacterType, position?: Position, rotation?: number) {
    switch (type) {
      case CharacterType.Player:
        this.sprite = new Sprite('/assets/sprites/player/torso.png');
        break;
    }

    this.rotation = rotation ?? 0;
    this.position = position ?? { x: 0, y: 0 };
    this.speed = 0;
  }

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
