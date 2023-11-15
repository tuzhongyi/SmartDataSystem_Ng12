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
import { IllegalDropComponent } from 'src/app/common/components/illegal-drop/illegal-drop.component';
import { HowellModule } from 'src/app/common/howell.module';
import { MaterialModule } from 'src/app/material.module';
import { AICameraEventsComponent } from './ai-camera-events/ai-camera-events.component';
import { AIGarbageStationDeviceCameraComponent } from './ai-garbage-station/ai-garbage-station-device-camera/ai-garbage-station-device-camera.component';
import { AIGarbageStationDeviceCommandComponent } from './ai-garbage-station/ai-garbage-station-device-command/ai-garbage-station-device-command.component';
import { AIGarbageStationDeviceDetailsComponent } from './ai-garbage-station/ai-garbage-station-device-details/ai-garbage-station-device-details.component';
import { AIGarbageStationDeviceDropWindowComponent } from './ai-garbage-station/ai-garbage-station-device-drop-window/ai-garbage-station-device-drop-window.component';
import { AIGarbageStationDeviceManagerComponent } from './ai-garbage-station/ai-garbage-station-device-manager/ai-garbage-station-device-manager.component';
import { AIGarbageStationDeviceRecordCommandManagerComponent } from './ai-garbage-station/ai-garbage-station-device-record-command-manager/ai-garbage-station-device-record-command-manager.component';
import { AIGarbageStationDeviceRecordEventManagerComponent } from './ai-garbage-station/ai-garbage-station-device-record-event-manager/ai-garbage-station-device-record-event-manager.component';
import { AIGarbageStationDeviceScheduleComponent } from './ai-garbage-station/ai-garbage-station-device-schedule/ai-garbage-station-device-schedule.component';
import { AiGarbageStationDeviceStatusComponent } from './ai-garbage-station/ai-garbage-station-device-status/ai-garbage-station-device-status.component';
import { AIGarbageStationRegionBuildingComponent } from './ai-garbage-station/ai-garbage-station-region-building/ai-garbage-station-region-building.component';
import { AIGarbageStationRegionManagerComponent } from './ai-garbage-station/ai-garbage-station-region-manager/ai-garbage-station-region-manager.component';
import { AIGarbageStationRegionStationComponent } from './ai-garbage-station/ai-garbage-station-region-station/ai-garbage-station-region-station.component';
import { AIGarbageRegionTreeComponent } from './ai-garbage-station/ai-garbage-station-region-tree/ai-garbage-station-region-tree.component';
import { AIGarbageStationRfidCardDetailsComponent } from './ai-garbage-station/ai-garbage-station-rfid-card-details/ai-garbage-station-rfid-card-details.component';
import { AIGarbageStationRfidCardManagerComponent } from './ai-garbage-station/ai-garbage-station-rfid-card-manager/ai-garbage-station-rfid-card-manager.component';
import { AIModelManageComponent } from './ai-model-manage/ai-model-manage.component';
import { AIModelOperateComponent } from './ai-model-operate/ai-model-operate.component';
import { AIOPGarbageStationDetailsCamerasComponent } from './aiop-garbage-station-details-cameras/aiop-garbage-station-details-cameras.component';
import { AIOPGarbageStationDetailsComponent } from './aiop-garbage-station-details/aiop-garbage-station-details.component';
import { AIOPGarbageStationManagerComponent } from './aiop-garbage-station-manager/aiop-garbage-station-manager.component';
import { AIOPGarbageVehicleComponents } from './aiop-garbage-vehicles/aiop-garbage-vehicle-components';
import { AIOPUserSettingComponents } from './aiop-user-setting/aiop-user-setting-components';
import { CameraManageComponent } from './camera-manage/camera-manage.component';
import { CameraModelManageComponent } from './camera-model-manage/camera-model-manage.component';
import { CameraMoveComponent } from './camera-move/camera-move.component';
import { CameraOperateComponent } from './camera-operate/camera-operate.component';
import { DeployMapComponent } from './deploy-map/deploy-map.component';
import { DivisionManageComponent } from './division-manage/division-manage.component';
import { EncodeDeviceManageComponent } from './encode-device-manage/encode-device-manage.component';
import { EncodeDeviceOperateComponent } from './encode-device-operate/encode-device-operate.component';
import { GarbageEventsComponent } from './garbage-events/garbage-events.component';
import { GarbageStationAboutComponent } from './garbage-station-about/garbage-station-about.component';
import { GarbageStationListComponent } from './garbage-station-list/garbage-station-list.component';
import { GarbageStationOperateComponent } from './garbage-station-operate/garbage-station-operate.component';

import { IllegalDropAbout } from './illegal-drop-about/illegal-drop-about.component';
import { MixIntoManageComponent } from './mix-into-manage/mix-into-manage.component';
import { MonitorPlatformComponent } from './monitor-platform/monitor-platform.component';
import { PictureUploadComponent } from './picture-upload/picture-upload.component';
import { PlatformManageComponent } from './platform-manage/platform-manage.component';
import { PlatformOperateComponent } from './platform-operate/platform-operate.component';
import { RegionManageComponent } from './region-manage/region-manage.component';
import { SRServerManageComponent } from './sr-server-manage/sr-server-manage.component';
import { SRServerOperateComponent } from './sr-server-operate/sr-server-operate.component';
import { AIOPSystemModeComponent } from './system-mode/system-mode.component';
import { SystemSettingComponent } from './system-setting/system-setting.component';
import { UnderwaterComponent } from './underwater/underwater.component';

@NgModule({
  declarations: [
    AIOPSystemModeComponent,
    UnderwaterComponent,
    DivisionManageComponent,
    GarbageEventsComponent,
    DeployMapComponent,
    AIOPGarbageStationDetailsCamerasComponent,
    AIOPGarbageStationDetailsComponent,
    AIOPGarbageStationManagerComponent,
    SystemSettingComponent,
    PlatformManageComponent,
    MonitorPlatformComponent,
    RegionManageComponent,
    CameraManageComponent,
    EncodeDeviceManageComponent,
    CameraModelManageComponent,
    AIModelManageComponent,
    AICameraEventsComponent,
    PlatformOperateComponent,
    SRServerManageComponent,
    SRServerOperateComponent,
    AIModelOperateComponent,
    EncodeDeviceOperateComponent,
    GarbageStationOperateComponent,
    CameraOperateComponent,
    CameraMoveComponent,
    IllegalDropAbout,
    MixIntoManageComponent,
    GarbageStationAboutComponent,
    IllegalDropComponent,
    GarbageStationListComponent,
    PictureUploadComponent,

    AIGarbageStationRegionBuildingComponent,
    AIGarbageStationRegionStationComponent,
    AIGarbageStationRegionManagerComponent,

    AIGarbageStationDeviceCommandComponent,
    AIGarbageStationDeviceDetailsComponent,
    AIGarbageStationDeviceDropWindowComponent,
    AIGarbageStationDeviceCameraComponent,
    AIGarbageStationDeviceScheduleComponent,
    AiGarbageStationDeviceStatusComponent,
    AIGarbageStationDeviceManagerComponent,

    AIGarbageStationDeviceRecordEventManagerComponent,
    AIGarbageStationDeviceRecordCommandManagerComponent,

    AIGarbageStationRfidCardDetailsComponent,
    AIGarbageStationRfidCardManagerComponent,

    AIGarbageRegionTreeComponent,
    ...AIOPGarbageVehicleComponents,
    ...AIOPUserSettingComponents,
  ],
  imports: [
    CommonModule,
    HowellModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
})
export class AiopComponentsModule {
  constructor() {}
}
