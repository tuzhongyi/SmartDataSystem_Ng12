import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GarbageRoutingModule } from './garbage-routing.module';
import { GarbageComponent } from './garbage.component';
import { GarbageComponentsModule } from './components/garbage-components.module';

@NgModule({
  declarations: [GarbageComponent],
  exports: [],
  imports: [GarbageRoutingModule, GarbageComponentsModule],
})
export class GarbageModule {}
