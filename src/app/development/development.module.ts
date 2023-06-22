import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevelopmentRoutingModule } from './development-routing.module';
import { PlaygroundComponent } from './playground/playground.component';


@NgModule({
  declarations: [
    PlaygroundComponent
  ],
  imports: [
    CommonModule,
    DevelopmentRoutingModule
  ]
})
export class DevelopmentModule { }
