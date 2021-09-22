/*
 * @Author: pmx
 * @Date: 2021-09-15 14:43:30
 * @Last Modified by: pmx
 * @Last Modified time: 2021-09-22 10:13:22
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankComponent } from './rank/rank.component';
import { MonitorComponent } from './monitor/monitor.component';
import { HowellModule } from 'src/app/common/howell.module';

@NgModule({
  declarations: [RankComponent, MonitorComponent],
  imports: [CommonModule, HowellModule],
  exports: [RankComponent, MonitorComponent],
})
export class WasteComponentsModule {}
