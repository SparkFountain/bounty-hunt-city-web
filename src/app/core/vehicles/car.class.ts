import { Sprite } from '../ressources/sprite.class';
import { CarType } from './car-type.enum';
import { Vehicle } from './vehicle.class';

export class Car extends Vehicle {
  constructor(type: CarType) {
    super();

    this.sprite = new Sprite('/assets/sprites/car-demo.png');

    this.rotation = 0;
    this.position = { x: 0, y: 0 };
  }
}
