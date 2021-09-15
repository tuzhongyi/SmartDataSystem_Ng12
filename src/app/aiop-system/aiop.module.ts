import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AiopRoutingModule } from './aiop-routing.module';
import { AiopComponent } from './aiop.component';
import { AiopComponentsModule } from './components/components.module';

@NgModule({
  declarations: [AiopComponent],
  imports: [CommonModule, AiopRoutingModule, AiopComponentsModule],
})
export class AiopModule {}
