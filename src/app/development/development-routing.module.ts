import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclePlaygroundComponent } from './vehicle-playground/vehicle-playground.component';

const routes: Routes = [
  {
    path: 'vehicle-playground',
    component: VehiclePlaygroundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevelopmentRoutingModule {}
