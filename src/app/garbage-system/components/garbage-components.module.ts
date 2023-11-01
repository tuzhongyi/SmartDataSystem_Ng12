/*
 * @Author: pmx
 * @Date: 2021-09-15 14:43:30
 * @Last Modified by: zzl
 * @Last Modified time: 2023-04-20 17:13:46
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularResizeEventModule } from 'angular-resize-event';
import { DownloadBusiness } from 'src/app/common/business/download.business';
import { HowellModule } from 'src/app/common/howell.module';
import { MaterialModule } from 'src/app/material.module';
import { RankComponent } from '../../common/components/rank/rank.component';
import { DaPuQiaoComponents } from '../dapuqiao/components/dapuqiao-components';
import { ChartComponents } from './charts/chart-components';
import { DeviceStateComponent } from './device-state/device-state.component';
import { DisposalCountComponent } from './disposal-count/disposal-count.component';
import { DisposalRankComponent } from './disposal-rank/disposal-rank.component';
import { DivisionListComponent } from './division-list/division-list.component';
import { EventRecordDetailsTableComponent } from './event-record-details-table/event-record-details-table.component';
import { EventRecordDetailsComponent } from './event-record-details/event-record-details.component';
import { EventStatisticComponent } from './event-statistic/event-statistic.component';
import { IllegalMixintoRankComponent } from './illegal-mixinto-rank/illegal-mixinto-rank.component';
import { MainStationCountComponent } from './main-station-count/main-station-count.component';
import { MapControlButtons2Component } from './map-control-buttons-2/map-control-buttons-2.component';
import { MapControlButtonsComponent } from './map-control-buttons/map-control-buttons.component';
import { MapListPanelComponent } from './map-control-list-panel/map-list-panel.component';
import { MapPointInfoPanelComponent } from './map-control-point-info-panel/map-point-info-panel.component';
import { MapControlComponent } from './map-control/map-control.component';
import { MediaControlComponent } from './media-control/media-control.component';
import { MediaImageControlComponent } from './media-image-control/media-image-control.component';
import { MonitorComponent } from './monitor/monitor.component';
import { PatrolControlComponent } from './patrol-control/patrol-control.component';
import { PlaybackConfigComponent } from './patrol-control/playback-config/playback-config.component';
import { RetentionRankComponent } from './retention-rank/retention-rank.component';
import { StatisticCardComponent } from './statistic-card/statistic-card.component';
import { EventRecordOperationComponent } from './windows/event-record-operation/event-record-operation.component';
import { GARBAGE_SYSTEM_WINDOW_FILTER_COMPONENTS } from './windows/filters/garbage-system-window-filter.module';
import { EventRecordFilterComponent } from './windows/filters/interval-division-station-filter/interval-division-station-filter.component';
import { IntervalFilterComponent } from './windows/filters/interval-filter/interval-filter.component';
import { GarbageStationWindowRecordFilterComponent } from './windows/garbage-station-window/garbage-station-window-record-filter/garbage-station-window-record-filter.component';
import { GarbageStationWindowRecordOperationComponent } from './windows/garbage-station-window/garbage-station-window-record-operation/garbage-station-window-record-operation.component';
import { GarbageStationWindowGeneralComponent } from './windows/garbage-station-window/tab-items/garbage-drop-record-general/garbage-station-window-general.component';
import { GarbageStationWindowListComponent } from './windows/garbage-station-window/tab-items/garbage-station-window-list/garbage-station-window-list.component';
import { GarbageStationWindowStayComponent } from './windows/garbage-station-window/tab-items/garbage-station-window-stay/garbage-station-window-stay.component';
import { GARBAGE_SYSTEM_WINDOW_COMPONENTS } from './windows/garbage-system-window.module';

@NgModule({
  declarations: [
    MonitorComponent,
    DivisionListComponent,
    IllegalMixintoRankComponent,
    RetentionRankComponent,
    DisposalRankComponent,
    DeviceStateComponent,
    DisposalCountComponent,
    EventRecordDetailsTableComponent,
    EventRecordDetailsComponent,
    StatisticCardComponent,
    MapControlButtonsComponent,
    MapControlButtons2Component,
    MapControlComponent,
    MainStationCountComponent,
    MapListPanelComponent,

    MediaControlComponent,
    MediaImageControlComponent,
    MapPointInfoPanelComponent,

    PatrolControlComponent,
    PlaybackConfigComponent,

    EventRecordOperationComponent,
    EventRecordFilterComponent,
    EventStatisticComponent,

    GarbageStationWindowListComponent,
    GarbageStationWindowRecordOperationComponent,
    GarbageStationWindowRecordFilterComponent,
    GarbageStationWindowGeneralComponent,
    GarbageStationWindowStayComponent,

    IntervalFilterComponent,
    ...GARBAGE_SYSTEM_WINDOW_FILTER_COMPONENTS,
    ...GARBAGE_SYSTEM_WINDOW_COMPONENTS,
    ...ChartComponents,
    ...DaPuQiaoComponents,
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
    DeviceStateComponent,
    DisposalCountComponent,
    EventRecordDetailsTableComponent,
    EventRecordDetailsComponent,
    StatisticCardComponent,
    MapControlComponent,
    MainStationCountComponent,
    MapListPanelComponent,
    MediaControlComponent,
    MediaImageControlComponent,
    MapPointInfoPanelComponent,

    PatrolControlComponent,
    PlaybackConfigComponent,

    EventRecordOperationComponent,
    EventRecordFilterComponent,
    EventStatisticComponent,
    GarbageStationWindowListComponent,
    GarbageStationWindowGeneralComponent,
    GarbageStationWindowStayComponent,
    IntervalFilterComponent,
    ...GARBAGE_SYSTEM_WINDOW_FILTER_COMPONENTS,
    ...GARBAGE_SYSTEM_WINDOW_COMPONENTS,
    ...ChartComponents,
    ...DaPuQiaoComponents,
  ],
})
export class GarbageComponentsModule {}
