/*
 * @Author: pmx
 * @Date: 2021-09-15 14:43:30
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-21 17:31:21
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
import { EventRecordDetailsTableComponent } from './event-record-details-table/event-record-details-table.component';
import { DeviceListWindowComponent } from './windows/device-list-window/device-list-window.component';
import { EventStatisticComponent } from './event-statistic/event-statistic.component';
import { GarbageDropStationWindowComponent } from './windows/garbage-drop-station-window/garbage-drop-station-window.component';
import { GarbageFullStationWindowComponent } from './windows/garbage-full-station-window/garbage-full-station-window.component';
import { EventRecordWindowComponent } from './windows/event-record-window/event-record-window.component';
import { EventRecordOperationComponent } from './windows/event-record-operation/event-record-operation.component';
import { EventRecordFilterComponent } from './windows/filters/interval-division-station-filter/interval-division-station-filter.component';
import { GarbageStationWindowComponent } from './windows/garbage-station-window/garbage-station-window.component';
import { GarbageStationWindowGeneralComponent } from './windows/garbage-station-window/tab-items/garbage-drop-record-general/garbage-station-window-general.component';
import { IntervalFilterComponent } from './windows/filters/interval-filter/interval-filter.component';
import { GarbageStationWindowStayComponent } from './windows/garbage-station-window/tab-items/garbage-station-window-stay/garbage-station-window-stay.component';
import { GARBAGE_SYSTEM_WINDOW_FILTER_COMPONENTS } from './windows/filters/garbage-system-window-filter.module';
import { MediaMultipleWindowComponent } from './windows/media-multiple-window/media-multiple-window.component';
import { GARBAGE_SYSTEM_WINDOW_COMPONENTS } from './windows/garbage-system-window.module';
import { PlaybackConfigComponent } from './patrol-control/playback-config/playback-config.component';
import { GarbageStationWindowRecordFilterComponent } from './windows/garbage-station-window/filter/garbage-station-window-record-filter/garbage-station-window-record-filter.component';
import { EventStatistic2Component } from './event-statistic2/event-statistic2.component';

@NgModule({
  declarations: [
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
    PlaybackConfigComponent,

    EventRecordOperationComponent,
    EventRecordFilterComponent,
    EventStatisticComponent,

    GarbageStationWindowRecordFilterComponent,
    GarbageStationWindowGeneralComponent,
    GarbageStationWindowStayComponent,

    IntervalFilterComponent,
    ...GARBAGE_SYSTEM_WINDOW_FILTER_COMPONENTS,
    ...GARBAGE_SYSTEM_WINDOW_COMPONENTS,
    EventStatistic2Component,
  ],
  imports: [
    CommonModule,
    AngularResizeEventModule,
    HowellModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [DownloadBusiness],
  exports: [
    MaterialModule,
    HowellModule,
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
    PlaybackConfigComponent,

    EventRecordOperationComponent,
    EventRecordFilterComponent,
    EventStatisticComponent,
    GarbageStationWindowGeneralComponent,
    GarbageStationWindowStayComponent,
    IntervalFilterComponent,
    ...GARBAGE_SYSTEM_WINDOW_FILTER_COMPONENTS,
    ...GARBAGE_SYSTEM_WINDOW_COMPONENTS,
    EventStatistic2Component,
  ],
})
export class GarbageComponentsModule {}
