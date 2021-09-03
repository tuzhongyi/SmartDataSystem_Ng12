import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WasteRoutingModule } from './waste-routing.module';
import { WasteComponent } from './waste.component';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [WasteComponent],
  exports: [],
  imports: [CommonModule, WasteRoutingModule, ComponentsModule],
})
export class WasteModule {}
