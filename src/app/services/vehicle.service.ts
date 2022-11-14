import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Position } from '../core/geometry/position.type';
import { BikeType } from '../core/vehicles/bike-type.enum';
import { Bike } from '../core/vehicles/bike.class';
import { BoatType } from '../core/vehicles/boat-type.enum';
import { Boat } from '../core/vehicles/boat.class';
import { CarType } from '../core/vehicles/car-type.enum';
import { Car } from '../core/vehicles/car.class';
import { IoService } from './io.service';
import { MathService } from './math.service';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  cars!: { [key: number]: Car };
  carIndex!: number;
  bikes!: { [key: number]: Bike };
  bikeIndex!: number;
  boats!: { [key: number]: Boat };
  boatIndex!: number;

  constructor(private ioService: IoService, private mathService: MathService) {
    this.cars = {};
    this.carIndex = 0;
    this.bikes = {};
    this.bikeIndex = 0;
    this.boats = {};
    this.boatIndex = 0;
  }

  createCar$(
    type?: CarType,
    position?: Position,
    rotation?: number,
    acceleration?: number,
    friction?: number
  ): Observable<Car> {
    const car: Car = new Car(
      type ?? CarType.Demo,
      position ?? { x: 400, y: 200 },
      rotation ?? 135,
      acceleration ?? 0.2,
      friction ?? 0.2
    );
    this.cars[this.carIndex++] = car;
    return car.sprite.onLoaded$.pipe(map(() => car));
  }

  createBike$(
    type?: BikeType,
    position?: Position,
    rotation?: number,
    acceleration?: number,
    friction?: number
  ): Observable<Bike> {
    const bike: Bike = new Bike(
      type ?? BikeType.Demo,
      position ?? { x: 400, y: 200 },
      rotation ?? 135,
      acceleration ?? 0.2,
      friction ?? 0.2
    );
    this.bikes[this.bikeIndex++] = bike;
    return bike.sprite.onLoaded$.pipe(map(() => bike));
  }

  createBoat$(
    type?: BoatType,
    position?: Position,
    rotation?: number,
    acceleration?: number,
    friction?: number
  ): Observable<Boat> {
    const boat: Boat = new Boat(
      type ?? BoatType.Demo,
      position ?? { x: 400, y: 200 },
      rotation ?? 135,
      acceleration ?? 0.2,
      friction ?? 0.2
    );
    this.boats[this.boatIndex++] = boat;
    return boat.sprite.onLoaded$.pipe(map(() => boat));
  }

  deleteCar(): void {
    // TODO: implement
  }

  deleteBike(): void {
    // TODO: implement
  }

  deleteBoat(): void {
    // TODO: implement
  }

  updateVehicles(): void {
    for (const [id, car] of Object.entries(this.cars)) {
      // turn car around
      if (this.ioService.isKeyPressed('ArrowLeft')) {
        if (car.speed > 0.5) {
          car.rotation -= 2;
        } else if (car.speed < -0.5) {
          car.rotation += 2;
        }
      }
      if (this.ioService.isKeyPressed('ArrowRight')) {
        if (car.speed > 0.5) {
          car.rotation += 2;
        } else if (car.speed < -0.5) {
          car.rotation -= 2;
        }
      }

      if (this.ioService.isKeyPressed('ArrowUp')) {
        // accelerate car
        if (car.speed < 10) {
          car.speed += car.acceleration;
        }
      } else if (this.ioService.isKeyPressed('ArrowDown')) {
        // apply breaks or reverse gear
        car.speed -= car.acceleration;
      } else {
        // slow down car by friction
        if (car.speed > 0) {
          car.speed -= car.friction;

          // stop car if speed has become negative
          if (car.speed < 0) {
            car.speed = 0;
          }
        } else if (car.speed < 0) {
          car.speed += car.friction;

          // stop car if speed has become positive
          if (car.speed > 0) {
            car.speed = 0;
          }
        }
      }

      // move car dynamically
      if (car.speed !== 0) {
        car.position.x -=
          Math.sin(this.mathService.degToRad(-car.rotation)) * car.speed;
        car.position.y -=
          Math.cos(this.mathService.degToRad(-car.rotation)) * car.speed;
      }

      // move car statically
      if (this.ioService.isKeyPressed('w')) {
        car.position.y--;
      }
      if (this.ioService.isKeyPressed('s')) {
        car.position.y++;
      }
      if (this.ioService.isKeyPressed('a')) {
        car.position.x--;
      }
      if (this.ioService.isKeyPressed('d')) {
        car.position.x++;
      }
    }
  }
}
