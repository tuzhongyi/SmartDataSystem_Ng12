import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AiopComponentsModule } from 'src/app/aiop-system/components/aiop-components.module';
import { HowellModule } from 'src/app/common/howell.module';
import { GarbageCommitteesModule } from 'src/app/garbage-system/committees/garbage-committees.module';
import { GarbageComponentsModule } from 'src/app/garbage-system/components/garbage-components.module';
import { MaterialModule } from 'src/app/material.module';
import { AuditListCameraManagerControlComponents } from './audit-list-camera-manager-controls/audit-list-camera-manager-controls.module';
import { AuditListCameraManagerComponent } from './audit-list-camera-manager/audit-list-camera-manager.component';
import { AuditListStationGarbageManagerControlComponents } from './audit-list-station-garbage-manager-controls/audit-list-station-garbage-manager-controls.module';
import { AuditListStationGarbageManagerComponent } from './audit-list-station-garbage-manager/audit-list-station-garbage-manager.component';
import { AuditLogVideoManagerComponent } from './audit-log-video-manager/audit-log-video-manager.component';
import { AuditRecordCameraEventManagerComponent } from './audit-record-camera-event-manager/audit-record-camera-event-manager.component';
import { AuditRecordResourceStatusOnlineManagerComponent } from './audit-record-resource-status-online-manager/audit-record-resource-status-online-manager.component';
import { AuditRecordUserLogManagerComponent } from './audit-record-user-log-manager/audit-record-user-log-manager.component';
import { AuditStatisticCardComponent } from './audit-statistic-card/audit-statistic-card.component';
import { AuditStatisticDataAbnormalCameraManagerComponent } from './audit-statistic-data-abnormal-camera-manager/audit-statistic-data-abnormal-camera-manager.component';
import { AuditStatisticDataAbnormalStationManagerComponent } from './audit-statistic-data-abnormal-station-manager/audit-statistic-data-abnormal-station-manager.component';
import { AuditStatisticDataCountAbnormalCameraComponent } from './audit-statistic-data-count-abnormal-camera/audit-statistic-data-count-abnormal-camera.component';
import { AuditStatisticDataCountAbnormalStationComponent } from './audit-statistic-data-count-abnormal-station/audit-statistic-data-count-abnormal-station.component';
import { AuditStatisticDataCountDeviceComponent } from './audit-statistic-data-count-device/audit-statistic-data-count-device.component';
import { AuditStatisticDataCountStationComponent } from './audit-statistic-data-count-station/audit-statistic-data-count-station.component';
import { AuditStatisticDataDeviceManagerComponent } from './audit-statistic-data-device-manager/audit-statistic-data-device-manager.component';
import { AuditStatisticDataNumberComponent } from './audit-statistic-data-number/audit-statistic-data-number.component';
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
    AuditStatisticDataNumberComponent,

    AuditListStationGarbageManagerComponent,
    ...AuditListStationGarbageManagerControlComponents,
    AuditListCameraManagerComponent,
    ...AuditListCameraManagerControlComponents,

    AuditStatisticDataAbnormalStationManagerComponent,
    AuditStatisticDataAbnormalCameraManagerComponent,
    AuditStatisticDataCountAbnormalStationComponent,
    AuditStatisticDataCountAbnormalCameraComponent,
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
    AiopComponentsModule,
  ],
  providers: [],
})
export class AuditComponentsModule {
  constructor() {}
}
