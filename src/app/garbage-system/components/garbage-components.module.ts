/*
 * @Author: pmx
 * @Date: 2021-09-15 14:43:30
 * @Last Modified by: zzl
 * @Last Modified time: 2022-01-19 15:48:21
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
import { StatisticCardComponent } from './statistic-card/statistic-card.component';
import { MapControlComponent } from './map-control/map-control.component';
import { MapListPanelComponent } from './map-control/map-list-panel/map-list-panel.component';
import { PointInfoPanelComponent } from './map-control/point-info-panel/point-info-panel.component';
import { PatrolControlComponent } from './patrol-control/patrol-control.component';
import { MediaControlComponent } from './media-control/media-control.component';
import { DownloadBusiness } from 'src/app/common/business/download.business';
import { FormsModule } from '@angular/forms';
import { EventRecordDetailsTableComponent } from './event-record-details/event-record-details-table/event-record-details-table.component';
import { DeviceListTableWindowComponent } from './windows/device-list-table-window/device-list-table-window.component';

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
    EventRecordDetailsTableComponent,
    EventRecordDetailsComponent,
    StatisticCardComponent,
    MapControlComponent,
    MapListPanelComponent,
    MediaControlComponent,
    PointInfoPanelComponent,
    PatrolControlComponent,
    DeviceListTableWindowComponent,
  ],
  imports: [
    CommonModule,
    AngularResizeEventModule,
    HowellModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [DownloadBusiness],
})
export class GarbageComponentsModule {}
