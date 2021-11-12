/*
 * @Author: pmx
 * @Date: 2021-09-15 16:02:26
 * @Last Modified by: pmx
 * @Last Modified time: 2021-11-09 09:35:08
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloComponent } from './components/hello/hello.component';
import { MonitorPlatformComponent } from './components/monitor-platform/monitor-platform.component';
import { SystemManageComponent } from './components/system-manage/system-manage.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'hello',
  },
  {
    path: 'hello',
    component: HelloComponent,
  },
  {
    path: 'system-manage',
    component: SystemManageComponent,
  },
  {
    path: 'monitor-platform',
    component: MonitorPlatformComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AiopRoutingModule {}
