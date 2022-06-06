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
import { CameraManageComponent } from './camera-manage/camera-manage.component';
import { EncodeDeviceManageComponent } from './encode-device-manage/encode-device-manage.component';
import { CameraModelManageComponent } from './camera-model-manage/camera-model-manage.component';
import { AiModelListComponent } from './ai-model-list/ai-model-list.component';
import { AiCameraEventsComponent } from './ai-camera-events/ai-camera-events.component';
import { ReactiveFormsModule } from '@angular/forms';
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
    CameraManageComponent,
    EncodeDeviceManageComponent,
    CameraModelManageComponent,
    AiModelListComponent,
    AiCameraEventsComponent,
  ],
  imports: [CommonModule, HowellModule, MaterialModule, RouterModule, ReactiveFormsModule],
  providers: [],
})
export class AiopComponentsModule {
  constructor(private _injector: Injector) { }
}
