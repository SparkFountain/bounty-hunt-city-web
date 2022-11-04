import { Observable, Observer } from 'rxjs';

export class Sprite {
  image!: HTMLImageElement;
  onLoaded$!: Observable<void>;

  constructor(imagePath: string) {
    // console.log('>>> sprite has been created');
    this.onLoaded$ = new Observable<void>((subscriber: Observer<void>) => {
      this.image = new Image();
      this.image.src = imagePath;
      this.image.onload = () => {
        subscriber.next();
        subscriber.complete();
      };
    });
  }
}
