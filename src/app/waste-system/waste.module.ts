import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WasteRoutingModule } from './waste-routing.module';
import { WasteComponent } from './waste.component';
import { WasteComponentsModule } from './components/waste-components.module';

@NgModule({
  declarations: [WasteComponent],
  exports: [],
  imports: [CommonModule, WasteRoutingModule, WasteComponentsModule],
})
export class WasteModule {}
