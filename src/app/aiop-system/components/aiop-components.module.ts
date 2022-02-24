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
import { GarbageEventsComponent } from './garbage-events/garbage-events.component';
import { DeployMapComponent } from './deploy-map/deploy-map.component';
import { GarbageStationManageComponent } from './garbage-station-manage/garbage-station-manage.component';
import { PlatformManageComponent } from './platform-manage/platform-manage.component';
import { SystemSettingComponent } from './system-setting/system-setting.component';
import { SuperVisionComponent } from './super-vision/super-vision.component';
import { RegionManageComponent } from './region-manage/region-manage.component';
import { SidenavComponent } from './sidenav/sidenav.component';
@NgModule({
  declarations: [
    AIOPSystemModeComponent,
    AiopSystemManageComponent,
    DivisionManageComponent,
    GarbageEventsComponent,
    IllegalDropRecordComponent,
    DeployMapComponent,
    GarbageStationManageComponent,
    SystemSettingComponent,
    PlatformManageComponent,
    SuperVisionComponent,
    RegionManageComponent,
    SidenavComponent,
  ],
  imports: [CommonModule, HowellModule, MaterialModule, RouterModule],
  providers: [],
})
export class AiopComponentsModule {
  constructor(private _injector: Injector) {}
}
