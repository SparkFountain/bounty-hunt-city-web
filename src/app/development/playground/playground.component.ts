import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject, takeUntil, withLatestFrom } from 'rxjs';
import { MathService } from 'src/app/services/math.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Character } from '../../core/characters/character.class';
import { Car } from '../../core/vehicles/car.class';
import { CharacterService } from '../../services/character.service';
import { IoService } from '../../services/io.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
})
export class PlaygroundComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  // component destroy trigger
  destroy$: Subject<void> = new Subject();

  // 2D rendering context
  ctx!: CanvasRenderingContext2D;

  // test vehicles
  car!: Car;

  // test characters
  player!: Character;

  // other test sprites
  rect!: HTMLImageElement;

  constructor(
    private ioService: IoService,
    private mathService: MathService,
    private vehicleService: VehicleService,
    private characterService: CharacterService
  ) {}

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

    // create car and player character
    this.vehicleService
      .createCar$()
      .pipe(
        takeUntil(this.destroy$),
        withLatestFrom(this.characterService.createCharacter$())
      )
      .subscribe(([car, character]: [Car, Character]) => {
        this.car = car;
        this.player = character;
        requestAnimationFrame(this.updateWorld.bind(this));
      });
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

    this.vehicleService.updateVehicles();

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
