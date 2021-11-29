import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevelopmentPlaygroundComponent } from './development-playground/development-playground.component';

const routes: Routes = [
  {
    path: 'development-playground',
    component: DevelopmentPlaygroundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SinglePlayerRoutingModule {}
