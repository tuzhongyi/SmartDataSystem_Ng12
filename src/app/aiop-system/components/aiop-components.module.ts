/*
 * @Author: pmx
 * @Date: 2021-09-15 14:27:53
 * @Last Modified by: pmx
 * @Last Modified time: 2021-12-24 10:13:29
 */
import { Injector, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HowellModule } from 'src/app/common/howell.module';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { SystemModeComponent } from './system-mode/system-mode.component';
import { AiopManageComponent } from './aiop-manage/aiop-manage.component';
import { MonitorPlatformComponent } from './monitor-platform/index/monitor-platform.component';
import { DivisionManageComponent } from './monitor-platform/division-manage/division-manage.component';
import { IllegalDropRecordComponent } from './garbage-events/illegal-drop-record/illegal-drop-record.component';
import { GarbageEventsComponent } from './garbage-events/index/garbage-events.component';
@NgModule({
  declarations: [
    SystemModeComponent,
    AiopManageComponent,
    MonitorPlatformComponent,
    DivisionManageComponent,
    GarbageEventsComponent,
    IllegalDropRecordComponent,
  ],
  imports: [CommonModule, HowellModule, MaterialModule, RouterModule],
  providers: [],
})
export class AiopComponentsModule {
  constructor(private _injector: Injector) {}
}
