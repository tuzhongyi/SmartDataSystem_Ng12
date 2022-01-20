/*
 * @Author: pmx
 * @Date: 2021-09-15 16:02:26
 * @Last Modified by: pmx
 * @Last Modified time: 2022-01-20 11:26:06
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AiopComponent } from './aiop.component';
import { AiopManageComponent } from './components/aiop-manage/aiop-manage.component';
import { IllegalDropRecordComponent } from './components/illegal-drop-record/illegal-drop-record.component';
import { DivisionManageComponent } from './components/division-manage/division-manage.component';
import { StationStatusComponent } from './components/station-status/station-status.component';
import { SystemModeComponent } from './components/system-mode/system-mode.component';
import { SystemSettingComponent } from './components/system-setting/system-setting.component';
import { MonitorPlatformComponent } from './components/monitor-platform/monitor-platform.component';
import { GarbageEventsComponent } from './components/garbage-events/garbage-events.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'system-mode',
  },
  {
    path: 'system-mode',
    component: SystemModeComponent,
  },
  {
    path: 'aiop-manage',
    component: AiopManageComponent,
    children: [
      {
        path: '',
        redirectTo: 'monitor-platform',
      },
      {
        path: 'monitor-platform',
        component: MonitorPlatformComponent,
        children: [
          {
            path: '',
            redirectTo: 'division-manage',
          },
          {
            path: 'division-manage',
            component: DivisionManageComponent,
          },
        ],
      },
      {
        path: 'garbage-events',
        component: GarbageEventsComponent,
        children: [
          {
            path: '',
            redirectTo: 'illegal-drop-record',
          },
          {
            path: 'illegal-drop-record',
            component: IllegalDropRecordComponent,
          },
        ],
      },
      {
        path: 'station-status',
        component: StationStatusComponent,
      },
      {
        path: 'system-setting',
        component: SystemSettingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AiopRoutingModule {}
