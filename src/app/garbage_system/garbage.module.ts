import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GarbageRoutingModule } from './garbage_routing.module';
import { GarbageComponent } from './garbage.component';
import { GarbageComponentsModule } from './components/garbage_components.module';

@NgModule({
  declarations: [GarbageComponent],
  exports: [],
  imports: [CommonModule, GarbageRoutingModule, GarbageComponentsModule],
})
export class GarbageModule {}
