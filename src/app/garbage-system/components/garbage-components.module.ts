/*
 * @Author: pmx
 * @Date: 2021-09-15 14:43:30
 * @Last Modified by: pmx
 * @Last Modified time: 2021-11-09 09:47:19
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
import { DisposalCountComponent } from './disposal-count/disposal-count.component';
import { MaterialModule } from 'src/app/material.module';
import { EventRecordDetailsComponent } from './event-record-details/event-record-details.component';
import { MediaControlComponent } from './media-control/media-control.component';
import { StatisticCardComponent } from './statistic-card/statistic-card.component';

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
    EventRecordDetailsComponent,
    MediaControlComponent,
    StatisticCardComponent,
  ],
  imports: [
    CommonModule,
    AngularResizeEventModule,
    HowellModule,
    MaterialModule,
  ],
})
export class GarbageComponentsModule {}
