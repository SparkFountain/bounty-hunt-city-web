import { Component, HostListener, OnInit } from '@angular/core';
import { Player } from 'src/app/core/interfaces/player.interface';

@Component({
  selector: 'app-development-playground',
  templateUrl: './development-playground.component.html',
  styleUrls: ['./development-playground.component.scss'],
})
export class DevelopmentPlaygroundComponent implements OnInit {
  player!: Player;

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    console.log('>>> keydown', event);

    if (event.key === 'Escape') {
      // Do things
    }
  }

  constructor() {
    setInterval(() => {
      // rotate player
      this.player.rotationAngle++;
    }, 16.666667);
  }

  ngOnInit(): void {
    this.player = {
      bountyHunters: 5,
      cash: 2194,
      rotationAngle: 1,
    };
  }
}
