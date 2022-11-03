import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevelopmentRoutingModule } from './development-routing.module';
import { VehiclePlaygroundComponent } from './vehicle-playground/vehicle-playground.component';


@NgModule({
  declarations: [
    VehiclePlaygroundComponent
  ],
  imports: [
    CommonModule,
    DevelopmentRoutingModule
  ]
})
export class DevelopmentModule { }
