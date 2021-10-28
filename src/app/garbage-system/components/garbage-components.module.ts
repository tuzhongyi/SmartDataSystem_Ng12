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
import { DivisionListComponent } from './division-list/division-list.component';
import { IllegalMixintoRankComponent } from './illegal-mixinto-rank/illegal-mixinto-rank.component';
import { RetentionRankComponent } from './retention-rank/retention-rank.component';
import { DisposalRankComponent } from './disposal-rank/disposal-rank.component';
import { EvemtStatisticEChartsComponent } from './event-statistic-echarts/event-statistic-echarts.component';
import { AngularResizeEventModule } from 'angular-resize-event';
import { DeviceStateComponent } from './device-state/device-state.component';
import { DisposalEchartsComponent } from './disposal-echarts/disposal-echarts.component';

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
    DisposalEchartsComponent,
  ],
  imports: [CommonModule, AngularResizeEventModule, HowellModule],
})
export class GarbageComponentsModule {}
