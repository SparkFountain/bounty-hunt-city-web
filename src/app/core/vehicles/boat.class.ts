import { Position } from '../geometry/position.type';
import { Sprite } from '../ressources/sprite.class';
import { BoatType } from './boat-type.enum';
import { Vehicle } from './vehicle.class';

export class Boat extends Vehicle {
  constructor(
    type: BoatType,
    position?: Position,
    rotation?: number,
    acceleration?: number,
    friction?: number
  ) {
    super();

    switch (type) {
      case BoatType.Demo:
        this.sprite = new Sprite('/assets/sprites/boat-demo.png');
        break;
    }

    this.rotation = rotation ?? 0;
    this.position = position ?? { x: 0, y: 0 };
    this.speed = 0;
    this.acceleration = acceleration ?? 0.2;
    this.friction = friction ?? 0.2;
  }
}
