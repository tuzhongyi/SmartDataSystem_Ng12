/*
 * @Author: pmx
 * @Date: 2021-09-15 14:43:30
 * @Last Modified by: pmx
 * @Last Modified time: 2021-10-28 10:28:28
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankComponent } from '../../common/components/rank/rank.component';
import { MonitorComponent } from './monitor/monitor.component';
import { HowellModule } from 'src/app/common/howell.module';
import { DivisionListComponent } from './division_list/division_list.component';
import { IllegalMixintoRankComponent } from './illegal_mixinto_rank/illegal_mixinto_rank.component';
import { RetentionRankComponent } from './retention_rank/retention_rank.component';
import { DisposalRankComponent } from './disposal_rank/disposal_rank.component';
import { EvemtStatisticEChartsComponent } from './event_statistic_echarts/event_statistic_echarts.component';
import { AngularResizeEventModule } from 'angular-resize-event';
import { DeviceStateComponent } from './device_state/device_state.component';
import { DisposalCountComponent } from './disposal_count/disposal_count.component';

@NgModule({
  declarations: [
    RankComponent,
    MonitorComponent,
    DivisionListComponent,
    IllegalMixintoRankComponent,
    RetentionRankComponent,
    DisposalRankComponent,
    EvemtStatisticEChartsComponent,
    DeviceStateComponent,
    DisposalCountComponent,
  ],
  imports: [CommonModule, AngularResizeEventModule, HowellModule],
})
export class GarbageComponentsModule {}
