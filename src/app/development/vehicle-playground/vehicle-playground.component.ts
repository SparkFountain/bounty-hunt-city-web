import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MathService } from 'src/app/services/math.service';
import { CarType } from '../../core/vehicles/car-type.enum';
import { Car } from '../../core/vehicles/car.class';
import { IoService } from '../../services/io.service';

@Component({
  selector: 'app-vehicle-playground',
  templateUrl: './vehicle-playground.component.html',
  styleUrls: ['./vehicle-playground.component.scss'],
})
export class VehiclePlaygroundComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  // component destroy trigger
  destroy$: Subject<void> = new Subject();

  // 2D rendering context
  ctx!: CanvasRenderingContext2D;

  // test vehicles
  car!: Car;

  // other test sprites
  rect!: HTMLImageElement;

  constructor(private ioService: IoService, private mathService: MathService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // resize canvas to fill the whole container
    this.canvas.nativeElement.width = this.container.nativeElement.offsetWidth;
    this.canvas.nativeElement.height =
      this.container.nativeElement.offsetHeight;

    // initialize 2D rendering context
    this.ctx = this.canvas.nativeElement.getContext('2d')!;

    // create sample rectangle
    this.rect = new Image();
    this.rect.src = '/assets/sprites/rectangle.png';

    // create car
    this.car = new Car(CarType.Demo, { x: 400, y: 200 }, 135, 0.2, 0.2);
    this.car.sprite.onLoaded$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => requestAnimationFrame(this.updateWorld.bind(this)));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateWorld(): void {
    // clear rendering context
    this.ctx.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );

    // turn car around
    if (this.ioService.isKeyPressed('ArrowLeft')) {
      if (Math.abs(this.car.speed) > 0.5) {
        this.car.rotation -= 2;
      } else if (Math.abs(this.car.speed) < 0.5) {
        this.car.rotation += 2;
      }
    }
    if (this.ioService.isKeyPressed('ArrowRight')) {
      if (Math.abs(this.car.speed) > 0.5) {
        this.car.rotation += 2;
      } else if (Math.abs(this.car.speed) < 0.5) {
        this.car.rotation -= 2;
      }
    }

    if (this.ioService.isKeyPressed('ArrowUp')) {
      // accelerate car
      if (this.car.speed < 10) {
        this.car.speed += this.car.acceleration;
      }
    } else if (this.ioService.isKeyPressed('ArrowDown')) {
      // apply breaks or reverse gear
      this.car.speed -= this.car.acceleration;
    } else {
      // slow down car by friction
      if (this.car.speed > 0) {
        this.car.speed -= this.car.friction;

        // stop car if speed has become negative
        if (this.car.speed < 0) {
          this.car.speed = 0;
        }
      } else if (this.car.speed < 0) {
        this.car.speed += this.car.friction;

        // stop car if speed has become positive
        if (this.car.speed > 0) {
          this.car.speed = 0;
        }
      }
    }

    // move car dynamically
    if (this.car.speed !== 0) {
      this.car.position.x -=
        Math.sin(this.mathService.degToRad(-this.car.rotation)) *
        this.car.speed;
      this.car.position.y -=
        Math.cos(this.mathService.degToRad(-this.car.rotation)) *
        this.car.speed;
    }

    // move car statically
    if (this.ioService.isKeyPressed('w')) {
      this.car.position.y--;
    }
    if (this.ioService.isKeyPressed('s')) {
      this.car.position.y++;
    }
    if (this.ioService.isKeyPressed('a')) {
      this.car.position.x--;
    }
    if (this.ioService.isKeyPressed('d')) {
      this.car.position.x++;
    }

    this.drawCar();

    // trigger next render cycle
    requestAnimationFrame(this.updateWorld.bind(this));
  }

  drawCar(): void {
    // example rect to show the 200 pixel offset are correctly rendered
    // this.ctx.fillRect(0, 0, this.car.position.x, this.car.position.y);

    // cache rendering context
    this.ctx.save();

    // set center point of car for rotation
    const centerPoint = this.car.getCenterPoint();
    this.ctx.translate(
      centerPoint.x + this.car.position.x,
      centerPoint.y + this.car.position.y
    );

    // rotate car (calculate rotation value in radians)
    this.ctx.rotate(this.mathService.degToRad(this.car.rotation));

    // render car image
    this.ctx.drawImage(this.car.getSprite(), -centerPoint.x, -centerPoint.y);

    // restore rendering context
    this.ctx.restore();
  }
}
