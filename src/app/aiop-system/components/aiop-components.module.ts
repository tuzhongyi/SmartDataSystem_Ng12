/*
 * @Author: pmx
 * @Date: 2021-09-15 14:27:53
 * @Last Modified by: pmx
 * @Last Modified time: 2022-01-27 10:44:42
 */
import { Injector, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HowellModule } from 'src/app/common/howell.module';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { AIOPSystemModeComponent } from './system-mode/system-mode.component';
import { AiopSystemManageComponent } from './aiop-manage/aiop-manage.component';
import { DivisionManageComponent } from './division-manage/division-manage.component';
import { IllegalDropRecordComponent } from './illegal-drop-record/illegal-drop-record.component';
import { MonitorPlatformComponent } from './monitor-platform/monitor-platform.component';
import { GarbageEventsComponent } from './garbage-events/garbage-events.component';
import { DeployMapComponent } from './deploy-map/deploy-map.component';
import { GarbageStationManageComponent } from './garbage-station-manage/garbage-station-manage.component';
@NgModule({
  declarations: [
    AIOPSystemModeComponent,
    AiopSystemManageComponent,
    MonitorPlatformComponent,
    DivisionManageComponent,
    GarbageEventsComponent,
    IllegalDropRecordComponent,
    DeployMapComponent,
    GarbageStationManageComponent,
  ],
  imports: [CommonModule, HowellModule, MaterialModule, RouterModule],
  providers: [],
})
export class AiopComponentsModule {
  constructor(private _injector: Injector) {}
}
