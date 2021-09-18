import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WasteRoutingModule } from './garbage-routing.module';
import { GarbageComponent } from './garbage.component';
import { WasteComponentsModule } from './components/waste-components.module';

@NgModule({
  declarations: [GarbageComponent],
  exports: [],
  imports: [CommonModule, WasteRoutingModule, WasteComponentsModule],
})
export class GarbageModule {}
