/*
 * @Author: pmx
 * @Date: 2021-09-15 14:43:30
 * @Last Modified by: pmx
 * @Last Modified time: 2021-09-26 14:57:31
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankComponent } from './rank/rank.component';
import { MonitorComponent } from './monitor/monitor.component';
import { HowellModule } from 'src/app/common/howell.module';
import { DivisionListComponent } from './division-list/division-list.component';

@NgModule({
  declarations: [RankComponent, MonitorComponent, DivisionListComponent],
  imports: [CommonModule, HowellModule],
  exports: [RankComponent, MonitorComponent, DivisionListComponent],
})
export class GarbageComponentsModule {}
