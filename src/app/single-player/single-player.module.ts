import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SinglePlayerRoutingModule } from './single-player-routing.module';
import { DevelopmentPlaygroundComponent } from './development-playground/development-playground.component';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [DevelopmentPlaygroundComponent],
  imports: [CommonModule, CoreModule, SinglePlayerRoutingModule, MatIconModule],
})
export class SinglePlayerModule {}
