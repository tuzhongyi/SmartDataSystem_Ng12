import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditLogVideoManagerComponent } from './components/audit-log-video-manager/audit-log-video-manager.component';
import { AuditRecordCameraEventManagerComponent } from './components/audit-record-camera-event-manager/audit-record-camera-event-manager.component';
import { AuditRecordResourceStatusOnlineManagerComponent } from './components/audit-record-resource-status-online-manager/audit-record-resource-status-online-manager.component';
import { AuditRecordUserLogManagerComponent } from './components/audit-record-user-log-manager/audit-record-user-log-manager.component';
import { AuditStatisticDataComponent } from './components/audit-statistic-data/audit-statistic-data.component';
import { AuditStatisticEventComponent } from './components/audit-statistic-event/audit-statistic-event.component';
import { AuditorComponent } from './components/auditor/auditor.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'auditor',
    pathMatch: 'full',
  },
  {
    path: 'auditor',
    component: AuditorComponent,
    children: [
      {
        path: '',
        redirectTo: 'statistic-data',
        pathMatch: 'full',
      },
      {
        path: 'statistic-data',
        component: AuditStatisticDataComponent,
      },
      {
        path: 'statistic-event',
        component: AuditStatisticEventComponent,
      },
      {
        path: 'log-user',
        component: AuditRecordUserLogManagerComponent,
      },
      {
        path: 'log-video',
        component: AuditLogVideoManagerComponent,
      },
      {
        path: 'record-online',
        component: AuditRecordResourceStatusOnlineManagerComponent,
      },
      {
        path: 'record-camera',
        component: AuditRecordCameraEventManagerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditRoutingModule {}
