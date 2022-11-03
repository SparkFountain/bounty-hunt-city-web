import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IoService implements OnDestroy {
  // track mouse down and up events
  mouseDownEvent = fromEvent(window, 'mousedown').pipe(
    tap((event) => console.log('>>> Mouse Down', event))
  );
  mouseUpEvent = fromEvent(window, 'mouseup').pipe(
    tap((event) => console.log('>>> Mouse Up', event))
  );

  // track key down and up events
  keyDownEvent = fromEvent<KeyboardEvent>(window, 'keydown').pipe(
    tap((event: KeyboardEvent) => {
      // console.log('>>> Key Down', event);

      this.keysPressed[event.key] = true;
    })
  );
  keyUpEvent = fromEvent<KeyboardEvent>(window, 'keyup').pipe(
    tap((event: KeyboardEvent) => {
      // console.log('>>> Key Up', event);

      if (this.keysPressed[event.key]) {
        delete this.keysPressed[event.key];
      }
    })
  );

  // hold references to event subscriptions
  mouseDownSub?: Subscription;
  mouseUpSub?: Subscription;
  keyDownSub?: Subscription;
  keyUpSub?: Subscription;

  // maps which store current io events
  mousePressed!: 'left' | 'right' | null;
  keysPressed!: { [key: string]: boolean };

  constructor() {
    this.mouseDownSub = this.mouseDownEvent.subscribe();
    this.mouseUpSub = this.mouseUpEvent.subscribe();
    this.keyDownSub = this.keyDownEvent.subscribe();
    this.keyUpSub = this.keyUpEvent.subscribe();

    this.mousePressed = null;
    this.keysPressed = {};
  }

  ngOnDestroy() {
    this.keyDownSub?.unsubscribe();
    this.keyUpSub?.unsubscribe();
  }

  isKeyPressed(key: string) {
    // console.log('>>> isKeyPressed?', this.keysPressed);
    return this.keysPressed.hasOwnProperty(key);
  }
}
