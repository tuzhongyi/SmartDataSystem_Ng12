/*
 * @Author: pmx
 * @Date: 2021-09-15 14:43:30
 * @Last Modified by: pmx
 * @Last Modified time: 2021-09-15 15:53:16
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankComponent } from './rank/rank.component';
import { MonitorComponent } from './monitor/monitor.component';
import { CommonComponentsModule } from 'src/app/common/components/common-components.module';

@NgModule({
  declarations: [RankComponent, MonitorComponent],
  imports: [CommonModule, CommonComponentsModule],
  exports: [RankComponent, MonitorComponent],
})
export class WasteComponentsModule {}
