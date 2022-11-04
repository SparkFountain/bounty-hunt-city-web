import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MathService {
  constructor() {}

  degToRad(deg: number): number {
    return deg * 0.01745;
  }

  radToDeg(rad: number): number {
    return rad / 0.01745;
  }
}
