/*
 * @Author: pmx
 * @Date: 2021-09-15 14:27:53
 * @Last Modified by: pmx
 * @Last Modified time: 2022-12-20 16:56:45
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HowellModule } from 'src/app/common/howell.module';
import { GarbageCommitteesModule } from 'src/app/garbage-system/committees/garbage-committees.module';
import { GarbageComponentsModule } from 'src/app/garbage-system/components/garbage-components.module';
import { MaterialModule } from 'src/app/material.module';
import { AuditLogVideoManagerComponent } from './audit-log-video-manager/audit-log-video-manager.component';
import { AuditRecordCameraEventManagerComponent } from './audit-record-camera-event-manager/audit-record-camera-event-manager.component';
import { AuditRecordResourceStatusOnlineManagerComponent } from './audit-record-resource-status-online-manager/audit-record-resource-status-online-manager.component';
import { AuditRecordUserLogManagerComponent } from './audit-record-user-log-manager/audit-record-user-log-manager.component';
import { AuditStatisticCardComponent } from './audit-statistic-card/audit-statistic-card.component';
import { AuditStatisticDataCountDeviceComponent } from './audit-statistic-data-count-device/audit-statistic-data-count-device.component';
import { AuditStatisticDataCountStationComponent } from './audit-statistic-data-count-station/audit-statistic-data-count-station.component';
import { AuditStatisticDataDeviceManagerComponent } from './audit-statistic-data-device-manager/audit-statistic-data-device-manager.component';
import { AuditStatisticDataStationManagerComponent } from './audit-statistic-data-station-manager/audit-statistic-data-station-manager.component';
import { AuditStatisticDataComponent } from './audit-statistic-data/audit-statistic-data.component';
import { AuditStatisticEventDropManagerComponent } from './audit-statistic-event-drop-manager/audit-statistic-event-drop-manager.component';
import { AuditStatisticEventRecordManagerComponent } from './audit-statistic-event-record-manager/audit-statistic-event-record-manager.component';
import { AuditStatisticEventTaskManagerComponent } from './audit-statistic-event-task-manager/audit-statistic-event-task-manager.component';
import { AuditStatisticEventComponent } from './audit-statistic-event/audit-statistic-event.component';
import { AuditorComponent } from './auditor/auditor.component';
import { MessageTypeListComponent } from './message-type-list/message-type-list.component';

@NgModule({
  declarations: [
    AuditorComponent,

    AuditStatisticEventComponent,
    AuditStatisticCardComponent,
    AuditRecordUserLogManagerComponent,
    AuditRecordResourceStatusOnlineManagerComponent,
    AuditRecordCameraEventManagerComponent,
    AuditLogVideoManagerComponent,
    MessageTypeListComponent,
    AuditStatisticDataComponent,
    AuditStatisticDataCountStationComponent,
    AuditStatisticDataCountDeviceComponent,
    AuditStatisticDataStationManagerComponent,
    AuditStatisticDataDeviceManagerComponent,
    AuditStatisticEventDropManagerComponent,
    AuditStatisticEventRecordManagerComponent,
    AuditStatisticEventTaskManagerComponent,
  ],
  imports: [
    CommonModule,
    HowellModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    GarbageComponentsModule,
    GarbageCommitteesModule,
  ],
  providers: [],
})
export class AuditComponentsModule {
  constructor() {}
}
