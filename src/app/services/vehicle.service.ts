import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Car } from '../core/vehicles/car.class';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  cars!: Array<Car>;

  constructor() {
    this.cars = [];
  }

  createCar$(): Observable<void> {
    return of();
  }
}
