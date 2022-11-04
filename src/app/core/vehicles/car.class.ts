import { Position } from '../geometry/position.type';
import { Sprite } from '../ressources/sprite.class';
import { CarType } from './car-type.enum';
import { Vehicle } from './vehicle.class';

export class Car extends Vehicle {
  constructor(
    type: CarType,
    position?: Position,
    rotation?: number,
    acceleration?: number,
    friction?: number
  ) {
    super();

    switch (type) {
      case CarType.Demo:
        this.sprite = new Sprite('/assets/sprites/car-demo.png');
        break;
    }

    this.rotation = rotation ?? 0;
    this.position = position ?? { x: 0, y: 0 };
    this.speed = 0;
    this.acceleration = acceleration ?? 0.2;
    this.friction = friction ?? 0.2;
  }
}
