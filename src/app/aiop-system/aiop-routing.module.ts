/*
 * @Author: pmx
 * @Date: 2021-09-15 16:02:26
 * @Last Modified by: pmx
 * @Last Modified time: 2021-12-21 16:10:01
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AiopComponent } from './aiop.component';
import { AiopManageComponent } from './components/aiop-manage/aiop-manage.component';
import { IllegalDropComponent } from './components/garbage-events/illegal-drop/illegal-drop.component';
import { GarbageEventsComponent } from './components/garbage-events/index/garbage-events.component';
import { DivisionManageComponent } from './components/monitor-platform/division-manage/division-manage.component';
import { MonitorPlatformComponent } from './components/monitor-platform/index/monitor-platform.component';
import { StationStatusComponent } from './components/station-status/station-status.component';
import { SystemModeComponent } from './components/system-mode/system-mode.component';
import { SystemSettingComponent } from './components/system-setting/system-setting.component';

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
            redirectTo: 'illegal-drop',
          },
          {
            path: 'illegal-drop',
            component: IllegalDropComponent,
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
