import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
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

  constructor(private ioService: IoService) {}

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
    this.car = new Car(CarType.Demo);
    console.log('>>> car', this.car);
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

    if (this.ioService.isKeyPressed('ArrowLeft')) {
      this.car.rotation--;
    } else if (this.ioService.isKeyPressed('ArrowRight')) {
      this.car.rotation++;
    }

    this.drawCar();

    // trigger next render cycle
    requestAnimationFrame(this.updateWorld.bind(this));
  }

  drawCar(): void {
    // cache rendering context
    this.ctx.save();

    // set center point of car for rotation
    const centerPoint = this.car.getCenterPoint();
    this.ctx.translate(centerPoint.x, centerPoint.y);

    // rotate car (calculate rotation value in radians)
    this.ctx.rotate(this.car.rotation * 0.01745);

    // render car image
    this.ctx.drawImage(this.car.getSprite(), -centerPoint.x, -centerPoint.y);

    // restore rendering context
    this.ctx.restore();
  }
}
