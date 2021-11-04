/*
 * @Author: pmx
 * @Date: 2021-09-15 16:02:34
 * @Last Modified by:   pmx
 * @Last Modified time: 2021-09-15 16:02:34
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AiopRoutingModule } from './aiop_routing.module';
import { AiopComponent } from './aiop.component';
import { AiopComponentsModule } from './components/aiop_components.module';

@NgModule({
  declarations: [AiopComponent],
  imports: [CommonModule, AiopRoutingModule, AiopComponentsModule],
})
export class AiopModule {}
