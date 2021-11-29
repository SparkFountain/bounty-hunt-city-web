import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashPipe } from './pipes/cash.pipe';

@NgModule({
  declarations: [CashPipe],
  imports: [CommonModule],
  exports: [CashPipe],
})
export class CoreModule {}
